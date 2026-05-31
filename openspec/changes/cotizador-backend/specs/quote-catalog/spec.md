## ADDED Requirements

### Requirement: Catálogo de conceptos con precio

El sistema SHALL almacenar conceptos/servicios reutilizables, cada uno con una descripción, un precio y una categoría opcional, y exponer operaciones CRUD sobre ellos vía la API.

#### Scenario: Crear un concepto

- **WHEN** un usuario envía `POST /api/catalog/items` con `description` y `price` válidos
- **THEN** el sistema persiste el concepto, le asigna un `id` y lo devuelve con código `201`

#### Scenario: Listar conceptos

- **WHEN** un usuario solicita `GET /api/catalog/items`
- **THEN** el sistema devuelve todos los conceptos del catálogo con sus `id`, `description`, `price` y `category`

#### Scenario: Editar un concepto

- **WHEN** un usuario envía `PATCH /api/catalog/items/:id` con campos válidos
- **THEN** el sistema actualiza solo los campos provistos y devuelve el concepto actualizado

#### Scenario: Borrar un concepto

- **WHEN** un usuario envía `DELETE /api/catalog/items/:id` de un concepto existente
- **THEN** el sistema elimina el concepto y responde `204`

#### Scenario: Concepto inexistente

- **WHEN** un usuario solicita editar o borrar un `id` que no existe
- **THEN** el sistema responde `404` con cuerpo `{ "error": "..." }`

#### Scenario: Entrada inválida

- **WHEN** un usuario envía un concepto sin `description` o con `price` no numérico
- **THEN** el sistema rechaza la petición con `400` y un mensaje de validación

### Requirement: Catálogo de secciones de alcance

El sistema SHALL almacenar secciones de alcance reutilizables, cada una con un `title` y una lista de `items` de texto, y exponer operaciones CRUD vía la API.

#### Scenario: Crear una sección de alcance

- **WHEN** un usuario envía `POST /api/catalog/scope-blocks` con `title` y `items` (lista de strings)
- **THEN** el sistema persiste la sección con su `id` y la devuelve con código `201`

#### Scenario: Listar secciones de alcance

- **WHEN** un usuario solicita `GET /api/catalog/scope-blocks`
- **THEN** el sistema devuelve todas las secciones con su `title` e `items`

#### Scenario: Editar o borrar una sección

- **WHEN** un usuario envía `PATCH` o `DELETE` a `/api/catalog/scope-blocks/:id` existente
- **THEN** el sistema actualiza o elimina la sección y responde con el recurso actualizado o `204`

### Requirement: Catálogo de bloques de texto tipados

El sistema SHALL almacenar bloques de texto reutilizables clasificados por tipo (`clause`, `addon`, `payment_condition`, `not_included`), donde solo los `addon` llevan un `value` (costo), y SHALL permitir filtrarlos por tipo.

#### Scenario: Crear un bloque de texto

- **WHEN** un usuario envía `POST /api/catalog/text-blocks` con un `type` válido y `label`
- **THEN** el sistema persiste el bloque con su `id` y lo devuelve con código `201`

#### Scenario: Filtrar por tipo

- **WHEN** un usuario solicita `GET /api/catalog/text-blocks?type=clause`
- **THEN** el sistema devuelve únicamente los bloques cuyo `type` es `clause`

#### Scenario: Add-on con costo

- **WHEN** un usuario crea un bloque con `type=addon`, `label` (servicio) y `value` (costo)
- **THEN** el sistema persiste y devuelve ambos campos

#### Scenario: Tipo inválido

- **WHEN** un usuario envía un bloque con un `type` fuera del conjunto permitido
- **THEN** el sistema responde `400` con un mensaje de validación

### Requirement: Inserción de bloques del catálogo en la cotización

El sistema SHALL permitir, desde la UI de control, seleccionar bloques del catálogo (conceptos, secciones de alcance o bloques de texto) e insertarlos en la cotización en curso sin alterar el diseño del documento.

#### Scenario: Insertar un concepto en la cotización

- **WHEN** un usuario abre "Agregar del catálogo", selecciona un concepto y confirma
- **THEN** el concepto se agrega como un `LineItem` de la cotización actual con su descripción y precio

#### Scenario: Insertar una sección de alcance

- **WHEN** un usuario selecciona una sección de alcance del catálogo
- **THEN** la sección se agrega al `scope` de la cotización con su `title` e `items`

#### Scenario: Insertar cláusulas o condiciones

- **WHEN** un usuario selecciona bloques de texto del catálogo según su tipo
- **THEN** se agregan al arreglo correspondiente de la cotización (`clauses`, `addons`, `paymentConditions` o `notIncluded`)

### Requirement: Seed inicial del catálogo

El sistema SHALL poder poblar el catálogo con las plantillas y bloques actualmente hardcodeados, mediante un script de seed ejecutable.

#### Scenario: Ejecutar el seed en una base vacía

- **WHEN** se ejecuta el script de seed sobre una base sin datos de catálogo
- **THEN** el catálogo queda poblado con los conceptos, secciones de alcance y bloques de texto derivados de las plantillas actuales
