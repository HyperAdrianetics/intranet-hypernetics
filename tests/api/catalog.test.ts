import { describe, it, expect, beforeEach } from 'vitest';
import { createMemoryRepositories } from '../../src/lib/repositories/memory';
import { ApiError } from '../../src/lib/http';
import * as catalog from '../../src/lib/services/catalog';
import type { Repositories } from '../../src/lib/repositories/types';

let repos: Repositories;
beforeEach(() => {
  repos = createMemoryRepositories();
});

describe('conceptos del catálogo', () => {
  it('crea y lista un concepto', async () => {
    const created = await catalog.createItem(repos, { description: 'Fase 1', price: 1000 });
    expect(created.status).toBe(201);
    const list = await catalog.listItems(repos);
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);
  });

  it('rechaza entrada inválida con 400', async () => {
    await expect(catalog.createItem(repos, { description: '', price: 'x' })).rejects.toMatchObject({
      status: 400,
    });
  });

  it('edita solo los campos provistos', async () => {
    const { body } = await catalog.createItem(repos, { description: 'A', price: 100 });
    const id = (body as { id: string }).id;
    const updated = await catalog.updateItem(repos, id, { price: 200 });
    expect(updated.body).toMatchObject({ description: 'A', price: 200 });
  });

  it('404 al editar inexistente', async () => {
    await expect(catalog.updateItem(repos, 'nope', { price: 1 })).rejects.toBeInstanceOf(ApiError);
  });

  it('borra y devuelve 204', async () => {
    const { body } = await catalog.createItem(repos, { description: 'A', price: 1 });
    const id = (body as { id: string }).id;
    const res = await catalog.removeItem(repos, id);
    expect(res.status).toBe(204);
    await expect(catalog.removeItem(repos, id)).rejects.toMatchObject({ status: 404 });
  });
});

describe('secciones de alcance', () => {
  it('crea con items', async () => {
    const { body, status } = await catalog.createScopeBlock(repos, {
      title: 'Planeación',
      items: ['a', 'b'],
    });
    expect(status).toBe(201);
    expect(body).toMatchObject({ title: 'Planeación', items: ['a', 'b'] });
  });
});

describe('bloques de texto', () => {
  it('filtra por tipo', async () => {
    await catalog.createTextBlock(repos, { type: 'clause', label: 'Cláusula 1' });
    await catalog.createTextBlock(repos, { type: 'addon', label: 'Hosting', value: '$1000' });
    const onlyClauses = await catalog.listTextBlocks(repos, 'clause');
    expect(onlyClauses.body).toHaveLength(1);
    expect((onlyClauses.body as { type: string }[])[0].type).toBe('clause');
  });

  it('guarda value en addons', async () => {
    const { body } = await catalog.createTextBlock(repos, {
      type: 'addon',
      label: 'Hosting',
      value: '$1000',
    });
    expect(body).toMatchObject({ type: 'addon', label: 'Hosting', value: '$1000' });
  });

  it('rechaza type inválido con 400', async () => {
    await expect(
      catalog.createTextBlock(repos, { type: 'nope', label: 'x' }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it('rechaza ?type inválido en el listado', async () => {
    await expect(catalog.listTextBlocks(repos, 'bad')).rejects.toMatchObject({ status: 400 });
  });
});
