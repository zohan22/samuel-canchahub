# Acceptance Test Plan: STORY-CH-7 - View Availability Slots

**Fecha:** 2026-03-28  
**QA Engineer:** AI-Generated  
**Story Jira Key:** CH-7  
**Epic:** EPIC-CH-5 - Court Discovery & Availability  
**Status:** Draft

---

## Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**

- **Primary:** Diego Rojas (Player) - necesita verificar horarios reales en minutos para evitar coordinacion por chat y cancelaciones.
- **Secondary:** Carla Mendoza (Capitana) - requiere confirmar disponibilidad antes de comunicar horarios a 10-14 personas.

**Business Value:**

- **Value Proposition:** disponibilidad confiable por fecha/hora para tomar decision rapida de reserva.
- **Business Impact:** impacta directamente la conversion busqueda -> reserva pagada (meta >= 12% dia 90) y la confianza en datos en tiempo real.

**Related User Journey:**

- Journey: Journey 1 - Reserva completa sin friccion.
- Step: Paso 3 de discovery/seleccion de horario antes de crear reserva.

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**

- Components: slot-grid con leyenda de estados y selector de fecha.
- Pages/Routes: flujo de discovery/detalle de cancha (consumo de disponibilidad por fecha).
- State Management: estado de fecha seleccionada + payload de slots en cliente.

**Backend:**

- API Endpoints: `GET /api/courts/{courtId}/availability`.
- Services: validacion de court/date y composicion de slots a partir de disponibilidad + reservas.
- Database: `courts`, `court_availability`, `bookings`.

**External Services:**

- No aplica para esta story (sin integracion externa fuera de DB).

**Integration Points:**

- Frontend slot-grid <-> endpoint de disponibilidad.
- API availability <-> joins/calc con `court_availability` + `bookings`.

---

### Story Complexity Analysis

**Overall Complexity:** High

**Complexity Factors:**

- Business logic complexity: High - calculo correcto de estados `available`, `held`, `booked` segun datos vivos.
- Integration complexity: Medium/High - dependencias UI/API/DB en tiempo de consulta.
- Data validation complexity: Medium - validacion de `courtId`, `date`, ventana configurable.
- UI complexity: Medium - representacion clara de matriz de slots y errores.

**Estimated Test Effort:** High  
**Rationale:** alto riesgo de inconsistencias funcionales y de confianza del usuario, con impacto directo en conversion.

---

### Epic-Level Context (From Feature Test Plan in Jira)

**Critical Risks Already Identified at Epic Level:**

- Risk 1: inconsistencia entre estado real de reservas y slots mostrados.
  - **Relevance to This Story:** aplica 100% a CH-7; es el riesgo principal de esta historia.
- Risk 2: degradacion de performance en consultas de disponibilidad.
  - **Relevance to This Story:** aplica en lecturas de disponibilidad por fecha (NFR-PERF-003).
- Risk 3: exposicion de canchas inactivas/no publicadas.
  - **Relevance to This Story:** aplica en validacion de `courtId` inactivo/no visible.

**Integration Points from Epic Analysis:**

- Frontend slot-grid <-> `GET /api/courts/{courtId}/availability`
  - **Applies to This Story:** Yes
  - **If Yes:** render de slots y mensajes de error depende del contrato del endpoint.
- Backend route handlers <-> PostgreSQL
  - **Applies to This Story:** Yes
  - **If Yes:** calculo de estados requiere composicion correcta entre disponibilidad y reservas activas.

**Critical Questions Already Asked at Epic Level:**

**Questions for PO:**

- Definicion exacta de reglas de visibilidad para recursos inactivos.
  - **Status:** Pending
  - **Impact on This Story:** define si respuesta esperada debe ser 404 estandar, 403, o semantica de unavailable.

**Questions for Dev:**

- TTL y lifecycle exacto del estado `held`.
  - **Status:** Pending
  - **Impact on This Story:** sin esta definicion, test cases de consistencia temporal no pueden cerrarse con expected result definitivo.

**Test Strategy from Epic:**

- Test Levels: Unit, Integration, E2E, API
- Tools: Playwright, Vitest/Jest, Postman
- **How This Story Aligns:** CH-7 requiere principalmente API + Integration + E2E para validar exactitud funcional y contrato.

**Updates and Clarifications from Epic Refinement:**

- No se encontraron respuestas adicionales de PO/Dev posteriores al comentario de Feature Test Plan en el epic.

**Summary: How This Story Fits in Epic:**

- **Story Role in Epic:** implementa el nucleo de disponibilidad en tiempo real percibida.
- **Inherited Risks:** consistencia de estados, performance, visibilidad de recursos.
- **Unique Considerations:** reglas de ventana de fecha y semantica de errores por court invalido/inactivo.

---

## Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "fecha valida" no define timezone ni formato de referencia operativa.

- **Location in Story:** Acceptance Criteria - Scenario 1 y 2.
- **Question for PO/Dev:** timezone oficial para evaluar ventana y limites de dia (UTC, local de complejo, o local del usuario)?
- **Impact on Testing:** boundary tests de fecha pueden arrojar falsos positivos/negativos.
- **Suggested Clarification:** declarar timezone oficial (ej. America/La_Paz) y regla de corte diario.

**Ambiguity 2:** "not-found/unavailable" no fija contrato de error.

- **Location in Story:** Acceptance Criteria - Scenario 3.
- **Question for PO/Dev:** para cancha inactiva, el endpoint debe responder 404 con `error.code` especifico o distinto tratamiento?
- **Impact on Testing:** no hay expected result verificable para status code y payload.
- **Suggested Clarification:** definir matriz de errores por caso (`courtId` inexistente, inactivo, malformado).

---

### Missing Information / Gaps

**Gap 1:** valor exacto de booking window configurable.

- **Type:** Business Rule
- **Why It's Critical:** la validacion de Scenario 2 depende del limite exacto (ej. 30 dias).
- **Suggested Addition:** agregar valor explicito y si es configurable por entorno.
- **Impact if Not Added:** cobertura parcial y criterios de acceptance ambiguos.

**Gap 2:** expected behavior cuando no existen slots para fecha valida.

- **Type:** Acceptance Criteria
- **Why It's Critical:** caso comun de negocio y UX.
- **Suggested Addition:** especificar respuesta esperada (200 con `slots: []` y mensaje UI).
- **Impact if Not Added:** posible inconsistencia frontend/backend.

---

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** fecha valida dentro de ventana, pero sin configuracion de disponibilidad para ese dia.

- **Scenario:** `courtId` activo + `date` valida sin reglas en `court_availability`.
- **Expected Behavior:** 200 OK con `slots: []` y sin error tecnico.
- **Criticality:** High
- **Action Required:** Add to story

**Edge Case 2:** slots superpuestos por datos inconsistentes en `court_availability`.

- **Scenario:** reglas de owner con overlap parcial en mismo dia.
- **Expected Behavior:** endpoint normaliza/rechaza inconsistencia sin retornar estados ambiguos.
- **Criticality:** Medium
- **Action Required:** Ask PO

**Edge Case 3:** `date` valida en UI pero fuera de ventana por diferencia de timezone.

- **Scenario:** usuario cerca de medianoche local, backend evalua otro huso.
- **Expected Behavior:** validacion consistente y mensaje determinista.
- **Criticality:** High
- **Action Required:** Ask PO

---

### Testability Validation

**Is this story testeable as written?** Partially

**Testability Issues (if any):**

- [x] Expected results are not specific enough
- [x] Missing error scenarios contract detail
- [x] Missing boundary criteria details

**Recommendations to Improve Testability:**

- Definir status codes + `error.code` por error de disponibilidad.
- Especificar ventana de fechas y timezone.
- Agregar AC explicito para respuesta sin slots (`slots: []`).

---

## Paso 3: Refined Acceptance Criteria

### Scenario 1: Consulta valida retorna matriz de slots consistente

**Type:** Positive  
**Priority:** Critical

- **Given:**
  - cancha activa `courtId` valida.
  - fecha dentro de ventana permitida.
  - existen registros en `court_availability` y reservas en estados mixtos.
- **When:**
  - player consulta `GET /api/courts/{courtId}/availability?date=YYYY-MM-DD`.
- **Then:**
  - API responde `200 OK`.
  - payload cumple `AvailabilityResponse` con `courtId`, `date`, `slots[]`.
  - cada slot incluye `startAt`, `endAt`, `status` en enum (`available`, `held`, `booked`).
  - estado de cada slot coincide con datos actuales de reservas.

---

### Scenario 2: Fecha fuera de ventana retorna validacion

**Type:** Negative  
**Priority:** High

- **Given:**
  - cancha activa y visible.
- **When:**
  - player consulta con fecha fuera de ventana (ej. +31 dias si ventana=30).
- **Then:**
  - API responde `400 Bad Request`.
  - error incluye `error.code` de validacion y mensaje claro.
  - no se retorna matriz de slots.

---

### Scenario 3: Court inexistente o inactivo retorna no disponible

**Type:** Negative  
**Priority:** High

- **Given:**
  - `courtId` inexistente o inactivo.
- **When:**
  - player consulta disponibilidad.
- **Then:**
  - API responde `404 Not Found` (pendiente confirmacion PO/Dev para inactiva).
  - payload de error consistente con contrato.

---

### Scenario 4: Fecha valida sin slots configurados

**Type:** Edge Case  
**Priority:** High  
**Source:** Identified during critical analysis

- **Given:**
  - cancha activa.
  - fecha dentro de ventana.
  - sin reglas de disponibilidad para ese dia.
- **When:**
  - player consulta disponibilidad.
- **Then:**
  - API responde `200 OK`.
  - `slots` llega vacio.
  - UI muestra estado vacio informativo sin error tecnico.

---

### Scenario 5: Parametro date invalido

**Type:** Negative  
**Priority:** High

- **Given:** cancha activa.
- **When:** `date` invalida (ej. `2026-13-40` o vacia).
- **Then:** `400 Bad Request` con detalle de validacion en `error.details`.

---

### Scenario 6: Boundary de ventana de reserva

**Type:** Boundary  
**Priority:** Medium

- **Given:** cancha activa.
- **When:** consulta justo en limites de ventana (dia minimo y maximo permitido).
- **Then:** comportamiento es determinista y consistente con regla configurada.

---

## Paso 4: Test Design

### Test Coverage Analysis

**Total Test Cases Needed:** 24

**Breakdown:**

- Positive: 6 test cases
- Negative: 7 test cases
- Boundary: 5 test cases
- Integration: 4 test cases
- API: 2 test cases

**Rationale for This Number:**
La historia concentra logica critica de disponibilidad y alto riesgo de inconsistencia entre capas; se prioriza cobertura en validaciones, exactitud de estados y contratos de integracion.

---

### Parametrization Opportunities

**Parametrized Tests Recommended:** Yes

**Parametrized Test Group 1:** Validar resultado por posicion de fecha en ventana

- **Base Scenario:** validacion de `date` para endpoint de disponibilidad.
- **Parameters to Vary:** offset de fecha, formato, timezone-context.

| date input | offset vs today | expected status | expected result |
| --- | --- | --- | --- |
| today | 0 | 200 | slots o [] |
| today+30d | max boundary | 200 | slots o [] |
| today+31d | outside | 400 | validation error |
| invalid-format | n/a | 400 | validation error |

**Total Tests from Parametrization:** 8  
**Benefit:** cubre reglas de fecha sin duplicar estructura de pruebas.

---

**Parametrized Test Group 2:** Validar calculo de estados de slot

- **Base Scenario:** composicion de estado desde disponibilidad + reservas.
- **Parameters to Vary:** estado de reserva previa, solapamiento, hora.

| booking status | overlap | expected slot status |
| --- | --- | --- |
| none | n/a | available |
| held | full | held |
| confirmed | full | booked |
| pending_payment | full | held (pendiente confirmacion Dev) |

**Total Tests from Parametrization:** 8  
**Benefit:** valida reglas de negocio principales en forma sistematica.

---

### Test Outlines

#### Validar disponibilidad por fecha con cancha activa y date valida

**Related Scenario:** Scenario 1  
**Type:** Positive  
**Priority:** Critical  
**Test Level:** API + Integration  
**Parametrized:** Yes (Group 2)

**Preconditions:** cancha activa con disponibilidad para la fecha y dataset de reservas controlado.

**Test Steps:**

1. Ejecutar `GET /api/courts/{courtId}/availability?date=2026-04-05`.
2. Verificar status code.
3. Validar schema y contenido de slots.

**Expected Result:** `200 OK`, payload `AvailabilityResponse` valido, estados de slot consistentes.

---

#### Validar error de validacion cuando la fecha esta fuera de ventana

**Related Scenario:** Scenario 2  
**Type:** Negative  
**Priority:** High  
**Test Level:** API  
**Parametrized:** Yes (Group 1)

**Expected Result:** `400 Bad Request`, `error.code` de validacion, sin `slots`.

---

#### Validar error not found cuando courtId no existe

**Related Scenario:** Scenario 3  
**Type:** Negative  
**Priority:** High  
**Test Level:** API

**Expected Result:** `404 Not Found` con payload de error consistente.

---

#### Validar rechazo cuando cancha esta inactiva

**Related Scenario:** Scenario 3  
**Type:** Negative  
**Priority:** High  
**Test Level:** API + Integration

**Expected Result:** 404 o unavailable contract (pendiente confirmacion PO/Dev).

---

#### Validar respuesta vacia cuando no hay slots para fecha valida

**Related Scenario:** Scenario 4  
**Type:** Edge Case  
**Priority:** High  
**Test Level:** API + UI

**Expected Result:** `200 OK` con `slots: []` y empty state claro en UI.

---

#### Validar error de formato cuando date no cumple ISO date

**Related Scenario:** Scenario 5  
**Type:** Negative  
**Priority:** High  
**Test Level:** API

**Expected Result:** `400 Bad Request` con detalle de campo `date`.

---

#### Validar limite inferior de ventana de fecha

**Related Scenario:** Scenario 6  
**Type:** Boundary  
**Priority:** Medium  
**Test Level:** API

**Expected Result:** comportamiento aceptado segun regla de minimo permitido.

---

#### Validar limite superior de ventana de fecha

**Related Scenario:** Scenario 6  
**Type:** Boundary  
**Priority:** Medium  
**Test Level:** API

**Expected Result:** `200` en max permitido y `400` fuera del max.

---

#### Validar orden temporal de slots sin solapamientos en respuesta

**Related Scenario:** Scenario 1  
**Type:** Boundary  
**Priority:** Medium  
**Test Level:** Integration

**Expected Result:** slots ordenados ascendentemente y no superpuestos.

---

#### Validar consistencia de estado held en consulta consecutiva

**Related Scenario:** Scenario 1  
**Type:** Edge Case  
**Priority:** High  
**Test Level:** Integration

**Expected Result:** estado `held` consistente durante TTL configurado.

---

#### Validar render de leyenda de estados en slot-grid

**Related Scenario:** Scenario 1  
**Type:** Positive  
**Priority:** Medium  
**Test Level:** UI

**Expected Result:** UI distingue `available`, `held`, `booked` de forma accesible.

---

#### Validar mensaje de error funcional para fecha invalida en UI

**Related Scenario:** Scenario 5  
**Type:** Negative  
**Priority:** Medium  
**Test Level:** UI

**Expected Result:** mensaje claro, no bloqueo de app, y no render de slots erroneos.

---

## Integration Test Cases

### Integration Test 1: Frontend slot-grid <-> API availability

**Integration Point:** Frontend -> `GET /api/courts/{courtId}/availability`  
**Type:** Integration  
**Priority:** High

**Contract Validation:**

- Request format matches OpenAPI spec: Yes
- Response format matches OpenAPI spec: Yes
- Status codes match spec: Yes

**Expected Result:** render correcto en UI para respuestas 200/400/404.

---

### Integration Test 2: API availability <-> DB composition

**Integration Point:** Backend -> `court_availability` + `bookings`  
**Type:** Integration  
**Priority:** High

**Expected Result:** composicion de estados exacta y estable para mismo snapshot de datos.

---

## Edge Cases Summary

| Edge Case | Covered in Original Story? | Added to Refined AC? | Test Case | Priority |
| --- | --- | --- | --- | --- |
| Fecha valida sin slots configurados | No | Yes (Scenario 4) | TO-05 | High |
| Overlap de reglas de disponibilidad | No | Pending confirmation | TO-09 | Medium |
| Diferencia de timezone en borde de dia | No | Yes (Scenario 6) | TO-07/TO-08 | High |

---

## Test Data Summary

### Data Categories

| Data Type | Count | Purpose | Examples |
| --- | --- | --- | --- |
| Valid data | 6 | Positive tests | `date=today`, `date=today+7`, court activa |
| Invalid data | 6 | Negative tests | `date=2026-13-40`, `courtId=invalid`, date out of window |
| Boundary values | 5 | Boundary tests | min/max window, `today+30`, `today+31` |
| Edge case data | 4 | Edge case tests | `slots=[]`, bookings held/booked overlap |

### Data Generation Strategy

**Static Test Data:**

- Court activa conocida para smoke funcional.
- Court inactiva controlada para escenarios negativos.

**Dynamic Test Data (using Faker.js):**

- UUIDs de recursos no existentes.
- fechas relativas para boundary tests.

**Test Data Cleanup:**

- All created data cleaned after execution.
- Tests idempotent.
- No dependency on execution order.

---

## Action Required

**@Product Owner:**

- [ ] Confirmar regla de timezone para ventana de fechas.
- [ ] Confirmar expected behavior cuando no hay slots (`200 + slots[]`).
- [ ] Confirmar semantica de cancha inactiva (404/unavailable).

**@Dev Lead:**

- [ ] Confirmar TTL y comportamiento exacto de estado `held`.
- [ ] Confirmar prioridad de estado ante `pending_payment` en calculo de slot.
- [ ] Confirmar estrategia de normalizacion en caso de overlap de disponibilidad.

**@QA Team:**

- [ ] Validar matriz de parametrizacion.
- [ ] Preparar dataset de reservas con estados mixtos.
- [ ] Ejecutar integration checks UI/API/DB en staging.

---

## Next Steps

1. Resolver preguntas criticas con PO/Dev.
2. Ajustar expected results finales segun respuestas.
3. Ejecutar pruebas en staging cuando CH-7 este en Ready for QA.
4. Consolidar evidencias para decision de sign-off.

---

## Definition of Done (QA Perspective)

- [ ] Ambiguities and critical questions resolved
- [ ] Story updated with accepted clarifications
- [ ] All test outlines executed
- [ ] Critical/High tests at 100% pass
- [ ] Medium/Low tests >=95% pass
- [ ] No critical/high bugs open
- [ ] Integration checks passing
- [ ] Exploratory testing completed

---

## Related Documentation

- Story: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-7-view-availability-slots/story.md`
- Epic: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/epic.md`
- Business Model: `.context/idea/business-model.md`
- PRD: `.context/PRD/executive-summary.md`, `.context/PRD/user-personas.md`, `.context/PRD/user-journeys.md`
- SRS: `.context/SRS/functional-specs.md`, `.context/SRS/non-functional-specs.md`, `.context/SRS/architecture-specs.md`
- API: `.context/SRS/api-contracts.yaml`

---

## Test Execution Tracking

**Test Execution Date:** TBD  
**Environment:** Staging  
**Executed By:** TBD

**Results:**

- Total Tests: 24
- Passed: TBD
- Failed: TBD
- Blocked: TBD

**Bugs Found:**

- TBD

**Sign-off:** TBD
