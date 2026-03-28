# As an owner, I want to manage availability and prices so that I can optimize occupancy

**Jira Key:** CH-19  
**Epic:** CH-17 (Owner Operations - Assisted Onboarding)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

## User Story
**As an** owner  
**I want to** manage availability and prices  
**So that** I can optimize occupancy

## Scope
### In Scope
- Weekly availability rules by court.
- Price configuration per time range.
- Overlap and conflict validation.

### Out of Scope
- Dynamic pricing engine.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Valid update
- **Given:** authorized owner on own court
- **When:** valid rules are submitted
- **Then:** schedule is updated

### Scenario 2: Overlapping ranges
- **Given:** owner submits overlapping ranges
- **When:** validation runs
- **Then:** request is rejected

### Scenario 3: Conflict with confirmed booking
- **Given:** edit impacts confirmed reservation
- **When:** owner submits update
- **Then:** system blocks conflicting change

## Notes
Mapped to FR-014.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-17-owner-operations-assisted-onboarding/epic.md`
- `.context/SRS/functional-specs.md`
