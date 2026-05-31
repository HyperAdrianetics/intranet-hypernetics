import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api, ApiError } from '../../src/api/client';

function mockFetch(impl: (url: string, init?: RequestInit) => Response) {
  const fn = vi.fn((url: string, init?: RequestInit) => Promise.resolve(impl(url, init)));
  vi.stubGlobal('fetch', fn);
  return fn;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

afterEach(() => vi.unstubAllGlobals());

describe('api client', () => {
  it('GET /quotes', async () => {
    const fetchMock = mockFetch(() => json(200, [{ id: 'q1' }]));
    const list = await api.quotes.list();
    expect(list).toEqual([{ id: 'q1' }]);
    expect(fetchMock).toHaveBeenCalledWith('/api/quotes', expect.objectContaining({ method: 'GET' }));
  });

  it('POST envía JSON con Content-Type', async () => {
    const fetchMock = mockFetch(() => json(201, { id: 'q1' }));
    await api.quotes.create({ folio: 'F1' } as never);
    const [, init] = fetchMock.mock.calls[0];
    expect(init?.method).toBe('POST');
    expect((init?.headers as Record<string, string>)['Content-Type']).toBe('application/json');
    expect(init?.body).toBe(JSON.stringify({ folio: 'F1' }));
  });

  it('DELETE 204 resuelve sin cuerpo', async () => {
    mockFetch(() => new Response(null, { status: 204 }));
    await expect(api.quotes.remove('q1')).resolves.toBeUndefined();
  });

  it('text-blocks adjunta ?type', async () => {
    const fetchMock = mockFetch(() => json(200, []));
    await api.textBlocks.list('clause');
    expect(fetchMock).toHaveBeenCalledWith('/api/catalog/text-blocks?type=clause', expect.anything());
  });

  it('lanza ApiError con el mensaje del backend', async () => {
    mockFetch(() => json(404, { error: 'Cotización no encontrada' }));
    await expect(api.quotes.get('nope')).rejects.toMatchObject({
      status: 404,
      message: 'Cotización no encontrada',
    });
    await expect(api.quotes.get('nope')).rejects.toBeInstanceOf(ApiError);
  });
});
