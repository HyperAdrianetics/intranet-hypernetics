import { z } from 'zod';
import { quoteDataSchema } from './schemas';

/** Tipos de bloque de texto reutilizable. Solo `addon` lleva `value` (costo). */
export const TEXT_BLOCK_TYPES = ['clause', 'addon', 'payment_condition', 'not_included'] as const;
export const textBlockTypeSchema = z.enum(TEXT_BLOCK_TYPES);
export type TextBlockType = z.infer<typeof textBlockTypeSchema>;

// --- Entidades del catálogo (forma devuelta por la API) ---

export interface CatalogItem {
  id: string;
  category: string | null;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScopeBlock {
  id: string;
  title: string;
  items: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TextBlock {
  id: string;
  type: TextBlockType;
  label: string;
  value: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Esquemas de entrada (crear/editar) ---

export const catalogItemCreateSchema = z.object({
  category: z.string().nullish(),
  description: z.string().min(1),
  price: z.number(),
});
export const catalogItemUpdateSchema = catalogItemCreateSchema.partial();
export type CatalogItemInput = z.infer<typeof catalogItemCreateSchema>;

export const scopeBlockCreateSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string()),
});
export const scopeBlockUpdateSchema = scopeBlockCreateSchema.partial();
export type ScopeBlockInput = z.infer<typeof scopeBlockCreateSchema>;

export const textBlockCreateSchema = z.object({
  type: textBlockTypeSchema,
  label: z.string().min(1),
  value: z.string().nullish(),
});
export const textBlockUpdateSchema = textBlockCreateSchema.partial();
export type TextBlockInput = z.infer<typeof textBlockCreateSchema>;

// --- Cotizaciones ---

export interface QuoteSummary {
  id: string;
  folio: string;
  clientName: string;
  company: string;
  packageName: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type Quote = QuoteSummary & { data: import('./schemas').QuoteData };

export const quoteCreateSchema = quoteDataSchema;
export const quoteUpdateSchema = quoteDataSchema;
