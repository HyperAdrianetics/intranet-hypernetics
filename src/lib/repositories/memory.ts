import type {
  CatalogItem,
  CatalogItemInput,
  ScopeBlock,
  ScopeBlockInput,
  TextBlock,
  TextBlockInput,
  TextBlockType,
  Quote,
  QuoteSummary,
  QuoteData,
} from '../../../shared/index';
import { summaryFromQuote } from '../quoteSummary';
import type {
  CatalogItemRepo,
  ScopeBlockRepo,
  TextBlockRepo,
  QuoteRepo,
  Repositories,
} from './types';

function createClock() {
  let n = 0;
  return () => new Date(Date.UTC(2026, 0, 1, 0, 0, n++)).toISOString();
}

function createIds(prefix: string) {
  let n = 0;
  return () => `${prefix}_${++n}`;
}

class MemoryCatalogItemRepo implements CatalogItemRepo {
  private rows: CatalogItem[] = [];
  private now: () => string;
  private id: () => string;
  constructor(now: () => string, id: () => string) {
    this.now = now;
    this.id = id;
  }
  async list() {
    return [...this.rows];
  }
  async create(input: CatalogItemInput) {
    const ts = this.now();
    const row: CatalogItem = {
      id: this.id(),
      category: input.category ?? null,
      description: input.description,
      price: input.price,
      createdAt: ts,
      updatedAt: ts,
    };
    this.rows.push(row);
    return row;
  }
  async update(id: string, input: Partial<CatalogItemInput>) {
    const row = this.rows.find((r) => r.id === id);
    if (!row) return null;
    if (input.category !== undefined) row.category = input.category ?? null;
    if (input.description !== undefined) row.description = input.description;
    if (input.price !== undefined) row.price = input.price;
    row.updatedAt = this.now();
    return row;
  }
  async remove(id: string) {
    const i = this.rows.findIndex((r) => r.id === id);
    if (i === -1) return false;
    this.rows.splice(i, 1);
    return true;
  }
}

class MemoryScopeBlockRepo implements ScopeBlockRepo {
  private rows: ScopeBlock[] = [];
  private now: () => string;
  private id: () => string;
  constructor(now: () => string, id: () => string) {
    this.now = now;
    this.id = id;
  }
  async list() {
    return [...this.rows];
  }
  async create(input: ScopeBlockInput) {
    const ts = this.now();
    const row: ScopeBlock = {
      id: this.id(),
      title: input.title,
      items: [...input.items],
      createdAt: ts,
      updatedAt: ts,
    };
    this.rows.push(row);
    return row;
  }
  async update(id: string, input: Partial<ScopeBlockInput>) {
    const row = this.rows.find((r) => r.id === id);
    if (!row) return null;
    if (input.title !== undefined) row.title = input.title;
    if (input.items !== undefined) row.items = [...input.items];
    row.updatedAt = this.now();
    return row;
  }
  async remove(id: string) {
    const i = this.rows.findIndex((r) => r.id === id);
    if (i === -1) return false;
    this.rows.splice(i, 1);
    return true;
  }
}

class MemoryTextBlockRepo implements TextBlockRepo {
  private rows: TextBlock[] = [];
  private now: () => string;
  private id: () => string;
  constructor(now: () => string, id: () => string) {
    this.now = now;
    this.id = id;
  }
  async list(type?: TextBlockType) {
    return this.rows.filter((r) => (type ? r.type === type : true));
  }
  async create(input: TextBlockInput) {
    const ts = this.now();
    const row: TextBlock = {
      id: this.id(),
      type: input.type,
      label: input.label,
      value: input.value ?? null,
      createdAt: ts,
      updatedAt: ts,
    };
    this.rows.push(row);
    return row;
  }
  async update(id: string, input: Partial<TextBlockInput>) {
    const row = this.rows.find((r) => r.id === id);
    if (!row) return null;
    if (input.type !== undefined) row.type = input.type;
    if (input.label !== undefined) row.label = input.label;
    if (input.value !== undefined) row.value = input.value ?? null;
    row.updatedAt = this.now();
    return row;
  }
  async remove(id: string) {
    const i = this.rows.findIndex((r) => r.id === id);
    if (i === -1) return false;
    this.rows.splice(i, 1);
    return true;
  }
}

class MemoryQuoteRepo implements QuoteRepo {
  private rows: Quote[] = [];
  private now: () => string;
  private id: () => string;
  constructor(now: () => string, id: () => string) {
    this.now = now;
    this.id = id;
  }
  async list(): Promise<QuoteSummary[]> {
    return [...this.rows]
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
      .map(({ data: _data, ...summary }) => summary);
  }
  async create(data: QuoteData) {
    const ts = this.now();
    const row: Quote = {
      id: this.id(),
      ...summaryFromQuote(data),
      data,
      createdAt: ts,
      updatedAt: ts,
    };
    this.rows.push(row);
    return row;
  }
  async get(id: string) {
    return this.rows.find((r) => r.id === id) ?? null;
  }
  async update(id: string, data: QuoteData) {
    const row = this.rows.find((r) => r.id === id);
    if (!row) return null;
    Object.assign(row, summaryFromQuote(data), { data, updatedAt: this.now() });
    return row;
  }
  async remove(id: string) {
    const i = this.rows.findIndex((r) => r.id === id);
    if (i === -1) return false;
    this.rows.splice(i, 1);
    return true;
  }
}

export function createMemoryRepositories(): Repositories {
  const now = createClock();
  return {
    catalogItems: new MemoryCatalogItemRepo(now, createIds('ci')),
    scopeBlocks: new MemoryScopeBlockRepo(now, createIds('sb')),
    textBlocks: new MemoryTextBlockRepo(now, createIds('tb')),
    quotes: new MemoryQuoteRepo(now, createIds('q')),
  };
}
