// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

vi.mock('../../src/api/client', () => ({
  api: {
    quotes: {
      list: vi.fn(),
      get: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
    },
  },
  ApiError: class extends Error {},
}));

import { api } from '../../src/api/client';
import { useQuote } from '../../src/hooks/useQuote';
import { defaultQuote } from '../../src/types/quote';
import type { Quote, QuoteSummary } from '../../shared';

const q = api.quotes as unknown as Record<string, ReturnType<typeof vi.fn>>;

const summary: QuoteSummary = {
  id: 'q1',
  folio: 'FOLIO-001',
  clientName: 'C',
  company: 'E',
  packageName: 'P',
  date: '2026-05-29',
  createdAt: 'x',
  updatedAt: 'x',
};
const full: Quote = { ...summary, data: { ...defaultQuote, folio: 'FOLIO-001' } };

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe('useQuote', () => {
  it('carga la cotización más reciente desde la API', async () => {
    q.list.mockResolvedValue([summary]);
    q.get.mockResolvedValue(full);

    const { result } = renderHook(() => useQuote('hypernetics', defaultQuote));

    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.quoteId).toBe('q1');
    expect(result.current.quote.folio).toBe('FOLIO-001');
    expect(result.current.saveStatus).toBe('saved');
  });

  it('crea una nueva si no existe ninguna', async () => {
    q.list.mockResolvedValue([]);
    q.create.mockResolvedValue({ ...full, id: 'new1' });

    const { result } = renderHook(() => useQuote('hypernetics', defaultQuote));
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(q.create).toHaveBeenCalledOnce();
    expect(result.current.quoteId).toBe('new1');
  });

  it('autosave: edita → guarda con debounce vía PUT', async () => {
    q.list.mockResolvedValue([summary]);
    q.get.mockResolvedValue(full);
    q.update.mockResolvedValue(full);

    const { result } = renderHook(() => useQuote('hypernetics', defaultQuote));
    await waitFor(() => expect(result.current.ready).toBe(true));

    act(() => result.current.updateQuote({ clientName: 'Nuevo Cliente' }));
    expect(result.current.saveStatus).toBe('saving');

    await waitFor(() => expect(q.update).toHaveBeenCalled(), { timeout: 2000 });
    const [id, data] = q.update.mock.calls[0];
    expect(id).toBe('q1');
    expect((data as { clientName: string }).clientName).toBe('Nuevo Cliente');
    await waitFor(() => expect(result.current.saveStatus).toBe('saved'));
  });

  it('fallback offline: si la API falla, restaura el respaldo local', async () => {
    localStorage.setItem(
      'quote_backup_hypernetics',
      JSON.stringify({ id: 'q1', data: { ...defaultQuote, clientName: 'Respaldo' }, dirty: true }),
    );
    q.list.mockRejectedValue(new Error('network'));

    const { result } = renderHook(() => useQuote('hypernetics', defaultQuote));
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.saveStatus).toBe('offline');
    expect(result.current.quote.clientName).toBe('Respaldo');
  });
});
