import type { QuoteData } from '../../shared/index';

export function summaryFromQuote(data: QuoteData) {
  return {
    folio: data.folio,
    clientName: data.clientName,
    company: data.company,
    packageName: data.packageName,
    date: data.date,
  };
}
