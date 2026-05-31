## Context

El cotizador es una SPA React + TypeScript + Vite. Hoy las plantillas están hardcodeadas en `src/types/quote.ts` (`HYPERNETICS_TEMPLATES`, `genericScope`, `hyperneticsClauses`, etc.) y las cotizaciones se guardan en `localStorage` vía el hook `useQuote`. El documento se renderiza con `DocumentPreview` y se exporta a PDF desde `QuoteEditor` con `html2pdf.js`.

Restricción dura del proyecto: **no se toca el diseño del documento/PDF**. Solo se permite UI de control mínima nueva (selector de catálogo, lista de cotizaciones, admin del catálogo) reusando el estilo del `Sidebar`. Uso interno, sin autenticación por ahora. El detalle de diseño previo está en `docs/superpowers/specs/2026-05-29-cotizador-backend-design.md`.

## Goals / Non-Goals

**Goals:**
- Catálogo reutilizable (conceptos con precio, secciones de alcance, bloques de texto) persistido y editable vía API.
- Persistencia de cotizaciones en backend (historial, abrir/editar/duplicar/borrar desde cualquier equipo).
- Cambio mínimo en el frontend: solo la capa de datos (`useQuote`) y UI de control nueva.
- Costo objetivo $0 en free tier (Vercel + Neon) para uso interno.

**Non-Goals:**
- Autenticación / cuentas de usuario.
- Links públicos de solo lectura para clientes.
- Motor de precios automático o cotización con IA.
- Plantillas completas administrables (más allá del seed inicial).
- Milestones en el catálogo (se editan manualmente).
- Cualquier cambio al documento/PDF, colores, layout, `numberToWords` o `dateUtils`.

## Decisions

**1. Stack serverless: Vercel + Neon (Postgres) + Prisma.**
Funciones serverless en `/api/*` (Node + TS) y frontend Vite en el mismo repo/deploy. Neon es Postgres serverless que escala a cero; se accede con Prisma sobre el driver HTTP `@neondatabase/serverless`, apropiado para serverless (las conexiones TCP tradicionales no se manejan bien con funciones efímeras).
- *Alternativas:* Cloudflare Workers + D1 (más barato pero SQLite y runtime no-Node completo); Supabase (BaaS, proyecto gratis se pausa por inactividad); servidor Node tradicional (más infra que administrar). Se eligió Vercel+Neon por mantener Node+TS y Postgres con costo ~$0.

**2. Cotizaciones como JSONB + columnas resumen.**
`quotes.data` (JSONB) guarda el `QuoteData` íntegro; columnas `folio`, `client_name`, `company`, `package_name`, `date` se desnormalizan para listar/buscar. El frontend ya serializa `QuoteData` como JSON, así que esto minimiza el cambio y es robusto ante ajustes futuros del documento.
- *Alternativa:* normalizar items/scope/etc. en tablas relacionales. Rechazada: mucho mapeo, frágil ante cambios de estructura, y no aporta consultas que necesitemos hoy.

**3. Catálogo en tablas estructuradas.**
`catalog_items`, `scope_blocks` y `text_blocks` (unificada por `type`, con `value` solo para `addon`). A diferencia de las cotizaciones, los bloques se consultan/editan individualmente, así que conviene estructura, no JSONB.

**4. Tipos compartidos derivados de Zod en `shared/`.**
Se mueven las interfaces de `src/types/quote.ts` a `shared/`. Los esquemas Zod son la fuente única: validación de la API y tipos de TS derivan de ellos. Frontend y backend importan de `shared/`.

**5. Integración con frontend solo en la capa de datos.**
`useQuote` deja de usar `localStorage` como primario: carga por `id` desde la API y hace autosave con debounce (~800 ms) vía `PUT`. `localStorage` queda como caché de respaldo offline. Se agrega `src/api/` (cliente fetch tipado) y UI de control en el estilo del `Sidebar`. `DocumentPreview` y `exportToPdf` no cambian.

## Risks / Trade-offs

- **Cold starts de serverless (~1s)** → Irrelevante para uso interno; aceptable.
- **Límites del free tier (Vercel/Neon) o pausa por inactividad** → Bajo tráfico interno; monitorear; la arquitectura permite migrar a Postgres dedicado sin cambiar el código (solo `DATABASE_URL`).
- **Sin auth: cualquiera con la URL accede** → Aceptado por ahora (herramienta interna). Se puede añadir auth después sin rediseñar el modelo de datos.
- **Vercel Hobby es para uso no comercial** → Para uso 100% interno suele estar bien; si crece, mover a plan Pro.
- **Desincronización del respaldo en `localStorage` vs API** → El cliente reintenta sincronizar al cargar; el último `PUT` exitoso es la verdad.

## Migration Plan

1. Crear base Neon y configurar `DATABASE_URL` en Vercel y `.env` local.
2. Definir esquema Prisma, generar migración inicial (`prisma migrate`).
3. Implementar y desplegar las funciones `/api` (catálogo + cotizaciones).
4. Ejecutar el script de **seed** que deriva el catálogo de las plantillas hardcodeadas actuales.
5. Migrar `useQuote` a la API manteniendo el respaldo `localStorage`.
6. Añadir UI de control (selector de catálogo, lista, admin).
- *Rollback:* el frontend conserva el respaldo `localStorage`; si la API falla, el editor sigue operando en modo offline.

## Open Questions

- ¿Se necesita búsqueda/categorías en el listado de cotizaciones desde el día uno, o basta con orden por fecha? (Asumido: orden por fecha; categorías solo en `catalog_items`.)
- ¿El seed debe ser idempotente (re-ejecutable sin duplicar)? (Asumido: sí, idempotente por clave natural.)
