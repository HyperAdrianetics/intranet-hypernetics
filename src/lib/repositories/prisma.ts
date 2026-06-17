import { prisma } from '../prisma';
import { summaryFromQuote } from '../quoteSummary';
import type {
  CatalogItem,
  ScopeBlock,
  TextBlock,
  TextBlockType,
  Quote,
  QuoteData,
} from '../../../shared/index';
import type { Repositories } from './types';

const iso = (d: Date) => d.toISOString();

export const prismaRepositories: Repositories = {
  catalogItems: {
    async list() {
      const rows = await prisma.catalogItem.findMany({ orderBy: { createdAt: 'asc' } });
      return rows.map(toCatalogItem);
    },
    async create(input) {
      const row = await prisma.catalogItem.create({
        data: { category: input.category ?? null, description: input.description, price: input.price },
      });
      return toCatalogItem(row);
    },
    async update(id, input) {
      try {
        const row = await prisma.catalogItem.update({
          where: { id },
          data: {
            ...(input.category !== undefined ? { category: input.category ?? null } : {}),
            ...(input.description !== undefined ? { description: input.description } : {}),
            ...(input.price !== undefined ? { price: input.price } : {}),
          },
        });
        return toCatalogItem(row);
      } catch {
        return null;
      }
    },
    async remove(id) {
      try {
        await prisma.catalogItem.delete({ where: { id } });
        return true;
      } catch {
        return false;
      }
    },
  },

  scopeBlocks: {
    async list() {
      const rows = await prisma.scopeBlock.findMany({ orderBy: { createdAt: 'asc' } });
      return rows.map(toScopeBlock);
    },
    async create(input) {
      const row = await prisma.scopeBlock.create({
        data: { title: input.title, items: input.items },
      });
      return toScopeBlock(row);
    },
    async update(id, input) {
      try {
        const row = await prisma.scopeBlock.update({
          where: { id },
          data: {
            ...(input.title !== undefined ? { title: input.title } : {}),
            ...(input.items !== undefined ? { items: input.items } : {}),
          },
        });
        return toScopeBlock(row);
      } catch {
        return null;
      }
    },
    async remove(id) {
      try {
        await prisma.scopeBlock.delete({ where: { id } });
        return true;
      } catch {
        return false;
      }
    },
  },

  textBlocks: {
    async list(type?: TextBlockType) {
      const rows = await prisma.textBlock.findMany({
        where: type ? { type } : undefined,
        orderBy: { createdAt: 'asc' },
      });
      return rows.map(toTextBlock);
    },
    async create(input) {
      const row = await prisma.textBlock.create({
        data: { type: input.type, label: input.label, value: input.value ?? null },
      });
      return toTextBlock(row);
    },
    async update(id, input) {
      try {
        const row = await prisma.textBlock.update({
          where: { id },
          data: {
            ...(input.type !== undefined ? { type: input.type } : {}),
            ...(input.label !== undefined ? { label: input.label } : {}),
            ...(input.value !== undefined ? { value: input.value ?? null } : {}),
          },
        });
        return toTextBlock(row);
      } catch {
        return null;
      }
    },
    async remove(id) {
      try {
        await prisma.textBlock.delete({ where: { id } });
        return true;
      } catch {
        return false;
      }
    },
  },

  quotes: {
    async list() {
      const rows = await prisma.quote.findMany({ orderBy: { updatedAt: 'desc' } });
      return rows.map((r) => ({
        id: r.id,
        folio: r.folio,
        clientName: r.clientName,
        company: r.company,
        packageName: r.packageName,
        date: r.date,
        createdAt: iso(r.createdAt),
        updatedAt: iso(r.updatedAt),
      }));
    },
    async create(data: QuoteData) {
      const row = await prisma.quote.create({
        data: { ...summaryFromQuote(data), data },
      });
      return toQuote(row);
    },
    async get(id) {
      const row = await prisma.quote.findUnique({ where: { id } });
      return row ? toQuote(row) : null;
    },
    async update(id, data: QuoteData) {
      try {
        const row = await prisma.quote.update({
          where: { id },
          data: { ...summaryFromQuote(data), data },
        });
        return toQuote(row);
      } catch {
        return null;
      }
    },
    async remove(id) {
      try {
        await prisma.quote.delete({ where: { id } });
        return true;
      } catch {
        return false;
      }
    },
  },
};

function toCatalogItem(r: {
  id: string;
  category: string | null;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}): CatalogItem {
  return { ...r, createdAt: iso(r.createdAt), updatedAt: iso(r.updatedAt) };
}

function toScopeBlock(r: {
  id: string;
  title: string;
  items: unknown;
  createdAt: Date;
  updatedAt: Date;
}): ScopeBlock {
  return {
    id: r.id,
    title: r.title,
    items: (r.items as string[]) ?? [],
    createdAt: iso(r.createdAt),
    updatedAt: iso(r.updatedAt),
  };
}

function toTextBlock(r: {
  id: string;
  type: string;
  label: string;
  value: string | null;
  createdAt: Date;
  updatedAt: Date;
}): TextBlock {
  return {
    id: r.id,
    type: r.type as TextBlockType,
    label: r.label,
    value: r.value,
    createdAt: iso(r.createdAt),
    updatedAt: iso(r.updatedAt),
  };
}

function toQuote(r: {
  id: string;
  folio: string;
  clientName: string;
  company: string;
  packageName: string;
  date: string;
  data: unknown;
  createdAt: Date;
  updatedAt: Date;
}): Quote {
  return {
    id: r.id,
    folio: r.folio,
    clientName: r.clientName,
    company: r.company,
    packageName: r.packageName,
    date: r.date,
    data: r.data as QuoteData,
    createdAt: iso(r.createdAt),
    updatedAt: iso(r.updatedAt),
  };
}
