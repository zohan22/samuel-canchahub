## Acceptance Test Plan - Generated 2026-03-28

**QA Engineer:** AI-Generated
**Status:** Draft - Pending PO/Dev Review

---

# Acceptance Test Plan: STORY-CH-6 - Search courts by sport, zone, and price range

**Fecha:** 2026-03-28  
**QA Engineer:** AI-Generated  
**Story Jira Key:** CH-6  
**Epic:** EPIC-CH-5 - Court Discovery & Availability  
**Status:** Draft

---

## Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**

- **Primary:** Diego Rojas (Player) - necesita encontrar cancha en menos de 5 minutos y evitar coordinacion manual por chat.
- **Secondary:** Carla Mendoza (Capitana) - requiere comparar opciones para organizar al equipo con horario y costo predecibles.

**Business Value:**

- **Value Proposition:** discovery rapido y confiable de canchas activas por filtros relevantes.
- **Business Impact:** impacta directamente el KPI de conversion busqueda -> reserva pagada (>=12% dia 90).

**Related User Journey:**

- Journey: Journey 1 - Reserva completa sin friccion.
- Step: Step 2 (filtrado por deporte, zona y horario para mostrar opciones reales).

---

### Technical Context of This Story

**Frontend:**

- Components: search/filter panel, result cards, pagination controls.
- Pages/Routes: discovery/search page (`/courts` or equivalent).
- State Management: estado de filtros + estado de paginacion + estado de loading/error.

**Backend:**

- API Endpoints: `GET /api/courts`.
- Services: validacion de query params, servicio de busqueda combinada.
- Database: `sports_complexes`, `courts` (filtrado activo/publicado) con soporte de paginacion.

**External Services:**

- No aplica para esta story.

**Integration Points:**

- Frontend filter UI <-> `GET /api/courts`.
- Backend `GET /api/courts` <-> PostgreSQL filters/pagination.

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**

- Business logic complexity: Medium - combinacion de filtros + reglas de visibilidad.
- Integration complexity: Medium - UI/API y API/DB con paginacion consistente.
- Data validation complexity: High - parametros invalidos y limites.
- UI complexity: Medium - empty state, validaciones y navegacion de paginas.

**Estimated Test Effort:** Medium
**Rationale:** gran parte del riesgo esta en validacion y consistencia de resultados bajo filtros combinados.

---

### Epic-Level Context (From Feature Test Plan in Jira)

**Critical Risks Already Identified at Epic Level:**

- Riesgo: inconsistencias entre estado real y lo mostrado al usuario.
  - **Relevance to This Story:** si el filtrado devuelve oferta incorrecta, todo el journey se degrada desde el primer paso.
- Riesgo: degradacion de performance en consultas de discovery.
  - **Relevance to This Story:** CH-6 consume directamente `GET /api/courts`, por lo tanto hereda el riesgo de latencia.
- Riesgo: exposicion de recursos no publicables.
  - **Relevance to This Story:** CH-6 debe excluir inactivos/no publicados.

**Integration Points from Epic Analysis:**

- Frontend <-> Backend API: ✅ Yes (core de la story).
- Backend <-> Database: ✅ Yes (filtro + paginacion).
- Backend <-> External Service: ❌ No.

**Critical Questions Already Asked at Epic Level:**

- PO: definicion exacta de `zone` (texto libre vs catalogo vs zona administrativa).
  - **Status:** Pending.
  - **Impact on This Story:** bloquea reglas deterministas de filtro y test data final.
- PO/Dev: ordenamiento por defecto de resultados.
  - **Status:** Pending.
  - **Impact on This Story:** afecta expected results de paginacion/regresion.

**Test Strategy from Epic:**

- Test Levels: Unit, Integration, E2E, API.
- Tools: Playwright, Vitest/Jest, Postman/Newman.
- **How This Story Aligns:** CH-6 requiere cobertura UI+API+Integration; E2E aplica para journey de discovery.

**Summary: How This Story Fits in Epic:**

- **Story Role in Epic:** foundation del discovery; alimenta CH-7 y CH-8.
- **Inherited Risks:** performance, visibilidad de canchas, ambiguedad de zona.
- **Unique Considerations:** consistencia de combinaciones de filtros y contrato de paginacion.

---

## Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** Definicion de `zone` no especificada.

- **Location in Story:** Scope + AC Scenario 1.
- **Question for PO/Dev:** `zone` usa taxonomia cerrada o texto libre normalizado?
- **Impact on Testing:** no se puede fijar expected matching exacto de resultados.
- **Suggested Clarification:** publicar catalogo permitido + normalizacion (case/acentos/sinonimos).

**Ambiguity 2:** ordenamiento por defecto no definido.

- **Location in Story:** Pagination behavior.
- **Question for PO/Dev:** cual es el sort default cuando no se envia parametro de orden?
- **Impact on Testing:** asserts de pagina 1/pagina 2 pueden ser inestables.
- **Suggested Clarification:** especificar criterio estable (ej. `price ASC, id ASC`).

---

### Missing Information / Gaps

**Gap 1:** codigos de error estandar para validaciones.

- **Type:** Acceptance Criteria / API Contract usage detail.
- **Why It's Critical:** necesitamos validar respuesta negativa determinista.
- **Suggested Addition:** definir `code` esperado por tipo de error (`INVALID_RANGE`, `INVALID_DATE`, etc.).
- **Impact if Not Added:** validaciones subjetivas en QA y menor automatizacion confiable.

**Gap 2:** ejemplos de `date` invalidas y limites.

- **Type:** Business Rule.
- **Why It's Critical:** boundary tests de fecha dependen de reglas de dominio.
- **Suggested Addition:** agregar ejemplos concretos y timezone de referencia.
- **Impact if Not Added:** huecos en cobertura de bordes.

---

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** query params vacios mezclados con parametros validos.

- **Scenario:** `sport=futbol-7&zone=&priceMin=80&priceMax=120`.
- **Expected Behavior:** rechazar con 400 o ignorar explicitamente vacio segun regla acordada.
- **Criticality:** High
- **Action Required:** Ask PO/Dev + add to refined AC.

**Edge Case 2:** paginacion fuera de rango total.

- **Scenario:** `page` mayor al total de paginas disponibles.
- **Expected Behavior:** `200` con `items=[]` y metadata consistente.
- **Criticality:** Medium
- **Action Required:** Add to test cases.

**Edge Case 3:** decimal prices con precision alta.

- **Scenario:** `priceMin=99.999` y `priceMax=100.001`.
- **Expected Behavior:** validacion/normalizacion consistente con tipo de precio almacenado.
- **Criticality:** Medium
- **Action Required:** Ask Dev + test case.

---

### Testability Validation

**Is this story testeable as written?** ⚠️ Partially

**Testability Issues:**

- [x] Acceptance criteria are vague on normalization/sort behavior.
- [x] Expected negative results are not specific enough.
- [x] Missing boundary specifics for date/price precision.

**Recommendations to Improve Testability:**

- Definir normalizacion de `zone`.
- Definir sort default estable.
- Definir error codes y examples por validacion.

---

## Paso 3: Refined Acceptance Criteria

### Scenario 1: Combined filters return matching active courts

**Type:** Positive  
**Priority:** Critical

- **Given:**
  - Player autenticado en pagina de busqueda.
  - Existen canchas activas/publicadas para `sport=futbol-7` y `zone=centro`.
- **When:**
  - Ejecuta `GET /api/courts?sport=futbol-7&zone=centro&priceMin=80&priceMax=140&date=2026-04-02&page=1&pageSize=12`.
- **Then:**
  - API responde `200 OK` con `success=true`.
  - Todos los items cumplen filtros enviados.
  - `pagination.page=1`, `pagination.pageSize=12`, `pagination.total>=0`.

### Scenario 2: Invalid price range is rejected

**Type:** Negative  
**Priority:** High

- **Given:** Player autenticado en pagina de busqueda.
- **When:** ejecuta `GET /api/courts?priceMin=200&priceMax=100`.
- **Then:**
  - API responde `400 Bad Request`.
  - `success=false` con error de validacion.
  - No existe mutacion de datos.

### Scenario 3: Empty result set keeps contract shape

**Type:** Boundary  
**Priority:** High

- **Given:** filtros validos sin coincidencias.
- **When:** ejecuta busqueda con esos filtros.
- **Then:**
  - API responde `200 OK`.
  - `data.items=[]` y `pagination.total=0`.
  - UI muestra mensaje claro de no resultados.

### Scenario 4: Malformed query values are rejected

**Type:** Edge Case  
**Priority:** High  
**Source:** Identified during critical analysis

- **Given:** request con `page=0` o `pageSize=51` o `date=2026-99-99`.
- **When:** llama `GET /api/courts`.
- **Then:** `400` con detalle de campo invalido.

### Scenario 5: Pagination beyond total pages

**Type:** Edge Case  
**Priority:** Medium  
**Source:** Identified during critical analysis

- **Given:** consulta valida con `page` fuera del rango de resultados.
- **When:** llama `GET /api/courts`.
- **Then:** `200` con `items=[]` y metadata consistente.

---

## Paso 4: Test Design

### Test Coverage Analysis

**Total Test Cases Needed:** 20

**Breakdown:**

- Positive: 6
- Negative: 6
- Boundary: 4
- Integration: 2
- API: 2

**Rationale for This Number:** combinatoria de filtros + validaciones + paginacion cubre los riesgos principales sin sobre-diseno.

---

### Parametrization Opportunities

**Parametrized Tests Recommended:** Yes

**Parametrized Test Group 1:** combinaciones validas de filtros

- **Base Scenario:** busqueda valida de canchas activas.
- **Parameters to Vary:** sport, zone, priceMin, priceMax.

| sport    | zone   | priceMin | priceMax | Expected Result |
| -------- | ------ | -------- | -------- | --------------- |
| futbol-7 | centro | 80       | 140      | 200 + items >=1 |
| padel    | norte  | 60       | 120      | 200 + items >=0 |
| tenis    | sur    | 100      | 200      | 200 + items >=0 |

**Total Tests from Parametrization:** 3  
**Benefit:** reduce duplicacion y mejora cobertura combinatoria.

**Parametrized Test Group 2:** validaciones de query invalida

- **Base Scenario:** rechazo de request invalida.
- **Parameters to Vary:** invalid field + value.

| invalidField | value      | Expected Result |
| ------------ | ---------- | --------------- |
| priceMin     | -1         | 400 validation  |
| page         | 0          | 400 validation  |
| pageSize     | 51         | 400 validation  |
| date         | 2026-99-99 | 400 validation  |

**Total Tests from Parametrization:** 4

---

### Test Outlines

#### Validar filtrado combinado con canchas activas publicadas

**Related Scenario:** Scenario 1  
**Type:** Positive  
**Priority:** Critical  
**Test Level:** API/Integration  
**Parametrized:** Yes (Group 1)

**Preconditions:**

- Dataset staging con canchas activas en multiples zonas/deportes.
- Player autenticado.

**Test Steps:**

1. Ejecutar request con filtros validos.
2. Verificar status y body.
3. Verificar que ningun item incumple filtros.

**Expected Result:**

- Status `200`.
- Contrato de respuesta valido (`success`, `data.items`, `data.pagination`).
- Sin canchas inactivas/no publicadas.

#### Validar rechazo de rango de precios invertido

**Related Scenario:** Scenario 2  
**Type:** Negative  
**Priority:** High  
**Test Level:** API  
**Parametrized:** No

**Expected Result:**

- Status `400`.
- Error de validacion.
- Sin cambios en DB.

#### Validar estado sin resultados con contrato consistente

**Related Scenario:** Scenario 3  
**Type:** Boundary  
**Priority:** High  
**Test Level:** UI/API  
**Parametrized:** Yes

**Expected Result:**

- Status `200`.
- `items=[]`, `total=0`.
- UI muestra no-results guidance.

#### Validar error de validacion para query malformada

**Related Scenario:** Scenario 4  
**Type:** Negative  
**Priority:** High  
**Test Level:** API  
**Parametrized:** Yes (Group 2)

#### Validar paginacion fuera de rango sin falla

**Related Scenario:** Scenario 5  
**Type:** Boundary  
**Priority:** Medium  
**Test Level:** API/Integration  
**Parametrized:** No

---

## Integration Test Cases

### Integration Test 1: Frontend filtros <-> Backend `GET /api/courts`

**Integration Point:** Frontend -> Backend API  
**Type:** Integration  
**Priority:** High

**Contract Validation:**

- Request y response siguen `api-contracts.yaml`: Yes.
- Status codes alineados: Yes.

**Expected Result:** UI renderiza resultados correctos y paginacion consistente.

### Integration Test 2: Backend filtros <-> Database

**Integration Point:** Backend -> PostgreSQL  
**Type:** Integration  
**Priority:** High

**Expected Result:** query aplica filtros completos y excluye canchas inactivas/no publicadas.

---

## Edge Cases Summary

| Edge Case | Covered in Original Story? | Added to Refined AC? | Test Case | Priority |
| --------- | -------------------------- | -------------------- | --------- | -------- |
| `page=0` / `pageSize>50` | No | Yes (Scenario 4) | Validar error de validacion para query malformada | High |
| `page` fuera de rango | No | Yes (Scenario 5) | Validar paginacion fuera de rango sin falla | Medium |
| `zone` normalizacion | No | Needs PO confirmation | TBD | High |

---

## Test Data Summary

### Data Categories

| Data Type | Count | Purpose | Examples |
| --------- | ----- | ------- | -------- |
| Valid data | 8 | Positive tests | sport/zone/price validos |
| Invalid data | 7 | Negative tests | `priceMin=-1`, `date=2026-99-99` |
| Boundary values | 5 | Boundary tests | `page=1`, `pageSize=50`, `priceMin=0` |
| Edge case data | 4 | Edge tests | `page=999`, zone con acentos |

### Data Generation Strategy

**Static Test Data:**

- Zona base: `centro`, `norte`, `sur`.
- Sports base: `futbol-7`, `padel`, `tenis`.

**Dynamic Test Data (Faker.js):**

- Courts y metadata no critica.
- Rangos de precio y fechas validas para combinaciones.

**Test Data Cleanup:**

- All created test data must be removed post execution.
- Tests should be idempotent and order-independent.

---

## Action Required

**@ProductOwner:**

- [ ] Confirmar definicion oficial de `zone`.
- [ ] Validar comportamiento esperado de no-results y guidance.
- [ ] Confirmar criterio de ordenamiento por defecto.

**@DevLead:**

- [ ] Confirmar estrategia de validacion de query params y error codes.
- [ ] Validar comportamiento de paginacion fuera de rango.
- [ ] Validar precision esperada para filtros de precio decimal.

**@QATeam:**

- [ ] Revisar cobertura y parametrizacion.
- [ ] Preparar dataset de discovery en staging.
- [ ] Alinear asserts de contrato OpenAPI para `GET /api/courts`.

---

**Next Steps:**

1. PO/Dev responden preguntas criticas.
2. QA ajusta casos con respuestas finales.
3. Dev implementa con AC refinados y reglas cerradas.
4. QA ejecuta ATP completo en staging.

---

## Definition of Done (QA Perspective)

- [ ] Ambiguedades resueltas por PO/Dev
- [ ] Story actualizada con mejoras aprobadas
- [ ] Casos criticos/high 100% pass
- [ ] API contract `GET /api/courts` validado
- [ ] Sin bugs critical/high abiertos
- [ ] Reporte de ejecucion publicado

---

## Related Documentation

- Story: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-6-search-courts-filters/story.md`
- Epic: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/epic.md`
- Feature Test Plan: Jira epic CH-5 comment "Feature Test Plan - Generated 2026-03-28"
- SRS: `.context/SRS/functional-specs.md` (FR-004)
- API Contracts: `.context/SRS/api-contracts.yaml`

---

## Test Execution Tracking

**Test Execution Date:** TBD  
**Environment:** Staging  
**Executed By:** TBD

**Results:**

- Total Tests: 20
- Passed: TBD
- Failed: TBD
- Blocked: TBD

**Bugs Found:**

- TBD

**Sign-off:** TBD
