import { useState, useEffect, useRef, useCallback } from 'react';
import type { QuoteData } from '../types/quote';
import type { QuoteSummary } from '../../shared';
import { getTodayDate } from '../utils/dateUtils';
import { api } from '../api/client';
import { debounce } from '../api/debounce';
import {
  readBackup,
  writeBackup,
  markBackupClean,
  readLastId,
} from '../api/quoteBackup';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'offline';

const AUTOSAVE_MS = 800;

export const useQuote = (brandKey: string, initialData: QuoteData) => {
  const [quote, setQuoteState] = useState<QuoteData>({ ...initialData, date: getTodayDate() });
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<QuoteSummary[]>([]);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [ready, setReady] = useState(false);

  // Evita que el primer cambio tras una carga dispare un guardado redundante.
  const skipNextSave = useRef(true);

  const reloadQuotes = useCallback(async () => {
    try {
      setQuotes(await api.quotes.list());
    } catch {
      /* offline: se conserva la lista previa */
    }
  }, []);

  const applyLoaded = useCallback(
    (id: string, data: QuoteData) => {
      skipNextSave.current = true;
      setQuoteId(id);
      setQuoteState(data);
      writeBackup(localStorage, brandKey, { id, data, dirty: false });
      setSaveStatus('saved');
    },
    [brandKey],
  );

  // Carga inicial: recupera la cotización más reciente (o la última editada),
  // crea una nueva si no hay ninguna, y cae a localStorage si la API falla.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await api.quotes.list();
        if (cancelled) return;
        setQuotes(list);
        if (list.length > 0) {
          const lastId = readLastId(localStorage, brandKey);
          const targetId = lastId && list.some((q) => q.id === lastId) ? lastId : list[0].id;
          const full = await api.quotes.get(targetId);
          if (!cancelled) applyLoaded(full.id, full.data);
        } else {
          const created = await api.quotes.create({ ...initialData, date: getTodayDate() });
          if (!cancelled) {
            applyLoaded(created.id, created.data);
            setQuotes([{ ...created }]);
          }
        }
      } catch {
        // Sin red: restaura el respaldo local si existe.
        if (cancelled) return;
        const backup = readBackup(localStorage, brandKey);
        if (backup) {
          setQuoteId(backup.id);
          setQuoteState(backup.data);
        }
        setSaveStatus('offline');
        skipNextSave.current = true;
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandKey]);

  // Función de guardado con debounce, estable durante el ciclo de vida.
  const saveRef = useRef<ReturnType<typeof debounce<[string, QuoteData]>>>(undefined);
  useEffect(() => {
    saveRef.current = debounce<[string, QuoteData]>((id, data) => {
      api.quotes
        .update(id, data)
        .then(() => {
          markBackupClean(localStorage, brandKey);
          setSaveStatus('saved');
          void reloadQuotes();
        })
        .catch(() => setSaveStatus('error'));
    }, AUTOSAVE_MS);
    const ref = saveRef.current;
    return () => ref?.cancel();
  }, [brandKey, reloadQuotes]);

  // Autosave: ante cualquier cambio, respalda en local y agenda el PUT.
  useEffect(() => {
    if (!ready || quoteId == null) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    writeBackup(localStorage, brandKey, { id: quoteId, data: quote, dirty: true });
    setSaveStatus('saving');
    saveRef.current?.(quoteId, quote);
  }, [quote, quoteId, ready, brandKey]);

  const setQuote = setQuoteState;

  const updateQuote = (newData: Partial<QuoteData>) => {
    setQuoteState((prev) => ({ ...prev, ...newData }));
  };

  const resetQuote = () => {
    setQuoteState({ ...initialData, date: getTodayDate() });
  };

  const loadQuote = useCallback(
    async (id: string) => {
      try {
        const full = await api.quotes.get(id);
        applyLoaded(full.id, full.data);
      } catch {
        setSaveStatus('error');
      }
    },
    [applyLoaded],
  );

  const newQuote = useCallback(async () => {
    const created = await api.quotes.create({ ...initialData, date: getTodayDate() });
    applyLoaded(created.id, created.data);
    await reloadQuotes();
  }, [initialData, applyLoaded, reloadQuotes]);

  const duplicateQuote = useCallback(async () => {
    const copy: QuoteData = {
      ...quote,
      folio: ((parseInt(quote.folio) || 0) + 1).toString(),
    };
    const created = await api.quotes.create(copy);
    applyLoaded(created.id, created.data);
    await reloadQuotes();
  }, [quote, applyLoaded, reloadQuotes]);

  const deleteQuote = useCallback(
    async (id: string) => {
      await api.quotes.remove(id);
      await reloadQuotes();
      if (id === quoteId) await newQuote();
    },
    [quoteId, reloadQuotes, newQuote],
  );

  return {
    quote,
    quoteId,
    quotes,
    saveStatus,
    ready,
    setQuote,
    updateQuote,
    resetQuote,
    duplicateQuote,
    loadQuote,
    newQuote,
    deleteQuote,
    reloadQuotes,
  };
};
