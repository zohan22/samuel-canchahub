# As a user, I want to recover my password so that I can regain account access

**Jira Key:** CH-4  
**Epic:** CH-1 (Authentication & Account Core)  
**Priority:** High  
**Story Points:** 2  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** user  
**I want to** recover my password by email  
**So that** I can regain access when I forget my credentials

---

## Scope

### In Scope

- Forgot password request endpoint with email input.
- Secure reset link/token generation and expiration.
- Reset password confirmation endpoint.
- Validation feedback for token and password policy.

### Out of Scope

- SMS-based recovery.
- Manual support-assisted account recovery.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful reset

- **Given:** a user who requested password recovery
- **When:** the user opens a valid reset link and submits a valid new password
- **Then:** the system updates credentials and confirms success

### Scenario 2: Expired token

- **Given:** a user on reset screen with an expired token
- **When:** the user submits the reset form
- **Then:** the system rejects the operation with token-expired guidance

### Scenario 3: Weak new password

- **Given:** a user with a valid reset token
- **When:** the user submits a weak password
- **Then:** the system rejects the reset and shows password policy requirements

---

## Business Rules

- Reset token must be time-limited and single-use.
- Password policy must be consistent with registration.
- Forgot-password response should avoid account enumeration leaks.

---

## Workflow

1. User submits registered email in forgot-password form.
2. System sends reset link/token via email.
3. User submits new password with token.
4. System validates token and updates password.

---

## Mockups/Wireframes

- No mockup URL available in current context.

---

## Technical Notes

### Frontend

- Forgot password and reset password forms.

### Backend

- Endpoints aligned with `POST /api/auth/forgot-password` and `POST /api/auth/reset-password`.

### Database

- No direct profile mutation expected beyond auth credentials update.

### External Services

- Email provider for reset link delivery.

---

## Dependencies

### Blocked By

- CH-2

### Blocks

- Account recovery support for authenticated feature adoption.

### Related Stories

- CH-2, CH-3.

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

See: `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-4-password-recovery-email/acceptance-test-plan.md` (Fase 5)

---

## Notes

Mapped to FR-003 in `.context/SRS/functional-specs.md`.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/epic.md`
- **PRD:** `.context/PRD/user-journeys.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-003)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
