# As a player, I want to view available slots by date and time so that I can choose a real schedule

**Jira Key:** CH-7  
**Epic:** CH-5 (Court Discovery & Availability)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** player  
**I want to** view slot availability for a selected date  
**So that** I can choose a real and reservable schedule

---

## Scope

### In Scope

- Availability request by `courtId` and `date`.
- Slot statuses `available`, `held`, `booked`.
- Date window and resource validation.
- Response format optimized for slot-grid UI.

### Out of Scope

- Multi-day and weekly calendar planning.
- Auto selection of best slot.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Valid date returns slot matrix

- **Given:** a player viewing a valid court
- **When:** the player requests availability for a valid date
- **Then:** the system returns slots with correct status per time block

### Scenario 2: Date outside booking window

- **Given:** a player viewing a valid court
- **When:** the player requests a date outside configured window
- **Then:** the system returns a validation error and does not provide slots

### Scenario 3: Court unavailable or missing

- **Given:** a player requests availability for an invalid or inactive court
- **When:** the availability endpoint is called
- **Then:** the system returns not-found/unavailable response

---

## Business Rules

- Date must be within allowed reservation window.
- Slot state calculation must include existing held/booked reservations.
- Inactive courts cannot expose availability.

---

## Workflow

1. Player selects a date for a court.
2. System validates `courtId` and `date`.
3. System computes slot states from availability + reservations.
4. UI renders slot matrix for selection.

---

## Mockups/Wireframes

- No mockup URL available in current context.

---

## Technical Notes

### Frontend

- Slot-grid component with state legend.

### Backend

- Endpoint aligned with `GET /api/courts/{courtId}/availability`.

### Database

- Combine `court_availability` and booking status data.

### External Services

- None required beyond DB.

---

## Dependencies

### Blocked By

- CH-6 for primary discovery entrypoint.

### Blocks

- Booking creation flow (future EPIC-CH-9+).

### Related Stories

- CH-6, CH-8.

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

See: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-7-view-availability-slots/acceptance-test-plan.md` (Fase 5)

---

## Notes

Mapped to FR-005 in `.context/SRS/functional-specs.md`.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/epic.md`
- **PRD:** `.context/PRD/user-journeys.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-005)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
