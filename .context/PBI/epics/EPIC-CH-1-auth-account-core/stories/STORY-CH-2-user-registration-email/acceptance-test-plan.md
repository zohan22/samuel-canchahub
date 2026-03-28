## 🧪 Acceptance Test Plan - Generated 2026-03-28

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

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**

- **Primary:** Diego Rojas (Player) - necesita registrarse rapido para reservar sin depender de llamadas/chats.
- **Secondary:** Carla Mendoza (Capitana) - requiere acceso confiable para coordinar reservas con su equipo.

**Business Value:**

- **Value Proposition:** reduce friccion inicial del onboarding y habilita el primer acceso a la plataforma.
- **Business Impact:** contribuye a KPI de >=300 players registrados y conversion busqueda -> reserva pagada >=12%.

**Related User Journey:**

- Journey: Reserva completa sin friccion (Happy Path)
- Step: precondicion de identidad para iniciar sesion y completar reserva

### Technical Context of This Story

**Frontend:**

- Components: formulario de registro (email, password, fullName), validaciones de campos, feedback de errores.
- Pages/Routes: ruta de registro (auth/register) y confirmacion de alta.
- State Management: estado local de formulario + estado de autenticacion post-registro.

**Backend:**

- API Endpoints: `POST /api/auth/register`
- Services: validacion de payload, alta en Supabase Auth, creacion de perfil en DB, mapeo de errores.
- Database: tabla `profiles` (creacion de registro con rol `player`).

**External Services:**

- Supabase Auth.

**Integration Points:**

- Frontend -> Auth API (`/api/auth/register`)
- Auth API -> Supabase Auth
- Auth API -> DB `profiles`

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

- Risk 1: Inconsistencia de sesion frontend/backend.
  - **Relevance to This Story:** impacto indirecto; registro debe devolver respuesta consistente para bootstrap de sesion.
- Risk 2: Politica de password incompleta.
  - **Relevance to This Story:** impacto directo; CH-2 define primer enforcement de policy.
- Risk 3: Error mapping inconsistente Frontend <-> API.
  - **Relevance to This Story:** impacto directo en mensajes de duplicate email y validacion.

**Integration Points from Epic Analysis:**

- Frontend <-> Auth API
  - **Applies to This Story:** ✅ Yes
  - **If Yes:** submit del form y render de respuesta/errores.
- Auth API <-> Supabase Auth
  - **Applies to This Story:** ✅ Yes
  - **If Yes:** creacion de usuario autenticable.
- Auth API <-> DB profiles
  - **Applies to This Story:** ✅ Yes
  - **If Yes:** persistencia de perfil con rol `player`.
- Auth API <-> Email provider
  - **Applies to This Story:** ❌ No

**Critical Questions Already Asked at Epic Level:**

**Questions for PO:**

- Politica completa de password (ademas de longitud 8-72)?
  - **Status:** ✅ Answered
  - **Answer:** password de 8-30 caracteres con minimo 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial/simbolo.
  - **Impact on This Story:** permite cerrar criterios de validacion, mensajes de error y datasets de boundary.

**Questions for Dev:**

- Catalogo canonico de `error.code` para auth.
  - **Status:** ✅ Proposed Default Applied
  - **Answer:** se adopta contrato uniforme de errores con `success=false`, `data=null`, `error={code,message,field?,details?}`.
  - **Impact on This Story:** mapeo estable FE/API, assertions reproducibles y menor ambiguedad de UX.

**Test Strategy from Epic:**

- Test Levels: Unit, Integration, E2E, API
- Tools: Playwright, Vitest, Postman
- **How This Story Aligns:** CH-2 requiere UI+API+Integration para validar alta atomica y UX de errores.

**Updates and Clarifications from Epic Refinement:**

- Se confirma policy de password para CH-2: 8-30 + complejidad (mayuscula/minuscula/numero/simbolo).
- Se confirma normalizacion: trim en inputs, email lowercase + unicidad case-insensitive.
- Se adopta comportamiento de idempotencia: si cuenta ya existe, responder error uniforme de duplicado sin crear nuevos registros.

**Summary: How This Story Fits in Epic:**

- **Story Role in Epic:** implementa el entrypoint de identidad (FR-001).
- **Inherited Risks:** password policy incompleta, inconsistencia de errores FE/API.
- **Unique Considerations:** consistencia atomica Auth + profiles en primera alta de cuenta.

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** definicion incompleta de password policy.

- **Location in Story:** Acceptance Criteria + Business Rules
- **Question for PO/Dev:** se exige mayuscula, minuscula, numero y simbolo, o solo longitud 8-72?
- **Impact on Testing:** no se puede cerrar set de pruebas negativas/edge con expected exacto.
- **Suggested Clarification:** agregar matriz explicita de reglas + mensaje esperado por violacion.

**Ambiguity 2:** contrato de error para email duplicado.

- **Location in Story:** Scenario 2
- **Question for PO/Dev:** cual es `error.code` y mensaje canonico para duplicate email?
- **Impact on Testing:** el assertion UI/API puede ser inestable entre entornos.
- **Suggested Clarification:** definir `error.code`, `error.message`, status code y campo afectado.

### Missing Information / Gaps

**Gap 1:** falta matriz de mensajes de error por validacion.

- **Type:** Acceptance Criteria
- **Why It's Critical:** evita rechazo ambiguo y mejora conversion en onboarding.
- **Suggested Addition:** tabla de errores para email, password, fullName, duplicate.
- **Impact if Not Added:** testing subjetivo y UX inconsistente.

**Gap 2:** falta regla de idempotencia/reintento en submit.

- **Type:** Technical Details
- **Why It's Critical:** doble click puede generar alta duplicada o respuestas confusas.
- **Suggested Addition:** definir comportamiento ante submit repetido con mismo payload.
- **Impact if Not Added:** riesgo de defectos de concurrencia.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** email con diferencia solo de mayusculas/minusculas.

- **Scenario:** `Test@Mail.com` ya existe y se intenta `test@mail.com`.
- **Expected Behavior:** rechazar como duplicado.
- **Criticality:** High
- **Action Required:** Add to story + test cases

**Edge Case 2:** trim de espacios en email y fullName.

- **Scenario:** usuario envia `"  diego@example.com  "` y `"  Diego Rojas  "`.
- **Expected Behavior:** normalizar antes de validar/persistir.
- **Criticality:** Medium
- **Action Required:** Add to test cases only

**Edge Case 3:** falla parcial Auth creado pero profile no.

- **Scenario:** error DB despues de crear usuario auth.
- **Expected Behavior:** compensacion/rollback para evitar inconsistencia.
- **Criticality:** High
- **Action Required:** Ask Dev + Add integration test

### Testability Validation

**Is this story testeable as written?** ⚠️ Partially

**Testability Issues:**

- [x] Acceptance criteria are vague or subjective
- [x] Expected results are not specific enough
- [x] Missing error scenarios (contract-level)
- [x] Cannot be tested in isolation (falta regla de consistencia atomica)

**Recommendations to Improve Testability:**

- definir password policy completa y catalogo de errores canonico
- explicitar comportamiento de idempotencia en submit repetido
- agregar AC de consistencia Auth/Profile

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Registro exitoso con datos validos

**Type:** Positive  
**Priority:** Critical

- **Given:** visitante no autenticado en pantalla de registro
- **When:** envia `email` valido, `password` (8-72), `fullName` (2-120)
- **Then:** API `POST /api/auth/register` responde `201 Created`
- **And:** se crea usuario en Supabase Auth
- **And:** se crea perfil en `profiles` con `role = player`
- **And:** UI muestra confirmacion de registro exitoso

### Scenario 2: Rechazo por email duplicado

**Type:** Negative  
**Priority:** High

- **Given:** existe cuenta previa para el email
- **When:** visitante envia el mismo email
- **Then:** API responde `400 Bad Request`
- **And:** `error.code` de duplicate email y mensaje accionable
- **And:** no se crea nuevo usuario ni nuevo profile

### Scenario 3: Rechazo por password invalido

**Type:** Negative  
**Priority:** High

- **Given:** visitante en registro
- **When:** envia password fuera de policy (8-30, mayuscula, minuscula, numero, simbolo)
- **Then:** API responde `400 Bad Request`
- **And:** UI muestra requisitos de password
- **And:** no se crea usuario/profile

### Scenario 4: Boundary de longitud en password y fullName

**Type:** Boundary  
**Priority:** High

- **Given:** visitante en registro
- **When:** envia valores 7,8,30,31 para password y 1,2,120,121 para fullName
- **Then:** solo 8-30 password y 2-120 fullName son aceptados

### Scenario 5: Consistencia atomica Auth + Profile

**Type:** Integration  
**Priority:** Critical

- **Given:** request valido y falla transitoria en DB al crear profile
- **When:** API procesa registro
- **Then:** no debe quedar usuario huerfano sin profile
- **And:** respuesta de error controlada al cliente

### Scenario 6: Edge case de normalizacion de email/fullName

**Type:** Edge Case  
**Priority:** Medium  
**Source:** Identified during critical analysis

- **Given:** valores con espacios y/o variacion de casing en email
- **When:** usuario envia registro
- **Then:** sistema aplica trim, email en lowercase, unicidad case-insensitive y validacion case-insensitive para fullName
- **And:** para email ya existente el sistema retorna mensaje uniforme de cuenta existente

---

## 🧪 Paso 4: Test Design

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

**Parametrized Tests Recommended:** ✅ Yes

**Parametrized Test Group 1:** Validaciones de campos de registro

- **Base Scenario:** validar aceptacion/rechazo por reglas de entrada
- **Parameters to Vary:** email, password, fullName, resultado esperado

| email | password | fullName | Expected Result |
| --- | --- | --- | --- |
| diego+1@example.com | Passw0rd! | Diego Rojas | 201 Created |
| invalid-email | Passw0rd! | Diego Rojas | 400 INVALID_EMAIL |
| diego+2@example.com | short7 | Diego Rojas | 400 INVALID_PASSWORD |
| diego+3@example.com | A234567890123456789012345678901! | Diego Rojas | 400 INVALID_PASSWORD |
| diego+4@example.com | Passw0rd! | D | 400 INVALID_FULLNAME |
| diego+5@example.com | Passw0rd! | Nombre de 121 caracteres xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx | 400 INVALID_FULLNAME |

**Total Tests from Parametrization:** 6  
**Benefit:** mayor cobertura de reglas con menor duplicacion.

### Nomenclatura de Test Outlines (Shift-Left)

Formato aplicado: `Validar <CORE> <CONDITIONAL>`

### Test Outlines

#### **Validar registro exitoso con datos validos**

**Related Scenario:** Scenario 1  
**Type:** Positive  
**Priority:** Critical  
**Test Level:** E2E  
**Parametrized:** ❌ No

**Preconditions:** visitante sin sesion activa; endpoint disponible.

**Test Steps:**
1. Abrir pantalla registro.
2. Completar `email`, `password`, `fullName` validos.
3. Enviar formulario y observar respuesta UI/API.

**Expected Result:** UI confirma registro; API `201`; profile creado con role `player`.

---

#### **Validar rechazo de registro cuando email ya existe**

**Related Scenario:** Scenario 2  
**Type:** Negative  
**Priority:** High  
**Test Level:** API/UI  
**Parametrized:** ✅ Yes (Group 1)

**Expected Result:** API `400`; error de duplicado; sin nuevo profile.

---

#### **Validar error de validacion cuando email es invalido**

**Related Scenario:** Scenario 3  
**Type:** Negative  
**Priority:** High  
**Test Level:** API/UI  
**Parametrized:** ✅ Yes (Group 1)

**Expected Result:** API `400`; `error.code` de formato email invalido; UI muestra mensaje accionable.

---

#### **Validar error de validacion cuando password no cumple policy**

**Related Scenario:** Scenario 3  
**Type:** Negative  
**Priority:** High  
**Test Level:** API/UI  
**Parametrized:** ✅ Yes (Group 1)

**Expected Result:** API `400`; sin creacion de auth/profile; guia visible de requisitos.

---

#### **Validar limite minimo de password al ingresar 8 caracteres**

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** High  
**Test Level:** API  
**Parametrized:** ✅ Yes (Group 1)

**Expected Result:** `8` acepta, `7` rechaza.

---

#### **Validar limite maximo de password al ingresar 72 caracteres**

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** High  
**Test Level:** API  
**Parametrized:** ✅ Yes (Group 1)

**Expected Result:** `30` acepta, `31` rechaza.

---

#### **Validar limite de fullName al ingresar 2 y 120 caracteres**

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** Medium  
**Test Level:** API/UI  
**Parametrized:** ✅ Yes (Group 1)

**Expected Result:** valores 2..120 aceptados; fuera de rango rechazados.

---

#### **Validar normalizacion de email cuando incluye espacios**

**Related Scenario:** Scenario 6  
**Type:** Edge Case  
**Priority:** Medium  
**Test Level:** API/UI  
**Parametrized:** ❌ No

**Expected Result:** trim aplicado antes de validar/persistir.

---

#### **Validar unicidad de email ignorando mayusculas/minusculas**

**Related Scenario:** Scenario 6  
**Type:** Edge Case  
**Priority:** High  
**Test Level:** API  
**Parametrized:** ❌ No

**Expected Result:** `Test@Mail.com` y `test@mail.com` tratados como duplicado con mensaje uniforme de cuenta existente.

---

#### **Validar consistencia de alta auth-profile ante falla de DB**

**Related Scenario:** Scenario 5  
**Type:** Integration  
**Priority:** Critical  
**Test Level:** Integration  
**Parametrized:** ❌ No

**Expected Result:** no quedan usuarios huerfanos; rollback/compensacion efectiva.

---

#### **Validar idempotencia de registro ante doble submit rapido**

**Related Scenario:** Scenario 5/6  
**Type:** Integration  
**Priority:** High  
**Test Level:** Integration/UI  
**Parametrized:** ❌ No

**Expected Result:** solo una cuenta creada; respuesta consistente al segundo submit.

---

## ✅ Clarifications Resolved (2026-03-28)

### CH-2 Decisions Confirmed

- Password policy final: 8-30, minimo 1 mayuscula, 1 minuscula, 1 numero, 1 simbolo.
- Input normalization: trim para campos de texto; email lowercase; unicidad case-insensitive para email.
- FullName: comparacion case-insensitive para validaciones funcionales.
- Duplicate behavior: si cuenta ya existe, no crear nuevos registros y devolver mensaje correspondiente uniforme.

### Error Contract (Default Applied - Good Practices)

- Status: `400 Bad Request` para errores de validacion y duplicados en registro.
- Response shape:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "La contrasena debe tener entre 8 y 30 caracteres e incluir mayuscula, minuscula, numero y simbolo.",
    "field": "password",
    "details": {
      "minLength": 8,
      "maxLength": 30,
      "requiredRules": [
        "uppercase",
        "lowercase",
        "number",
        "symbol"
      ]
    }
  }
}
```

- Canonical `error.code` para CH-2:
  - `INVALID_EMAIL`
  - `INVALID_PASSWORD`
  - `INVALID_FULLNAME`
  - `EMAIL_ALREADY_REGISTERED`

### Atomic Consistency Strategy (Default Applied)

- Flujo recomendado:
  1) validar payload
  2) crear usuario en Auth
  3) crear profile en DB
  4) si falla paso 3, ejecutar compensacion borrando usuario Auth creado en paso 2
- Resultado esperado: nunca dejar usuario huerfano en Auth sin profile asociado.

### CH-3 / CH-4 Defaults Accepted (PO/Dev)

- CH-3: aplicar definicion explicita de active user.
- CH-4: confirmar TTL/single-use para reset token.
- CH-4: mantener respuesta uniforme anti-enumeracion.
- CH-3/CH-4: definir y aplicar rate limiting.

---

#### **Validar contrato API de registro para respuesta 201**

**Related Scenario:** Scenario 1  
**Type:** API Contract  
**Priority:** High  
**Test Level:** API  
**Parametrized:** ❌ No

**Expected Result:** schema `AuthResponse` valido segun OpenAPI.

---

#### **Validar contrato API de error para respuesta 400**

**Related Scenario:** Scenario 2/3  
**Type:** API Contract  
**Priority:** High  
**Test Level:** API  
**Parametrized:** ❌ No

**Expected Result:** schema `ErrorResponse` valido; campos `success`, `data`, `error` presentes.

---

#### **Validar accesibilidad basica del formulario de registro**

**Related Scenario:** Scenario 1/3  
**Type:** Usability  
**Priority:** Medium  
**Test Level:** UI  
**Parametrized:** ❌ No

**Expected Result:** foco visible, labels correctos, mensajes de error legibles por teclado.

---

## 🔗 Integration Test Cases

### Integration Test 1: Frontend -> Backend -> Supabase Auth -> Profiles

**Integration Point:** Frontend -> `POST /api/auth/register` -> Supabase Auth + DB  
**Type:** Integration  
**Priority:** High

**Contract Validation:**

- Request format matches OpenAPI spec: ✅ Yes
- Response format matches OpenAPI spec: ✅ Yes
- Status codes match spec: ✅ Yes

**Expected Result:** flujo completo sin perdida de datos ni inconsistencias Auth/Profile.

---

## 📊 Edge Cases Summary

| Edge Case | Covered in Original Story? | Added to Refined AC? | Test Case | Priority |
| --- | --- | --- | --- | --- |
| Duplicate email by case-insensitive compare | ❌ No | ✅ Yes (Scenario 6) | Validar unicidad de email ignorando mayusculas/minusculas | High |
| Leading/trailing spaces normalization | ❌ No | ✅ Yes (Scenario 6) | Validar normalizacion de email cuando incluye espacios | Medium |
| Partial failure auth without profile | ❌ No | ✅ Yes (Scenario 5) | Validar consistencia de alta auth-profile ante falla de DB | High |

---

## 🗂️ Test Data Summary

### Data Categories

| Data Type | Count | Purpose | Examples |
| --- | --- | --- | --- |
| Valid data | 4 | Positive tests | `diego+ok@example.com`, password 8..72, fullName 2..120 |
| Invalid data | 5 | Negative tests | invalid email, duplicate email, weak password |
| Boundary values | 3 | Boundary tests | password 7/8/72/73, fullName 1/2/120/121 |
| Edge case data | 2 | Edge/integration tests | case-insensitive email, whitespace normalization |

### Data Generation Strategy

**Static Test Data:**

- `registered_player@example.com` (email ya existente)
- payloads de boundary (7,8,72,73 / 1,2,120,121)

**Dynamic Test Data (Faker.js):**

- emails unicos por corrida
- nombres realistas de longitud controlada

**Test Data Cleanup:**

- ✅ cleanup de cuentas de prueba por suite
- ✅ tests idempotentes
- ✅ sin dependencia de orden de ejecucion

---

## 🎯 Definition of Done (QA Perspective)

- [ ] Ambiguedades de password policy y error contract resueltas
- [ ] Story actualizada con mejoras aceptadas por PO
- [ ] Casos Critical/High 100% passing
- [ ] Casos Medium/Low >=95% passing
- [ ] Sin bugs Critical/High abiertos
- [ ] Integracion Auth/Profile validada
- [ ] Contract API validado contra OpenAPI

---

## 📎 Related Documentation

- **Story:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-2-user-registration-email/story.md`
- **Epic:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/epic.md`
- **Feature Test Plan:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-test-plan.md`
- **Business Model:** `.context/idea/business-model.md`
- **PRD:** `.context/PRD/`
- **SRS:** `.context/SRS/`
- **Architecture:** `.context/SRS/architecture-specs.md`
- **API Contracts:** `.context/SRS/api-contracts.yaml`

---

## 📋 Test Execution Tracking

**Test Execution Date:** [TBD]  
**Environment:** Staging  
**Executed By:** [TBD]

**Results:**

- Total Tests: 14
- Passed: [TBD]
- Failed: [TBD]
- Blocked: [TBD]

**Bugs Found:**

- [TBD]

**Sign-off:** [TBD]

---

## 📢 Action Required

**@ProductOwner:**

- [ ] Review and answer Critical Questions (password policy + duplicate email contract)
- [ ] Validate suggested story improvements
- [ ] Confirm expected behavior for edge cases (normalization/case-insensitive email)

**@DevLead:**

- [ ] Review Technical Questions (atomic consistency + idempotency)
- [ ] Validate integration points and test approach
- [ ] Confirm error-code strategy for frontend mapping

**@QATeam:**

- [ ] Review test outlines for completeness
- [ ] Validate parametrization strategy
- [ ] Prepare staging test data and cleanup scripts

---

**Next Steps:**

1. Team discusses critical questions and ambiguities.
2. PO/Dev provide answers and clarifications.
3. QA updates this plan based on feedback.
4. Dev starts implementation with clear acceptance criteria.

---

**Documentation:** Full test cases also available at:  
`.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-2-user-registration-email/acceptance-test-plan.md`
