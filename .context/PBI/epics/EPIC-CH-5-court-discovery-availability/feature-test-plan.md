## Feature Test Plan - Generated 2026-03-28

**QA Lead:** AI-Generated
**Status:** Draft - Pending Team Review

---

# Feature Test Plan: EPIC-CH-5 - Court Discovery & Availability

**Fecha:** 2026-03-28  
**QA Lead:** AI-Generated  
**Epic Jira Key:** CH-5  
**Status:** Draft

---

## Business Context Analysis

### Business Value

Esta epica reduce la friccion historica de llamadas/WhatsApp para reservar canchas y habilita el paso mas critico del MVP: que el player pueda confiar en que existe oferta real antes de intentar pagar. Impacta directamente la hipotesis de adopcion y conversion del producto, porque discovery + disponibilidad confiable son el puente entre interes y reserva pagada.

**Key Value Proposition:**

- Encontrar canchas disponibles en minutos con filtros utiles y datos confiables.
- Aumentar conversion de busqueda a reserva pagada al reducir incertidumbre de disponibilidad.

**Success Metrics (KPIs):**

- Conversion busqueda -> reserva pagada >= 12% al dia 90.
- Reservas pagadas acumuladas >= 450 en 90 dias.

**User Impact:**

- Diego Rojas (Player): disminuye tiempo de busqueda y evita coordinacion por chat sin confirmacion.
- Carla Mendoza (Capitana): mejora previsibilidad al elegir horarios reales para coordinar equipos.
- Luis Aramayo (Owner): recibe demanda mejor calificada por usuarios que ya validaron detalle y disponibilidad antes de reservar.

**Critical User Journeys:**

- Journey 1: Reserva completa sin friccion (paso de filtros -> disponibilidad -> decision previa a booking).
- Journey 3: Gestion diaria de oferta (la calidad de disponibilidad publicada impacta descubrimiento de players).

---

## Technical Architecture Analysis

### Architecture Components Involved

**Frontend:**

- Search page con filtros combinados y paginacion.
- Court detail page con metadata, reglas, fotos y ubicacion.
- Slot-grid UI por fecha con estados `available`, `held`, `booked`.

**Backend:**

- `GET /api/courts` (filtros y paginacion).
- `GET /api/courts/{courtId}` (detalle de cancha/complejo).
- `GET /api/courts/{courtId}/availability` (slots por fecha).
- Validacion de query params y reglas de ventana de reserva.

**Database:**

- Tablas: `sports_complexes`, `courts`, `court_availability`, `bookings`.
- Queries criticos: composicion de slots (availability + bookings), filtros combinados por zona/deporte/precio, filtrado por estado activo/publicado.

**External Services:**

- Supabase Storage para URIs de fotos.
- Sin integraciones externas adicionales para el scope de esta epica.

### Integration Points (Critical for Testing)

**Internal Integration Points:**

- Frontend search/filter UI <-> `GET /api/courts`.
- Frontend detail page <-> `GET /api/courts/{courtId}`.
- Frontend slot-grid <-> `GET /api/courts/{courtId}/availability`.
- Backend route handlers <-> PostgreSQL (joins + filtros + estados).
- Backend <-> Auth/RLS para visibilidad de recursos activos/publicables.

**External Integration Points:**

- Backend <-> Supabase Storage (resolucion de fotos/URLs de detalle).

**Data Flow:**

```text
Player -> Search UI -> GET /api/courts -> DB(courts, complexes)
   -> Select court -> GET /api/courts/{courtId} -> DB + Storage URLs
   -> Select date -> GET /api/courts/{courtId}/availability
      -> DB(court_availability + bookings) -> slot states for UI
```

---

## Risk Analysis

### Technical Risks

#### Risk 1: Inconsistencia entre estado real de reservas y slots mostrados

- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Backend, Database, Integration
- **Mitigation Strategy:**
  - Integration tests de composicion `court_availability` + `bookings`.
  - Casos de concurrencia sobre estados `held` y `booked`.
- **Test Coverage Required:** Contratos de disponibilidad + regresion de escenarios de conflicto de slot.

#### Risk 2: Degradacion de performance en filtros combinados y paginacion

- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Backend, Database
- **Mitigation Strategy:**
  - Tests de performance API sobre `GET /api/courts` y `GET /availability`.
  - Validar paginacion estable y filtros index-friendly.
- **Test Coverage Required:** Pruebas de p95 para endpoints de lectura y validacion de paginado en datasets amplios.

#### Risk 3: Exposicion de canchas inactivas o no publicadas

- **Impact:** Medium
- **Likelihood:** Medium
- **Area Affected:** Backend, Security
- **Mitigation Strategy:**
  - Tests de autorizacion/visibilidad para estados de publicacion.
  - Casos negativos con `courtId` invalido/inactivo.
- **Test Coverage Required:** API negative tests + validacion de reglas de negocio en UI.

---

### Business Risks

#### Risk 1: Baja confianza del usuario por datos desactualizados

- **Impact on Business:** Reduce conversion busqueda -> reserva y afecta objetivo de 12%.
- **Impact on Users:** Diego y Carla pierden confianza y abandonan flujo.
- **Likelihood:** High
- **Mitigation Strategy:**
  - Validar consistencia de disponibilidad en tiempo real bajo distintos estados.
  - Agregar pruebas de mensajes de feedback claros ante conflictos.
- **Acceptance Criteria Validation:** AC de disponibilidad real y feedback no bloqueante deben cubrirse con escenarios positivos y negativos.

#### Risk 2: Friccion de discovery por filtros confusos o resultados vacios sin contexto

- **Impact on Business:** Menor engagement y menor re-reserva.
- **Impact on Users:** Dificulta decision rapida para players.
- **Likelihood:** Medium
- **Mitigation Strategy:**
  - Tests UX/funcionales de empty state y validacion de rangos invalidos.
  - Verificar claridad de mensajes de error/no-results en mobile y desktop.

---

### Integration Risks

#### Integration Risk 1: Contrato UI/API desalineado en estructura de slots

- **Integration Point:** Frontend slot-grid <-> `GET /api/courts/{courtId}/availability`
- **What Could Go Wrong:** mismatch de campos (`startAt`, `endAt`, `status`) o estados no contemplados.
- **Impact:** High
- **Mitigation:**
  - Contract testing contra OpenAPI.
  - Integration tests de rendering de slot-grid con respuestas reales y edge cases.

#### Integration Risk 2: Datos incompletos de detalle por dependencia de DB + Storage

- **Integration Point:** Backend detail endpoint <-> PostgreSQL + Storage
- **What Could Go Wrong:** fotos invalidas, metadata incompleta o reglas vacias.
- **Impact:** Medium
- **Mitigation:**
  - Pruebas de integridad de payload de detalle.
  - Validacion de URIs y fallback de recursos faltantes.

---

## Critical Analysis & Questions for PO/Dev

### Ambiguities Identified

**Ambiguity 1: Definicion exacta de "zona" en filtros**

- **Found in:** STORY-CH-6
- **Question for PO:** La zona es texto libre, catalogo cerrado o geografia administrativa? Se permiten aliases?
- **Impact if not clarified:** Resultados inconsistentes, baja precision de busqueda y tests no deterministas.

**Ambiguity 2: Regla operativa de estado `held` para discovery**

- **Found in:** STORY-CH-7
- **Question for Dev:** Cual es el TTL del `held` y como se actualiza para que no se muestre disponibilidad falsa?
- **Impact if not clarified:** Sobreventa potencial y experiencia frustrante por conflicto al reservar.

**Ambiguity 3: Criterio de "inactivo/no publicado" en detalle**

- **Found in:** STORY-CH-8 y EPIC-CH-5 scope
- **Question for PO/Dev:** El comportamiento esperado es 404, 403 o mensaje de recurso no disponible con trazabilidad?
- **Impact if not clarified:** Comportamiento inconsistente entre API y UI y bugs de seguridad/percepcion.

---

### Missing Information

**Missing 1: Ventana de fechas configurable para disponibilidad**

- **Needed for:** Diseñar boundary tests de fechas y validar AC de rango.
- **Suggestion:** Documentar valor exacto de ventana (ej. 30 dias) y timezone oficial.

**Missing 2: Reglas de ordenamiento por defecto en resultados de busqueda**

- **Needed for:** Verificar consistencia de paginacion y regresion de resultados.
- **Suggestion:** Definir sort default (precio, relevancia, distancia u otro) en story/API contract.

**Missing 3: Politica de fallback para fotos invalidas**

- **Needed for:** Diseñar casos negativos de detalle sin romper UI.
- **Suggestion:** Definir placeholder oficial y respuesta esperada si una URI falla.

---

### Suggested Improvements (Before Implementation)

**Improvement 1: Formalizar ejemplos de filtros validos/invalidos en STORY-CH-6**

- **Story Affected:** STORY-CH-6
- **Current State:** AC cubre rangos invalidos solo para precio.
- **Suggested Change:** Agregar ejemplos de fecha invalida, page/pageSize fuera de rango y zona invalida.
- **Benefit:** Mejora cobertura negativa y reduce interpretacion ambigua entre Dev/QA.

**Improvement 2: Agregar AC explicito para estados de slot en conflicto**

- **Story Affected:** STORY-CH-7
- **Current State:** Se menciona matriz de slots, no el refresco/consistencia temporal.
- **Suggested Change:** Incluir AC sobre exactitud de `held`/`booked` y recarga de estado.
- **Benefit:** Reduce riesgo de sobreventa y facilita test de integracion.

**Improvement 3: Definir expected error contract para recursos no visibles**

- **Story Affected:** STORY-CH-8
- **Current State:** Se indica "not-found/unavailable" sin contrato concreto.
- **Suggested Change:** Fijar status code + error code + copy esperada para UI.
- **Benefit:** Alinea API/UI y hace automatizable la validacion de errores.

---

## Test Strategy

### Test Scope

**In Scope:**

- Functional testing (UI, API, Database) de CH-6, CH-7, CH-8.
- Integration testing de todos los puntos internos y de Storage URLs.
- Non-functional testing aplicable: performance, seguridad de validaciones, accesibilidad AA en vistas core.
- Cross-browser: Chrome, Firefox, Edge, Safari (ultimas 2).
- Mobile responsiveness: iOS Safari y Android Chrome.
- API contract validation segun `api-contracts.yaml`.
- Data validation de entradas/salidas segun FR-004, FR-005, FR-006.

**Out of Scope (For This Epic):**

- Recomendador inteligente, clustering de mapa, preferencias guardadas.
- Pruebas de pasarela de pagos y cancelaciones (epics posteriores).
- Pentesting completo y carga extrema (se coordina fuera del scope funcional de la epica).

---

### Test Levels

#### Unit Testing

- **Coverage Goal:** > 80%
- **Focus Areas:** validadores de query params, normalizacion de filtros, mapeo de estados de slots.
- **Responsibility:** Dev team (QA valida evidencia de cobertura).

#### Integration Testing

- **Coverage Goal:** 100% de integration points definidos para esta epica.
- **Focus Areas:** UI/API contracts, API/DB joins, detalle con fotos/metadata.
- **Responsibility:** QA + Dev.

#### End-to-End (E2E) Testing

- **Coverage Goal:** journeys criticos de discovery completos.
- **Tool:** Playwright.
- **Focus Areas:** filtro -> listado -> detalle -> disponibilidad; empty states; errores validables.
- **Responsibility:** QA team.

#### API Testing

- **Coverage Goal:** 100% de endpoints de discovery.
- **Tool:** Postman/Newman o Playwright API.
- **Focus Areas:** contrato OpenAPI, status codes, errores de validacion, reglas de visibilidad de recursos.
- **Responsibility:** QA team.

---

### Test Types per Story

**Positive Test Cases:**

- Happy path de filtros, detalle y disponibilidad.
- Variantes validas de datos por deporte/zona/precio/fecha.

**Negative Test Cases:**

- Rango de precio invalido, fechas fuera de ventana, `courtId` inexistente/inactivo.
- Parametros faltantes o formato invalido.

**Boundary Test Cases:**

- Min/max de `page`, `pageSize`, `priceMin`, `priceMax`.
- Fechas en limites de ventana y valores vacios/null.

**Exploratory Testing:**

- Recomendado en: coherencia de estados de slot bajo refresco, cambios rapidos de filtros en mobile, consistencia visual de empty/error states.
- Motivo: alta sensibilidad UX y puntos de integracion donde defectos no triviales aparecen en combinaciones de datos.

---

## Test Cases Summary by Story

### STORY-CH-6: Search courts by sport, zone, and price range

**Complexity:** Medium  
**Estimated Test Cases:** 22

- Positive: 7 test cases
- Negative: 7 test cases
- Boundary: 4 test cases
- Integration: 2 test cases
- API: 2 test cases

**Rationale for estimate:** Multiples combinaciones de filtros + paginacion + manejo de empty state y validaciones de rango.

**Parametrized Tests Recommended:** Yes  
Parametrizar combinaciones de filtros y rangos de precio para reducir duplicacion.

---

### STORY-CH-7: View available slots by date and time

**Complexity:** High  
**Estimated Test Cases:** 24

- Positive: 6 test cases
- Negative: 7 test cases
- Boundary: 5 test cases
- Integration: 4 test cases
- API: 2 test cases

**Rationale for estimate:** Tiene mayor riesgo por calculo de estados de slot, ventana temporal y consistencia entre disponibilidad y reservas.

**Parametrized Tests Recommended:** Yes  
Parametrizar fechas, estados de reserva existentes y configuraciones de disponibilidad.

---

### STORY-CH-8: View court details for decision making

**Complexity:** Medium  
**Estimated Test Cases:** 18

- Positive: 5 test cases
- Negative: 5 test cases
- Boundary: 3 test cases
- Integration: 3 test cases
- API: 2 test cases

**Rationale for estimate:** Menor complejidad transaccional pero requiere validar payload completo, visibilidad y manejo de recursos faltantes.

**Parametrized Tests Recommended:** No  
Casos son menos combinatorios y mas orientados a contrato fijo de detalle.

---

### Total Estimated Test Cases for Epic

**Total:** 64  
**Breakdown:**

- Positive: 18
- Negative: 19
- Boundary: 12
- Integration: 9
- API: 6

---

## Test Data Requirements

### Test Data Strategy

**Valid Data Sets:**

- User data: player activo con sesion valida y variaciones de perfil (Diego/Carla type personas).
- Court data: canchas activas por deportes distintos, zonas distintas y precios escalonados.
- Availability data: reglas semanales + bookings en estados `held`/`booked` para misma fecha.

**Invalid Data Sets:**

- `priceMin > priceMax`, `page = 0`, `pageSize > 50`, fecha invalida, `courtId` malformed.
- Inputs maliciosos en filtros (`<script>`, SQL-like payloads) para validar sanitizacion.

**Boundary Data Sets:**

- `priceMin = 0`, `priceMax = 0`, `page = 1`, `pageSize = 1` y `50`.
- Fecha en primer y ultimo dia permitido de ventana.
- Valores vacios, null y caracteres especiales.

**Test Data Management:**

- Use Faker.js para generar datos realistas.
- Crear factories para courts, complexes y bookings.
- No hardcodear datos estaticos sensibles en tests.
- Limpiar data creada al finalizar ejecucion.

---

### Test Environments

**Staging Environment:**

- URL: https://staging.canchahub.bo
- Database: Supabase staging
- External Services: Storage real de staging
- **Purpose:** Entorno principal para validacion funcional e integracion

**Production Environment:**

- URL: https://api.canchahub.bo
- **Purpose:** Solo smoke tests post-deployment
- **Restrictions:** No pruebas destructivas, no creacion de data de test no controlada

---

## Entry/Exit Criteria

### Entry Criteria (Per Story)

Testing can start when:

- [ ] Story implemented and deployed to staging
- [ ] Code review approved by 2+ reviewers
- [ ] Unit tests passing (>80% coverage)
- [ ] Dev smoke test completed
- [ ] No blocker bugs in dependencies
- [ ] Test data ready in staging
- [ ] API docs updated for any contract changes

### Exit Criteria (Per Story)

Story is done from QA perspective when:

- [ ] All planned test cases executed
- [ ] Critical/High tests: 100% passing
- [ ] Medium/Low tests: >=95% passing
- [ ] Critical and High bugs fixed and verified
- [ ] Medium bugs mitigated or scheduled
- [ ] Regression impact checks passed
- [ ] Applicable NFR validations completed
- [ ] Test report shared with team
- [ ] Known issues documented

### Epic Exit Criteria

Epic is done from QA perspective when:

- [ ] All stories meet exit criteria
- [ ] Cross-story integration testing complete
- [ ] E2E discovery journeys passing
- [ ] API contract tests complete for discovery endpoints
- [ ] NFR validations complete for applicable requirements
- [ ] Exploratory testing findings documented
- [ ] No critical/high bugs open
- [ ] QA sign-off approved

---

## Non-Functional Requirements Validation

### Performance Requirements

**NFR-PERF-003 / NFR-PERF-004**

- **Target:** p95 < 500ms para lectura API, queries simples p95 < 100ms, joins p95 < 250ms.
- **Test Approach:** medir latencia en `GET /api/courts`, `GET /api/courts/{courtId}`, `GET /availability` con dataset representativo.
- **Tools:** API timing (Postman/Newman), logs/APM, Lighthouse para UX de listado.

### Security Requirements

**NFR-SEC-002 / NFR-SEC-004 / NFR-SEC-006**

- **Requirement:** RBAC/RLS y validaciones robustas de input.
- **Test Approach:** negative tests de acceso a recursos inactivos, validacion de payloads maliciosos y enforcement de reglas server-side.
- **Tools:** API tests + manual security quick checks.

### Usability Requirements

**NFR-A11Y-001 / NFR-A11Y-002 / NFR-A11Y-004**

- **Requirement:** WCAG AA, navegacion por teclado y contraste adecuado.
- **Test Approach:** revisiones manuales en vistas de filtros, grid de slots y detalle; verificacion de foco y mensajes.

---

## Regression Testing Strategy

**Regression Scope:**

- [ ] Search/listado existente: riesgo de romper filtros o paginacion.
- [ ] Detail rendering: riesgo de payload incompleto y errores visuales.
- [ ] Future booking funnel entrypoint: riesgo de seleccionar slots inconsistentes.

**Regression Test Execution:**

- Ejecutar suite automatizada base antes de iniciar validacion de epica.
- Re-ejecutar al completar CH-6, CH-7, CH-8.
- Priorizar pruebas en integration points de disponibilidad.

---

## Testing Timeline Estimate

**Estimated Duration:** 0.5 sprint

**Breakdown:**

- Test case design: 1.5 dias
- Test data preparation: 1 dia
- Test execution: 1 dia por story
- Regression testing: 1 dia
- Bug fixing buffer: 2 dias
- Exploratory testing: 1 dia

**Dependencies:**

- Depends on: baseline de autenticacion EPIC-CH-1 para flujos autenticados si aplica.
- Blocks: calidad de entrada para epicas de booking/pago.

---

## Tools & Infrastructure

**Testing Tools:**

- E2E Testing: Playwright
- API Testing: Postman/Newman or Playwright API
- Unit Testing: Vitest/Jest segun modulo
- Performance Testing: Lighthouse, API timing
- Security Testing: Manual quick checks (OWASP top risks)
- Test Data: Faker.js

**CI/CD Integration:**

- [ ] Tests run on PR creation
- [ ] Tests run on merge to main/staging
- [ ] Tests run on deployment to staging
- [ ] Smoke tests run on production deployment

**Test Management:**

- Jira (story traceability)
- Test execution reports linked to stories
- Bug tracking in Jira

---

## Metrics & Reporting

**Test Metrics to Track:**

- Test cases executed vs total
- Pass rate by story
- Bug detection and fix rate
- Coverage evidence from unit/integration layers
- Time-to-test per story

**Reporting Cadence:**

- Daily status update during QA execution
- Story-level completion report
- Epic-level QA sign-off report

---

## Action Required

**@ProductOwner:**

- [ ] Review ambiguities and missing information (Critical Analysis section)
- [ ] Answer PO critical questions
- [ ] Validate business risks and impact
- [ ] Confirm scope coverage is complete

**@DevLead:**

- [ ] Review technical and integration risks
- [ ] Validate integration points identified
- [ ] Confirm architecture assumptions
- [ ] Answer technical open questions

**@QATeam:**

- [ ] Review test strategy and estimates
- [ ] Validate test levels and per-story split
- [ ] Confirm test data requirements
- [ ] Prepare staging environment and tooling

---

**Next Steps:**

1. Team reviews critical questions in refinement.
2. PO/Dev provide clarifications for ambiguities and missing definitions.
3. QA starts per-story acceptance test plan once clarifications are resolved.
4. Team validates entry criteria before sprint execution.
5. Implementation starts after critical questions are resolved.

---

**Documentation:** Full plan is mirrored in this file for versioning and in Jira Epic CH-5 comment/history.

---

## Notes & Assumptions

**Assumptions:**

- Dataset inicial de canchas permite probar combinaciones reales de filtros.
- Endpoint contracts en OpenAPI son baseline para pruebas.
- La ventana de disponibilidad sera definida por configuracion de negocio.

**Constraints:**

- No hay mockups detallados adjuntos en stories.
- Dependencia de datos staging consistentes para evaluar disponibilidad.
- Tiempo de QA estimado asume feedback rapido de PO/Dev.

**Known Limitations:**

- Sin definicion final de proveedor de mapas/recomendador en esta epica.
- Pruebas de carga extrema fuera de alcance de este plan.

**Exploratory Testing Sessions:**

- Recommended: 2 exploratory sessions before/early implementation.
  - Session 1: filtros + empty/error states en mobile y desktop.
  - Session 2: consistencia de slots (`held`/`booked`) bajo cambios de fecha y refresco.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/epic.md`
- **Stories:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-*/story.md`
- **Business Model:** `.context/idea/business-model.md`
- **PRD:** `.context/PRD/`
- **SRS:** `.context/SRS/`
- **Architecture:** `.context/SRS/architecture-specs.md`
- **API Contracts:** `.context/SRS/api-contracts.yaml`
