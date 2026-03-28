# Payments (Online Full Payment)

**Jira Key:** CH-13  
**Status:** TO DO  
**Priority:** CRITICAL  
**Phase:** Core Features

---

## Epic Description

Esta epica habilita el pago online del 100% para confirmar reservas de forma inmediata, con persistencia de estados, reconciliacion e idempotencia via adapter desacoplado.

Tambien contempla comprobante por email para respaldo transaccional del usuario.

**Business Value:**  
Convierte intencion en ingreso medible y reduce friccion operativa al confirmar reservas con evidencia auditable.

---

## User Stories

1. **CH-14** - As a player, I want to pay 100% online so that my booking is confirmed instantly.
2. **CH-15** - As a system, I want to persist payment and reconciliation states via provider-agnostic adapter so that future providers can be integrated.
3. **CH-16** - As a player, I want to receive a payment/booking receipt email so that I have transaction proof.

---

## Scope

### In Scope

- Cobro online completo para reservas `pending_payment`.
- Registro de estados de pago e idempotencia.
- Email de comprobante tras confirmacion.

### Out of Scope (Future)

- Cuotas/pagos parciales.
- Integracion con facturacion avanzada.

---

## Related Functional Requirements

- **FR-010**, **FR-011**, **FR-012**.

See: `.context/SRS/functional-specs.md`

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-CH-13-payments-online-full-payment/feature-implementation-plan.md` (Fase 6)

### Recommended Story Order

1. [CH-15] - Payment adapter and reconciliation
2. [CH-14] - Checkout payment flow
3. [CH-16] - Receipt notifications

---

## Related Documentation

- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-010 a FR-012)
- **API Contracts:** `.context/SRS/api-contracts.yaml`
