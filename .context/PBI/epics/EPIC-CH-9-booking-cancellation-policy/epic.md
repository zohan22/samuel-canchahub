# Booking & Cancellation Policy

**Jira Key:** CH-9  
**Status:** TO DO  
**Priority:** CRITICAL  
**Phase:** Core Features

---

## Epic Description

Esta epica implementa el corazon transaccional de reservas: creacion de booking para slots disponibles, cancelacion con politica moderada y prevencion de doble reserva en escenarios concurrentes.

Su objetivo es asegurar consistencia operativa y confianza del usuario, especialmente en momentos de alta competencia por horarios.

**Business Value:**  
Sin control de colisiones y reglas claras de cancelacion no se puede sostener una experiencia confiable ni escalable de reservas pagadas.

---

## User Stories

1. **CH-10** - As a player, I want to create a booking so that I can lock an available slot.
2. **CH-11** - As a player, I want to cancel my booking under a moderate policy so that I can manage schedule changes.
3. **CH-12** - As a system, I want to prevent double booking of the same slot so that booking consistency is guaranteed.

---

## Scope

### In Scope

- Crear reservas en estado `pending_payment`.
- Aplicar politica de cancelacion por ventanas de tiempo.
- Evitar solapamientos y doble reserva bajo concurrencia.

### Out of Scope (Future)

- Reglas de penalidad dinamicas por owner.
- Waitlist automatica por slots llenos.

---

## Related Functional Requirements

- **FR-007**, **FR-008**, **FR-009**.

See: `.context/SRS/functional-specs.md`

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-CH-9-booking-cancellation-policy/feature-implementation-plan.md` (Fase 6)

### Recommended Story Order

1. [CH-10] - Booking creation
2. [CH-12] - Double-booking prevention
3. [CH-11] - Cancellation policy

---

## Related Documentation

- **PRD:** `.context/PRD/user-journeys.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-007 a FR-009)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
