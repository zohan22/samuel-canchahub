# As a system, I want to prevent double booking of the same slot so that booking consistency is guaranteed

**Jira Key:** CH-12  
**Epic:** CH-9 (Booking & Cancellation Policy)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

## User Story
**As a** system  
**I want to** prevent double booking  
**So that** slot consistency is guaranteed

## Scope
### In Scope
- Overlap detection under concurrency.
- Transactional validation over reserving statuses.
- Deterministic conflict response.

### Out of Scope
- Multi-region distributed lock.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Concurrent requests
- **Given:** two simultaneous booking attempts for same slot
- **When:** both are processed
- **Then:** one succeeds and the other fails with conflict

### Scenario 2: Overlap with confirmed booking
- **Given:** existing confirmed booking
- **When:** new overlapping booking is requested
- **Then:** request is rejected

### Scenario 3: Overlap with pending hold
- **Given:** existing `pending_payment` hold
- **When:** overlapping request is sent
- **Then:** request is rejected until hold is released

## Notes
Mapped to FR-009.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-9-booking-cancellation-policy/epic.md`
- `.context/SRS/functional-specs.md`
