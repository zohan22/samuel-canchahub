# Authentication & Account Core

**Jira Key:** CH-1  
**Status:** TO DO  
**Priority:** CRITICAL  
**Phase:** Foundation

---

## Epic Description

Esta epica establece la base de autenticacion del MVP para que los usuarios puedan crear cuentas, iniciar/cerrar sesion y recuperar acceso de forma segura. Es un habilitador transversal para discovery, booking, pago y operaciones por rol.

La implementacion se apoya en Supabase Auth y debe garantizar consistencia entre frontend, API y capa de autorizacion. Adicionalmente, debe minimizar abandono en onboarding mediante validaciones claras y feedback accionable en errores comunes.

**Business Value:**  
Sin una capa de cuenta y sesion confiable, el flujo principal de reserva pagada no puede operar. Esta epica reduce friccion inicial, mejora conversion de registro y protege la plataforma con controles de autenticacion basicos del MVP.

---

## User Stories

1. **CH-2** - As a player, I want to register with email and password so that I can create my account.
2. **CH-3** - As a user, I want to login and logout so that I can access the platform securely.
3. **CH-4** - As a user, I want to recover my password so that I can regain account access.

---

## Scope

### In Scope

- Registro con email/password y creacion de perfil base (`player` por defecto).
- Inicio y cierre de sesion con manejo de tokens.
- Recuperacion de password por email y confirmacion de cambio.
- Validaciones de credenciales y mensajes de error de autenticacion.

### Out of Scope (Future)

- Login social (Google, Apple, Facebook).
- MFA/2FA.
- SSO empresarial.

---

## Acceptance Criteria (Epic Level)

1. Usuarios nuevos pueden registrarse con email unico y password valida.
2. Usuarios autenticados pueden iniciar/cerrar sesion sin inconsistencias de estado.
3. Flujo de recuperacion permite restablecer password con token valido.
4. Errores de autenticacion se muestran con mensajes claros y accionables.

---

## Related Functional Requirements

- **FR-001:** Registro de cuentas con email/password.
- **FR-002:** Autenticacion y cierre de sesion.
- **FR-003:** Recuperacion de password por email.

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Auth and Session

- Supabase Auth como fuente de verdad de identidad.
- Sesion basada en JWT con refresh token.
- Validacion de inputs en frontend y backend.

### Database Schema

**Tables:** `profiles` (conceptual en SRS).  
**Nota:** validar schema real via Supabase MCP en fases de implementacion.

### Security Requirements

- RBAC inicial por rol (`player`, `owner`, `admin`).
- Proteccion de secretos por variables de entorno.
- Mitigaciones basicas OWASP (injection, XSS, broken access control).

---

## Dependencies

### External Dependencies

- Supabase Auth.
- Servicio de email transaccional para reset de password.

### Internal Dependencies

- Base para EPIC-CH-2 a EPIC-CH-6.

### Blocks

- Discovery, booking y pago autenticados dependen de esta epica.

---

## Success Metrics

### Functional Metrics

- Tasa de registro exitoso > 90% sin errores de validacion inesperados.
- Login exitoso consistente con expiracion/control de sesion.

### Business Metrics

- Contribuir al objetivo de >= 300 players registrados en 90 dias.

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
| --- | --- | --- | --- |
| Configuracion incorrecta de auth provider | High | Medium | Checklist de variables, pruebas de smoke y entorno staging |
| Mensajes de error ambiguos en login/registro | Medium | Medium | Estandarizar respuestas de error y testear edge cases |
| Sesiones inconsistentes entre cliente y backend | High | Medium | Pruebas de refresh/logout y middleware de autorizacion |

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-test-plan.md` (Fase 5)

### Test Coverage Requirements

- **Unit Tests:** validaciones de credenciales y transformaciones.
- **Integration Tests:** auth API + Supabase.
- **E2E Tests:** registro, login/logout y forgot/reset password.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-implementation-plan.md` (Fase 6)

### Recommended Story Order

1. [CH-2] - User registration - Foundation
2. [CH-3] - Login/logout session - Core auth
3. [CH-4] - Password recovery - Recovery flow

### Estimated Effort

- **Development:** 1 sprint
- **Testing:** 0.5 sprint
- **Total:** 1.5 sprints

---

## Notes

Custom fields UPEX no detectados en este workspace; se aplica fallback en description de Jira Stories para Scope/AC/Business Rules.

---

## Related Documentation

- **PRD:** `.context/PRD/executive-summary.md`, `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-001 a FR-003)
- **Architecture:** `.context/SRS/architecture-specs.md`
- **API Contracts:** `.context/SRS/api-contracts.yaml`
