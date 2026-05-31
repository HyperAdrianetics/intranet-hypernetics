import { z } from 'zod';

/**
 * Esquemas Zod del documento de cotización. Son la fuente única:
 * los tipos de TypeScript se derivan con `z.infer`, y la API los usa para validar.
 */

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const colorsSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  text: z.string(),
});

export const scopeSectionSchema = z.object({
  title: z.string(),
  items: z.array(z.string()),
});

export const milestoneSchema = z.object({
  title: z.string(),
  time: z.string(),
  deliverable: z.string(),
});

export const platformCostSchema = z.object({
  name: z.string(),
  cost: z.string(),
  period: z.string(),
});

export const portfolioEntrySchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string(),
});

export const addonSchema = z.object({
  service: z.string(),
  cost: z.string(),
});

export const additionalLinkSchema = z.object({
  title: z.string(),
  link: z.string(),
});

export const quoteDataSchema = z.object({
  clientName: z.string(),
  company: z.string(),
  date: z.string(),
  folio: z.string(),
  deliveryTime: z.string(),
  validity: z.string(),
  clauses: z.array(z.string()),
  observations: z.string(),
  items: z.array(lineItemSchema),
  logo: z.string().nullable(),
  colors: colorsSchema,
  packageName: z.string(),
  note: z.string().optional(),
  showItemPrices: z.boolean(),
  scope: z.array(scopeSectionSchema),
  notIncluded: z.array(z.string()),
  includeQuotePage: z.boolean(),
  includeScopePage: z.boolean(),
  milestones: z.array(milestoneSchema),
  platformCost: platformCostSchema.optional(),
  portfolio: z.array(portfolioEntrySchema),
  paymentConditions: z.array(z.string()),
  addons: z.array(addonSchema).optional(),
  additionalLinks: z.array(additionalLinkSchema).optional(),
  includeDetailsPage: z.boolean(),
});

export type LineItem = z.infer<typeof lineItemSchema>;
export type QuoteData = z.infer<typeof quoteDataSchema>;
