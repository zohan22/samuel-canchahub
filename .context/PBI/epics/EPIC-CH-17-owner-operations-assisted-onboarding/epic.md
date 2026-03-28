# Owner Operations (Assisted Onboarding)

**Jira Key:** CH-17  
**Status:** TO DO  
**Priority:** HIGH  
**Phase:** Operations

---

## Epic Description

Esta epica permite que un owner sea habilitado por admin y opere su complejo con agenda digital: disponibilidad, precios y reservas.

El foco es reducir errores manuales y acelerar el time-to-operation del owner.

**Business Value:**  
Incrementa oferta activa de canchas y mejora la gestion diaria sin dependencia de procesos manuales por chat.

---

## User Stories

1. **CH-18** - As an owner, I want admin-assisted onboarding so that I can start operations quickly.
2. **CH-19** - As an owner, I want to manage availability and prices so that I can optimize occupancy.
3. **CH-20** - As an owner, I want to view and manage reservations so that I can run daily operations.

---

## Scope

### In Scope

- Solicitudes de onboarding con decision admin.
- Gestion de disponibilidad y precios por cancha.
- Panel operativo de reservas para owner.

### Out of Scope (Future)

- Onboarding totalmente self-service.
- Analitica avanzada de revenue para owners.

---

## Related Functional Requirements

- **FR-013**, **FR-014**, **FR-015**.

See: `.context/SRS/functional-specs.md`

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-CH-17-owner-operations-assisted-onboarding/feature-implementation-plan.md` (Fase 6)

### Recommended Story Order

1. [CH-18] - Assisted onboarding
2. [CH-19] - Availability and pricing management
3. [CH-20] - Reservation operations board

---

## Related Documentation

- **PRD:** `.context/PRD/user-journeys.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-013 a FR-015)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
