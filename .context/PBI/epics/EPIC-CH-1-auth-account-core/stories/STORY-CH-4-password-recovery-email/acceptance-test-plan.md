## 🧪 Acceptance Test Plan - Generated 2026-03-28

**QA Engineer:** AI-Generated  
**Status:** Draft - Pending PO/Dev Review

---

# Acceptance Test Plan: STORY-CH-4 - Password Recovery Email

**Fecha:** 2026-03-28  
**QA Engineer:** AI-Generated  
**Story Jira Key:** CH-4  
**Epic:** EPIC-CH-1 - Authentication & Account Core  
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**

- **Primary:** Diego Rojas (Player) - necesita recuperar acceso rapido para no abandonar el flujo de reserva.
- **Secondary:** Carla Mendoza (Capitana) - depende de acceso estable para coordinar reservas del equipo.

**Business Value:**

- **Value Proposition:** evitar bloqueo de usuarios por credenciales olvidadas con una recuperacion segura y simple.
- **Business Impact:** protege conversion y retencion al reducir abandono por fallos de autenticacion.

**Related User Journey:**

- Journey: Reserva completa sin friccion.
- Step: Paso previo/condicionante del login exitoso (pre-step de acceso).

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**

- Components: formulario forgot password, formulario reset password, vistas de feedback de validacion.
- Pages/Routes: `/forgot-password`, `/reset-password` (o rutas equivalentes definidas por App Router).
- State Management: estado local de formulario + manejo de errores de API.

**Backend:**

- API Endpoints:
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`
- Services: auth service para token lifecycle, password validation, error mapping.
- Database: actualizacion indirecta de credenciales en Supabase Auth; sin mutacion directa de `profiles` esperada.

**External Services:**

- Supabase Auth para reset token y actualizacion de password.
- Email provider transaccional para entrega del reset link.

**Integration Points:**

- Frontend -> Auth API (request/validation/feedback).
- Auth API -> Supabase Auth (token generation and reset confirmation).
- Auth API -> Email provider (forgot-password delivery).

---

### Story Complexity Analysis

**Overall Complexity:** High

**Complexity Factors:**

- Business logic complexity: **Medium** - flujo entendible, pero con reglas de seguridad obligatorias.
- Integration complexity: **High** - depende de auth provider y proveedor email.
- Data validation complexity: **High** - token lifecycle + password policy + anti-enumeracion.
- UI complexity: **Medium** - feedback claro, errores accionables, estados de formulario.

**Estimated Test Effort:** High  
**Rationale:** flujo multi-step con riesgos de seguridad y experiencia de usuario sensibles.

---

### Epic-Level Context (From Feature Test Plan in Jira)

**Critical Risks Already Identified at Epic Level:**

- Risk 1: Inconsistencia de sesion frontend/backend.
  - **Relevance to This Story:** impacto indirecto al validar login con nueva password tras reset.
- Risk 2: Enumeracion de cuentas en forgot-password.
  - **Relevance to This Story:** impacto directo en seguridad y cumplimiento de business rule.
- Risk 3: Politica de password incompleta.
  - **Relevance to This Story:** impacto directo en validaciones de reset-password.

**Integration Points from Epic Analysis:**

- Frontend <-> Backend API
  - **Applies to This Story:** ✅ Yes
  - **If Yes:** validar mensajes de error y consistencia de response contract.
- API <-> Supabase Auth
  - **Applies to This Story:** ✅ Yes
  - **If Yes:** validar token generation/expiry/single-use y update de credenciales.
- API <-> Email Provider
  - **Applies to This Story:** ✅ Yes
  - **If Yes:** validar solicitud de envio y resultado funcional del reset link.

**Critical Questions Already Asked at Epic Level:**

**Questions for PO:**

- Question: TTL exacto, single-use obligatorio y comportamiento tras nuevo request?
  - **Status:** ⏳ Pending (sin valor numerico confirmado en comentarios)
  - **Impact on This Story:** define expected result para token expirado/superseded.

**Questions for Dev:**

- Question: mantener respuesta uniforme anti-enumeracion en forgot-password?
  - **Status:** ✅ Answered (confirmado en comentario de clarificaciones cross-story).
  - **Impact on This Story:** obliga test negativo con mismo status/message para email existente y no existente.
- Question: definir rate limiting para login/forgot-password?
  - **Status:** ⏳ Pending (confirmado que debe existir, faltan thresholds tecnicos).
  - **Impact on This Story:** faltan criterios medibles para pruebas de abuso.

**Test Strategy from Epic:**

- Test Levels: Unit + Integration + E2E + API.
- Tools: Playwright, Postman/Newman (o Playwright API), validacion de contratos OpenAPI.
- **How This Story Aligns:** STORY-CH-4 requiere cobertura en las cuatro capas por su riesgo de seguridad e integraciones externas.

**Updates and Clarifications from Epic Refinement:**

- Se acepta mantener anti-enumeracion en CH-4.
- Se acepta explicitar TTL/single-use para CH-4 (faltan valores concretos).
- Se acepta definir rate limiting para CH-4 (faltan thresholds).

**Summary: How This Story Fits in Epic:**

- **Story Role in Epic:** habilita recuperacion segura de cuenta para continuidad del flujo autenticado.
- **Inherited Risks:** anti-enumeracion, policy inconsistente, dependencia de integracion email/auth.
- **Unique Considerations:** ciclo de vida del token de reset (valid/expired/reused/superseded) y paridad de policy con registro.

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** TTL de reset token no definido en valor concreto.

- **Location in Story:** Business Rules.
- **Question for PO/Dev:** cual es la expiracion oficial (ej. 15 min, 30 min, 1 h)?
- **Impact on Testing:** no se puede fijar assertion exacta para expiracion.
- **Suggested Clarification:** agregar valor de TTL en AC o technical notes.

**Ambiguity 2:** comportamiento de multiples solicitudes de reset no esta explicitado.

- **Location in Story:** Workflow.
- **Question for PO/Dev:** al generar un nuevo token, el anterior se invalida inmediatamente?
- **Impact on Testing:** no se puede validar regla de superseded token con certeza.
- **Suggested Clarification:** agregar regla de invalidacion de tokens previos.

### Missing Information / Gaps

**Gap 1:** matriz de errores esperados (`error.code` + `message`) para forgot/reset.

- **Type:** Acceptance Criteria.
- **Why It's Critical:** FE y QA necesitan respuestas deterministicas para validar UX y contratos.
- **Suggested Addition:** tabla de errores canonica por endpoint.
- **Impact if Not Added:** alto riesgo de validaciones ambiguas y tests inestables.

**Gap 2:** regla medible de rate limiting en forgot-password.

- **Type:** Security Rule.
- **Why It's Critical:** sin threshold no existe prueba verificable anti-abuso.
- **Suggested Addition:** limite por IP/email + ventana temporal + respuesta esperada.
- **Impact if Not Added:** brecha de seguridad y cobertura incompleta.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** token ya usado (replay attack).

- **Scenario:** usuario intenta reutilizar token tras reset exitoso.
- **Expected Behavior:** rechazo con error de token invalido/usado; sin cambios de credenciales.
- **Criticality:** High
- **Action Required:** Add to story + add to test cases.

**Edge Case 2:** nuevo request de reset invalida token anterior.

- **Scenario:** usuario solicita dos reset links y usa el primero.
- **Expected Behavior:** primer token debe fallar por superseded, segundo debe funcionar.
- **Criticality:** High
- **Action Required:** Ask PO/Dev + add to test cases.

**Edge Case 3:** anti-enumeracion para email inexistente.

- **Scenario:** usuario envia email no registrado en forgot-password.
- **Expected Behavior:** respuesta indistinguible frente a email registrado.
- **Criticality:** High
- **Action Required:** Add to story + add to test cases.

### Testability Validation

**Is this story testable as written?** ⚠️ Partially

**Testability Issues:**

- [x] Expected results are not specific enough.
- [x] Missing error scenarios catalog.
- [x] Missing security criteria (rate limiting thresholds).

**Recommendations to Improve Testability:**

- Explicitar TTL y comportamiento de token superseded.
- Definir matriz de errores por endpoint.
- Agregar AC de rate limiting y lockout behavior.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Forgot-password request with registered email

**Type:** Positive  
**Priority:** Critical

- **Given:** usuario registrado `player.reset+ok@canchahub.test`.
- **When:** envia `POST /api/auth/forgot-password` con su email.
- **Then:** API responde `200` con payload `BasicSuccessResponse`.
- **Then:** se genera token de reset de un solo uso y se solicita envio de email.
- **Then:** la respuesta no expone estado de existencia de cuenta.

---

### Scenario 2: Reset-password with valid token and compliant password

**Type:** Positive  
**Priority:** Critical

- **Given:** token valido no expirado y no usado.
- **When:** usuario envia `POST /api/auth/reset-password` con `newPassword` valida (8..72).
- **Then:** API responde `200`, password queda actualizada.
- **Then:** password anterior ya no autentica y password nueva autentica correctamente.

---

### Scenario 3: Reset-password with expired or invalid token

**Type:** Negative  
**Priority:** High

- **Given:** token expirado o corrupto.
- **When:** usuario envia reset request.
- **Then:** API responde error (`400` segun contract) con `ErrorResponse`.
- **Then:** credenciales no cambian y usuario recibe guidance para solicitar nuevo link.

---

### Scenario 4: Reset-password with weak/boundary-invalid password

**Type:** Boundary  
**Priority:** High

- **Given:** token valido.
- **When:** usuario envia password de longitud `7` o `73` (fuera de contrato).
- **Then:** API rechaza con error de validacion y no actualiza credenciales.

---

### Scenario 5: Token replay after successful reset

**Type:** Edge Case  
**Priority:** High

- **Given:** token ya consumido en un reset exitoso.
- **When:** se reintenta `POST /api/auth/reset-password` con el mismo token.
- **Then:** operacion rechazada por token usado/invalido.
- **Then:** **⚠️ NOTE:** confirmar `error.code` exacto con Dev.

---

### Scenario 6: Anti-enumeration with non-existing email

**Type:** Security Edge Case  
**Priority:** Critical

- **Given:** email no registrado `unknown+test@canchahub.test`.
- **When:** se ejecuta forgot-password.
- **Then:** status, payload shape y mensaje son equivalentes al caso de email existente.
- **Then:** no se filtra existencia/no existencia por contenido o timing evidente.

---

## 🧪 Paso 4: Test Design

### Test Coverage Analysis

**Total Test Cases Needed:** 14

**Breakdown:**

- Positive: 4 test cases
- Negative: 4 test cases
- Boundary: 3 test cases
- Integration: 2 test cases
- API: 1 test case

**Rationale for This Number:** cobertura suficiente para flujo multi-step y riesgos criticos sin sobre-duplicar escenarios.

---

### Parametrization Opportunities

**Parametrized Tests Recommended:** ✅ Yes

**Parametrized Test Group 1:** Validar lifecycle de reset token

- **Base Scenario:** validacion de reset token en `POST /api/auth/reset-password`.
- **Parameters to Vary:** tipo de token, estado esperado, cambio de credencial.

| Token Type  | Token State     | Expected Status | Expected Result                      |
| ----------- | --------------- | --------------- | ------------------------------------ |
| valid       | fresh           | 200             | password actualizada                 |
| invalid     | malformed       | 400             | error de validacion/token            |
| expired     | ttl_exceeded    | 400             | error token expirado                 |
| reused      | already_used    | 400             | error token usado                    |
| superseded  | old_after_new   | 400             | error token invalido por reemplazo   |

**Total Tests from Parametrization:** 5  
**Benefit:** reduce duplicacion y estandariza verificaciones de token lifecycle.

---

**Parametrized Test Group 2:** Validar limites de newPassword

- **Base Scenario:** validacion de longitud/policy para `newPassword`.
- **Parameters to Vary:** longitud y expected status.

| Password Length | Example Value           | Expected Status | Expected Result             |
| --------------- | ----------------------- | --------------- | --------------------------- |
| 7               | `Aa1!aaa`               | 400             | rechazo por minLength       |
| 8               | `Aa1!aaaa`              | 200             | aceptada (si policy cumple) |
| 72              | `Aa1!` + 68 chars       | 200             | aceptada                    |
| 73              | `Aa1!` + 69 chars       | 400             | rechazo por maxLength       |

**Total Tests from Parametrization:** 4

---

### Test Outlines

#### **Validar solicitud forgot-password con email registrado**

**Related Scenario:** Scenario 1  
**Type:** Positive  
**Priority:** Critical  
**Test Level:** API

**Preconditions:** usuario registrado en staging, email provider operativo.

**Test Steps:**

1. Enviar `POST /api/auth/forgot-password` con email registrado.
2. Verificar status, shape de respuesta y ausencia de leakage.

**Expected Result:**

- **Status Code:** `200`
- **Response Shape:** `BasicSuccessResponse`
- **Security:** no expone si la cuenta existe.

---

#### **Validar solicitud forgot-password con email no registrado**

**Related Scenario:** Scenario 6  
**Type:** Negative/Security  
**Priority:** Critical  
**Test Level:** API

**Expected Result:** status/mensaje equivalente al caso con email registrado.

---

#### **Validar reset exitoso con token valido y password compliant**

**Related Scenario:** Scenario 2  
**Type:** Positive  
**Priority:** Critical  
**Test Level:** Integration

**Expected Result:** password actualizada; login con nueva password exitoso; login con password anterior falla.

---

#### **Validar rechazo de reset con token expirado**

**Related Scenario:** Scenario 3  
**Type:** Negative  
**Priority:** High  
**Test Level:** API

**Expected Result:** error de token expirado; no cambia credencial.

---

#### **Validar rechazo de reset con token invalido/malformado**

**Related Scenario:** Scenario 3  
**Type:** Negative  
**Priority:** High  
**Test Level:** API

**Expected Result:** `400` + `ErrorResponse`; guidance para solicitar nuevo link.

---

#### **Validar rechazo de reset con token reutilizado**

**Related Scenario:** Scenario 5  
**Type:** Edge Case  
**Priority:** High  
**Test Level:** Integration

**Expected Result:** segundo intento con mismo token falla; sin cambios adicionales en credenciales.

---

#### **Validar password minima aceptada (8 chars)**

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** Medium  
**Test Level:** API

---

#### **Validar password maxima aceptada (72 chars)**

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** Medium  
**Test Level:** API

---

#### **Validar password por debajo del minimo (7 chars)**

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** High  
**Test Level:** API

---

#### **Validar password por encima del maximo (73 chars)**

**Related Scenario:** Scenario 4  
**Type:** Boundary  
**Priority:** High  
**Test Level:** API

---

#### **Validar invalidacion de token anterior tras nuevo forgot request**

**Related Scenario:** Edge Case 2  
**Type:** Edge Case  
**Priority:** High  
**Test Level:** Integration

**Note:** requiere confirmacion de regla final por PO/Dev.

---

#### **Validar feedback UX accionable para errores de reset**

**Related Scenario:** Scenario 3/4  
**Type:** Positive UX  
**Priority:** Medium  
**Test Level:** UI/E2E

**Expected Result:** mensajes claros, focus en error, sin texto tecnico interno.

---

## 🔗 Integration Test Cases

### Integration Test 1: Frontend <-> Backend auth reset flow

**Integration Point:** Frontend -> `/api/auth/forgot-password` -> `/api/auth/reset-password`  
**Type:** Integration  
**Priority:** High

**Contract Validation:**

- Request/response shape alineado con `api-contracts.yaml`.
- Status codes esperados (`200` y `400`) respetados.

**Expected Result:** flujo completo operativo, sin desalineacion UI/API.

---

### Integration Test 2: Backend <-> Email provider delivery trigger

**Integration Point:** API -> Email Provider  
**Type:** Integration  
**Priority:** High

**Mock Strategy:**

- Automated: usar mock/sandbox provider.
- Staging manual: validar envio real de correo de reset.

**Expected Result:** solicitud de reset dispara email con link valido dentro de SLA de staging.

---

## 📊 Edge Cases Summary

| Edge Case | Covered in Original Story? | Added to Refined AC? | Test Case | Priority |
| --------- | -------------------------- | -------------------- | --------- | -------- |
| Token reutilizado | ❌ No | ✅ Yes (Scenario 5) | Validar rechazo token reutilizado | High |
| Token superseded por nuevo request | ❌ No | ⚠️ Pending PO/Dev confirmation | Validar invalidacion de token anterior | High |
| Anti-enumeracion email inexistente | ⚠️ Solo en Business Rule | ✅ Yes (Scenario 6) | Validar respuesta uniforme en forgot-password | Critical |
| Password 7/8/72/73 | ⚠️ Parcial (solo weak) | ✅ Yes (Scenario 4) | Suite boundary password length | High |

---

## 🗂️ Test Data Summary

### Data Categories

| Data Type | Count | Purpose | Examples |
| --------- | ----- | ------- | -------- |
| Valid data | 4 | Positive tests | registered email, valid token, compliant passwords |
| Invalid data | 5 | Negative tests | malformed email, invalid token, expired token |
| Boundary values | 4 | Boundary tests | password lengths 7/8/72/73 |
| Edge case data | 3 | Security/edge tests | reused token, superseded token, unknown email |

### Data Generation Strategy

**Static Test Data:**

- `player.reset+ok@canchahub.test`
- `unknown+test@canchahub.test`

**Dynamic Test Data (Faker.js):**

- `faker.internet.email()` para cuentas de prueba nuevas.
- `faker.string.alphanumeric()` para payloads complementarios.

**Test Data Cleanup:**

- ✅ Cuentas de prueba eliminadas o marcadas para purge de staging.
- ✅ Casos idempotentes para re-ejecucion.

---

## 📢 Action Required

**@ProductOwner:**

- [ ] Confirmar TTL exacto de reset token.
- [ ] Confirmar comportamiento oficial para token superseded.
- [ ] Validar AC explicito de anti-enumeracion.

**@DevLead:**

- [ ] Confirmar catalogo `error.code` para forgot/reset.
- [ ] Confirmar thresholds de rate limiting (IP/email/window).
- [ ] Confirmar invalidacion de password anterior tras reset exitoso.

**@QATeam:**

- [ ] Revisar cobertura de token lifecycle.
- [ ] Preparar datos de prueba para escenarios de expiracion.
- [ ] Definir evidencia requerida para UI/API/integration.

---

## ✅ Acceptance Test Plan - Execution Summary

**Story:** CH-4 - As a user, I want to recover my password so that I can regain account access  
**Analysis Date:** 2026-03-28

### 📊 Summary for PO/Dev

**Story Quality Assessment:** ⚠️ Needs Improvement

**Key Findings:**

1. La story cubre el flujo base, pero faltan criterios medibles para token lifecycle.
2. Falta matriz formal de errores para validar UX/API de forma deterministica.
3. El requisito anti-enumeracion debe mantenerse como AC explicito y testeable.

### 🚨 Critical Questions for PO

**Question 1:** Cual es el TTL exacto del reset token?

- **Context:** requerido para validar expiracion de forma objetiva.
- **Impact if not answered:** pruebas de token expirado quedan ambiguas.
- **Suggested Answer:** definir TTL fijo de 30 minutos (o valor oficial acordado).

**Question 2:** Debe invalidarse automaticamente el token anterior al generar uno nuevo?

- **Context:** evita uso de links viejos y riesgo de replay.
- **Impact if not answered:** comportamiento inconsistentemente implementado.
- **Suggested Answer:** invalidar todo token anterior en nuevo request.

### 🔧 Technical Questions for Dev

**Question 1:** Cuales `error.code` canonicos se usaran para invalid/expired/reused token?

- **Context:** alinear API contract con assertions QA/FE.
- **Impact on Testing:** define verificaciones exactas en API/e2e.

**Question 2:** Cuales son los thresholds de rate limiting para forgot-password?

- **Context:** la mitigacion anti-abuso fue aceptada pero no cuantificada.
- **Impact on Testing:** sin umbral no hay test de seguridad reproducible.

### ⚠️ Risks & Mitigation

**Risk 1:** account enumeration por respuestas diferenciadas.

- **Likelihood:** Medium
- **Impact:** High
- **Mitigation:** pruebas comparativas existente/no existente + AC explicito.

**Risk 2:** token replay o token superseded no manejado.

- **Likelihood:** Medium
- **Impact:** High
- **Mitigation:** casos dedicados de reused/superseded token en API + integration.

### ✅ What Was Done

**Jira Updates:**

- ✅ Story CH-4 refinada con seccion QA Refinements.
- ✅ Label `shift-left-reviewed` agregada.
- ✅ Acceptance test plan preparado para comentario de story.

**Local Files:**

- ✅ `acceptance-test-plan.md` creado en esta story.

**Test Coverage Planned:**

- Total test cases designed: 14
  - Positive: 4
  - Negative: 4
  - Boundary: 3
  - Integration: 2
  - API: 1

---

## 🎯 Definition of Done (QA Perspective)

- [ ] Ambiguities de TTL/token superseded/rate limiting resueltas.
- [ ] Story ajustada con ACs refinados aprobados por PO/Dev.
- [ ] Test cases ejecutados y passing segun prioridad.
- [ ] Sin bugs Critical/High abiertos para esta story.

---

## 📎 Related Documentation

- **Story:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-4-password-recovery-email/story.md`
- **Epic:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/epic.md`
- **Feature Test Plan:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-test-plan.md`
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

- Total Tests: 14
- Passed: TBD
- Failed: TBD
- Blocked: TBD

**Bugs Found:**

- TBD

**Sign-off:** TBD
