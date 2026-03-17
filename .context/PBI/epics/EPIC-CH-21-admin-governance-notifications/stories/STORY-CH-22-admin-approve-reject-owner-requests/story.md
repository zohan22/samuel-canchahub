# As an admin, I want to approve or reject owner/complex requests so that supply quality is ensured

**Jira Key:** CH-22  
**Epic:** CH-21 (Admin Governance & Notifications)  
**Priority:** High  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

## User Story
**As an** admin  
**I want to** approve/reject owner onboarding requests  
**So that** marketplace supply quality is controlled

## Scope
### In Scope
- Decision endpoint for onboarding requests.
- Rejection reason requirement.
- Audit trail persistence.

### Out of Scope
- Multi-step approval chains.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Approve request
- **Given:** pending request
- **When:** admin approves
- **Then:** request becomes approved and owner is notified

### Scenario 2: Reject with reason
- **Given:** pending request
- **When:** admin rejects with reason
- **Then:** request becomes rejected with reason saved

### Scenario 3: Non-admin attempt
- **Given:** non-admin user
- **When:** decision endpoint is called
- **Then:** access is denied

## Notes
Mapped to FR-016.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-21-admin-governance-notifications/epic.md`
- `.context/SRS/functional-specs.md`
