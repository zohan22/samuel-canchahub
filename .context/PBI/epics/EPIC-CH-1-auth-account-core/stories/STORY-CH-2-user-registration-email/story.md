# As a player, I want to register with email and password so that I can create my account

**Jira Key:** CH-2  
**Epic:** CH-1 (Authentication & Account Core)  
**Priority:** High  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** player  
**I want to** register with email and password  
**So that** I can create my account and start reserving courts online

---

## Scope

<!-- Jira Field fallback in description (custom scope field not available) -->

### In Scope

- Registration form with `email`, `password`, and `full_name`.
- Field validation for email format and password policy.
- User creation in Supabase Auth.
- Profile creation with default role `player`.
- Friendly error handling for duplicate email and invalid input.

### Out of Scope

- Social login providers.
- MFA and anti-bot advanced controls.

---

## Acceptance Criteria (Gherkin format)

<!-- Jira Field fallback in description (custom acceptance criteria field not available) -->

### Scenario 1: Successful registration

- **Given:** an unauthenticated visitor on the registration screen
- **When:** the visitor submits valid email, password, and full name
- **Then:** the system creates the auth account and profile successfully

### Scenario 2: Duplicate email

- **Given:** an unauthenticated visitor on the registration screen
- **When:** the visitor submits an email that already exists
- **Then:** the system blocks registration and returns an email-already-registered error

### Scenario 3: Invalid password

- **Given:** an unauthenticated visitor on the registration screen
- **When:** the visitor submits a password that does not satisfy policy
- **Then:** the system rejects the request and shows password requirements

---

## Business Rules

<!-- Jira Field fallback in description (custom business rules field not available) -->

- Email must be unique.
- Password length must be between 8 and 72 characters.
- New accounts must be assigned role `player` by default.

---

## Workflow

1. User enters registration data.
2. System validates payload.
3. System creates user in auth provider and profile in DB.
4. System returns success or validation error.

---

## Mockups/Wireframes

- No Figma URL available in current context.
- UI should prioritize mobile-first form readability.

---

## Technical Notes

### Frontend

- Registration form page with validation feedback.

### Backend

- API endpoint aligned with `POST /api/auth/register`.

### Database

- Profile record creation after auth user creation.

### External Services

- Supabase Auth.

---

## Dependencies

### Blocked By

- None.

### Blocks

- CH-3 (authenticated user flows).
- CH-4 (recover account for registered users).

### Related Stories

- CH-3, CH-4.

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

See: `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-2-user-registration-email/acceptance-test-plan.md` (Fase 5)

---

## Notes

Mapped to FR-001 in `.context/SRS/functional-specs.md`.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-CH-1-auth-account-core/epic.md`
- **PRD:** `.context/PRD/user-journeys.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-001)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
