# As a user, I want to login and logout so that I can access the platform securely

**Jira Key:** CH-3  
**Epic:** CH-1 (Authentication & Account Core)  
**Priority:** High  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** user  
**I want to** login and logout with a secure session  
**So that** I can access protected features without exposing my account

---

## Scope

### In Scope

- Login with email/password.
- Session creation and token handling.
- Logout clearing local session context.
- Error messaging for invalid credentials.

### Out of Scope

- Social login.
- Multi-device session management.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Login and logout success

- **Given:** a registered user with valid credentials
- **When:** the user logs in with correct email/password
- **Then:** the system authenticates and grants access to protected routes
- **And:** after logout, access to protected routes is denied until re-authentication

### Scenario 2: Invalid credentials

- **Given:** a registered user on login screen
- **When:** the user submits wrong credentials
- **Then:** the system denies authentication and shows a clear error

### Scenario 3: Token refresh during active session

- **Given:** an authenticated user with expired access token and valid refresh token
- **When:** the user performs an authenticated request
- **Then:** the session refreshes transparently and request proceeds

---

## Business Rules

- Only active users can authenticate.
- Access token and refresh token handling must follow security policy.
- Logout must clear local session state.

---

## Workflow

1. User sends credentials.
2. System authenticates against Supabase Auth.
3. System establishes session context.
4. User can logout and terminate active client session.

---

## Mockups/Wireframes

- No mockup URL available in current context.

---

## Technical Notes

### Frontend

- Login form and protected route guards.

### Backend

- API aligned with `POST /api/auth/login`.

### Database

- Uses profile role for authorization checks.

### External Services

- Supabase Auth token lifecycle.

---

## Dependencies

### Blocked By

- CH-2

### Blocks

- Discovery and booking flows that require authenticated user context.

### Related Stories

- CH-2, CH-4.

---

## Definition of Done

- [ ] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado (2 reviewers)
- [ ] Documentación actualizada (README, API docs)
- [ ] Deployed to staging
- [ ] QA testing passed
- [ ] Acceptance criteria validated
- [ ] No critical/high bugs open

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-3-user-login-logout/acceptance-test-plan.md` (Fase 5)

---

## Notes

Mapped to FR-002 in `.context/SRS/functional-specs.md`.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/epic.md`
- **PRD:** `.context/PRD/user-journeys.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-002)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
