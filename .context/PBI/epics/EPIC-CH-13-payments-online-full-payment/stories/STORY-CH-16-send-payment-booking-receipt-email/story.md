# As a player, I want to receive a payment/booking receipt email so that I have transaction proof

**Jira Key:** CH-16  
**Epic:** CH-13 (Payments - Online Full Payment)  
**Priority:** Medium  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

## User Story
**As a** player  
**I want to** receive receipt email after payment  
**So that** I keep proof of transaction

## Scope
### In Scope
- Email trigger after successful payment confirmation.
- Template with booking and payment reference.
- Delivery status persistence and dedupe.

### Out of Scope
- WhatsApp notifications.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Send confirmation receipt
- **Given:** booking is confirmed by payment
- **When:** notification event is processed
- **Then:** receipt email is sent and logged

### Scenario 2: Delivery failure traceability
- **Given:** email provider failure
- **When:** receipt send is attempted
- **Then:** failed status is stored for follow-up

### Scenario 3: Duplicate prevention
- **Given:** event already processed
- **When:** duplicate trigger arrives
- **Then:** second email is not sent

## Notes
Mapped to FR-012.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-13-payments-online-full-payment/epic.md`
- `.context/SRS/functional-specs.md`
