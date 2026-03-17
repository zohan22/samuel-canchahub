# As a player, I want to cancel my booking under a moderate policy so that I can manage schedule changes

**Jira Key:** CH-11  
**Epic:** CH-9 (Booking & Cancellation Policy)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

## User Story
**As a** player  
**I want to** cancel a booking under a moderate policy  
**So that** I can manage schedule changes

## Scope
### In Scope
- Policy windows: >=24h, 6-24h, <6h.
- Penalty/refund calculation.
- Transition to `cancelled` with auditable amounts.

### Out of Scope
- Refund payout integration.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Full refund window
- **Given:** booking starts in >=24h
- **When:** user cancels
- **Then:** refund is 100%

### Scenario 2: Partial refund window
- **Given:** booking starts between 6h and 24h
- **When:** user cancels
- **Then:** refund is 50%

### Scenario 3: Non-cancellable state
- **Given:** booking in `in_progress` or `completed`
- **When:** user cancels
- **Then:** cancellation is rejected

## Notes
Mapped to FR-008.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-9-booking-cancellation-policy/epic.md`
- `.context/SRS/functional-specs.md`
