"use client";

import { QuoteEditor } from "../../components/QuoteEditor";
import type { QuoteData, QuoteSummary } from "../../../shared";

interface CotizadorClientProps {
  initialQuotes: QuoteSummary[];
  initialData: QuoteData;
  initialId: string | null;
}

export function CotizadorClient({
  initialQuotes,
  initialData,
  initialId,
}: CotizadorClientProps) {
  return (
    <QuoteEditor
      initialData={initialData}
      isDarkMode={true}
      ssrQuotes={initialQuotes}
      ssrQuoteId={initialId}
    />
  );
}
