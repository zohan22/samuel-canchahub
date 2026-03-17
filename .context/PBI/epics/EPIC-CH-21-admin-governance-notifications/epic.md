# Admin Governance & Notifications

**Jira Key:** CH-21  
**Status:** TO DO  
**Priority:** HIGH  
**Phase:** Operations

---

## Epic Description

Esta epica concentra controles de gobierno del admin y notificaciones transaccionales para sostener calidad operativa del marketplace.

Incluye decisiones de onboarding, gestion de catalogos base y envio de emails del ciclo de reserva.

**Business Value:**  
Mejora consistencia de datos, reduce no-shows y permite supervision activa de la calidad de oferta en MVP.

---

## User Stories

1. **CH-22** - As an admin, I want to approve or reject owner/complex requests so that supply quality is ensured.
2. **CH-23** - As an admin, I want to manage base catalogs so that platform consistency is maintained.
3. **CH-24** - As a system, I want to send confirmation, cancellation, and reminder emails so that no-shows are reduced.

---

## Scope

### In Scope

- Aprobacion/rechazo de solicitudes de onboarding.
- CRUD de catalogos base.
- Notificaciones de confirmacion, cancelacion y recordatorio.

### Out of Scope (Future)

- Notificaciones por WhatsApp/SMS.
- Motor de reglas complejas de comunicaciones.

---

## Related Functional Requirements

- **FR-016**, **FR-017**, **FR-018**.

See: `.context/SRS/functional-specs.md`

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-CH-21-admin-governance-notifications/feature-implementation-plan.md` (Fase 6)

### Recommended Story Order

1. [CH-22] - Onboarding decisions
2. [CH-23] - Catalog governance
3. [CH-24] - Notification events

---

## Related Documentation

- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-016 a FR-018)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
