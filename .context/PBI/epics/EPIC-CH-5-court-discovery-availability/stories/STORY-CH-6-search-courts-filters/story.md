# As a player, I want to search courts by sport, zone, and price range so that I can evaluate options

**Jira Key:** CH-6  
**Epic:** CH-5 (Court Discovery & Availability)  
**Priority:** High  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** player  
**I want to** search courts by sport, zone, and price range  
**So that** I can quickly evaluate options that match my constraints

---

## Scope

### In Scope

- Search endpoint with combined filters (`sport`, `zone`, `priceMin`, `priceMax`, `date`).
- Pagination with `page` and `pageSize`.
- Court result cards with basic decision metadata.
- Validation for invalid query ranges and formats.

### Out of Scope

- Personalized ranking model.
- Saved filters/history.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Combined filters return matching courts

- **Given:** a player on the search page
- **When:** the player applies sport, zone, and price filters
- **Then:** the system returns only courts that satisfy all filters

### Scenario 2: Invalid range validation

- **Given:** a player on the search page
- **When:** the player sets `priceMin` greater than `priceMax`
- **Then:** the system rejects the query with validation feedback

### Scenario 3: Empty results state

- **Given:** a player on the search page
- **When:** no courts match the selected filters
- **Then:** the system returns an empty list and a clear no-results message

---

## Business Rules

- `priceMin` and `priceMax` must be non-negative.
- `page` must be >= 1.
- Only active and published courts are searchable.

---

## Workflow

1. Player defines filters.
2. System validates query params.
3. System runs filtered query + pagination.
4. UI renders results or empty state.

---

## Mockups/Wireframes

- No Figma URL available in current context.

---

## Technical Notes

### Frontend

- Search/filter panel and paginated list.

### Backend

- Endpoint aligned with `GET /api/courts`.

### Database

- Query over active complexes/courts with indexed filters.

### External Services

- None required beyond DB.

---

## Dependencies

### Blocked By

- None (can be built in parallel with CH-8).

### Blocks

- CH-7 and downstream booking flow quality.

### Related Stories

- CH-7, CH-8.

---

## Definition of Done

- [ ] Código implementado y funcionando
- [ ] Tests unitarios (coverage > 80%)
- [ ] Tests de integración (API + DB)
- [ ] Tests E2E (Playwright)
- [ ] Code review aprobado (2 reviewers)
- [ ] Documentación actualizada (README, API docs)
- [ ] Deployed to staging
- [ ] QA testing passed
- [ ] Acceptance criteria validated
- [ ] No critical/high bugs open

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-6-search-courts-filters/acceptance-test-plan.md` (Fase 5)

---

## Notes

Mapped to FR-004 in `.context/SRS/functional-specs.md`.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/epic.md`
- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-004)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
