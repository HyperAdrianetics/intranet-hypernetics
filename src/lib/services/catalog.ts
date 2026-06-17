import {
  catalogItemCreateSchema,
  catalogItemUpdateSchema,
  scopeBlockCreateSchema,
  scopeBlockUpdateSchema,
  textBlockCreateSchema,
  textBlockUpdateSchema,
  textBlockTypeSchema,
} from '../../../shared/index';
import { ApiError, parseOr400 } from '../http';
import type { Repositories } from '../repositories/types';

type Result = { status: number; body?: unknown };

export async function listItems(repos: Repositories): Promise<Result> {
  return { status: 200, body: await repos.catalogItems.list() };
}

export async function createItem(repos: Repositories, body: unknown): Promise<Result> {
  const input = parseOr400(catalogItemCreateSchema, body);
  return { status: 201, body: await repos.catalogItems.create(input) };
}

export async function updateItem(repos: Repositories, id: string, body: unknown): Promise<Result> {
  const input = parseOr400(catalogItemUpdateSchema, body);
  const row = await repos.catalogItems.update(id, input);
  if (!row) throw new ApiError(404, 'Concepto no encontrado');
  return { status: 200, body: row };
}

export async function removeItem(repos: Repositories, id: string): Promise<Result> {
  if (!(await repos.catalogItems.remove(id))) throw new ApiError(404, 'Concepto no encontrado');
  return { status: 204 };
}

export async function listScopeBlocks(repos: Repositories): Promise<Result> {
  return { status: 200, body: await repos.scopeBlocks.list() };
}

export async function createScopeBlock(repos: Repositories, body: unknown): Promise<Result> {
  const input = parseOr400(scopeBlockCreateSchema, body);
  return { status: 201, body: await repos.scopeBlocks.create(input) };
}

export async function updateScopeBlock(repos: Repositories, id: string, body: unknown): Promise<Result> {
  const input = parseOr400(scopeBlockUpdateSchema, body);
  const row = await repos.scopeBlocks.update(id, input);
  if (!row) throw new ApiError(404, 'Sección de alcance no encontrada');
  return { status: 200, body: row };
}

export async function removeScopeBlock(repos: Repositories, id: string): Promise<Result> {
  if (!(await repos.scopeBlocks.remove(id)))
    throw new ApiError(404, 'Sección de alcance no encontrada');
  return { status: 204 };
}

export async function listTextBlocks(repos: Repositories, typeParam?: unknown): Promise<Result> {
  const type =
    typeParam === undefined || typeParam === '' ? undefined : parseOr400(textBlockTypeSchema, typeParam);
  return { status: 200, body: await repos.textBlocks.list(type) };
}

export async function createTextBlock(repos: Repositories, body: unknown): Promise<Result> {
  const input = parseOr400(textBlockCreateSchema, body);
  return { status: 201, body: await repos.textBlocks.create(input) };
}

export async function updateTextBlock(repos: Repositories, id: string, body: unknown): Promise<Result> {
  const input = parseOr400(textBlockUpdateSchema, body);
  const row = await repos.textBlocks.update(id, input);
  if (!row) throw new ApiError(404, 'Bloque de texto no encontrado');
  return { status: 200, body: row };
}

export async function removeTextBlock(repos: Repositories, id: string): Promise<Result> {
  if (!(await repos.textBlocks.remove(id))) throw new ApiError(404, 'Bloque de texto no encontrado');
  return { status: 204 };
}
