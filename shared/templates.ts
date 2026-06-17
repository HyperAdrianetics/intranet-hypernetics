import type { QuoteData } from './schemas';

/**
 * Datos reutilizables de Hypernetics. Viven en `shared/` para que tanto el
 * frontend como el seed del backend usen la misma fuente.
 */

export const hyperneticsClauses = [
  "Se requiere un anticipo del 50% para dar inicio al proyecto.",
  "El 50% restante deberá liquidarse al momento de la entrega final y antes de la liberación de archivos/sitio.",
  "Los tiempos de entrega están sujetos a la recepción oportuna de información y materiales por parte del cliente.",
  "Esta cotización tiene una vigencia de 30 días naturales a partir de su emisión.",
  "Los precios están sujetos a cambios importantes en la moneda (tipo de cambio) y costos de los proveedores de servicios externos.",
  "Cualquier requerimiento adicional no contemplado en este documento será cotizado por separado.",
  "Hypernetics se reserva el derecho de incluir el proyecto en su portafolio profesional.",
  "Una vez liquidado el proyecto, los derechos de uso del diseño final pertenecen al cliente.",
  "*El soporte técnico contempla únicamente acciones correctivas o cambios pequeños que no afecten la estructura general del sitio.",
];

export const genericScope = [
  {
    title: "1. Planeación y configuración inicial",
    items: [
      "Revisión del brief y materiales proporcionados",
      "Definición de arquitectura de contenidos",
      "Configuración inicial del proyecto en la plataforma seleccionada",
      "Configuración de dominio y preparación para publicación",
      "Redirección del dominio actual (.com) al nuevo dominio (.org)",
    ],
  },
  {
    title: "2. Diseño visual y maquetación",
    items: [
      "Adaptación del diseño con base en manual de marca y lineamientos visuales",
      "Diseño responsivo para desktop, tablet y móvil",
      "Maquetación de secciones y componentes visuales",
      "Ajustes de tipografía, colores, espaciados y jerarquía visual",
    ],
  },
  {
    title: "3. Desarrollo de páginas principales",
    items: [
      "Implementación de secciones: Inicio, Acerca de, Agenda, Ponentes, Eventos Paralelos, Informe 2025, Prensa, Patrocinadores, Aviso de Privacidad",
    ],
  },
  {
    title: "4. Configuración de contenido administrable (CMS)",
    items: [
      "Habilitación de autogestión para: Ponentes, Agenda, Eventos paralelos, Patrocinadores, Prensa",
      "Actualización de textos generales, imágenes y cifras de impacto",
    ],
  },
  {
    title: "5. Funcionalidades incluidas",
    items: [
      "Menú principal responsivo y footer institucional",
      "Contador regresivo al evento",
      "Buscador de ponentes y filtros de agenda",
      "Visualización de informe PDF e integración de video embebido",
    ],
  },
  {
    title: "6. Integración de servicios externos",
    items: [
      "Plataforma de registro externa y formulario de voluntariado",
      "Google Analytics, SEO básico y Meta tags para redes sociales",
      "Integración de redes sociales y Sitemap",
    ],
  },
  {
    title: "7. Carga inicial de contenido",
    items: [
      "Carga de materiales proporcionados por el cliente (textos, ponentes, agenda, etc.)",
      "Materiales deben entregarse en formato editable",
    ],
  },
  {
    title: "8. Pruebas y optimización",
    items: [
      "Revisión en navegadores principales y dispositivos móviles",
      "Optimización de carga y validación de enlaces",
    ],
  },
  {
    title: "9. Capacitación",
    items: [
      "1 sesión remota de capacitación",
      "Explicación de uso del CMS y grabación de sesión",
    ],
  },
  {
    title: "10. Soporte posterior",
    items: [
      "Ajustes menores, corrección de errores y asistencia técnica básica",
      "Acompañamiento en publicación final",
    ],
  },
];

export const genericNotIncluded = [
  "Generación de contenido editorial o redacción de textos",
  "Diseño de branding o producción de video",
  "Compra de imágenes premium",
  "Pago de licencias de terceros, hosting o dominio",
  "Desarrollos a medida fuera del alcance descrito",
  "Integraciones avanzadas con APIs externas no contempladas en el brief",
];

export const genericMilestones = [
  { title: "Fase 1: Planeación y Diseño", time: "Semana 1-2", deliverable: "Propuesta Visual y Wireframes" },
  { title: "Fase 2: Desarrollo y CMS", time: "Semana 3-4", deliverable: "Sitio funcional y carga de contenido" },
  { title: "Fase 3: Pruebas y Lanzamiento", time: "Semana 5", deliverable: "Capacitación y Publicación Final" },
];

export const genericPortfolio = [
  { title: "Fundación Uriel", link: "fundacionuriel.org", description: "Plataforma para organización sin fines de lucro." },
  { title: "Semilleros de Sentido", link: "semillerosdesentido.org", description: "Sitio institucional educativo y social." },
  { title: "Loto Audio", link: "lotoaudio.com.mx", description: "Portafolio para estudio de post-producción sonora." },
  { title: "Misión Antigua", link: "misionantigua.org", description: "Plataforma de comunicación social e impacto." },
  { title: "Mars Siege", link: "mars-siege-angular.vercel.app", description: "Plataforma interactiva de visualización y datos." },
  { title: "Worktric", link: "worktric.com.mx", description: "Sitio corporativo de servicios profesionales." },
];

export const genericPaymentConditions = [
  "50% de anticipo para autorizar el inicio del proyecto.",
  "50% restante a la entrega final y capacitación.",
  "Facturación disponible (Precios + IVA).",
  "Vigencia de cotización: 15 días naturales.",
];

type QuoteTemplate = Partial<QuoteData> & { id: string; name: string };

export const HYPERNETICS_TEMPLATES: QuoteTemplate[] = [
  {
    id: "squarespace",
    name: "Opción 1 — Squarespace",
    clientName: "Moremil Tornero Barrueta",
    company: "ninchcompany",
    packageName: "Sitio Web Corporativo (Squarespace)",
    deliveryTime: "5 semanas hábiles",
    showItemPrices: true,
    note: "La cotización no incluye los costos de plugins, templates o algún add-on que tenga costo independiente.",
    scope: [...genericScope],
    notIncluded: [...genericNotIncluded],
    clauses: [...hyperneticsClauses],
    includeQuotePage: true,
    includeScopePage: true,
    includeDetailsPage: true,
    milestones: [
      { title: "Fase 1: Kickoff y Diseño", time: "Semana 1-2", deliverable: "Mapa del sitio, diseño base adaptado a branding y prototipo de alta fidelidad." },
      { title: "Fase 2: Desarrollo y CMS", time: "Semana 3-4", deliverable: "Sitio completo maquetado, configuración CMS e integración de contenidos dinámicos." },
      { title: "Fase 3: QA y Liberación", time: "Semana 5", deliverable: "Sitio publicado, capacitación y manual básico de administración." },
    ],
    portfolio: [...genericPortfolio],
    paymentConditions: ["50% anticipo.", "30% avance.", "20% cierre de proyecto."],
    platformCost: { name: "Squarespace Business", cost: "$5,000 - $7,000", period: "anual aprox." },
    addons: [
      { service: "Extensiones de formularios premium", cost: "$1,000 – $2,000/año" },
      { service: "Integración newsletter (Mailchimp)", cost: "$0 – $3,000/año" },
    ],
    items: [
      { id: "1", description: "Fase 1: Planeación, diseño y configuración\nRevisión de brief, arquitectura y diseño visual adaptado.", quantity: 1, price: 11500 },
      { id: "2", description: "Fase 2: Desarrollo\nMaquetación de páginas, configuración CMS e integración de servicios.", quantity: 1, price: 15500 },
      { id: "3", description: "Fase 3: Entrega\nQA, pruebas, capacitación y publicación.", quantity: 1, price: 3750 },
      { id: "4", description: "Soporte post-lanzamiento\n2 meses de acompañamiento y ajustes menores.", quantity: 1, price: 3000 },
    ],
  },
  {
    id: "wix",
    name: "Opción 2 — Wix",
    clientName: "Moremil Tornero Barrueta",
    company: "ninchcompany",
    packageName: "Sitio Web Corp (Wix)",
    deliveryTime: "5 semanas hábiles",
    showItemPrices: true,
    note: "La cotización no incluye los costos de plugins, templates o algún add-on que tenga costo independiente.",
    scope: [...genericScope],
    notIncluded: [...genericNotIncluded],
    clauses: [...hyperneticsClauses],
    includeQuotePage: true,
    includeScopePage: true,
    includeDetailsPage: true,
    milestones: [
      { title: "Fase 1: Kickoff y Diseño", time: "Semana 1-2", deliverable: "Wireframe funcional, diseño visual y prototipo aprobado." },
      { title: "Fase 2: Desarrollo y CMS", time: "Semana 3-4", deliverable: "Sitio interactivo completo, colecciones dinámicas e integración de formularios." },
      { title: "Fase 3: QA y Liberación", time: "Semana 5", deliverable: "Sitio publicado y capacitación al equipo." },
    ],
    portfolio: [...genericPortfolio],
    paymentConditions: ["50% anticipo.", "30% avance.", "20% cierre de proyecto."],
    platformCost: { name: "Wix Business / CMS", cost: "$4,000 - $6,500", period: "anual aprox." },
    addons: [
      { service: "Velo Apps / plugins premium", cost: "$1,500 – $3,000" },
      { service: "Wix Forms Pro", cost: "$1,000 – $2,000" },
      { service: "Email marketing", cost: "$1,500 – $3,500" },
    ],
    items: [
      { id: "1", description: "Fase 1: Planeación y estructura\nDiseño visual y setup inicial de plataforma.", quantity: 1, price: 10500 },
      { id: "2", description: "Fase 2: Desarrollo\nDesarrollo de páginas, CMS dinámico e integraciones.", quantity: 1, price: 15000 },
      { id: "3", description: "Fase 3: Entrega\nQA, capacitación y publicación.", quantity: 1, price: 3000 },
      { id: "4", description: "Soporte post-lanzamiento\n2 meses de acompañamiento técnico.", quantity: 1, price: 2500 },
    ],
  },
  {
    id: "framer",
    name: "Opción 3 — Framer",
    clientName: "Moremil Tornero Barrueta",
    company: "ninchcompany",
    packageName: "Sitio Web Premium (Framer)",
    deliveryTime: "5 semanas hábiles",
    showItemPrices: true,
    note: "La cotización no incluye los costos de plugins, templates o algún add-on que tenga costo independiente.",
    scope: [...genericScope],
    notIncluded: [...genericNotIncluded],
    clauses: [...hyperneticsClauses],
    includeQuotePage: true,
    includeScopePage: true,
    includeDetailsPage: true,
    milestones: [
      { title: "Fase 1: Kickoff y Diseño", time: "Semana 1-2", deliverable: "Arquitectura del sitio, prototipo de alta fidelidad y validación de diseño." },
      { title: "Fase 2: Desarrollo y CMS", time: "Semana 3-4", deliverable: "Sitio interactivo completo, CMS administrable y configuración de componentes." },
      { title: "Fase 3: QA y Liberación", time: "Semana 5", deliverable: "Sitio publicado, capacitación y entrega final." },
    ],
    portfolio: [...genericPortfolio],
    paymentConditions: ["50% anticipo.", "30% avance.", "20% cierre de proyecto."],
    platformCost: { name: "Framer Pro", cost: "$4,500 - $8,000", period: "anual aprox." },
    addons: [
      { service: "Framer CMS plan adicional", cost: "incluido según plan" },
      { service: "FormSpark / forms avanzados", cost: "$1,000 – $2,500" },
      { service: "Mailchimp / newsletter", cost: "$0 – $3,000" },
      { service: "Integración analytics avanzada", cost: "$0 – $1,500" },
    ],
    items: [
      { id: "1", description: "Fase 1: Planeación y Diseño UI\nArquitectura de información y diseño visual.", quantity: 1, price: 11500 },
      { id: "2", description: "Fase 2: Maquetación y CMS\nDesarrollo en Framer con CMS e integraciones.", quantity: 1, price: 15500 },
      { id: "3", description: "Fase 3: Entrega\nQA, capacitación y liberación.", quantity: 1, price: 4000 },
      { id: "4", description: "Soporte post-lanzamiento\n3 meses de acompañamiento.", quantity: 1, price: 2500 },
    ],
  },
  {
    id: "wordpress",
    name: "Opción 4 — WordPress",
    clientName: "Moremil Tornero Barrueta",
    company: "ninchcompany",
    packageName: "Sitio Web Administrable (WordPress)",
    deliveryTime: "5 semanas hábiles",
    showItemPrices: true,
    note: "La cotización no incluye los costos de plugins, templates o algún add-on que tenga costo independiente.",
    scope: [...genericScope],
    notIncluded: [...genericNotIncluded],
    clauses: [...hyperneticsClauses],
    includeQuotePage: true,
    includeScopePage: true,
    includeDetailsPage: true,
    milestones: [
      { title: "Fase 1: Kickoff y Diseño", time: "Semana 1-2", deliverable: "Instalación base, definición visual y prototipo." },
      { title: "Fase 2: Desarrollo y CMS", time: "Semana 3-4", deliverable: "Sitio interactivo completo, CMS y plugins configurados e integración de contenidos." },
      { title: "Fase 3: QA y Liberación", time: "Semana 5", deliverable: "Publicación, capacitación y documentación." },
    ],
    portfolio: [...genericPortfolio],
    paymentConditions: ["50% anticipo.", "30% avance.", "20% cierre de proyecto."],
    platformCost: { name: "WordPress (Licencia base)", cost: "$0.00", period: "Software Libre" },
    addons: [
      { service: "Hosting anual", cost: "$1,800 – $3,500" },
      { service: "Elementor Pro", cost: "$1,200 – $1,800" },
      { service: "ACF Pro", cost: "$900 – $1,500" },
      { service: "WP Forms Pro", cost: "$1,000 – $1,800" },
      { service: "SMTP / correo transaccional", cost: "$500 – $1,500" },
      { service: "Seguridad (Wordfence/otros)", cost: "$0 – $1,500" },
      { service: "Backup premium", cost: "$500 – $1,200" },
    ],
    items: [
      { id: "1", description: "Fase 1: Planeación y Diseño\nSetup de servidor, arquitectura y diseño visual.", quantity: 1, price: 9500 },
      { id: "2", description: "Fase 2: Desarrollo\nDesarrollo base, CMS y configuración de plugins.", quantity: 1, price: 14500 },
      { id: "3", description: "Fase 3: Entrega\nQA, capacitación y publicación.", quantity: 1, price: 3000 },
      { id: "4", description: "Soporte post-lanzamiento\n1 mes de acompañamiento.", quantity: 1, price: 2000 },
    ],
  },
];
