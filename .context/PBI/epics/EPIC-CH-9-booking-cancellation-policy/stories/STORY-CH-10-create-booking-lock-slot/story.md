# As a player, I want to create a booking so that I can lock an available slot

**Jira Key:** CH-10  
**Epic:** CH-9 (Booking & Cancellation Policy)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

## User Story
**As a** player  
**I want to** create a booking  
**So that** I can lock an available slot

## Scope
### In Scope
- Booking creation endpoint with court/time range.
- Atomic availability check.
- Initial state `pending_payment` with amount calculation.

### Out of Scope
- Payment processing.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Successful booking creation
- **Given:** an authenticated player selecting an available slot
- **When:** booking is requested with valid payload
- **Then:** booking is created in `pending_payment`

### Scenario 2: Slot conflict
- **Given:** slot is no longer available
- **When:** booking is requested
- **Then:** system returns conflict response

### Scenario 3: Invalid time range
- **Given:** invalid `startAt`/`endAt` values
- **When:** booking is requested
- **Then:** system rejects with validation error

## Notes
Mapped to FR-007.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-9-booking-cancellation-policy/epic.md`
- `.context/SRS/functional-specs.md`
