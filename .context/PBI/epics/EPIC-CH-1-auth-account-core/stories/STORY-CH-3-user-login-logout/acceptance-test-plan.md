## Acceptance Test Plan - Generated 2026-03-28

**QA Engineer:** AI-Generated  
**Status:** Draft - Pending PO/Dev Review

---

# Acceptance Test Plan: STORY-CH-3 - User Login/Logout

**Fecha:** 2026-03-28  
**Story Jira Key:** CH-3  
**Epic:** EPIC-CH-1 - Authentication & Account Core

---

## Paso 1: Critical Analysis

### Business Context

- **Primary Persona:** Diego Rojas (Player).
- **Secondary Persona:** Carla Mendoza (Capitana).
- **Business Value:** habilitar acceso seguro y estable a rutas protegidas para continuidad del flujo de reserva.
- **Journey Link:** Journey 1, Step 1 (login) y continuidad de sesion.

### Technical Context

- **Frontend:** login form, protected route guards, logout action, session handlers.
- **Backend:** `POST /api/auth/login` + manejo refresh token.
- **Auth Provider:** Supabase Auth (session lifecycle).
- **Integration Points:** Frontend <-> API <-> Supabase + session state synchronization.

### Complexity

- **Overall:** High
- **Main Risks:** inconsistencia de sesion, refresh fallback incompleto, logout incompleto, errores ambiguos.

### Epic/Story Comment Review Summary

De los comentarios en Jira CH-3 y epic CH-1:

- Debe quedar explicito el criterio de `active user` en AC/story.
- Debe existir comportamiento seguro cuando refresh token falla: limpiar sesion y reautenticar.
- Debe definirse rate limiting en login con thresholds verificables.
- Se confirmo necesidad de error mapping claro entre API y UI.

---

## Paso 2: Story Quality Analysis

### Ambiguities/Gaps

- Falta matriz formal de estados de cuenta para `active user` (active/disabled/banned/etc.).
- Faltan thresholds concretos de rate limiting (intentos/ventana/bloqueo).
- Logout contract no esta completamente explicitado (client-only vs invalidacion server side).

### Edge Cases

- Refresh token expirado o malformado durante request autenticado.
- Logout en una pestana con otra pestana abierta en ruta protegida.
- Burst de intentos fallidos de login.

### Testability

**Status:** Partially testable (base clara, faltan valores operativos para active user y rate limiting).

---

## Paso 3: Refined Acceptance Criteria

### Scenario 1: Login exitoso

- **Given:** usuario activo con credenciales validas.
- **When:** envia `POST /api/auth/login` con email/password correctos.
- **Then:** recibe sesion activa (`accessToken`, `refreshToken`, `user`) y acceso a rutas protegidas.

### Scenario 2: Credenciales invalidas

- **Given:** usuario en pantalla login.
- **When:** envia credenciales incorrectas.
- **Then:** API responde no autorizado; UI muestra mensaje claro sin leakage.

### Scenario 3: Refresh transparente

- **Given:** access token expirado, refresh valido.
- **When:** usuario realiza request autenticado.
- **Then:** sesion se refresca automaticamente y la request continua.

### Scenario 4: Refresh fallido

- **Given:** access token expirado, refresh invalido/expirado.
- **When:** usuario realiza request autenticado.
- **Then:** sesion se limpia y usuario vuelve a login.

### Scenario 5: Logout seguro

- **Given:** usuario autenticado en ruta protegida.
- **When:** ejecuta logout.
- **Then:** se limpia sesion local y rutas protegidas quedan bloqueadas hasta nuevo login.

### Scenario 6: Rate limiting de login

- **Given:** multiples intentos fallidos en ventana corta.
- **When:** se supera threshold permitido.
- **Then:** sistema devuelve respuesta de limitacion con guidance de reintento.

---

## Paso 4: Test Design

### Coverage

- **Total:** 16
- **Positive:** 4
- **Negative:** 5
- **Boundary:** 3
- **Integration:** 2
- **API Contract:** 2

### Parametrization Group 1: Authentication outcomes

| email | password | accountState | expected |
| --- | --- | --- | --- |
| diego.player@example.com | ValidPass1! | active | success session |
| diego.player@example.com | WrongPass1! | active | invalid credentials |
| invalid-email | ValidPass1! | n/a | validation error |
| disabled.player@example.com | ValidPass1! | inactive | account denied |

### Parametrization Group 2: Token states

| accessToken | refreshToken | expected |
| --- | --- | --- |
| valid | valid | request success |
| expired | valid | transparent refresh + success |
| expired | expired | force relogin |
| expired | malformed | force relogin |

---

## Test Outlines

1. Validar login exitoso con credenciales validas.
2. Validar rechazo por password incorrecto.
3. Validar rechazo para usuario inactivo.
4. Validar mensaje de error accionable en login fallido.
5. Validar refresh transparente con refresh token valido.
6. Validar refresh fallido obliga reautenticacion.
7. Validar logout bloquea ruta protegida inmediatamente.
8. Validar bloqueo de ruta protegida despues de refresh manual del browser.
9. Validar comportamiento de session en multi-tab tras logout.
10. Validar rate limiting tras intentos fallidos consecutivos.
11. Validar idempotencia de logout repetido.
12. Validar contrato de exito de login.
13. Validar contrato de error de login.
14. Validar contrato de respuesta en refresh fallido.
15. Validar visibilidad y foco de errores en UI login.
16. Validar no-leakage de datos sensibles en errores.

---

## Integration Test Cases

### Integration 1: Frontend <-> API login flow

- **Expected:** request/response coherente con contrato y estado de UI consistente.

### Integration 2: API <-> Supabase token lifecycle

- **Expected:** refresh exitoso cuando corresponde y fallback seguro cuando falla.

---

## Test Data Summary

- **Valid data:** usuario activo con credenciales validas.
- **Invalid data:** wrong password, malformed email, inactive account.
- **Boundary data:** tokens en estado valid/expired/invalid.
- **Edge data:** multi-tab session behavior, burst login attempts.
- **Cleanup:** cerrar sesion y limpiar datos de prueba persistentes.

---

## Risks and Questions

- **Open question:** catalogo definitivo de estados para `active user`.
- **Open question:** threshold exacto de rate limiting (cantidad y ventana temporal).
- **Mitigation:** bloquear cierre QA final hasta documentar ambos valores en story/contract.

---

## Related Docs

- `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-3-user-login-logout/story.md`
- `.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-test-plan.md`
- `.context/SRS/functional-specs.md`
- `.context/SRS/api-contracts.yaml`
