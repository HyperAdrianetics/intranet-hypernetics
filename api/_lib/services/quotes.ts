import { quoteCreateSchema, quoteUpdateSchema } from '../../../shared';
import { ApiError, parseOr400 } from '../http';
import type { Repositories } from '../repositories/types';

type Result = { status: number; body?: unknown };

export async function listQuotes(repos: Repositories): Promise<Result> {
  return { status: 200, body: await repos.quotes.list() };
}

export async function createQuote(repos: Repositories, body: unknown): Promise<Result> {
  const data = parseOr400(quoteCreateSchema, body);
  return { status: 201, body: await repos.quotes.create(data) };
}

export async function getQuote(repos: Repositories, id: string): Promise<Result> {
  const quote = await repos.quotes.get(id);
  if (!quote) throw new ApiError(404, 'Cotización no encontrada');
  return { status: 200, body: quote };
}

export async function updateQuote(repos: Repositories, id: string, body: unknown): Promise<Result> {
  const data = parseOr400(quoteUpdateSchema, body);
  const quote = await repos.quotes.update(id, data);
  if (!quote) throw new ApiError(404, 'Cotización no encontrada');
  return { status: 200, body: quote };
}

export async function removeQuote(repos: Repositories, id: string): Promise<Result> {
  if (!(await repos.quotes.remove(id))) throw new ApiError(404, 'Cotización no encontrada');
  return { status: 204 };
}
