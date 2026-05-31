import { getTodayDate } from "../utils/dateUtils";
import { hyperneticsClauses } from "../../shared";
import type { QuoteData } from "../../shared";

// Re-export de la fuente única en shared/ para no romper imports existentes.
export type { LineItem, QuoteData } from "../../shared";
export {
  hyperneticsClauses,
  genericScope,
  genericNotIncluded,
  genericMilestones,
  genericPortfolio,
  genericPaymentConditions,
  HYPERNETICS_TEMPLATES,
} from "../../shared";

export const defaultQuote: QuoteData = {
  includeScopePage: true,
  includeQuotePage: true,
  includeDetailsPage: true,
  clientName: "Nombre del Cliente",
  company: "Nombre de la Empresa",
  date: getTodayDate(),
  folio: "FOLIO-001",
  deliveryTime: "Por definir",
  validity: "30 días naturales",
  clauses: [...hyperneticsClauses],
  observations: "*PRECIOS EXPRESADOS EN MXN. NO INCLUYE IVA.",
  items: [
    {
      id: "1",
      description: "Concepto 1\nDescripción detallada del servicio",
      quantity: 1,
      price: 0,
    },
  ],
  logo: "https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg",
  colors: {
    primary: "#a7cf9e",
    secondary: "#0a0b10",
    accent: "#d2d2af",
    text: "#f3f4f6",
  },
  packageName: "Nombre del Paquete",
  showItemPrices: true,
  scope: [],
  notIncluded: [],
  milestones: [],
  platformCost: undefined,
  portfolio: [],
  paymentConditions: [],
  addons: [],
  note: "",
  additionalLinks: [],
};
