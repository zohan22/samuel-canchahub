# As an admin, I want to manage base catalogs so that platform consistency is maintained

**Jira Key:** CH-23  
**Epic:** CH-21 (Admin Governance & Notifications)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

## User Story
**As an** admin  
**I want to** manage base catalogs  
**So that** platform consistency is maintained

## Scope
### In Scope
- CRUD for sports/rules/booking-status catalogs.
- Key uniqueness and referential integrity validation.
- Soft-delete for referenced items.

### Out of Scope
- Bulk import/export tooling.

## Acceptance Criteria (Gherkin format)
### Scenario 1: Create valid item
- **Given:** admin in catalog module
- **When:** unique item is created
- **Then:** item is persisted and visible

### Scenario 2: Duplicate key
- **Given:** existing key
- **When:** duplicate key is submitted
- **Then:** system rejects request

### Scenario 3: Soft delete on referenced item
- **Given:** item has active references
- **When:** admin deletes item
- **Then:** system soft-deletes preserving integrity

## Notes
Mapped to FR-017.

## Related Documentation
- `.context/PBI/epics/EPIC-CH-21-admin-governance-notifications/epic.md`
- `.context/SRS/functional-specs.md`
