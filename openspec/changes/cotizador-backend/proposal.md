## Why

El cotizador es hoy una SPA sin backend: las plantillas están hardcodeadas en `src/types/quote.ts` y las cotizaciones viven solo en `localStorage` del navegador. Eso impide reutilizar bloques entre cotizaciones, compartir el historial entre equipos o cotizar cualquier producto de forma rápida. Necesitamos un backend que provea un catálogo reutilizable y persista las cotizaciones.

## What Changes

- Se agrega un **backend serverless** (Node + TypeScript) desplegado en Vercel, con base de datos **Neon (Postgres serverless)** vía Prisma.
- Se introduce un **catálogo reutilizable** de bloques: conceptos/servicios con precio, secciones de alcance, y cláusulas / add-ons / condiciones de pago / "no incluye".
- Las **cotizaciones se persisten en el backend** (JSONB + columnas resumen): historial, abrir/editar/duplicar/borrar desde cualquier equipo.
- Se exponen **endpoints REST** bajo `/api` para CRUD de catálogo y de cotizaciones, con validación Zod.
- Los **tipos** de `src/types/quote.ts` se mueven a `shared/` como fuente única para frontend y backend.
- **BREAKING (interno):** el hook `useQuote` deja de persistir en `localStorage` como fuente primaria; pasa a cargar/guardar contra la API con autosave por debounce y `localStorage` solo como caché de respaldo.
- Se añade **UI de control mínima** (estilo del `Sidebar` actual): selector "Agregar del catálogo", lista de cotizaciones y admin del catálogo. El documento/PDF (`DocumentPreview`, `exportToPdf`, colores, layout) **no se toca**.
- Las plantillas hardcodeadas actuales se migran como **seed inicial** del catálogo.

## Capabilities

### New Capabilities
- `quote-catalog`: Catálogo de bloques reutilizables (conceptos con precio, secciones de alcance, bloques de texto: cláusulas/add-ons/condiciones/"no incluye"), su CRUD vía API y su inserción en la cotización en curso.
- `quote-persistence`: Persistencia de cotizaciones en el backend — crear, listar (resumen), recuperar, actualizar (autosave) y borrar, con respaldo offline en el cliente.

### Modified Capabilities
<!-- No hay specs previos en openspec/specs/; no cambian requisitos de capacidades existentes. -->

## Impact

- **Nuevo:** `api/` (funciones serverless), `prisma/` (esquema, migraciones, seed), `shared/` (tipos + esquemas Zod), `src/api/` (cliente fetch tipado), nuevos componentes de UI de control.
- **Modificado:** `src/hooks/useQuote.ts` (capa de datos), `src/types/quote.ts` (se mueve a `shared/`), `src/components/Sidebar.tsx` (controles de catálogo/lista).
- **Sin cambios:** `src/components/DocumentPreview.tsx`, `exportToPdf` en `QuoteEditor.tsx`, `numberToWords`, `dateUtils`, estilos del documento.
- **Dependencias nuevas:** Prisma, `@neondatabase/serverless`, Zod, Vitest. **Infra:** proyecto Vercel + base Neon, variable `DATABASE_URL`.
