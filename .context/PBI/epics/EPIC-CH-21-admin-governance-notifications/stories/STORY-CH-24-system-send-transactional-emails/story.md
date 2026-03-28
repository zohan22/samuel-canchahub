# As a system, I want to send confirmation, cancellation, and reminder emails so that no-shows are reduced

**Jira Key:** CH-24  
**Epic:** CH-21 (Admin Governance & Notifications)  
**Priority:** Medium  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

## User Story
**As a** system  
**I want to** send transactional reservation emails  
**So that** no-shows are reduced

## Scope
### In Scope
- Events: `booking_confirmed`, `booking_cancelled`, `booking_reminder_24h`.
- Template resolution by event type.
- Delivery status persistence and dedupe.

### Out of Scope
- SMS and push channels.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Confirmation email
- **Given:** booking becomes confirmed
- **When:** event is processed
- **Then:** confirmation email is sent and tracked

### Scenario 2: Cancellation email
- **Given:** booking becomes cancelled
- **When:** event is processed
- **Then:** cancellation email is sent and tracked

### Scenario 3: Deduplicated reminder
- **Given:** reminder already processed
- **When:** duplicate event arrives
- **Then:** duplicate send is prevented

## Notes
Mapped to FR-018.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-21-admin-governance-notifications/epic.md`
- `.context/SRS/functional-specs.md`
