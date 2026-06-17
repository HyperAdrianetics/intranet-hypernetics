import { prisma } from "@/lib/prisma";
import { defaultQuote } from "../../types/quote";
import type { QuoteData, QuoteSummary } from "../../../shared";
import { CotizadorClient } from "./CotizadorClient";

export const dynamic = "force-dynamic";

async function getInitialQuotes(): Promise<{
  quotes: QuoteSummary[];
  initialData: QuoteData;
  initialId: string | null;
}> {
  try {
    const rows = await prisma.quote.findMany({ orderBy: { updatedAt: "desc" } });
    const quotes: QuoteSummary[] = rows.map((r) => ({
      id: r.id,
      folio: r.folio,
      clientName: r.clientName,
      company: r.company,
      packageName: r.packageName,
      date: r.date,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));

    if (quotes.length > 0) {
      const latest = await prisma.quote.findUnique({ where: { id: quotes[0].id } });
      if (latest) {
        return {
          quotes,
          initialData: latest.data as QuoteData,
          initialId: latest.id,
        };
      }
    }

    return { quotes, initialData: defaultQuote, initialId: null };
  } catch {
    return { quotes: [], initialData: defaultQuote, initialId: null };
  }
}

export default async function CotizadorPage() {
  const { quotes, initialData, initialId } = await getInitialQuotes();
  return (
    <CotizadorClient
      initialQuotes={quotes}
      initialData={initialData}
      initialId={initialId}
    />
  );
}
