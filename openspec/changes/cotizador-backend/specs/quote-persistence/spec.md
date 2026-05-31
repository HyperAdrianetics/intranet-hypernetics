## ADDED Requirements

### Requirement: Crear y almacenar cotizaciones

El sistema SHALL persistir cada cotización como el objeto `QuoteData` completo (JSONB) más columnas resumen (`folio`, `client_name`, `company`, `package_name`, `date`) para listado y búsqueda.

#### Scenario: Crear una cotización

- **WHEN** un usuario envía `POST /api/quotes` con un `QuoteData` válido
- **THEN** el sistema persiste el documento, llena las columnas resumen a partir del `data`, asigna un `id` (uuid) y responde `201` con el recurso creado

#### Scenario: QuoteData inválido

- **WHEN** un usuario envía un cuerpo que no cumple el esquema de `QuoteData`
- **THEN** el sistema responde `400` con un mensaje de validación y no persiste nada

### Requirement: Listar cotizaciones

El sistema SHALL exponer un listado de cotizaciones con solo las columnas resumen, sin el documento completo.

#### Scenario: Listar cotizaciones existentes

- **WHEN** un usuario solicita `GET /api/quotes`
- **THEN** el sistema devuelve la lista con `id`, `folio`, `client_name`, `company`, `package_name`, `date` y fechas de creación/actualización, ordenada por fecha de actualización descendente

### Requirement: Recuperar una cotización completa

El sistema SHALL devolver el `QuoteData` completo de una cotización por su `id`.

#### Scenario: Recuperar por id

- **WHEN** un usuario solicita `GET /api/quotes/:id` de una cotización existente
- **THEN** el sistema devuelve el `QuoteData` completo almacenado en `data`

#### Scenario: Cotización inexistente

- **WHEN** un usuario solicita un `id` que no existe
- **THEN** el sistema responde `404` con cuerpo `{ "error": "..." }`

### Requirement: Actualizar una cotización (autosave)

El sistema SHALL permitir actualizar una cotización completa vía `PUT /api/quotes/:id`, re-derivando las columnas resumen, para soportar el autosave del editor.

#### Scenario: Guardar cambios

- **WHEN** el editor envía `PUT /api/quotes/:id` con el `QuoteData` actualizado
- **THEN** el sistema reemplaza el `data`, recalcula las columnas resumen y actualiza `updated_at`

#### Scenario: Autosave con debounce

- **WHEN** el usuario edita campos de la cotización en el editor
- **THEN** el frontend envía el guardado a la API con debounce (~800 ms) en lugar de en cada pulsación

### Requirement: Borrar una cotización

El sistema SHALL permitir borrar una cotización por su `id`.

#### Scenario: Borrar existente

- **WHEN** un usuario envía `DELETE /api/quotes/:id` existente
- **THEN** el sistema elimina la cotización y responde `204`

### Requirement: Respaldo offline en el cliente

El frontend SHALL mantener un respaldo en `localStorage` de la cotización en edición, de modo que un fallo de red en el autosave no pierda el trabajo del usuario.

#### Scenario: Fallo de red durante autosave

- **WHEN** el autosave a la API falla por error de red
- **THEN** el frontend conserva el estado en `localStorage` y muestra un estado de error en el indicador de guardado existente, sin perder los cambios

#### Scenario: Recuperación tras recargar

- **WHEN** el usuario recarga el editor con cambios no sincronizados en `localStorage`
- **THEN** el frontend restaura esos cambios y reintenta sincronizarlos con la API
