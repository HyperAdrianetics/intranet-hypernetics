import type { QuoteData } from '../../shared';

/** Deriva las columnas resumen (desnormalizadas) a partir del QuoteData completo. */
export function summaryFromQuote(data: QuoteData) {
  return {
    folio: data.folio,
    clientName: data.clientName,
    company: data.company,
    packageName: data.packageName,
    date: data.date,
  };
}
