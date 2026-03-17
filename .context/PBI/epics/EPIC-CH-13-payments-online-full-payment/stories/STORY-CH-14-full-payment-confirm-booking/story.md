# As a player, I want to pay 100% online so that my booking is confirmed instantly

**Jira Key:** CH-14  
**Epic:** CH-13 (Payments - Online Full Payment)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

## User Story
**As a** player  
**I want to** pay online the full booking amount  
**So that** my booking is confirmed instantly

## Scope
### In Scope
- Payment endpoint for pending bookings.
- Full charge attempt and response handling.
- Booking transition to `confirmed` on success.

### Out of Scope
- Partial payments.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Payment success
- **Given:** booking in `pending_payment`
- **When:** valid payment token is submitted
- **Then:** booking becomes `confirmed`

### Scenario 2: Payment failure
- **Given:** booking in `pending_payment`
- **When:** provider returns failed
- **Then:** booking remains unconfirmed

### Scenario 3: Invalid booking state
- **Given:** booking not in `pending_payment`
- **When:** payment is attempted
- **Then:** system rejects request

## Notes
Mapped to FR-010.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-13-payments-online-full-payment/epic.md`
- `.context/SRS/functional-specs.md`
