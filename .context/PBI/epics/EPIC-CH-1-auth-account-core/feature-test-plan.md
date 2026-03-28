## 📋 Feature Test Plan - Generated 2026-03-28

**QA Lead:** AI-Generated  
**Status:** Draft - Pending Team Review

---

# Feature Test Plan: EPIC-CH-1 - Authentication & Account Core

**Fecha:** 2026-03-28  
**QA Lead:** AI-Generated  
**Epic Jira Key:** CH-1  
**Status:** Draft

---

## 📋 Business Context Analysis

### Business Value

Esta epica habilita el acceso confiable para usuarios nuevos y recurrentes, reduciendo abandono de onboarding y desbloqueando el flujo core de reserva pagada. Sin autenticacion estable no hay trazabilidad de identidad para reservas, pagos ni autorizacion por rol.

**Key Value Proposition:**

- Permite a players crear cuenta y acceder rapido sin friccion por errores ambiguos.
- Protege operaciones del negocio con sesion consistente y recuperacion de cuenta segura.

**Success Metrics (KPIs):**

- Usuarios registrados (Player) >= 300 en 90 dias.
- Conversion busqueda -> reserva pagada >= 12% (depende de autenticacion sin friccion).

**User Impact:**

- Diego Rojas (Player): puede registrarse e iniciar sesion en minutos para reservar sin llamadas.
- Carla Mendoza (Capitana): reduce cancelaciones por acceso fallido y mejora coordinacion al tener cuenta activa.
- Luis Aramayo (Owner): requiere base auth robusta para futura operacion del panel owner.

**Critical User Journeys:**

- Journey 1: Reserva completa sin friccion (login confiable es paso critico).
- Journey transversal de recuperacion de cuenta para evitar abandono y soporte manual.

---

## 🏗️ Technical Architecture Analysis

### Architecture Components Involved

**Frontend:**

- Formularios de registro, login, logout y recuperacion/reset.
- Route guards para rutas protegidas y manejo de estado de sesion.
- Vistas de feedback para errores de validacion/autenticacion.

**Backend:**

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- Middleware de auth/JWT para consistencia de sesion.

**Database:**

- Tabla `profiles` (creacion de perfil base, rol `player`, lectura para autorizacion).
- Integridad entre identidad en Supabase Auth y perfil en DB.

**External Services:**

- Supabase Auth (fuente de verdad de identidad y tokens).
- Email provider transaccional para flujo de reset password.

### Integration Points (Critical for Testing)

**Internal Integration Points:**

- Frontend ↔ Auth API (validacion, errores y session bootstrap).
- Auth API ↔ Supabase Auth (creacion/login/reset token).
- Auth API ↔ `profiles` en DB (creacion perfil y rol por defecto).

**External Integration Points:**

- Auth API ↔ Email service (entrega de reset link).

**Data Flow:**

```text
User -> Frontend Forms -> /api/auth/* -> Supabase Auth
                                   -> profiles (DB)
                                   -> Email Provider (forgot/reset)
```

---

## 🚨 Risk Analysis

### Technical Risks

#### Risk 1: Inconsistencia de sesion entre frontend y backend

- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Integration
- **Mitigation Strategy:**
  - Validar refresh/logout en escenarios multi-request.
  - Tests de expiracion de access token y uso de refresh token valido.
- **Test Coverage Required:** Integration + API + E2E para login/logout/refresh.

#### Risk 2: Politica de password implementada de forma incompleta

- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Backend
- **Mitigation Strategy:**
  - Alinear validaciones de registro y reset con una policy unica.
  - Probar limites (8 y 72), caracteres especiales y mensajes claros.
- **Test Coverage Required:** Unit + API + UI validations.

#### Risk 3: Enumeracion de cuentas en forgot-password

- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Security
- **Mitigation Strategy:**
  - Respuesta uniforme para email existente/no existente.
  - Verificacion de logs para evitar leakage.
- **Test Coverage Required:** API negative tests + security quick checks.

---

### Business Risks

#### Risk 1: Abandono en onboarding por errores ambiguos

- **Impact on Business:** Reduce conversion a registro y reserva pagada.
- **Impact on Users:** Player y Capitana se frustran y vuelven a WhatsApp/manual.
- **Likelihood:** High
- **Mitigation Strategy:**
  - Mensajes accionables para duplicate email, credenciales invalidas y password policy.
  - Validacion UX de feedback en UI.
- **Acceptance Criteria Validation:** AC epic #4 + ACs de CH-2/CH-3/CH-4.

#### Risk 2: Fallo de recuperacion de cuenta sin fallback claro

- **Impact on Business:** Perdida de usuarios activos y carga de soporte.
- **Impact on Users:** Usuarios bloqueados fuera de la plataforma.
- **Likelihood:** Medium
- **Mitigation Strategy:**
  - Probar token expirado, token invalido y re-solicitud segura.
  - Confirmar tiempos de expiracion y single-use.

---

### Integration Risks

#### Integration Risk 1: Frontend ↔ API error mapping inconsistente

- **Integration Point:** Frontend ↔ Backend API
- **What Could Go Wrong:** Mensajes tecnicos no accionables o status codes ambiguos.
- **Impact:** High
- **Mitigation:**
  - Contract tests de codigos y payload de error.
  - E2E de visualizacion de errores por escenario.

#### Integration Risk 2: Auth ↔ DB profile desincronizado

- **Integration Point:** API ↔ Database
- **What Could Go Wrong:** Usuario creado en auth sin perfil/rol en `profiles`.
- **Impact:** High
- **Mitigation:**
  - Integration tests transaccionales y retry controlado.
  - Validaciones de consistencia post-registro.

#### Integration Risk 3: Auth ↔ Email delivery del reset

- **Integration Point:** API ↔ Email Provider
- **What Could Go Wrong:** Email no entregado o link invalido.
- **Impact:** Medium
- **Mitigation:**
  - Mock + staging provider tests con evidencias.
  - Checks de formato/TTL de token en link.

---

## ⚠️ Critical Analysis & Questions for PO/Dev

### Ambiguities Identified

**Ambiguity 1:** Politica completa de password no especificada.

- **Found in:** STORY CH-2 y CH-4
- **Question for PO/Dev:** Ademas de longitud 8-72, se requiere mayuscula/minuscula/numero/simbolo?
- **Impact if not clarified:** Criterios inconsistentes entre registro y reset.

**Ambiguity 2:** Definicion de "active user" en login.

- **Found in:** STORY CH-3
- **Question for Dev:** Que flags/estados determinan usuario activo en Supabase/Auth?
- **Impact if not clarified:** Bloqueos o accesos indebidos en produccion.

**Ambiguity 3:** Parametros exactos del reset token.

- **Found in:** STORY CH-4
- **Question for PO/Dev:** TTL exacto, single-use obligatorio y comportamiento tras nuevo request?
- **Impact if not clarified:** Riesgo de seguridad y fallos de UX en recuperacion.

### Missing Information

**Missing 1:** Matriz de mensajes de error esperados por endpoint.

- **Needed for:** Validar UX y trazabilidad de AC #4.
- **Suggestion:** Agregar tabla code/message por CH-2/3/4.

**Missing 2:** Reglas de rate limiting para login/forgot-password.

- **Needed for:** Cobertura de seguridad contra abuso/brute force.
- **Suggestion:** Definir threshold por IP/email y comportamiento de bloqueo.

**Missing 3:** Definicion de contenido/expiracion del email de reset.

- **Needed for:** Pruebas de integracion con proveedor email.
- **Suggestion:** Documentar template minimo y SLA de entrega en staging.

### Suggested Improvements (Before Implementation)

**Improvement 1:** Estandarizar errores de auth en contract.

- **Story Affected:** CH-2, CH-3, CH-4
- **Current State:** Errores claros solicitados pero sin catalogo formal.
- **Suggested Change:** Definir `error.code` canonico por caso.
- **Benefit:** Menos ambiguedad para FE y mayor testabilidad.

**Improvement 2:** Agregar AC explicito de anti-enumeracion.

- **Story Affected:** CH-4
- **Current State:** Business rule lo menciona, AC no lo asegura explicitamente.
- **Suggested Change:** Nuevo AC para respuesta uniforme en forgot-password.
- **Benefit:** Cubre riesgo de seguridad temprano.

**Improvement 3:** Incluir AC de refresh token en CH-3 con casos de expiracion.

- **Story Affected:** CH-3
- **Current State:** Se menciona refresh exitoso, sin detalle de fallos esperados.
- **Suggested Change:** AC para refresh invalido/expirado y logout posterior.
- **Benefit:** Reduce defectos de sesion intermitente.

---

## 🎯 Test Strategy

### Test Scope

**In Scope:**

- Functional testing UI/API/DB para CH-2, CH-3, CH-4.
- Integration testing de auth lifecycle y profile consistency.
- Security testing basico (enumeration, injection/XSS quick checks, access control).
- Cross-browser: Chrome, Firefox, Safari; mobile iOS Safari y Android Chrome.
- API contract validation para endpoints auth.

**Out of Scope (For This Epic):**

- Login social (Google/Apple/Facebook).
- MFA/2FA.
- SSO empresarial.
- Hardening avanzado (pentest externo completo).

### Test Levels

#### Unit Testing

- **Coverage Goal:** > 80%
- **Focus Areas:** validadores de email/password, parseo de errores, helpers de sesion.
- **Responsibility:** Dev team (QA valida existencia y calidad).

#### Integration Testing

- **Coverage Goal:** 100% integration points de auth core.
- **Focus Areas:** API ↔ Supabase Auth, API ↔ DB `profiles`, API ↔ Email service.
- **Responsibility:** QA + Dev.

#### End-to-End (E2E) Testing

- **Coverage Goal:** User journeys criticos de autenticacion.
- **Tool:** Playwright
- **Focus Areas:** registro, login/logout, forgot/reset, errores criticos visibles.
- **Responsibility:** QA.

#### API Testing

- **Coverage Goal:** 100% endpoints de auth en contrato OpenAPI.
- **Tool:** Postman/Newman o Playwright API.
- **Focus Areas:** schemas, status codes, errores, auth behavior.
- **Responsibility:** QA.

### Test Types per Story

Para cada story cubrir Positive, Negative, Boundary, Integration y API segun aplique.

Exploratory testing recomendado antes y durante implementacion para validar UX de errores, timing de expiraciones y combinaciones no documentadas.

---

## 📊 Test Cases Summary by Story

### STORY-CH-2: User Registration Email

**Complexity:** Medium  
**Estimated Test Cases:** 14

- Positive: 4
- Negative: 5
- Boundary: 3
- Integration: 1
- API: 1

**Rationale for estimate:** flujo corto pero sensible a validaciones, unicidad email y sincronizacion auth/profile.  
**Parametrized Tests Recommended:** Yes (variaciones de email/password y mensajes de error).

### STORY-CH-3: User Login/Logout

**Complexity:** High  
**Estimated Test Cases:** 16

- Positive: 4
- Negative: 5
- Boundary: 3
- Integration: 2
- API: 2

**Rationale for estimate:** incluye ciclo completo de sesion, expiracion de access token, refresh token y proteccion de rutas.  
**Parametrized Tests Recommended:** Yes (credenciales, estados de token, escenarios de logout).

### STORY-CH-4: Password Recovery Email

**Complexity:** High  
**Estimated Test Cases:** 18

- Positive: 6
- Negative: 6
- Boundary: 4
- Integration: 1
- API: 1

**Rationale for estimate:** flujo multi-step con dependencia de email, token lifecycle y requisitos de seguridad anti-enumeracion.  
**Parametrized Tests Recommended:** Yes (token valido/invalido/expirado/reused; password variants).

### Total Estimated Test Cases for Epic

**Total:** 48  
**Breakdown:**

- Positive: 14
- Negative: 16
- Boundary: 10
- Integration: 4
- API: 4

---

## 🗂️ Test Data Requirements

### Test Data Strategy

**Valid Data Sets:**

- Player nuevos con correos realistas (gmail/outlook/custom domains).
- Usuarios registrados activos con perfiles `player` en `profiles`.
- Tokens de reset validos generados en ventanas temporales controladas.

**Invalid Data Sets:**

- Emails malformados, ya registrados y dominios no validos.
- Passwords fuera de policy (corto, largo, sin complejidad si aplica).
- Reset tokens invalidos, expirados o reutilizados.
- Inputs maliciosos (SQLi/XSS strings) en campos de auth.

**Boundary Data Sets:**

- Password length: 7, 8, 72, 73.
- `full_name`: 1, 2, 120, 121 caracteres.
- Empty/null/whitespace-only para todos los campos requeridos.

**Test Data Management:**

- ✅ Use Faker.js for realistic data.
- ✅ Data factories para users/auth payloads.
- ❌ NO hardcodear cuentas estaticas compartidas.
- ✅ Cleanup de cuentas de testing al finalizar.

### Test Environments

**Staging Environment:**

- URL: `https://staging.canchahub.bo`
- Database: Supabase staging project
- External Services: Supabase Auth real de staging + email provider staging/sandbox
- **Purpose:** Ambiente principal de validacion

**Production Environment:**

- URL: `https://api.canchahub.bo`
- **Purpose:** Solo smoke post-deploy
- **Restrictions:** Sin pruebas destructivas ni creacion de data de test masiva

---

## ✅ Entry/Exit Criteria

### Entry Criteria (Per Story)

Testing inicia cuando:

- [ ] Story implementada y desplegada en staging
- [ ] Code review aprobado por 2+ reviewers
- [ ] Unit tests passing (>80% en logica critica)
- [ ] Smoke test de dev exitoso
- [ ] Dependencias bloqueantes resueltas
- [ ] Test data preparada
- [ ] API docs actualizadas si hubo cambios

### Exit Criteria (Per Story)

Story Done para QA cuando:

- [ ] Todos los test cases ejecutados
- [ ] Casos Critical/High 100% passing
- [ ] Casos Medium/Low >=95% passing
- [ ] Bugs Critical/High cerrados y verificados
- [ ] Bugs Medium con plan de mitigacion
- [ ] Regression relevante ejecutada
- [ ] NFRs aplicables validados
- [ ] Reporte de ejecucion compartido

### Epic Exit Criteria

- [ ] CH-2, CH-3 y CH-4 cumplen exit criteria
- [ ] Integracion cross-story de auth completa
- [ ] E2E de journeys criticos passing
- [ ] Contract testing de auth endpoints completo
- [ ] NFRs aplicables validados
- [ ] Exploratory sessions documentadas
- [ ] Sin bugs Critical/High abiertos
- [ ] QA sign-off emitido

---

## 📝 Non-Functional Requirements Validation

### Performance Requirements

**NFR-PERF-003:** p95 < 500ms endpoints de lectura, < 800ms transaccionales.

- **Target:** `/api/auth/*` p95 <= 500ms (login/register/forgot/reset).
- **Test Approach:** API timing assertions en staging + muestras por endpoint.
- **Tools:** Postman/Newman, Playwright API.

### Security Requirements

**NFR-SEC-001/002/004/005/006:** JWT + RBAC + validacion + sesion + OWASP basico.

- **Requirement:** Sesion segura con refresh, validaciones server/client, anti-enumeracion, control acceso.
- **Test Approach:** pruebas negativas de auth, expiracion token, acceso no autorizado y payload malicioso.
- **Tools:** Playwright, Postman, manual security checks.

### Usability Requirements

**NFR-A11Y-001/002/005 + Browser support:**

- **Requirement:** Formularios auth accesibles, navegables por teclado, feedback visible.
- **Test Approach:** pruebas de teclado/focus/errores visibles en desktop y mobile.

---

## 🔄 Regression Testing Strategy

**Regression Scope:**

- [ ] Guardias de rutas protegidas
- [ ] Persistencia de sesion entre refreshes
- [ ] Integraciones que dependen de usuario autenticado (discovery/bookings)

**Regression Test Execution:**

- Ejecutar suite de sanity auth antes de testear historias nuevas.
- Re-ejecutar al completar CH-2/3/4.
- Priorizar integration points de sesion y reset.

---

## 📅 Testing Timeline Estimate

**Estimated Duration:** 0.5 sprint (~1 semana)

**Breakdown:**

- Test case design: 1 dia
- Test data preparation: 0.5 dia
- Test execution por story: 1 dia/story
- Regression: 0.5 dia
- Bug fixing buffer: 1 dia
- Exploratory sessions: 0.5 dia

**Dependencies:**

- Depends on: disponibilidad de staging + configuracion de Supabase Auth/email.
- Blocks: EPIC-CH-2 a EPIC-CH-6 (flujos autenticados).

---

## 🛠️ Tools & Infrastructure

**Testing Tools:**

- E2E Testing: Playwright
- API Testing: Postman/Newman o Playwright API
- Unit Testing: Vitest/Jest segun capa
- Performance: medicion de latencia API
- Security: OWASP quick checks
- Test Data: Faker.js

**CI/CD Integration:**

- [ ] Tests en PR
- [ ] Tests al merge a `main`
- [ ] Tests en deploy a staging
- [ ] Smoke tests en deploy a production

**Test Management:**

- Jira para trazabilidad de hallazgos y ejecuciones
- Comentarios y links por story/epic

---

## 📊 Metrics & Reporting

**Test Metrics to Track:**

- Test cases executed vs total
- Pass rate por story
- Bug detection/fix rate
- Coverage de ACs y endpoints
- Time to test por story

**Reporting Cadence:**

- Daily: estado de ejecucion
- Per Story: cierre QA con resultados
- Per Epic: QA sign-off consolidado

---

## 📢 Action Required

**@ProductOwner:**

- [ ] Revisar ambiguedades y faltantes (seccion Critical Analysis)
- [ ] Responder preguntas criticas de negocio
- [ ] Validar impacto de riesgos y alcance

**@DevLead:**

- [ ] Revisar riesgos tecnicos y mitigaciones
- [ ] Confirmar integration points y supuestos de arquitectura
- [ ] Responder preguntas tecnicas abiertas

**@QATeam:**

- [ ] Revisar estrategia y estimaciones
- [ ] Confirmar preparacion de data y ambientes
- [ ] Preparar diseno de test cases por story

---

**Next Steps:**

1. Refinement de preguntas criticas con PO/Dev.
2. Actualizar stories con clarificaciones y ACs faltantes.
3. QA diseña acceptance-test-plan por story (CH-2/CH-3/CH-4).
4. Dev inicia implementacion solo cuando preguntas criticas esten resueltas.

---

**Documentation:**
`.context/PBI/epics/EPIC-CH-1-auth-account-core/feature-test-plan.md`

---

## 🎓 Notes & Assumptions

**Assumptions:**

- Supabase Auth de staging operativo y con plantillas email configurables.
- El rol default `player` se persiste en `profiles` durante registro.
- El equipo acepta Jira como fuente primaria de seguimiento QA.

**Constraints:**

- Dependencia de entorno staging y entregabilidad email.
- Tiempo acotado a 0.5 sprint para ejecucion completa.

**Known Limitations:**

- Sin definicion actual de rate limiting hard en historias.
- Sin MFA/social login en alcance MVP.

**Exploratory Testing Sessions:**

- Recommended: 2 sesiones antes de cerrar la epica
  - Session 1: UX de errores y abandonos en registro/login
  - Session 2: Seguridad y edge cases en reset token/session expiry

---

## 📎 Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/epic.md`
- **Stories:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-*/story.md`
- **Business Model:** `.context/idea/business-model.md`
- **PRD:** `.context/PRD/`
- **SRS:** `.context/SRS/`
- **Architecture:** `.context/SRS/architecture-specs.md`
- **API Contracts:** `.context/SRS/api-contracts.yaml`
