# As an owner, I want to view and manage reservations so that I can run daily operations

**Jira Key:** CH-20  
**Epic:** CH-17 (Owner Operations - Assisted Onboarding)  
**Priority:** Medium  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

## User Story
**As an** owner  
**I want to** manage reservations in my dashboard  
**So that** I can operate daily with clarity

## Scope
### In Scope
- Reservation list by date/status/court.
- Owner-scoped visibility.
- Operational status actions (check-in/no-show).

### Out of Scope
- Revenue analytics.

## Acceptance Criteria (Gherkin format)
### Scenario 1: View owner reservations
- **Given:** owner is authenticated
- **When:** owner opens bookings dashboard
- **Then:** reservations from owner complexes are listed

### Scenario 2: Filter reservations
- **Given:** owner is on dashboard
- **When:** filters are applied
- **Then:** matching reservations are returned

### Scenario 3: Unauthorized data access
- **Given:** owner attempts cross-owner access
- **When:** request is made
- **Then:** access is denied

## Notes
Mapped to FR-015.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-17-owner-operations-assisted-onboarding/epic.md`
- `.context/SRS/functional-specs.md`
