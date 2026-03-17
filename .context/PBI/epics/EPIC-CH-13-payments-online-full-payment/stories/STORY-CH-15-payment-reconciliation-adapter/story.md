# As a system, I want to persist payment and reconciliation states via provider-agnostic adapter so that future providers can be integrated

**Jira Key:** CH-15  
**Epic:** CH-13 (Payments - Online Full Payment)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

## User Story
**As a** system  
**I want to** persist payment/reconciliation states through an adapter  
**So that** provider integration can evolve without breaking core flow

## Scope
### In Scope
- Provider-agnostic payment adapter contract.
- State transition persistence.
- Idempotency support.

### Out of Scope
- Final third-party provider integration.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Valid transition persistence
- **Given:** payment lifecycle event
- **When:** state changes
- **Then:** transition is persisted with audit data

### Scenario 2: Idempotent retry
- **Given:** same idempotency key retried
- **When:** request is processed again
- **Then:** no duplicate charge is generated

### Scenario 3: Invalid transition
- **Given:** payment in terminal state
- **When:** invalid transition requested
- **Then:** transition is rejected

## Notes
Mapped to FR-011.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-13-payments-online-full-payment/epic.md`
- `.context/SRS/functional-specs.md`
