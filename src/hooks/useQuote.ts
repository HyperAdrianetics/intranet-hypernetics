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

interface UseQuoteOptions {
  brandKey: string;
  initialData: QuoteData;
  ssrQuotes?: QuoteSummary[];
  ssrQuoteId?: string | null;
}

export const useQuote = ({ brandKey, initialData, ssrQuotes, ssrQuoteId }: UseQuoteOptions) => {
  const [quote, setQuoteState] = useState<QuoteData>(() => {
    const withDate = { ...initialData };
    if (!withDate.date) withDate.date = getTodayDate();
    return withDate;
  });
  const [quoteId, setQuoteId] = useState<string | null>(ssrQuoteId ?? null);
  const [quotes, setQuotes] = useState<QuoteSummary[]>(ssrQuotes ?? []);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [ready, setReady] = useState(ssrQuoteId != null);

  const skipNextSave = useRef(ssrQuoteId != null);

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

  // Carga inicial (solo cuando NO hay SSR).
  useEffect(() => {
    if (ssrQuoteId) {
      // SSR data is already loaded; refresh list in background.
      reloadQuotes();
      return;
    }

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
  }, [brandKey]);

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
