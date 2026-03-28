## Acceptance Test Plan - Generated 2026-03-28

**QA Engineer:** AI-Generated  
**Status:** Draft - Pending PO/Dev Review

---

# Acceptance Test Plan: STORY-CH-2 - User Registration Email

**Fecha:** 2026-03-28  
**Story Jira Key:** CH-2  
**Epic:** EPIC-CH-1 - Authentication & Account Core

---

## Paso 1: Critical Analysis

### Business Context

- **Primary Persona:** Diego Rojas (Player).
- **Secondary Persona:** Carla Mendoza (Capitana).
- **Business Value:** reducir friccion de onboarding y habilitar conversion temprana a reserva.
- **Journey Link:** prerequisito del Journey 1 (reserva sin friccion).

### Technical Context

- **Frontend:** formulario de registro con validaciones y mensajes accionables.
- **Backend:** `POST /api/auth/register`.
- **Database:** creacion de `profiles` con `role = player`.
- **Integrations:** Frontend -> API -> Supabase Auth -> DB profiles.

### Complexity

- **Overall:** Medium
- **Main Risks:** validaciones inconsistentes, duplicate email, inconsistencia auth/profile.

### Epic/Story Comment Review Summary

De los comentarios en Jira CH-2:

- Password policy confirmada por PO/Dev: `8-30`, con mayuscula, minuscula, numero y simbolo.
- Catalogo de errores esperado: `INVALID_EMAIL`, `INVALID_PASSWORD`, `INVALID_FULLNAME`, `EMAIL_ALREADY_REGISTERED`.
- Regla de normalizacion confirmada: `trim`, `email lowercase`, unicidad case-insensitive.
- Regla de consistencia confirmada: no dejar usuario en Auth sin profile (compensacion/rollback).

---

## Paso 2: Story Quality Analysis

### Ambiguities/Gaps

- Falta alinear oficialmente la longitud de password en artifacts globales: story/SRS/OpenAPI muestran `8-72`, comentario de CH-2 define `8-30`.
- Falta especificar en story el comportamiento de idempotencia ante doble submit.

### Edge Cases

- Email duplicado por casing (`Test@Mail.com` vs `test@mail.com`).
- Campos con espacios al inicio/fin.
- Falla parcial: Auth creado pero DB profile falla.

### Testability

**Status:** Partially testable (mejorado por comentarios, pendiente sincronizacion documental 8-30 vs 8-72).

---

## Paso 3: Refined Acceptance Criteria

### Scenario 1: Registro exitoso

- **Given:** visitante no autenticado.
- **When:** envia `email` valido, `password` valida por policy, `fullName` valido.
- **Then:** API responde exito; usuario creado en Auth y profile creado en DB con `role = player`.

### Scenario 2: Email duplicado

- **Given:** email ya registrado (case-insensitive).
- **When:** se intenta registrar nuevamente.
- **Then:** API rechaza con `EMAIL_ALREADY_REGISTERED`; no se crea nuevo usuario/profile.

### Scenario 3: Payload invalido

- **Given:** datos invalidos (email/password/fullName).
- **When:** se envia registro.
- **Then:** API responde error de validacion canonico; no persiste auth/profile.

### Scenario 4: Consistencia atomica Auth/Profile

- **Given:** falla al crear profile luego de crear auth user.
- **When:** request de registro es procesado.
- **Then:** se ejecuta compensacion/rollback; no quedan usuarios huerfanos.

### Scenario 5: Normalizacion de datos

- **Given:** email/fullName con espacios o casing mixto.
- **When:** se registra usuario.
- **Then:** sistema normaliza y valida unicidad correctamente.

---

## Paso 4: Test Design

### Coverage

- **Total:** 14
- **Positive:** 4
- **Negative:** 5
- **Boundary:** 3
- **Integration:** 1
- **API Contract:** 1

### Parametrization Group: Registro

| email | password | fullName | expected |
| --- | --- | --- | --- |
| diego1@example.com | ValidPass1! | Diego Rojas | success |
| invalid-email | ValidPass1! | Diego Rojas | INVALID_EMAIL |
| diego2@example.com | short7! | Diego Rojas | INVALID_PASSWORD |
| diego3@example.com | VALIDONLY123 | Diego Rojas | INVALID_PASSWORD |
| diego4@example.com | ValidPass1! | D | INVALID_FULLNAME |
| diego5@example.com | ValidPass1! | Name too long (121) | INVALID_FULLNAME |
| test@mail.com (when Test@mail.com exists) | ValidPass1! | Test User | EMAIL_ALREADY_REGISTERED |

---

## Test Outlines

1. Validar registro exitoso con datos validos.
2. Validar rechazo de registro cuando email ya existe.
3. Validar rechazo por email invalido.
4. Validar rechazo por password que no cumple policy.
5. Validar limite minimo de password.
6. Validar limite maximo de password.
7. Validar limite de fullName.
8. Validar normalizacion de email con espacios.
9. Validar unicidad case-insensitive de email.
10. Validar consistencia auth/profile ante falla parcial.
11. Validar idempotencia ante doble submit.
12. Validar contrato de exito de `POST /api/auth/register`.
13. Validar contrato de error de registro.
14. Validar feedback UI claro y accionable.

---

## Integration Test Case

### Frontend -> API -> Auth -> Profiles

- **Expected:** request valido crea auth + profile consistente.
- **Expected on failure:** no estado huerfano auth/profile.

---

## Test Data Summary

- **Valid data:** emails unicos, password policy-compliant, fullName 2..120.
- **Invalid data:** email malformed, duplicate email, password weak, fullName out of range.
- **Boundary data:** password min/max; fullName min/max.
- **Cleanup:** eliminar cuentas de prueba o usar data idempotente.

---

## Risks and Questions

- **Open question:** alinear formalmente password length (`8-30` comentado vs `8-72` en SRS/OpenAPI/story).
- **Mitigation:** usar decision de comentario CH-2 para ATP actual y abrir task de sincronizacion documental.

---

## Related Docs

- `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-2-user-registration-email/story.md`
- `.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-test-plan.md`
- `.context/SRS/functional-specs.md`
- `.context/SRS/api-contracts.yaml`
