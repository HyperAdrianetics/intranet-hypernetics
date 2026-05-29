# Diseño: Backend para el Cotizador de Hypernetics

**Fecha:** 2026-05-29
**Estado:** Aprobado (pendiente revisión final del spec)

## Contexto

El cotizador es hoy una SPA React + TypeScript + Vite, sin backend. Toda la
información vive en el navegador: las plantillas están hardcodeadas en
`src/types/quote.ts` (`HYPERNETICS_TEMPLATES`, `genericScope`,
`hyperneticsClauses`, etc.) y las cotizaciones se guardan en `localStorage` a
través del hook `useQuote`. El documento se renderiza con `DocumentPreview` y se
exporta a PDF con `html2pdf.js` desde `QuoteEditor`.

## Objetivo

Permitir cotizar cualquier producto/servicio de forma rápida y sencilla,
mediante un **catálogo reutilizable** de bloques, persistido en un backend junto
con las cotizaciones generadas.

## Decisiones de producto (acordadas)

- **Eje central:** catálogo reutilizable de bloques para armar cotizaciones sin
  teclear todo cada vez.
- **El backend guarda:** catálogo + cotizaciones (historial, ver/editar desde
  cualquier equipo).
- **Usuarios:** uso interno, **sin login** por ahora.
- **Stack:** Node + TypeScript (serverless).
- **Despliegue:** **Vercel + Neon** (Postgres serverless). Costo objetivo $0 en
  free tier para uso interno.
- **Bloques del catálogo:** conceptos/servicios con precio, secciones de
  alcance, y cláusulas / add-ons / condiciones de pago / "no incluye".
  Los milestones se siguen editando manualmente (no van al catálogo).

## Restricción dura

**No se toca el diseño del documento/PDF.** Permanecen intactos:
`DocumentPreview`, el export a PDF (`exportToPdf`), colores, layout carta,
`numberToWords`, `dateUtils`. Se autoriza **UI de control mínima** nueva
(selector de catálogo, lista de cotizaciones, admin de catálogo) reusando el
estilo del `Sidebar` actual.

## Arquitectura general

Monorepo desplegado en Vercel:

```
Repo
├── src/            ← Frontend Vite/React actual (diseño intacto)
├── api/            ← Funciones serverless Node+TS (nuevo)
│   ├── catalog/    ← CRUD del catálogo
│   └── quotes/     ← CRUD de cotizaciones
├── shared/         ← Tipos compartidos (QuoteData, LineItem…) — fuente única
└── prisma/         ← Esquema + cliente Prisma (Neon Postgres)
```

- **Frontend:** Vite/React se queda igual y se despliega en Vercel.
- **Backend:** funciones serverless en `/api/*`, Node + TypeScript.
- **DB:** Neon (Postgres serverless, escala a cero) vía **Prisma con el driver
  HTTP de Neon** (`@neondatabase/serverless`), apropiado para serverless.
- **Tipos compartidos:** se mueven las interfaces de `src/types/quote.ts` a
  `shared/` para que frontend y API usen exactamente los mismos tipos. Los
  esquemas **Zod** viven aquí y derivan los tipos (validación y tipos en un solo
  lugar).

## Modelo de datos

El catálogo se guarda en tablas estructuradas (para listar/buscar/editar bloques
individuales). Las cotizaciones se guardan como **JSONB** del objeto
`QuoteData` + columnas indexadas para listar/buscar — esto minimiza el cambio en
el frontend (que ya serializa `QuoteData` como JSON) y es robusto ante futuros
ajustes a la estructura de la cotización.

```
catalog_items        (conceptos/servicios con precio)
├─ id, category?, description, price, created_at, updated_at

scope_blocks         (secciones de alcance reutilizables)
├─ id, title, items (jsonb: string[]), created_at, updated_at

text_blocks          (cláusulas, add-ons, condiciones de pago, "no incluye")
├─ id, type ('clause' | 'addon' | 'payment_condition' | 'not_included')
├─ label (texto; para addon = nombre del servicio)
├─ value? (solo addon: el costo, ej. "$1,000 – $2,000/año")
├─ created_at, updated_at

quotes               (cotizaciones generadas)
├─ id                (uuid)
├─ folio, client_name, company, package_name, date  ← columnas resumen
├─ data (jsonb)      ← el QuoteData completo (items, scope, colores, etc.)
├─ created_at, updated_at
```

Notas:
- `text_blocks` unifica los 4 tipos de texto reutilizable en una tabla con campo
  `type` (en vez de 4 tablas casi idénticas). `value` solo se usa para add-ons.
- Las columnas resumen de `quotes` son una copia desnormalizada solo para la
  lista; se llenan a partir del `data` al guardar.
- Las plantillas hardcodeadas actuales se migran como **seed inicial** del
  catálogo, para arrancar con datos reales.

## API REST

Funciones serverless bajo `/api`. JSON, sin auth por ahora.

Catálogo:
```
GET    /api/catalog/items                 lista conceptos
POST   /api/catalog/items                 crea
PATCH  /api/catalog/items/:id             edita
DELETE /api/catalog/items/:id             borra

GET/POST/PATCH/DELETE  /api/catalog/scope-blocks[/:id]
GET    /api/catalog/text-blocks?type=clause   filtra por tipo
POST/PATCH/DELETE      /api/catalog/text-blocks[/:id]
```

Cotizaciones:
```
GET    /api/quotes            lista (columnas resumen: folio, cliente, fecha…)
POST   /api/quotes            crea (recibe QuoteData → guarda jsonb + columnas)
GET    /api/quotes/:id        trae el QuoteData completo
PUT    /api/quotes/:id        actualiza (autosave)
DELETE /api/quotes/:id        borra
```

## Integración con el frontend (cambio mínimo)

Solo se reescribe la **capa de datos**; el diseño y los componentes del
documento no se tocan.

1. **`useQuote` deja de usar `localStorage`** y pasa a:
   - Cargar una cotización por `id` desde `GET /api/quotes/:id` (o arrancar con
     `defaultQuote` para una nueva).
   - **Autosave con debounce** (~800 ms) vía `PUT /api/quotes/:id`, reemplazando
     el `useEffect` que hoy escribe a localStorage. Se reutiliza el indicador
     "Auto-guardado" existente.
   - Mantener un respaldo en `localStorage` como caché offline (fallback ante
     fallos de red, sin perder trabajo).
2. **Cliente de API** nuevo en `src/api/` (funciones `fetch` tipadas con los
   tipos de `shared/`).
3. **UI de control mínima** (estilo del `Sidebar`):
   - Botón "Agregar del catálogo" → modal/panel para insertar conceptos, bloques
     de alcance o cláusulas/add-ons en la cotización actual.
   - Vista lista de cotizaciones (abrir / duplicar / borrar), apoyada en el
     `duplicateQuote` existente.
   - Pantalla simple de admin de catálogo (CRUD de bloques).

No cambia: `DocumentPreview`, `exportToPdf`, colores, layout carta,
`numberToWords`, `dateUtils`.

## Manejo de errores

- API responde con códigos HTTP claros (`400` validación, `404` no encontrado,
  `500` interno) y cuerpo `{ error: "..." }`.
- Validación de entrada con **Zod** en cada endpoint.
- Frontend: si falla el autosave, se conserva el respaldo en `localStorage` y se
  muestra estado de error en el indicador existente.

## Testing

- Tests de la lógica de API (handlers) con Vitest: CRUD de catálogo y
  cotizaciones, validación Zod, serialización del JSONB.
- Test de integración del flujo "crear → guardar → recuperar → listar".
- Frontend: test del cliente de API y del nuevo comportamiento de `useQuote`
  (carga, autosave con debounce, fallback offline).

## Despliegue

- Vercel: frontend Vite + funciones `/api` en un solo deploy desde el mismo repo.
- Neon: una base Postgres serverless; `DATABASE_URL` como variable de entorno en
  Vercel.
- Migraciones con `prisma migrate`; script de **seed** que carga el catálogo
  inicial desde las plantillas actuales.
- Costo objetivo: $0 en free tier para uso interno.

## Fuera de alcance (por ahora)

- Autenticación / cuentas de usuario.
- Links públicos de solo lectura para clientes.
- Motor de precios automático / cotización con IA.
- Plantillas completas administrables (más allá del seed inicial).
- Milestones en el catálogo (se editan manualmente).
