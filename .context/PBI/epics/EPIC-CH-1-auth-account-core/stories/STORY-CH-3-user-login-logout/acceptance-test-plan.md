## 🧪 Acceptance Test Plan - Generated 2026-03-28

**QA Engineer:** AI-Generated  
**Status:** Draft - Pending PO/Dev Review

---

# Acceptance Test Plan: STORY-CH-3 - User Login/Logout

**Fecha:** 2026-03-28  
**QA Engineer:** AI-Generated  
**Story Jira Key:** CH-3  
**Epic:** EPIC-CH-1 - Authentication & Account Core  
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Diego Rojas (Player) - necesita iniciar sesion rapido para reservar en minutos.
- **Secondary:** Carla Mendoza (Capitana) - requiere sesiones estables para coordinar reservas de equipo sin friccion.

**Business Value:**
- **Value Proposition:** habilita acceso seguro y continuo a funcionalidades protegidas.
- **Business Impact:** reduce abandono por fallos de acceso y protege conversion de busqueda -> reserva pagada.

**Related User Journey:**
- Journey: Reserva completa sin friccion (Journey 1).
- Step: Step 1 (inicio de sesion) y condicion de continuidad de session para pasos posteriores.

### Technical Context of This Story

**Frontend:**
- Components: Login form, auth guard, logout action, session state handlers.
- Pages/Routes: `/login` + rutas protegidas.
- State Management: contexto de sesion/tokens en cliente.

**Backend:**
- API Endpoints: `POST /api/auth/login` (definido en OpenAPI).
- Services: auth service/middleware JWT + refresh handling.
- Database: lectura de perfil/estado para regla de `active user`.

**External Services:**
- Supabase Auth (token lifecycle).

**Integration Points:**
- Frontend ↔ Auth API (`POST /api/auth/login`).
- API ↔ Supabase Auth (credential validation + token issuance/refresh).
- Frontend route guards ↔ session state.

### Story Complexity Analysis

- **Overall Complexity:** High
- **Business logic complexity:** Medium-High (active user + refresh behavior + logout state).
- **Integration complexity:** High (frontend/api/auth provider/session sync).
- **Data validation complexity:** Medium (credentials, token expiry states, rate limit behavior).
- **UI complexity:** Medium (error clarity + protected route denial after logout).
- **Estimated Test Effort:** High
- **Rationale:** session lifecycle has multi-state behavior and high business/security impact.

### Epic-Level Context (From Feature Test Plan in Jira)

**Critical Risks Already Identified at Epic Level:**
- Risk: session inconsistency frontend/backend.
  - **Relevance to This Story:** impacto directo en login refresh/logout.
- Risk: ambiguous auth error messages.
  - **Relevance to This Story:** login invalid credential UX.

**Integration Points from Epic Analysis:**
- Frontend ↔ Backend API.
  - **Applies to This Story:** ✅ Yes
  - **If Yes:** login request/response contract and error mapping.
- Auth API ↔ Supabase Auth.
  - **Applies to This Story:** ✅ Yes
  - **If Yes:** credential validation and token lifecycle.

**Critical Questions Already Asked at Epic Level:**

**Questions for PO/Dev:**
- Question: definicion de `active user` para CH-3.
  - **Status:** ✅ Answered (confirmado en comentario de epic; falta detalle operativo en story).
  - **Impact on This Story:** debe quedar explicitado en AC/refined rules.

- Question: rate limiting para login.
  - **Status:** ✅ Answered at policy level, ⚠️ threshold exacto pendiente en story/contract.
  - **Impact on This Story:** afecta test negativos y expected error behavior.

**Test Strategy from Epic:**
- Test Levels: Unit + Integration + E2E + API.
- Tools: Playwright, Vitest, Postman/Playwright API.
- **How This Story Aligns:** CH-3 requiere cobertura en los 4 niveles por lifecycle de session.

**Updates and Clarifications from Epic Refinement:**
- Confirmado incluir criterio explicito de active user.
- Confirmado definir y aplicar rate limiting en login.

**Summary: How This Story Fits in Epic:**
- **Story Role in Epic:** implementa el core de acceso y cierre de sesion para habilitar todo flujo autenticado.
- **Inherited Risks:** session inconsistency, unclear auth errors.
- **Unique Considerations:** refresh failure fallback + invalidation post-logout en rutas protegidas.

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** definicion operativa de `active user` no esta especificada en AC.
- **Location in Story:** Business Rules / AC.
- **Question for PO/Dev:** que estados exactos bloquean login (disabled, banned, unverified)?
- **Impact on Testing:** no se puede validar rechazo exacto por tipo de cuenta.
- **Suggested Clarification:** agregar matriz de estados de cuenta con comportamiento esperado.

**Ambiguity 2:** rate-limit de login no tiene threshold ni ventana temporal.
- **Location in Story:** no documentado en AC actuales.
- **Question for PO/Dev:** intentos maximos por IP/email y tiempo de bloqueo.
- **Impact on Testing:** cobertura de seguridad incompleta.
- **Suggested Clarification:** especificar regla y codigo/mensaje de error.

### Missing Information / Gaps

**Gap 1:** catalogo de errores de login no definido.
- **Type:** Acceptance Criteria / API behavior.
- **Why It's Critical:** UX y contract testing dependen de mensajes/codigos estables.
- **Suggested Addition:** tabla de `error.code` y `error.message` para 400/401/429.
- **Impact if Not Added:** inconsistencias FE/BE y baja trazabilidad.

**Gap 2:** contrato de logout no explicito en OpenAPI.
- **Type:** Technical Details.
- **Why It's Critical:** no hay endpoint formal para validar server-side invalidation (si aplica).
- **Suggested Addition:** definir contract de logout o aclarar que es client-side only + supabase signOut.
- **Impact if Not Added:** criterios de pruebas de logout ambiguos.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** refresh token invalido/expirado.
- **Scenario:** access token expira y refresh no es usable.
- **Expected Behavior:** limpiar sesion y requerir login.
- **Criticality:** High
- **Action Required:** Add to story + test cases.

**Edge Case 2:** logout en una pestana con otra pestana abierta en ruta protegida.
- **Scenario:** session context stale en multi-tab.
- **Expected Behavior:** revalidacion y bloqueo de ruta protegida en siguiente accion.
- **Criticality:** Medium
- **Action Required:** Add to test cases + PO/Dev confirmation.

### Testability Validation

**Is this story testable as written?** ⚠️ Partially

**Testability Issues:**
- [x] Missing error scenario detail (codes/messages).
- [x] Missing explicit security scenario (rate limiting).
- [x] Missing explicit inactive-user expected result.

**Recommendations to Improve Testability:**
- agregar criterios verificables para active user/rate limit/error contract.
- formalizar expected results de refresh-failure y logout cross-tab.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Login exitoso con credenciales validas

**Type:** Positive  
**Priority:** Critical

- **Given:** usuario activo `diego.player@example.com` existe con password valida.
- **When:** envia `POST /api/auth/login` con credenciales correctas.
- **Then:** recibe `200 OK` con `accessToken`, `refreshToken`, `user`; frontend habilita rutas protegidas.

### Scenario 2: Rechazo por credenciales invalidas

**Type:** Negative  
**Priority:** High

- **Given:** usuario registrado en login.
- **When:** envia password incorrecta.
- **Then:** API responde `401 Unauthorized`; UI muestra error accionable sin filtrar datos sensibles; DB/session sin cambios autenticados.

### Scenario 3: Refresh transparente en sesion activa

**Type:** Boundary  
**Priority:** High

- **Given:** access token expirado y refresh token valido.
- **When:** usuario hace request autenticado.
- **Then:** sesion se refresca automaticamente y request continua con exito.

### Scenario 4: Refresh invalido obliga reautenticacion

**Type:** Edge Case  
**Priority:** High

- **Given:** access token expirado y refresh token invalido/expirado.
- **When:** usuario hace request autenticado.
- **Then:** respuesta `401`, sesion local limpiada, redireccion a login.

### Scenario 5: Logout invalida acceso protegido

**Type:** Positive  
**Priority:** Critical

- **Given:** usuario autenticado en ruta protegida.
- **When:** ejecuta logout.
- **Then:** session context local limpiado y rutas protegidas denegadas hasta nuevo login.

### Scenario 6: Rate limiting por intentos fallidos consecutivos

**Type:** Edge Case  
**Priority:** Medium-High

- **Given:** multiples intentos fallidos dentro de ventana definida.
- **When:** supera threshold permitido.
- **Then:** sistema responde con error de limitacion (`429` esperado) y mensaje claro de reintento.
- **⚠️ NOTE:** pending PO/Dev confirm on exact threshold/window.

---

## 🧪 Paso 4: Test Design

### Test Coverage Analysis

**Total Test Cases Needed:** 16

**Breakdown:**
- Positive: 4
- Negative: 5
- Boundary: 3
- Integration: 2
- API: 2

**Rationale for This Number:** alta complejidad por lifecycle de sesion (login-refresh-logout), seguridad y sincronizacion FE/BE.

### Parametrization Opportunities

**Parametrized Tests Recommended:** ✅ Yes

**Parametrized Test Group 1: Validar autenticacion por combinacion de credenciales**

| Email | Password | Account State | Expected Result |
| --- | --- | --- | --- |
| diego.player@example.com | ValidPass123! | active | 200 + session |
| diego.player@example.com | WrongPass123! | active | 401 invalid credentials |
| invalid-email | ValidPass123! | n/a | 400 validation error |
| disabled.player@example.com | ValidPass123! | inactive | 401/403 account inactive |

**Total Tests from Parametrization:** 4  
**Benefit:** reduce duplicacion y cubre matrix principal de auth outcome.

**Parametrized Test Group 2: Validar comportamiento de token states**

| Access Token | Refresh Token | Trigger | Expected Result |
| --- | --- | --- | --- |
| valid | valid | authenticated request | 200 no refresh |
| expired | valid | authenticated request | silent refresh + 200 |
| expired | expired | authenticated request | 401 + relogin required |
| expired | malformed | authenticated request | 401 + clear session |

**Total Tests from Parametrization:** 4

---

### Test Outlines

#### **Validar login exitoso con credenciales validas**
**Related Scenario:** Scenario 1  
**Type:** Positive  
**Priority:** Critical  
**Test Level:** UI + API  
**Parametrized:** ✅ Yes (Group 1)

**Preconditions:**
- Usuario activo existe en auth con email `diego.player@example.com`.
- Ruta `/login` accesible.

**Test Steps:**
1. Ir a `/login`.
2. Ingresar email/password validos.
3. Submit login.
4. Navegar a ruta protegida.

**Expected Result:**
- **UI:** redireccion exitosa; estado autenticado visible.
- **API Response:** `200 OK` con `data.user`, `data.accessToken`, `data.refreshToken`.
- **System State:** sesion activa en cliente.

**Test Data:**
```json
{
  "input": {
    "email": "diego.player@example.com",
    "password": "ValidPass123!"
  },
  "user": {
    "role": "player",
    "state": "active"
  }
}
```

#### **Validar error de autenticacion cuando password es incorrecto**
**Related Scenario:** Scenario 2  
**Type:** Negative  
**Priority:** High  
**Test Level:** API + UI  
**Parametrized:** ✅ Yes (Group 1)

**Expected Result:**
- Status `401 Unauthorized`.
- Error auth visible y no ambiguo.
- Sin creacion de sesion autenticada.

#### **Validar refresh transparente con access token expirado y refresh valido**
**Related Scenario:** Scenario 3  
**Type:** Boundary  
**Priority:** High  
**Test Level:** Integration  
**Parametrized:** ✅ Yes (Group 2)

**Expected Result:**
- Request final `200`.
- Token actualizado en contexto de sesion.
- Usuario no redirigido a login.

#### **Validar reautenticacion obligatoria con refresh token invalido**
**Related Scenario:** Scenario 4  
**Type:** Edge Case  
**Priority:** High  
**Test Level:** Integration/API  
**Parametrized:** ✅ Yes (Group 2)

**Expected Result:**
- Status `401`.
- Session local cleared.
- Redirect a `/login` en siguiente navegacion protegida.

#### **Validar logout invalida rutas protegidas inmediatamente**
**Related Scenario:** Scenario 5  
**Type:** Positive  
**Priority:** Critical  
**Test Level:** UI/E2E  
**Parametrized:** ❌ No

**Expected Result:**
- Logout limpia contexto local.
- Cualquier acceso posterior a ruta protegida requiere nuevo login.

#### **Validar limitacion de intentos al exceder umbral de login fallido**
**Related Scenario:** Scenario 6  
**Type:** Edge Case  
**Priority:** Medium-High  
**Test Level:** API/Security  
**Parametrized:** ❌ No

**Expected Result:**
- Error de rate-limit (`429` esperado).
- Mensaje de espera/reintento.
- **⚠️ Needs PO/Dev threshold confirmation.**

---

## 🔗 Integration Test Cases

### Integration Test 1: Frontend ↔ Backend login contract
- **Integration Point:** Frontend -> `POST /api/auth/login`
- **Type:** Integration
- **Priority:** High

**Contract Validation:**
- Request format matches OpenAPI spec: ✅
- Response format matches OpenAPI spec: ✅
- Status codes match spec (200/400/401): ✅

### Integration Test 2: Session refresh lifecycle via Supabase Auth
- **Integration Point:** Backend/API -> Supabase Auth token lifecycle
- **Type:** Integration
- **Priority:** High

**Expected Result:**
- Expired access + valid refresh => renewed session.
- Expired access + invalid refresh => 401 + forced re-login.

---

## 📊 Edge Cases Summary

| Edge Case | Covered in Original Story? | Added to Refined AC? | Test Case | Priority |
| --- | --- | --- | --- | --- |
| Refresh token invalid/expired | ❌ No | ✅ Yes (Scenario 4) | Validar reautenticacion obligatoria | High |
| Logout cross-tab sync | ❌ No | ⚠️ Pending confirmation | Validar logout invalida rutas protegidas | Medium |
| Rate limiting login | ❌ No | ✅ Yes (Scenario 6) | Validar limitacion de intentos | Medium-High |

---

## 🗂️ Test Data Summary

| Data Type | Count | Purpose | Examples |
| --- | --- | --- | --- |
| Valid data | 3 | Positive tests | valid email/password, active user |
| Invalid data | 4 | Negative tests | wrong password, malformed email, inactive account |
| Boundary values | 3 | Boundary tests | expired access + valid refresh, expired/expired token state |
| Edge case data | 3 | Edge tests | multi-tab logout, burst failed attempts |

**Data Generation Strategy:**
- Static: cuentas controladas para active/inactive y token state.
- Dynamic (Faker): emails de pruebas negativas no persistentes.
- Cleanup: sesiones y artefactos de test limpiados por corrida.

---

## 📎 Related Documentation

- Story: `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-3-user-login-logout/story.md`
- Epic: `.context/PBI/epics/EPIC-CH-1-auth-account-core/epic.md`
- Feature Test Plan: `.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-test-plan.md`
- SRS: `.context/SRS/functional-specs.md` (FR-002)
- API: `.context/SRS/api-contracts.yaml`

---

## 📋 Test Execution Tracking

**Test Execution Date:** [TBD]  
**Environment:** Staging  
**Executed By:** [TBD]

**Results:**
- Total Tests: 16
- Passed: [TBD]
- Failed: [TBD]
- Blocked: [TBD]

**Bugs Found:**
- [TBD]

**Sign-off:** [TBD]

---

## 📢 Action Required

**@ProductOwner:**
- [ ] Confirmar comportamiento esperado para `active user` por estado.
- [ ] Confirmar comportamiento esperado para logout cross-tab.
- [ ] Validar escenarios agregados de edge case.

**@DevLead:**
- [ ] Confirmar contract/error catalog para login (400/401/429).
- [ ] Definir threshold/ventana exacta de rate limiting.
- [ ] Confirmar implementacion de refresh-failure fallback.

**@QATeam:**
- [ ] Revisar completitud de cobertura de session lifecycle.
- [ ] Preparar datos de token-state para integration tests.
- [ ] Preparar ejecucion en staging de escenarios criticos.

**Next Steps:**
1. Resolver preguntas criticas de negocio/tecnicas en este thread.
2. Ajustar AC finales de CH-3 con respuestas PO/Dev.
3. Ejecutar implementacion solo con criterios cerrados.

---

**Documentation:** Full test cases mirror at:
`.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-3-user-login-logout/acceptance-test-plan.md`
