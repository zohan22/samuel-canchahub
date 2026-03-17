# Product Backlog - Epic Tree

## Overview

Total Epics: 6  
Total User Stories: 18  
Project Code: CH  
Jira Project: https://canchahub.atlassian.net/jira/software/projects/CH

---

## Epic Hierarchy

### EPIC 1: Authentication & Account Core

**Planned Jira Key:** CH-1 ✅  
**Priority:** CRITICAL  
**Description:** Gestiona el acceso seguro de usuarios con registro, inicio/cierre de sesion y recuperacion de password para habilitar el resto del flujo MVP.

**User Stories (estimado: 3):**

1. CH-2 - As a player, I want to register with email and password so that I can create my account.
2. CH-3 - As a user, I want to login and logout so that I can access the platform securely.
3. CH-4 - As a user, I want to recover my password so that I can regain account access.

---

### EPIC 2: Court Discovery & Availability

**Planned Jira Key:** CH-5 ✅  
**Priority:** HIGH  
**Description:** Permite descubrir canchas y validar disponibilidad en tiempo real para tomar decisiones rapidas y confiables.

**User Stories (estimado: 3):**

1. CH-6 - As a player, I want to search courts by sport, zone, and price range so that I can evaluate options.
2. CH-7 - As a player, I want to view available slots by date and time so that I can choose a real schedule.
3. CH-8 - As a player, I want to view court details so that I can decide with confidence.

---

### EPIC 3: Booking & Cancellation Policy

**Planned Jira Key:** CH-9 ✅  
**Priority:** CRITICAL  
**Description:** Implementa la creacion de reservas y cancelacion con politica moderada, preservando consistencia y evitando doble reserva.

**User Stories (estimado: 3):**

1. CH-10 - As a player, I want to create a booking so that I can lock an available slot.
2. CH-11 - As a player, I want to cancel my booking under a moderate policy so that I can handle schedule changes.
3. CH-12 - As a system, I want to prevent double booking of the same slot so that booking consistency is guaranteed.

---

### EPIC 4: Payments (Online Full Payment)

**Planned Jira Key:** CH-13 ✅  
**Priority:** CRITICAL  
**Description:** Procesa pago online del 100% con trazabilidad de estados, conciliacion e integracion desacoplada por adapter.

**User Stories (estimado: 3):**

1. CH-14 - As a player, I want to pay 100% online so that my booking is confirmed instantly.
2. CH-15 - As a system, I want to persist payment and reconciliation states via provider-agnostic adapter so that future providers can be integrated.
3. CH-16 - As a player, I want to receive a payment/booking receipt email so that I have transaction proof.

---

### EPIC 5: Owner Operations (Assisted Onboarding)

**Planned Jira Key:** CH-17 ✅  
**Priority:** HIGH  
**Description:** Habilita onboarding asistido y operacion diaria del owner para publicar oferta, administrar disponibilidad y gestionar reservas.

**User Stories (estimado: 3):**

1. CH-18 - As an owner, I want admin-assisted onboarding so that I can start operations quickly.
2. CH-19 - As an owner, I want to manage availability and prices so that I can optimize occupancy.
3. CH-20 - As an owner, I want to view and manage reservations so that I can run daily operations.

---

### EPIC 6: Admin Governance & Notifications

**Planned Jira Key:** CH-21 ✅  
**Priority:** HIGH  
**Description:** Consolida control administrativo sobre calidad de oferta, catalogos base y notificaciones transaccionales del ciclo de reserva.

**User Stories (estimado: 3):**

1. CH-22 - As an admin, I want to approve or reject owner/complex requests so that supply quality is ensured.
2. CH-23 - As an admin, I want to manage base catalogs so that platform consistency is maintained.
3. CH-24 - As a system, I want to send confirmation, cancellation, and reminder emails so that no-shows are reduced.

---

## Epic Prioritization

### Phase 1: Foundation (Sprint 1-2)

1. Epic 1 - Authentication & Account Core
2. Epic 2 - Court Discovery & Availability

### Phase 2: Core Booking & Revenue (Sprint 3-4)

1. Epic 3 - Booking & Cancellation Policy
2. Epic 4 - Payments (Online Full Payment)

### Phase 3: Operations & Governance (Sprint 5-6)

1. Epic 5 - Owner Operations (Assisted Onboarding)
2. Epic 6 - Admin Governance & Notifications

---

## Next Steps

1. Create EPIC 1 in Jira and capture real Jira key.
2. Create local folder `EPIC-CH-{ISSUE_NUM}-auth-account-core` and its `epic.md`.
3. Create all EPIC 1 stories in Jira, then local story folders and `story.md` files.
4. Update this file and `epic.md` with real Jira IDs as they are created.
