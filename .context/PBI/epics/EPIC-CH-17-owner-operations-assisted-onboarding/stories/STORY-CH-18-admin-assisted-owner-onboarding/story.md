# As an owner, I want admin-assisted onboarding so that I can start operations quickly

**Jira Key:** CH-18  
**Epic:** CH-17 (Owner Operations - Assisted Onboarding)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

## User Story
**As an** owner  
**I want** admin-assisted onboarding  
**So that** I can start operating quickly

## Scope
### In Scope
- Owner onboarding request creation.
- Admin decision flow (`pending_review`, `approved`, `rejected`, `changes_requested`).
- Activation traceability.

### Out of Scope
- Fully automated onboarding.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Submit request
- **Given:** owner has required data
- **When:** request is submitted
- **Then:** status is `pending_review`

### Scenario 2: Admin approval
- **Given:** pending request
- **When:** admin approves
- **Then:** owner is activated

### Scenario 3: Changes requested
- **Given:** incomplete request
- **When:** admin requests changes
- **Then:** status becomes `changes_requested`

## Notes
Mapped to FR-013.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-17-owner-operations-assisted-onboarding/epic.md`
- `.context/SRS/functional-specs.md`
