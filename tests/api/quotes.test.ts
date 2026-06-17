import { describe, it, expect, beforeEach } from 'vitest';
import { createMemoryRepositories } from '../../src/lib/repositories/memory';
import * as quotes from '../../src/lib/services/quotes';
import type { Repositories } from '../../src/lib/repositories/types';
import type { QuoteData } from '../../shared';

function makeQuote(overrides: Partial<QuoteData> = {}): QuoteData {
  return {
    clientName: 'Cliente',
    company: 'Empresa',
    date: '2026-05-29',
    folio: 'FOLIO-001',
    deliveryTime: '5 semanas',
    validity: '30 días',
    clauses: [],
    observations: '',
    items: [{ id: '1', description: 'Concepto', quantity: 1, price: 100 }],
    logo: null,
    colors: { primary: '#000', secondary: '#111', accent: '#222', text: '#333' },
    packageName: 'Paquete',
    showItemPrices: true,
    scope: [],
    notIncluded: [],
    includeQuotePage: true,
    includeScopePage: true,
    milestones: [],
    portfolio: [],
    paymentConditions: [],
    includeDetailsPage: true,
    ...overrides,
  };
}

let repos: Repositories;
beforeEach(() => {
  repos = createMemoryRepositories();
});

describe('flujo de cotizaciones', () => {
  it('crear → recuperar → listar', async () => {
    const created = await quotes.createQuote(repos, makeQuote({ folio: 'FOLIO-007' }));
    expect(created.status).toBe(201);
    const id = (created.body as { id: string }).id;

    const got = await quotes.getQuote(repos, id);
    expect(got.status).toBe(200);
    expect((got.body as { data: QuoteData }).data.folio).toBe('FOLIO-007');

    const list = await quotes.listQuotes(repos);
    expect(list.body).toHaveLength(1);
    // El listado expone columnas resumen, no el documento completo.
    expect((list.body as { folio: string }[])[0].folio).toBe('FOLIO-007');
    expect((list.body as Record<string, unknown>[])[0]).not.toHaveProperty('data');
  });

  it('deriva columnas resumen del QuoteData', async () => {
    const created = await quotes.createQuote(repos, makeQuote({ clientName: 'ACME', company: 'X' }));
    expect(created.body).toMatchObject({ clientName: 'ACME', company: 'X' });
  });

  it('actualiza (autosave) y refleja cambios', async () => {
    const created = await quotes.createQuote(repos, makeQuote());
    const id = (created.body as { id: string }).id;
    const updated = await quotes.updateQuote(repos, id, makeQuote({ clientName: 'Nuevo' }));
    expect((updated.body as { clientName: string }).clientName).toBe('Nuevo');
  });

  it('404 al recuperar/actualizar/borrar inexistente', async () => {
    await expect(quotes.getQuote(repos, 'nope')).rejects.toMatchObject({ status: 404 });
    await expect(quotes.updateQuote(repos, 'nope', makeQuote())).rejects.toMatchObject({ status: 404 });
    await expect(quotes.removeQuote(repos, 'nope')).rejects.toMatchObject({ status: 404 });
  });

  it('400 al crear con QuoteData inválido', async () => {
    await expect(quotes.createQuote(repos, { folio: 'x' })).rejects.toMatchObject({ status: 400 });
  });

  it('borra y devuelve 204', async () => {
    const created = await quotes.createQuote(repos, makeQuote());
    const id = (created.body as { id: string }).id;
    const res = await quotes.removeQuote(repos, id);
    expect(res.status).toBe(204);
  });
});
