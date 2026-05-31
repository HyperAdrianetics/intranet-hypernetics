# Cotizador Hypernetics

Generador de cotizaciones de Hypernetics: editor en vivo + vista previa tamaño
carta + exportación a PDF, con un **catálogo reutilizable** y persistencia de
cotizaciones en backend.

- **Frontend:** React 19 + TypeScript + Vite + Tailwind.
- **Backend:** funciones serverless (`/api`) en Node + TypeScript.
- **DB:** Neon (Postgres serverless) vía Prisma 7 con el adaptador `@prisma/adapter-neon`.
- **Tipos compartidos:** `shared/` (esquemas Zod como fuente única).

## Estructura

```
src/        Frontend (componentes del documento intactos: DocumentPreview, export PDF)
src/api/    Cliente fetch tipado + debounce + respaldo offline
api/        Funciones serverless (catálogo + cotizaciones); api/_lib = lógica no-ruteada
shared/     Tipos + esquemas Zod + plantillas reutilizables
prisma/     schema.prisma + seed.ts
generated/  Cliente Prisma generado (ignorado en git)
tests/      Vitest (servicios+repos, cliente, hook useQuote)
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Cadena de conexión de Neon (Postgres). Local en `.env`; en Vercel en *Project Settings → Environment Variables*. |

Copia `.env.example` a `.env` y coloca tu cadena de Neon.

## Desarrollo

```bash
pnpm install                 # genera el cliente Prisma (postinstall)
pnpm db:migrate              # aplica migraciones a la base (requiere DATABASE_URL)
pnpm db:seed                 # carga el catálogo inicial desde las plantillas
pnpm dev                     # frontend Vite
# Para probar las funciones /api en local: `vercel dev`
```

## Pruebas

```bash
pnpm test                    # Vitest (sin DB; usa repositorios en memoria)
```

## Despliegue (Vercel + Neon, costo objetivo $0)

1. Crear base en [Neon](https://neon.tech) y copiar la connection string.
2. En Vercel: importar el repo, definir `DATABASE_URL` en Environment Variables.
3. Build command: `pnpm build` (corre `prisma generate && tsc -b && vite build`).
4. Tras el primer deploy, aplicar migración y seed contra la base:
   ```bash
   pnpm db:deploy && pnpm db:seed
   ```

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET/POST | `/api/catalog/items` | Conceptos con precio |
| PATCH/DELETE | `/api/catalog/items/:id` | Editar / borrar concepto |
| GET/POST | `/api/catalog/scope-blocks` | Secciones de alcance |
| PATCH/DELETE | `/api/catalog/scope-blocks/:id` | Editar / borrar alcance |
| GET/POST | `/api/catalog/text-blocks` | Cláusulas / add-ons / condiciones / no-incluye (`?type=`) |
| PATCH/DELETE | `/api/catalog/text-blocks/:id` | Editar / borrar texto |
| GET/POST | `/api/quotes` | Listar / crear cotizaciones |
| GET/PUT/DELETE | `/api/quotes/:id` | Recuperar / actualizar (autosave) / borrar |
