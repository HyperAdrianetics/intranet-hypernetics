import type {
  QuoteData,
  Quote,
  QuoteSummary,
  CatalogItem,
  CatalogItemInput,
  ScopeBlock,
  ScopeBlockInput,
  TextBlock,
  TextBlockInput,
  TextBlockType,
} from '../../shared';

const BASE = '/api';

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      /* respuesta sin cuerpo JSON */
    }
    throw new ApiError(res.status, message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  quotes: {
    list: () => request<QuoteSummary[]>('GET', '/quotes'),
    get: (id: string) => request<Quote>('GET', `/quotes/${id}`),
    create: (data: QuoteData) => request<Quote>('POST', '/quotes', data),
    update: (id: string, data: QuoteData) => request<Quote>('PUT', `/quotes/${id}`, data),
    remove: (id: string) => request<void>('DELETE', `/quotes/${id}`),
  },
  catalogItems: {
    list: () => request<CatalogItem[]>('GET', '/catalog/items'),
    create: (input: CatalogItemInput) => request<CatalogItem>('POST', '/catalog/items', input),
    update: (id: string, input: Partial<CatalogItemInput>) =>
      request<CatalogItem>('PATCH', `/catalog/items/${id}`, input),
    remove: (id: string) => request<void>('DELETE', `/catalog/items/${id}`),
  },
  scopeBlocks: {
    list: () => request<ScopeBlock[]>('GET', '/catalog/scope-blocks'),
    create: (input: ScopeBlockInput) => request<ScopeBlock>('POST', '/catalog/scope-blocks', input),
    update: (id: string, input: Partial<ScopeBlockInput>) =>
      request<ScopeBlock>('PATCH', `/catalog/scope-blocks/${id}`, input),
    remove: (id: string) => request<void>('DELETE', `/catalog/scope-blocks/${id}`),
  },
  textBlocks: {
    list: (type?: TextBlockType) =>
      request<TextBlock[]>('GET', `/catalog/text-blocks${type ? `?type=${type}` : ''}`),
    create: (input: TextBlockInput) => request<TextBlock>('POST', '/catalog/text-blocks', input),
    update: (id: string, input: Partial<TextBlockInput>) =>
      request<TextBlock>('PATCH', `/catalog/text-blocks/${id}`, input),
    remove: (id: string) => request<void>('DELETE', `/catalog/text-blocks/${id}`),
  },
};

export { ApiError };
