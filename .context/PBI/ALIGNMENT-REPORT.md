# ALIGNMENT REPORT - PRD -> SRS -> Jira -> Local PBI

Project: CanchaHub  
Project Key: CH  
Fecha: 2026-03-16

---

## Objetivo

Este reporte consolida la trazabilidad entre alcance de producto (PRD), requisitos funcionales (SRS), issues creados en Jira y estructura local de PBI.

---

## Resumen de Cobertura

- Epicas PRD cubiertas: 6/6
- User Stories PRD cubiertas: 18/18
- Functional Requirements SRS cubiertos: 18/18 (FR-001 a FR-018)
- Epicas Jira creadas: CH-1, CH-5, CH-9, CH-13, CH-17, CH-21
- Stories Jira creadas: CH-2 a CH-4, CH-6 a CH-8, CH-10 a CH-12, CH-14 a CH-16, CH-18 a CH-20, CH-22 a CH-24

---

## Trazabilidad Detallada

| PRD Epic | PRD US | SRS FR | Jira Epic | Jira Story | Ruta local story.md |
| --- | --- | --- | --- | --- | --- |
| EPIC-CANCHAHUB-01 | US 1.1 Registro | FR-001 | CH-1 | CH-2 | `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-2-user-registration-email/story.md` |
| EPIC-CANCHAHUB-01 | US 1.2 Login/Logout | FR-002 | CH-1 | CH-3 | `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-3-user-login-logout/story.md` |
| EPIC-CANCHAHUB-01 | US 1.3 Recuperacion password | FR-003 | CH-1 | CH-4 | `.context/PBI/epics/EPIC-CH-1-auth-account-core/stories/STORY-CH-4-password-recovery-email/story.md` |
| EPIC-CANCHAHUB-02 | US 2.1 Busqueda canchas | FR-004 | CH-5 | CH-6 | `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-6-search-courts-filters/story.md` |
| EPIC-CANCHAHUB-02 | US 2.2 Ver slots disponibles | FR-005 | CH-5 | CH-7 | `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-7-view-availability-slots/story.md` |
| EPIC-CANCHAHUB-02 | US 2.3 Detalle cancha | FR-006 | CH-5 | CH-8 | `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/stories/STORY-CH-8-view-court-details/story.md` |
| EPIC-CANCHAHUB-03 | US 3.1 Crear reserva | FR-007 | CH-9 | CH-10 | `.context/PBI/epics/EPIC-CH-9-booking-cancellation-policy/stories/STORY-CH-10-create-booking-lock-slot/story.md` |
| EPIC-CANCHAHUB-03 | US 3.2 Cancelar reserva | FR-008 | CH-9 | CH-11 | `.context/PBI/epics/EPIC-CH-9-booking-cancellation-policy/stories/STORY-CH-11-cancel-booking-moderate-policy/story.md` |
| EPIC-CANCHAHUB-03 | US 3.3 Evitar doble reserva | FR-009 | CH-9 | CH-12 | `.context/PBI/epics/EPIC-CH-9-booking-cancellation-policy/stories/STORY-CH-12-prevent-double-booking-slot/story.md` |
| EPIC-CANCHAHUB-04 | US 4.1 Pago online 100% | FR-010 | CH-13 | CH-14 | `.context/PBI/epics/EPIC-CH-13-payments-online-full-payment/stories/STORY-CH-14-full-payment-confirm-booking/story.md` |
| EPIC-CANCHAHUB-04 | US 4.2 Estados pago/conciliacion | FR-011 | CH-13 | CH-15 | `.context/PBI/epics/EPIC-CH-13-payments-online-full-payment/stories/STORY-CH-15-payment-reconciliation-adapter/story.md` |
| EPIC-CANCHAHUB-04 | US 4.3 Comprobante email | FR-012 | CH-13 | CH-16 | `.context/PBI/epics/EPIC-CH-13-payments-online-full-payment/stories/STORY-CH-16-send-payment-booking-receipt-email/story.md` |
| EPIC-CANCHAHUB-05 | US 5.1 Onboarding asistido | FR-013 | CH-17 | CH-18 | `.context/PBI/epics/EPIC-CH-17-owner-operations-assisted-onboarding/stories/STORY-CH-18-admin-assisted-owner-onboarding/story.md` |
| EPIC-CANCHAHUB-05 | US 5.2 Gestion disponibilidad/precio | FR-014 | CH-17 | CH-19 | `.context/PBI/epics/EPIC-CH-17-owner-operations-assisted-onboarding/stories/STORY-CH-19-manage-availability-prices/story.md` |
| EPIC-CANCHAHUB-05 | US 5.3 Gestion reservas owner | FR-015 | CH-17 | CH-20 | `.context/PBI/epics/EPIC-CH-17-owner-operations-assisted-onboarding/stories/STORY-CH-20-owner-manage-reservations/story.md` |
| EPIC-CANCHAHUB-06 | US 6.1 Aprobar/rechazar owners | FR-016 | CH-21 | CH-22 | `.context/PBI/epics/EPIC-CH-21-admin-governance-notifications/stories/STORY-CH-22-admin-approve-reject-owner-requests/story.md` |
| EPIC-CANCHAHUB-06 | US 6.2 Gestion catalogos base | FR-017 | CH-21 | CH-23 | `.context/PBI/epics/EPIC-CH-21-admin-governance-notifications/stories/STORY-CH-23-admin-manage-base-catalogs/story.md` |
| EPIC-CANCHAHUB-06 | US 6.3 Emails transaccionales | FR-018 | CH-21 | CH-24 | `.context/PBI/epics/EPIC-CH-21-admin-governance-notifications/stories/STORY-CH-24-system-send-transactional-emails/story.md` |

---

## Mapeo de Epicas Jira -> Carpetas Locales

| Jira Epic | Carpeta local |
| --- | --- |
| CH-1 | `.context/PBI/epics/EPIC-CH-1-auth-account-core/` |
| CH-5 | `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/` |
| CH-9 | `.context/PBI/epics/EPIC-CH-9-booking-cancellation-policy/` |
| CH-13 | `.context/PBI/epics/EPIC-CH-13-payments-online-full-payment/` |
| CH-17 | `.context/PBI/epics/EPIC-CH-17-owner-operations-assisted-onboarding/` |
| CH-21 | `.context/PBI/epics/EPIC-CH-21-admin-governance-notifications/` |

---

## Notas de Configuracion Jira

- Los custom fields UPEX especificos del prompt (`customfield_10201`, `customfield_10401`, etc.) no estan disponibles en este workspace.
- Se aplico estrategia de fallback en Jira: Scope, Acceptance Criteria y Business Rules se incluyeron en `description` de cada story.
- Campos usados efectivamente:
  - `customfield_10036` -> Story Points
  - `customfield_10014` / `epic_link` -> Epic Link
- El campo `customfield_11600` (WebLink) se dejo vacio por no tener URL confirmada en el contexto.

---

## Estado Final

Backlog MVP sincronizado entre PRD, SRS, Jira y estructura local PBI con trazabilidad 1:1.
