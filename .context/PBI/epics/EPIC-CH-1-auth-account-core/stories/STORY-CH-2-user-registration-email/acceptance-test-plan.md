## Acceptance Test Plan - Generated 2026-03-28

**QA Engineer:** AI-Generated  
**Status:** Draft - Pending PO/Dev Review

---

# Acceptance Test Plan: STORY-CH-2 - User Registration Email

**Fecha:** 2026-03-28  
**QA Engineer:** AI-Generated  
**Story Jira Key:** CH-2  
**Epic:** EPIC-CH-1 - Authentication & Account Core  
**Status:** Draft

---

## Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Diego Rojas (Player) - necesita registrarse rapido para reservar sin depender de llamadas/chats.
- **Secondary:** Carla Mendoza (Capitana) - requiere acceso confiable para coordinar reservas con su equipo.

**Business Value:**
- **Value Proposition:** reduce friccion inicial del onboarding y habilita el primer acceso a la plataforma.
- **Business Impact:** contribuye a KPI de >=300 players registrados y conversion busqueda -> reserva pagada >=12%.

**Related User Journey:**
- Journey: Reserva completa sin friccion (Happy Path).
- Step: precondicion de identidad para iniciar sesion y completar reserva.

### Technical Context of This Story

**Frontend:**
- Components: formulario de registro (email, password, fullName), validaciones de campos, feedback de errores.
- Pages/Routes: ruta de registro (auth/register) y confirmacion de alta.
- State Management: estado local de formulario y estado de autenticacion post-registro.

**Backend:**
- API Endpoints: `POST /api/auth/register`.
- Services: validacion de payload, alta en Supabase Auth, creacion de perfil en DB, mapeo de errores.
- Database: tabla `profiles` (creacion de registro con rol `player`).

**External Services:**
- Supabase Auth.

**Integration Points:**
- Frontend -> Auth API (`/api/auth/register`).
- Auth API -> Supabase Auth.
- Auth API -> DB `profiles`.

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Business logic complexity: Medium - validaciones y UX de errores impactan conversion.
- Integration complexity: Medium - alta atomica entre Auth y perfil DB.
- Data validation complexity: High - limites de longitud y unicidad email.
- UI complexity: Medium - mensajes accionables y estados de loading/error.

**Estimated Test Effort:** Medium

**Rationale:** flujo corto, pero con riesgos criticos de consistencia y rechazo por validaciones.

### Epic-Level Context (From Feature Test Plan in Jira)

**Critical Risks Already Identified at Epic Level:**
- Risk 1: inconsistencia de sesion frontend/backend.
  - **Relevance to This Story:** impacto indirecto; registro debe devolver respuesta consistente para bootstrap de sesion.
- Risk 2: politica de password incompleta.
  - **Relevance to This Story:** impacto directo; CH-2 define primer enforcement de policy.
- Risk 3: error mapping inconsistente Frontend <-> API.
  - **Relevance to This Story:** impacto directo en mensajes de duplicate email y validacion.

**Integration Points from Epic Analysis:**
- Frontend <-> Auth API.
  - **Applies to This Story:** Yes
  - **If Yes:** submit del form y render de respuesta/errores.
- Auth API <-> Supabase Auth.
  - **Applies to This Story:** Yes
  - **If Yes:** creacion de usuario autenticable.
- Auth API <-> DB profiles.
  - **Applies to This Story:** Yes
  - **If Yes:** persistencia de perfil con rol `player`.
- Auth API <-> Email provider.
  - **Applies to This Story:** No

**Critical Questions Already Asked at Epic Level:**
- Politica completa de password (ademas de longitud 8-72)?
  - **Status:** Resuelto en CH-2 (8-30 + mayuscula/minuscula/numero/simbolo).
  - **Impact on This Story:** define set exacto de pruebas negativas y mensajes de error.
- Catalogo canonico de `error.code` para auth.
  - **Status:** Resuelto en CH-2.
  - **Impact on This Story:** necesario para validar mapeo UX estable y no ambiguo.

**Test Strategy from Epic:**
- Test Levels: Unit, Integration, E2E, API.
- Tools: Playwright, Vitest, Postman.
- **How This Story Aligns:** CH-2 requiere UI/API/Integration para validar alta atomica y UX de errores.

**Updates and Clarifications from CH-2 Comments:**
- Password policy confirmada: 8-30 con mayuscula, minuscula, numero y simbolo.
- Error contract canonico confirmado para CH-2.
- Normalizacion confirmada: `trim`, `email lowercase`, unicidad case-insensitive.
- Consistencia atomica confirmada: no dejar auth user sin profile (compensacion/rollback).
- Doble submit confirmado: mantener una sola cuenta; segunda respuesta uniforme de existente.

**Summary: How This Story Fits in Epic:**
- **Story Role in Epic:** implementa el entrypoint de identidad (FR-001).
- **Inherited Risks:** politica de password, consistencia de errores FE/API.
- **Unique Considerations:** consistencia atomica Auth + profiles en primera alta de cuenta.

---

## Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** conflicto historico de longitud de password en artefactos globales.
- **Location in Story:** Business Rules / SRS / OpenAPI.
- **Resolved Decision (CH-2 comments):** usar 8-30 para implementacion y testing.
- **Impact on Testing:** elimina ambiguedad en boundary tests.
- **Follow-up Required:** sincronizar story/SRS/OpenAPI si aun muestran 8-72.

**Ambiguity 2:** contrato de error para duplicate email y validaciones.
- **Location in Story:** escenarios de error.
- **Resolved Decision (CH-2 comments):** status `400` con `error.code` canonico.
- **Impact on Testing:** assertions API/UI estables entre entornos.
- **Suggested Clarification:** mantener catalogo de errores en contrato API compartido.

### Missing Information / Gaps

**Gap 1:** matriz oficial de errores por campo no estaba formalizada en story.
- **Type:** Acceptance Criteria / API behavior.
- **Why It's Critical:** evita rechazo ambiguo y mejora conversion en onboarding.
- **Applied Baseline:** `INVALID_EMAIL`, `INVALID_PASSWORD`, `INVALID_FULLNAME`, `EMAIL_ALREADY_REGISTERED`.

**Gap 2:** regla de idempotencia ante doble submit no estaba explicita.
- **Type:** Technical Details.
- **Why It's Critical:** previene alta duplicada o respuestas confusas.
- **Applied Baseline:** una sola cuenta creada; segundo intento responde de forma uniforme.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** email con diferencia solo por casing.
- **Scenario:** `Test@Mail.com` ya existe y se intenta `test@mail.com`.
- **Expected Behavior:** rechazar como duplicado.
- **Criticality:** High

**Edge Case 2:** trim de espacios en email y fullName.
- **Scenario:** usuario envia `"  diego@example.com  "` y `"  Diego Rojas  "`.
- **Expected Behavior:** normalizar antes de validar/persistir.
- **Criticality:** Medium

**Edge Case 3:** falla parcial Auth creado pero profile no.
- **Scenario:** error DB despues de crear usuario auth.
- **Expected Behavior:** compensacion/rollback para evitar inconsistencia.
- **Criticality:** High

### Testability Validation

**Is this story testable as written?** Yes, con clarificaciones CH-2 incorporadas.

**Testability Notes:**
- Validaciones de password y catalogo de errores ya son verificables.
- Consistencia atomica e idempotencia pueden probarse por integracion.
- Requiere alineacion documental para evitar drift futuro.

---

## Paso 3: Refined Acceptance Criteria

### Scenario 1: Registro exitoso con datos validos

**Type:** Positive  
**Priority:** Critical

- **Given:** visitante no autenticado en pantalla de registro.
- **When:** envia `email` valido, `password` (8-30 con reglas), `fullName` (2-120).
- **Then:** API `POST /api/auth/register` responde `201 Created`.
- **And:** se crea usuario en Supabase Auth.
- **And:** se crea perfil en `profiles` con `role = player`.
- **And:** UI muestra confirmacion de registro exitoso.

### Scenario 2: Rechazo por email duplicado

**Type:** Negative  
**Priority:** High

- **Given:** existe cuenta previa para el email (comparacion case-insensitive).
- **When:** visitante envia el mismo email.
- **Then:** API responde `400 Bad Request`.
- **And:** `error.code = EMAIL_ALREADY_REGISTERED` con mensaje accionable.
- **And:** no se crea nuevo usuario ni nuevo profile.

### Scenario 3: Rechazo por payload invalido

**Type:** Negative  
**Priority:** High

- **Given:** visitante en registro.
- **When:** envia email/password/fullName fuera de reglas.
- **Then:** API responde `400 Bad Request`.
- **And:** error code canonico por campo (`INVALID_EMAIL`, `INVALID_PASSWORD`, `INVALID_FULLNAME`).
- **And:** no se crea usuario/profile.

### Scenario 4: Boundary de longitud en password y fullName

**Type:** Boundary  
**Priority:** High

- **Given:** visitante en registro.
- **When:** envia valores 7,8,30,31 para password y 1,2,120,121 para fullName.
- **Then:** solo 8-30 password y 2-120 fullName son aceptados.

### Scenario 5: Consistencia atomica Auth + Profile

**Type:** Integration  
**Priority:** Critical

- **Given:** request valido y falla transitoria en DB al crear profile.
- **When:** API procesa registro.
- **Then:** no debe quedar usuario huerfano sin profile.
- **And:** respuesta de error controlada al cliente.

### Scenario 6: Normalizacion de datos

**Type:** Edge Case  
**Priority:** Medium

- **Given:** valores con espacios y/o variacion de casing en email.
- **When:** usuario envia registro.
- **Then:** sistema aplica `trim`, convierte email a lowercase y evalua unicidad case-insensitive.

### Scenario 7: Idempotencia ante doble submit

**Type:** Integration  
**Priority:** High

- **Given:** visitante hace doble submit rapido con mismo payload.
- **When:** backend procesa requests concurrentes/reintento.
- **Then:** solo una cuenta queda creada.
- **And:** respuesta del segundo intento es uniforme (`EMAIL_ALREADY_REGISTERED` o equivalente acordado).

---

## Paso 4: Test Design

### Test Coverage Analysis

**Total Test Cases Needed:** 14

**Breakdown:**
- Positive: 4
- Negative: 5
- Boundary: 3
- Integration: 1
- API: 1

**Rationale for This Number:** cubre happy path, errores funcionales clave, limites de campos y riesgo critico de consistencia transaccional.

### Parametrization Opportunities

**Parametrized Tests Recommended:** Yes

**Parametrized Test Group 1: Validaciones de campos de registro**

| email | password | fullName | Expected Result |
| --- | --- | --- | --- |
| diego1@example.com | ValidPass1! | Diego Rojas | 201 Created |
| invalid-email | ValidPass1! | Diego Rojas | 400 INVALID_EMAIL |
| diego2@example.com | short7! | Diego Rojas | 400 INVALID_PASSWORD |
| diego3@example.com | VALIDONLY123 | Diego Rojas | 400 INVALID_PASSWORD |
| diego4@example.com | ValidPass1! | D | 400 INVALID_FULLNAME |
| diego5@example.com | ValidPass1! | Name too long (121) | 400 INVALID_FULLNAME |

**Total Tests from Parametrization:** 6  
**Benefit:** mayor cobertura de reglas con menor duplicacion.

---

## Test Outlines

### Validar registro exitoso con datos validos

**Related Scenario:** Scenario 1  
**Type:** Positive  
**Priority:** Critical  
**Test Level:** E2E  
**Parametrized:** No

**Preconditions:** visitante sin sesion activa; endpoint disponible.

**Test Steps:**
1. Abrir pantalla registro.
2. Completar `email`, `password`, `fullName` validos.
3. Enviar formulario y observar respuesta UI/API.

**Expected Result:** UI confirma registro; API `201`; profile creado con role `player`.

### Validar rechazo de registro cuando email ya existe

**Related Scenario:** Scenario 2  
**Type:** Negative  
**Priority:** High  
**Test Level:** API/UI  
**Parametrized:** Yes (Group 1)

**Expected Result:** API `400`; `EMAIL_ALREADY_REGISTERED`; sin nuevo profile.

### Validar error de validacion cuando email es invalido

**Related Scenario:** Scenario 3  
**Type:** Negative  
**Priority:** High  
**Test Level:** API/UI  
**Parametrized:** Yes (Group 1)

**Expected Result:** API `400`; `INVALID_EMAIL`; UI muestra mensaje accionable.

### Validar error de validacion cuando password no cumple policy

**Related Scenario:** Scenario 3  
**Type:** Negative  
**Priority:** High  
**Test Level:** API/UI  
**Parametrized:** Yes (Group 1)

**Expected Result:** API `400`; `INVALID_PASSWORD`; sin creacion de auth/profile.

### Validar limite de password en 8 y 30 caracteres

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** High  
**Test Level:** API  
**Parametrized:** Yes

**Expected Result:** `8` y `30` aceptan; `7` y `31` rechazan.

### Validar limite de fullName en 2 y 120 caracteres

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** Medium  
**Test Level:** API/UI  
**Parametrized:** Yes

**Expected Result:** valores 2..120 aceptados; fuera de rango rechazados.

### Validar normalizacion de email/fullName cuando incluye espacios

**Related Scenario:** Scenario 6  
**Type:** Edge Case  
**Priority:** Medium  
**Test Level:** API/UI  
**Parametrized:** No

**Expected Result:** trim aplicado antes de validar/persistir.

### Validar unicidad de email ignorando mayusculas/minusculas

**Related Scenario:** Scenario 6  
**Type:** Edge Case  
**Priority:** High  
**Test Level:** API  
**Parametrized:** No

**Expected Result:** `Test@Mail.com` y `test@mail.com` tratados como duplicado.

### Validar consistencia de alta auth-profile ante falla de DB

**Related Scenario:** Scenario 5  
**Type:** Integration  
**Priority:** Critical  
**Test Level:** Integration  
**Parametrized:** No

**Expected Result:** no quedan usuarios huerfanos; compensacion efectiva.

### Validar idempotencia de registro ante doble submit rapido

**Related Scenario:** Scenario 7  
**Type:** Integration  
**Priority:** High  
**Test Level:** Integration/UI  
**Parametrized:** No

**Expected Result:** solo una cuenta creada; respuesta consistente en segundo submit.

### Validar contrato API de registro para respuesta 201

**Related Scenario:** Scenario 1  
**Type:** API Contract  
**Priority:** High  
**Test Level:** API  
**Parametrized:** No

**Expected Result:** schema `AuthResponse` valido segun OpenAPI.

### Validar contrato API de error para respuesta 400

**Related Scenario:** Scenario 2/3  
**Type:** API Contract  
**Priority:** High  
**Test Level:** API  
**Parametrized:** No

**Expected Result:** schema `ErrorResponse` valido; campos `success`, `data`, `error` presentes.

### Validar feedback UI claro y accionable en errores de registro

**Related Scenario:** Scenario 2/3  
**Type:** Usability  
**Priority:** Medium  
**Test Level:** UI  
**Parametrized:** No

**Expected Result:** mensajes no tecnicos, orientados a correccion del usuario.

### Validar accesibilidad basica del formulario de registro

**Related Scenario:** Scenario 1/3  
**Type:** Usability  
**Priority:** Medium  
**Test Level:** UI  
**Parametrized:** No

**Expected Result:** foco visible, labels correctos, mensajes de error legibles por teclado.

---

## Integration Test Cases

### Integration Test 1: Frontend -> Backend -> Supabase Auth -> Profiles

- **Integration Point:** Frontend -> `POST /api/auth/register` -> Supabase Auth + DB.
- **Type:** Integration
- **Priority:** High

**Contract Validation:**
- Request format matches OpenAPI spec: Yes
- Response format matches OpenAPI spec: Yes
- Status codes match spec: Yes

**Expected Result:** flujo completo sin perdida de datos ni inconsistencias Auth/Profile.

---

## Edge Cases Summary

| Edge Case | Covered in Original Story? | Added to Refined AC? | Test Case | Priority |
| --- | --- | --- | --- | --- |
| Duplicate email by case-insensitive compare | No | Yes (Scenario 6) | Validar unicidad de email ignorando mayusculas/minusculas | High |
| Leading/trailing spaces normalization | No | Yes (Scenario 6) | Validar normalizacion de email/fullName cuando incluye espacios | Medium |
| Partial failure auth without profile | No | Yes (Scenario 5) | Validar consistencia de alta auth-profile ante falla de DB | High |
| Double submit idempotency | No | Yes (Scenario 7) | Validar idempotencia de registro ante doble submit rapido | High |

---

## Test Data Summary

### Data Categories

| Data Type | Count | Purpose | Examples |
| --- | --- | --- | --- |
| Valid data | 4 | Positive tests | `diego+ok@example.com`, password policy-compliant, fullName 2..120 |
| Invalid data | 5 | Negative tests | invalid email, duplicate email, weak password |
| Boundary values | 3 | Boundary tests | password 7/8/30/31, fullName 1/2/120/121 |
| Edge case data | 3 | Edge/integration tests | case-insensitive email, whitespace normalization, double submit |

### Data Generation Strategy

**Static Test Data:**
- `registered_player@example.com` (email ya existente).
- payloads de boundary (7,8,30,31 / 1,2,120,121).

**Dynamic Test Data (Faker.js):**
- emails unicos por corrida.
- nombres realistas de longitud controlada.

**Test Data Cleanup:**
- cleanup de cuentas de prueba por suite.
- tests idempotentes.
- sin dependencia de orden de ejecucion.

---

## Definition of Done (QA Perspective)

- Ambiguedades de password policy y error contract resueltas.
- Story actualizada con mejoras aceptadas por PO.
- Casos Critical/High 100% passing.
- Casos Medium/Low >=95% passing.
- Sin bugs Critical/High abiertos.
- Integracion Auth/Profile validada.
- Contract API validado contra OpenAPI.

---

## Related Documentation

- **Story:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-2-user-registration-email/story.md`
- **Epic:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/epic.md`
- **Feature Test Plan:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-test-plan.md`
- **Business Model:** `.context/idea/business-model.md`
- **PRD:** `.context/PRD/`
- **SRS:** `.context/SRS/`
- **Architecture:** `.context/SRS/architecture-specs.md`
- **API Contracts:** `.context/SRS/api-contracts.yaml`

---

## Test Execution Tracking

**Test Execution Date:** TBD  
**Environment:** Staging  
**Executed By:** TBD

**Results:**
- Total Tests: 14
- Passed: TBD
- Failed: TBD
- Blocked: TBD

**Bugs Found:**
- TBD

**Sign-off:** TBD

---

## Action Required

**@ProductOwner:**
- Validar que los criterios refinados de CH-2 reflejan decisiones finales del negocio.
- Confirmar mensajes UX de error por cada `error.code`.

**@DevLead:**
- Confirmar implementacion de compensacion Auth/Profile.
- Confirmar tratamiento de concurrencia para doble submit.
- Verificar que contrato API expone codigos canonicos acordados.

**@QATeam:**
- Revisar completitud de casos y parametrizacion.
- Preparar data de staging y scripts de cleanup.
- Ejecutar priorizando Critical/High.

**Next Steps:**
1. Alinear artefactos globales (story/SRS/OpenAPI) con policy 8-30.
2. Ejecutar ATP en staging con datos controlados.
3. Registrar resultados y defectos en Jira CH-2.

---

**Documentation:** Full test cases mirror at:
`.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-2-user-registration-email/acceptance-test-plan.md`
