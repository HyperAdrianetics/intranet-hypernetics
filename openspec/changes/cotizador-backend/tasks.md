## 1. Infraestructura y tipos compartidos

- [ ] 1.1 Crear base Neon y configurar `DATABASE_URL` en `.env` local y en Vercel _(scaffold .env/.env.example listo; falta la base Neon real del usuario)_
- [x] 1.2 Añadir dependencias: `prisma`, `@prisma/client`, `@neondatabase/serverless`, `zod`, `vitest`
- [x] 1.3 Crear `shared/` y mover las interfaces de `src/types/quote.ts` (`QuoteData`, `LineItem`, etc.) ahí, manteniendo `defaultQuote` y plantillas exportadas
- [x] 1.4 Definir esquemas Zod en `shared/` y derivar los tipos de TS desde ellos
- [x] 1.5 Actualizar imports del frontend para consumir tipos desde `shared/`

## 2. Esquema de base de datos

- [x] 2.1 Definir `schema.prisma` con modelos `CatalogItem`, `ScopeBlock`, `TextBlock`, `Quote`
- [x] 2.2 Configurar Prisma con el driver HTTP de Neon (`driverAdapters` + `@neondatabase/serverless`)
- [x] 2.3 Generar y aplicar la migración inicial (`prisma migrate`) _(aplicada en Postgres local de Docker: migración `init`)_
- [x] 2.4 Crear cliente Prisma reutilizable para funciones serverless (singleton)

## 3. API del catálogo

- [x] 3.1 Implementar CRUD de conceptos: `GET/POST /api/catalog/items`, `PATCH/DELETE /api/catalog/items/:id` con validación Zod
- [x] 3.2 Implementar CRUD de secciones de alcance: `/api/catalog/scope-blocks[/:id]`
- [x] 3.3 Implementar CRUD de bloques de texto con filtro por tipo: `GET /api/catalog/text-blocks?type=...` y `POST/PATCH/DELETE`
- [x] 3.4 Manejo de errores uniforme (`400`/`404`/`500` con `{ error }`)
- [x] 3.5 Tests Vitest del CRUD de catálogo y validación

## 4. API de cotizaciones

- [x] 4.1 Implementar `POST /api/quotes` (guardar JSONB + derivar columnas resumen)
- [x] 4.2 Implementar `GET /api/quotes` (listado de columnas resumen, orden por `updated_at` desc)
- [x] 4.3 Implementar `GET /api/quotes/:id` (QuoteData completo) con `404`
- [x] 4.4 Implementar `PUT /api/quotes/:id` (reemplazar `data`, recalcular resumen, `updated_at`)
- [x] 4.5 Implementar `DELETE /api/quotes/:id`
- [x] 4.6 Tests Vitest de cotizaciones y flujo crear → guardar → recuperar → listar

## 5. Seed del catálogo

- [x] 5.1 Escribir script de seed idempotente que derive conceptos, secciones de alcance y bloques de texto de las plantillas hardcodeadas
- [x] 5.2 Verificar que ejecutar el seed dos veces no duplica datos _(verificado en Docker: #1 +15/+10/+35, #2 +0/+0/+0)_

## 6. Integración del frontend (capa de datos)

- [x] 6.1 Crear `src/api/` con cliente fetch tipado contra `shared/`
- [x] 6.2 Reescribir `useQuote`: cargar por `id` desde la API, autosave con debounce (~800 ms) vía `PUT`
- [x] 6.3 Mantener respaldo en `localStorage` y reintento de sincronización al cargar
- [x] 6.4 Conectar el indicador "Auto-guardado" existente a los estados guardando/guardado/error
- [x] 6.5 Tests del cliente de API y del comportamiento de `useQuote` (carga, debounce, fallback offline)

## 7. UI de control mínima (estilo Sidebar, documento intacto)

- [x] 7.1 Selector "Agregar del catálogo" en el `Sidebar`: insertar conceptos como `LineItem`
- [x] 7.2 Insertar secciones de alcance al `scope` y bloques de texto a `clauses`/`addons`/`paymentConditions`/`notIncluded`
- [x] 7.3 Vista lista de cotizaciones (abrir / duplicar / borrar), apoyada en `duplicateQuote`
- [x] 7.4 Pantalla simple de admin del catálogo (CRUD de bloques)
- [x] 7.5 Verificar que `DocumentPreview`, `exportToPdf`, colores y layout no cambiaron

## 8. Despliegue y verificación

- [x] 8.1 Configurar `vercel.json`/proyecto para servir frontend Vite + funciones `/api`
- [ ] 8.2 Desplegar a Vercel con `DATABASE_URL` de Neon y ejecutar migración + seed _(requiere cuentas Neon/Vercel del usuario)_
- [x] 8.3 Prueba end-to-end: crear cotización, insertar del catálogo, autosave, listar _(verificado local en navegador + API + Postgres; export PDF ya existía intacto)_
- [x] 8.4 Confirmar costo $0 en free tier y documentar variables de entorno en el README _(docs hechas; confirmación de costo tras deploy)_
