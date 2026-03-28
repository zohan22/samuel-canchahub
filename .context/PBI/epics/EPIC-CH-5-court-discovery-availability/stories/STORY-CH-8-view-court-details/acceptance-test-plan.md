## 🧪 Acceptance Test Plan - Generated 2026-03-28

**QA Engineer:** AI-Generated
**Status:** Draft - Pending PO/Dev Review

---

# Acceptance Test Plan: STORY-CH-8 - View court details

**Fecha:** 2026-03-28
**QA Engineer:** AI-Generated
**Story Jira Key:** CH-8
**Epic:** EPIC-CH-5 - Court Discovery & Availability
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**

- **Primary:** Diego Rojas (Player) - necesita comparar reglas, precio, ubicacion y fotos para decidir rapido sin friccion.
- **Secondary:** Carla Mendoza (Capitana) - requiere informacion clara para decidir horarios confiables para su equipo.

**Business Value:**

- **Value Proposition:** proveer contexto suficiente para decidir una reserva con confianza antes del checkout.
- **Business Impact:** soporta la conversion de busqueda -> reserva pagada (meta >= 12% al dia 90) al reducir abandono por incertidumbre.

**Related User Journey:**

- Journey: Reserva completa sin friccion (Journey 1)
- Step: evaluacion y seleccion informada antes de elegir slot/reservar.

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**

- Components: court detail page, sections de reglas/media/ubicacion.
- Pages/Routes: vista de detalle de cancha (ruta con `courtId`).
- State Management: estado de carga/error + render de payload tipado.

**Backend:**

- API Endpoints: `GET /api/courts/{courtId}`.
- Services: servicio de lectura de detalle de cancha/complejo + validacion de visibilidad.
- Database: `courts`, `sports_complexes` y metadatos relacionados (reglas/fotos/ubicacion).

**External Services:**

- Supabase Storage para URIs de fotos.

**Integration Points:**

- Frontend detail page <-> API `GET /api/courts/{courtId}`.
- API detail handler <-> PostgreSQL joins.
- API detail handler <-> Storage URIs para fotos.

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**

- Business logic complexity: Medium - reglas de visibilidad activo/publicado + calidad de payload para decision.
- Integration complexity: Medium - dependencia DB + media URLs.
- Data validation complexity: Medium - contrato de respuesta exige estructura completa y consistente.
- UI complexity: Medium - render robusto ante datos incompletos o no disponibles.

**Estimated Test Effort:** Medium
**Rationale:** requiere cobertura funcional + contrato + errores 400/404 + integracion de metadata/fotos sin flujo transaccional complejo.

---

### Epic-Level Context (From Feature Test Plan in Jira)

**Critical Risks Already Identified at Epic Level:**

- Risk: Exposicion de canchas inactivas/no publicadas.
  - **Relevance to This Story:** aplica directo; CH-8 es el endpoint de detalle con mayor riesgo de filtrado indebido.
- Risk: Datos incompletos en payload de detalle por integracion DB + Storage.
  - **Relevance to This Story:** impacta decision del player y estabilidad de UI.

**Integration Points from Epic Analysis:**

- Frontend detail page <-> `GET /api/courts/{courtId}`
  - **Applies to This Story:** Yes
  - **If Yes:** es el camino principal de consumo de datos.
- Backend detail endpoint <-> PostgreSQL + Storage
  - **Applies to This Story:** Yes
  - **If Yes:** define completitud y consistencia del payload.

**Critical Questions Already Asked at Epic Level:**

**Questions for PO:**

- Pregunta: para canchas inactivas/no publicadas, el resultado esperado es 404, 403 o unavailable con otro contrato?
  - **Status:** Pending
  - **Impact on This Story:** define assert exacto de negativos y contrato UI/API.

**Questions for Dev:**

- Pregunta: politica de fallback para fotos invalidas (filtrar, placeholder, o error)?
  - **Status:** Pending
  - **Impact on This Story:** define casos negativos de media y robustez de rendering.

**Test Strategy from Epic:**

- Test Levels: Unit, Integration, E2E, API.
- Tools: Playwright, Vitest/Jest, Postman/Newman.
- **How This Story Aligns:** foco en API contract y rendering de detalle; integracion DB/Storage es critica.

**Updates and Clarifications from Epic Refinement:**

- No se encontraron respuestas cerradas en comentarios adicionales del epic para las dudas de CH-8.

**Summary: How This Story Fits in Epic:**

- **Story Role in Epic:** componente de soporte de decision del player antes de reserva.
- **Inherited Risks:** visibilidad incorrecta de recursos + payload incompleto.
- **Unique Considerations:** calidad semantica de reglas/fotos/ubicacion para decision de compra.

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** status code exacto para cancha inactiva/no publicada.

- **Location in Story:** AC Scenario 3 + Business Rules.
- **Question for PO/Dev:** se estandariza `404 Not Found` por no-disclosure o otro comportamiento?
- **Impact on Testing:** no permite definir assertion contractual exacta y reusable.
- **Suggested Clarification:** fijar status code + `error.code` + mensaje esperado para UI.

**Ambiguity 2:** manejo de fotos invalidas.

- **Location in Story:** Business Rules ("photos should be valid URLs").
- **Question for PO/Dev:** API filtra URIs invalidas o retorna placeholder?
- **Impact on Testing:** afecta expected result de payload y de render.
- **Suggested Clarification:** documentar regla deterministica de fallback.

---

### Missing Information / Gaps

**Gap 1:** contrato de error para `courtId` malformado.

- **Type:** Acceptance Criteria / API Contract usage.
- **Why It's Critical:** necesario para cobertura negativa y robustez de validacion.
- **Suggested Addition:** AC explicito para `400 Bad Request` con `ErrorResponse`.
- **Impact if Not Added:** inconsistencias entre implementaciones y tests fragiles.

**Gap 2:** minima completitud del payload para "decision making".

- **Type:** Business Rule.
- **Why It's Critical:** "completo" es subjetivo sin minimos verificables.
- **Suggested Addition:** definir campos obligatorios de decision (`rules`, `photos`, `address`, `location`, `pricePerHour`).
- **Impact if Not Added:** salida parcial pasa como valida sin asegurar valor de negocio.

---

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** `courtId` con formato no UUID.

- **Scenario:** request invalida por formato.
- **Expected Behavior:** `400` con error de validacion.
- **Criticality:** High
- **Action Required:** Add to story and test cases.

**Edge Case 2:** cancha existente pero con fotos rotas/invalidas.

- **Scenario:** parte del payload multimedia no utilizable.
- **Expected Behavior:** respuesta estable sin romper contrato; manejo deterministico de media.
- **Criticality:** Medium
- **Action Required:** Add to test cases + confirm fallback con PO/Dev.

**Edge Case 3:** coordenadas incompletas o no numericas.

- **Scenario:** datos de ubicacion corruptos.
- **Expected Behavior:** no exponer payload invalido que rompa mapa/UI.
- **Criticality:** Medium
- **Action Required:** Add to integration tests.

---

### Testability Validation

**Is this story testable as written?** Partially

**Testability Issues:**

- [x] Expected results are not specific enough for inactive/unavailable behavior.
- [x] Missing error scenario for malformed `courtId`.
- [x] Missing deterministic rule for invalid photos.

**Recommendations to Improve Testability:**

- Definir contrato de errores 400/404 para CH-8.
- Declarar politica de media fallback.
- Especificar campos minimos de payload para "decision making".

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Should return complete court detail for an active published court

**Type:** Positive
**Priority:** Critical

- **Given:** existe una cancha activa/publicada con `courtId` valido y metadatos de complejo.
- **When:** el player solicita `GET /api/courts/{courtId}`.
- **Then:** responde `200 OK` con `CourtDetailResponse` valido.
- **Then:** incluye `court`, `rules`, `photos`, `address`, `location`.
- **Then:** `photos[]` son URIs validas y `location.lat/lng` son numericos.

---

### Scenario 2: Should return not found for non-existing courtId

**Type:** Negative
**Priority:** High

- **Given:** `courtId` UUID valido no existente.
- **When:** se invoca el endpoint de detalle.
- **Then:** responde `404 Not Found`.
- **Then:** cuerpo de error sigue `ErrorResponse` y no expone payload de cancha.

---

### Scenario 3: Should deny detail for inactive or unpublished courts

**Type:** Negative
**Priority:** High

- **Given:** cancha existe pero estado inactivo/no publicado.
- **When:** se solicita detalle por `courtId`.
- **Then:** responde unavailable (`404` recomendado) sin exponer metadata sensible.

---

### Scenario 4: Should reject malformed courtId path parameter

**Type:** Boundary
**Priority:** High

- **Given:** `courtId` no cumple formato UUID.
- **When:** se llama endpoint de detalle.
- **Then:** responde `400 Bad Request` con error de validacion.

---

### Scenario 5: Should keep response stable with partial media issues

**Type:** Edge Case
**Priority:** Medium
**Source:** Identified during critical analysis

- **Given:** la cancha tiene una o mas fotos con referencia invalida.
- **When:** se solicita detalle.
- **Then:** respuesta mantiene estructura contrato sin romper rendering.
- **NOTE:** requiere confirmacion PO/Dev sobre fallback exacto (filtrar vs placeholder).

---

## 🧪 Paso 4: Test Design

### Test Coverage Analysis

**Total Test Cases Needed:** 18

**Breakdown:**

- Positive: 5
- Negative: 5
- Boundary: 3
- Integration: 3
- API: 2

**Rationale for This Number:** alineado con complejidad media de CH-8 y riesgos de contrato/visibilidad/media definidos en el feature plan del epic.

---

### Parametrization Opportunities

**Parametrized Tests Recommended:** No

Los escenarios de CH-8 son mayormente contractuales y heterogeneos (200/400/404, visibilidad, media), por lo que el beneficio de parametrizacion es bajo frente a casos explicitos.

---

### Test Outlines

#### **Validar detalle completo con cancha activa publicada**

**Related Scenario:** Scenario 1
**Type:** Positive
**Priority:** Critical
**Test Level:** API + UI
**Parametrized:** No

**Preconditions:**

- Court activa/publicada existe con datos de complejo y media.
- Usuario player autenticado o acceso permitido segun endpoint.

**Test Steps:**

1. Solicitar `GET /api/courts/{courtId}` con `courtId` valido.
2. Verificar `200` y estructura de respuesta.
3. Renderizar detalle en UI y validar secciones visibles.

**Expected Result:**

- API retorna `CourtDetailResponse` completo.
- UI muestra reglas, fotos, direccion y ubicacion sin errores.

---

#### **Validar error not-found para courtId inexistente**

**Related Scenario:** Scenario 2
**Type:** Negative
**Priority:** High
**Test Level:** API
**Parametrized:** No

**Test Steps:**

1. Llamar endpoint con UUID valido no existente.
2. Validar `404` y contrato de error.

**Expected Result:**

- `success=false`, `data=null`, `error.code/message` definidos.

---

#### **Validar ocultamiento de detalle para cancha inactiva/no publicada**

**Related Scenario:** Scenario 3
**Type:** Negative
**Priority:** High
**Test Level:** API + Integration
**Parametrized:** No

**Test Steps:**

1. Configurar cancha inactiva/no publicada.
2. Solicitar detalle por `courtId`.
3. Verificar respuesta unavailable y ausencia de payload de negocio.

**Expected Result:**

- No se exponen `rules`, `photos`, `location`, ni metadata de complejo.

---

#### **Validar rechazo de courtId malformado**

**Related Scenario:** Scenario 4
**Type:** Boundary
**Priority:** High
**Test Level:** API
**Parametrized:** No

**Test Steps:**

1. Invocar endpoint con `courtId="abc"`.
2. Validar status y contenido de error de validacion.

**Expected Result:**

- `400 Bad Request` con detalle de campo invalido.

---

#### **Validar estabilidad de detalle con media parcial invalida**

**Related Scenario:** Scenario 5
**Type:** Edge Case
**Priority:** Medium
**Test Level:** Integration
**Parametrized:** No

**Test Steps:**

1. Preparar cancha con mezcla de URIs validas/invalidas.
2. Solicitar detalle y abrir UI de detalle.
3. Verificar que no haya crash ni bloqueo de pagina.

**Expected Result:**

- La vista sigue operativa; comportamiento exacto de fallback pendiente de confirmacion.

---

## 🔗 Integration Test Cases

### Integration Test 1: Frontend detail page ↔ Backend detail endpoint

**Integration Point:** UI detail view <-> `GET /api/courts/{courtId}`
**Type:** Integration
**Priority:** High

**Contract Validation:**

- Request path param formato UUID.
- Response `200` cumple esquema `CourtDetailResponse`.

---

### Integration Test 2: Backend detail endpoint ↔ DB joins

**Integration Point:** API <-> PostgreSQL (`courts` + `sports_complexes` + metadata)
**Type:** Integration
**Priority:** High

**Expected Result:**

- Payload consistente y completo para canchas activas.
- Rechazo correcto para canchas inactivas/no publicadas.

---

### Integration Test 3: Backend detail endpoint ↔ Storage photo URLs

**Integration Point:** API <-> Storage URLs
**Type:** Integration
**Priority:** Medium

**Expected Result:**

- URIs de fotos cumplen formato valido.
- Estrategia de fallback definida para referencias invalidas.

---

## 📊 Edge Cases Summary

| Edge Case | Covered in Original Story? | Added to Refined AC? | Test Case | Priority |
| --- | --- | --- | --- | --- |
| Malformed `courtId` path param | No | Yes (Scenario 4) | Validar rechazo de courtId malformado | High |
| Court exists but inactive/unpublished | Partially | Yes (Scenario 3) | Validar ocultamiento de detalle | High |
| Invalid or broken photo URIs | No | Yes (Scenario 5) | Validar estabilidad con media parcial invalida | Medium |
| Missing/invalid location coordinates | No | Yes (Scenario 1 validation) | Integration Test 2 | Medium |

---

## 🗂️ Test Data Summary

### Data Categories

| Data Type | Count | Purpose | Examples |
| --- | --- | --- | --- |
| Valid data | 4 | Positive tests | active court, published court, full metadata |
| Invalid data | 4 | Negative tests | unknown UUID, malformed id, inactive status |
| Boundary values | 3 | Boundary tests | empty string id, short id, special chars |
| Edge case data | 3 | Edge cases | mixed valid/invalid photo URIs, null-like location |

### Data Generation Strategy

**Static Test Data:**

- `courtId` activa/publicada con metadata completa.
- `courtId` inactiva/no publicada.

**Dynamic Test Data (Faker.js):**

- nombres de complejos, direcciones y textos de reglas.
- variacion de URIs de fotos para pruebas de calidad de media.

**Test Data Cleanup:**

- Tests idempotentes y limpieza de registros de prueba cuando aplique.

---

## ✅ Acceptance Test Plan - Execution Summary

**Story:** CH-8 - As a player, I want to view court details so that I can decide with confidence
**Analysis Date:** 2026-03-28

### 📊 Summary for PO/Dev

**Story Quality Assessment:** Needs Improvement

**Key Findings:**

1. ACs son correctos en direccion funcional pero faltan contratos exactos para errores 400/404.
2. El criterio de "unavailable" para recursos inactivos necesita estandarizacion para evitar ambiguedad.
3. Falta definir politica de fallback para fotos invalidas.

### 🚨 Critical Questions for PO

**Question 1:** Para cancha inactiva/no publicada, se confirma `404 Not Found` como respuesta oficial?

- **Context:** evita filtrado de informacion y alinea seguridad con UX.
- **Impact if not answered:** tests y implementacion pueden divergir entre `403`/`404`/otro.
- **Suggested Answer:** usar `404` con `ErrorResponse` no-disclosing.

### 🔧 Technical Questions for Dev

**Question 1:** La API filtrara fotos invalidas o retornara placeholder acordado?

- **Context:** hay regla de calidad de media pero no fallback definido.
- **Impact on Testing:** define expected exacto de escenarios de media parcial.

**Question 2:** Se valida formato UUID en capa de route handler antes de consultar DB?

- **Context:** edge case no definido en story original.
- **Impact on Testing:** determina assert de `400` y contenido de error de validacion.

### 💡 Suggested Story Improvements

**Improvement 1:** Agregar AC explicito para `courtId` malformado -> `400 Bad Request`.

- **Benefit:** mejora testabilidad y consistencia de error handling.

**Improvement 2:** Definir contrato de recurso no visible (status + error.code + mensaje UI).

- **Benefit:** alinea API/UI y reduce defectos de interpretacion.

### 🧪 Testing Recommendations

**Pre-Implementation Testing:**

- Revisar con Dev contrato final de errores para CH-8.
- Validar temprano payload de detalle contra OpenAPI.

**During Implementation:**

- Ejecutar integration tests de DB joins + media URLs.
- Revisar pruebas unitarias de validacion de path params.

**Post-Implementation:**

- Ejecutar los 18 test cases planeados para CH-8.
- Correr exploratory session enfocada en UI fallback de media y estados de error.

### ⚠️ Risks & Mitigation

**Risk 1:** Exposicion accidental de canchas inactivas.

- **Likelihood:** Medium
- **Impact:** High
- **Mitigation:** tests negativos de visibilidad + contrato unavailable.

**Risk 2:** Payload incompleto rompe decision del usuario.

- **Likelihood:** Medium
- **Impact:** Medium
- **Mitigation:** validaciones de contrato + integration tests DB/Storage.

### ✅ What Was Done

**Jira Updates:**

- Story CH-8 refinada con seccion QA Refinements.
- Label `shift-left-reviewed` agregada.
- Test plan agregado como comentario en Jira (mirror de este archivo).

**Local Files:**

- `acceptance-test-plan.md` creado en esta story.

**Test Coverage:**

- Total test cases designed: 18
  - Positive: 5
  - Negative: 5
  - Boundary: 3
  - Integration: 3
  - API: 2

### 🎯 Next Steps (Team Action Required)

1. **PO:** responder decision final de contrato unavailable para canchas inactivas.
2. **Dev:** confirmar fallback de media invalida y validacion UUID.
3. **Team:** ajustar story con clarificaciones antes de implementar.
4. **QA:** actualizar asserts finales tras respuesta de PO/Dev.
5. **Dev:** iniciar implementacion con criterios cerrados.

**Jira Link:** https://canchahub.atlassian.net/browse/CH-8
**Local Test Cases:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-8-view-court-details/acceptance-test-plan.md`

---

## 📢 Action Required

**@ProductOwner:**

- [ ] Review and answer Critical Questions for PO.
- [ ] Validate suggested story improvements.
- [ ] Confirm expected behavior for identified edge cases.

**@DevLead:**

- [ ] Review technical questions.
- [ ] Validate integration points and test approach.
- [ ] Confirm media fallback and UUID validation behavior.

**@QATeam:**

- [ ] Review test outlines for completeness.
- [ ] Prepare staging data for CH-8 scenarios.
- [ ] Execute plan after PO/Dev clarifications.

---

## 🎯 Definition of Done (QA Perspective)

- [ ] All ambiguities and questions from this document are resolved.
- [ ] Story updates accepted by PO.
- [ ] All planned test cases executed.
- [ ] Critical/High tests 100% passing.
- [ ] No critical/high bugs open for CH-8.
- [ ] Integration checks passed (API + DB + media URLs).
- [ ] Exploratory testing completed.

---

## 📎 Related Documentation

- **Story:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-8-view-court-details/story.md`
- **Epic:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/epic.md`
- **Feature Test Plan:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/feature-test-plan.md`
- **Business Model:** `.context/idea/business-model.md`
- **PRD:** `.context/PRD/`
- **SRS:** `.context/SRS/`
- **Architecture:** `.context/SRS/architecture-specs.md`
- **API Contracts:** `.context/SRS/api-contracts.yaml`

---

## 📋 Test Execution Tracking

**Test Execution Date:** TBD
**Environment:** Staging
**Executed By:** TBD

**Results:**

- Total Tests: 18
- Passed: TBD
- Failed: TBD
- Blocked: TBD

**Bugs Found:**

- TBD

**Sign-off:** TBD
