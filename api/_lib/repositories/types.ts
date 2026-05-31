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
} from '../../../shared';
import type { QuoteData } from '../../../shared';

export interface CatalogItemRepo {
  list(): Promise<CatalogItem[]>;
  create(input: CatalogItemInput): Promise<CatalogItem>;
  update(id: string, input: Partial<CatalogItemInput>): Promise<CatalogItem | null>;
  remove(id: string): Promise<boolean>;
}

export interface ScopeBlockRepo {
  list(): Promise<ScopeBlock[]>;
  create(input: ScopeBlockInput): Promise<ScopeBlock>;
  update(id: string, input: Partial<ScopeBlockInput>): Promise<ScopeBlock | null>;
  remove(id: string): Promise<boolean>;
}

export interface TextBlockRepo {
  list(type?: TextBlockType): Promise<TextBlock[]>;
  create(input: TextBlockInput): Promise<TextBlock>;
  update(id: string, input: Partial<TextBlockInput>): Promise<TextBlock | null>;
  remove(id: string): Promise<boolean>;
}

export interface QuoteRepo {
  list(): Promise<QuoteSummary[]>;
  create(data: QuoteData): Promise<Quote>;
  get(id: string): Promise<Quote | null>;
  update(id: string, data: QuoteData): Promise<Quote | null>;
  remove(id: string): Promise<boolean>;
}

export interface Repositories {
  catalogItems: CatalogItemRepo;
  scopeBlocks: ScopeBlockRepo;
  textBlocks: TextBlockRepo;
  quotes: QuoteRepo;
}
