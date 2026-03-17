# As a player, I want to view court details so that I can decide with confidence

**Jira Key:** CH-8  
**Epic:** CH-5 (Court Discovery & Availability)  
**Priority:** Medium  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** player  
**I want to** view full court details  
**So that** I can make a confident booking decision

---

## Scope

### In Scope

- Detail endpoint by `courtId`.
- Payload includes court/complex metadata, rules, photos, price, and location.
- Handling for not-found and inactive resources.
- Structured response compatible with detail page UI.

### Out of Scope

- User reviews and rating section.
- Advanced media experiences.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful detail retrieval

- **Given:** a player on the court list
- **When:** the player opens a valid court detail page
- **Then:** the system returns complete detail data for decision making

### Scenario 2: Court not found

- **Given:** a player requests a non-existent court identifier
- **When:** the detail endpoint is called
- **Then:** the system returns a not-found response

### Scenario 3: Inactive court detail access

- **Given:** a player requests an inactive/unpublished court
- **When:** the detail endpoint is called
- **Then:** the system returns unavailable response and does not expose detail payload

---

## Business Rules

- Detail page must only expose active/published courts.
- Photos must be valid URIs.
- Rules and pricing information must be explicit and readable.

---

## Workflow

1. Player selects a court from search results.
2. System fetches detail by `courtId`.
3. System validates court visibility status.
4. UI renders complete detail context.

---

## Mockups/Wireframes

- No mockup URL available in current context.

---

## Technical Notes

### Frontend

- Court detail page and media/rules sections.

### Backend

- Endpoint aligned with `GET /api/courts/{courtId}`.

### Database

- Join court and complex entities plus related metadata.

### External Services

- Storage URLs for photos.

---

## Dependencies

### Blocked By

- CH-6 (search entrypoint).

### Blocks

- Booking confidence and conversion quality.

### Related Stories

- CH-6, CH-7.

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

See: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-8-view-court-details/acceptance-test-plan.md` (Fase 5)

---

## Notes

Mapped to FR-006 in `.context/SRS/functional-specs.md`.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/epic.md`
- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-006)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
