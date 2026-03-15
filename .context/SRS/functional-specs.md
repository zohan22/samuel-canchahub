# Canchahub - Functional Specifications (SRS)

## Trazabilidad PRD -> SRS

Cada User Story del MVP Scope se mapea 1:1 a un Functional Requirement (FR-001 a FR-018).

---

**FR-001: El sistema debe permitir registro de cuentas con email y password**

- **Relacionado a:** EPIC-CANCHAHUB-01, US 1.1
- **Input:**
  - email (string, formato email, max 254)
  - password (string, min 8, max 72)
  - full_name (string, min 2, max 120)
- **Processing:** validar formato, crear usuario en Supabase Auth, crear perfil con rol `player` por defecto.
- **Output:** usuario creado con `user_id`, `email`, `role`, `created_at`.
- **Validations:** email unico, password robusto, campos requeridos no vacios.

**FR-002: El sistema debe autenticar usuarios y gestionar cierre de sesion**

- **Relacionado a:** EPIC-CANCHAHUB-01, US 1.2
- **Input:** email/password o refresh token valido.
- **Processing:** autenticar en Supabase Auth, emitir access token/refresh token, invalidar sesion en logout.
- **Output:** sesion activa con tokens o confirmacion de logout.
- **Validations:** credenciales correctas, cuenta activa, tokens vigentes.

**FR-003: El sistema debe permitir recuperacion de password por email**

- **Relacionado a:** EPIC-CANCHAHUB-01, US 1.3
- **Input:** email registrado; nuevo password al completar reset.
- **Processing:** generar link de reset seguro, enviar email, actualizar hash de password al confirmar.
- **Output:** confirmacion de envio y confirmacion de password actualizado.
- **Validations:** email existente, token de reset no expirado, password cumple policy.

**FR-004: El sistema debe permitir buscar canchas con filtros combinados**

- **Relacionado a:** EPIC-CANCHAHUB-02, US 2.1
- **Input:** deporte, zona, precio_min, precio_max, fecha, pagina.
- **Processing:** consultar complejos/canchas activas, aplicar filtros y paginacion.
- **Output:** listado de canchas con metadatos clave para decision.
- **Validations:** rangos de precio validos, fecha valida, pagina >= 1.

**FR-005: El sistema debe mostrar disponibilidad por slots en tiempo real**

- **Relacionado a:** EPIC-CANCHAHUB-02, US 2.2
- **Input:** court_id, fecha.
- **Processing:** resolver slots disponibles considerando disponibilidad owner y reservas confirmadas/pending.
- **Output:** matriz de horarios con estados (`available`, `held`, `booked`).
- **Validations:** court_id valido, fecha dentro de ventana configurable (ej. 30 dias).

**FR-006: El sistema debe mostrar detalle completo de cancha y complejo**

- **Relacionado a:** EPIC-CANCHAHUB-02, US 2.3
- **Input:** court_id.
- **Processing:** obtener datos de cancha, complejo, reglas, ubicacion, fotos, precio base.
- **Output:** objeto detalle de cancha listo para UI.
- **Validations:** recurso existe y esta activo/publicado.

**FR-007: El sistema debe crear reservas para slots disponibles**

- **Relacionado a:** EPIC-CANCHAHUB-03, US 3.1
- **Input:** user_id, court_id, start_at, end_at.
- **Processing:** verificar disponibilidad atomica, calcular monto, crear reserva `pending_payment`.
- **Output:** booking con `booking_id`, `status`, `amount_total`, `expires_at`.
- **Validations:** slot futuro, duracion permitida, usuario autenticado, cancha activa.

**FR-008: El sistema debe cancelar reservas aplicando politica moderada**

- **Relacionado a:** EPIC-CANCHAHUB-03, US 3.2
- **Input:** booking_id, user_id solicitante.
- **Processing:** calcular ventana de cancelacion, determinar penalidad/reembolso, actualizar estado de reserva.
- **Output:** resultado con `refund_amount`, `penalty_amount`, `policy_window`.
- **Validations:** reserva pertenece al usuario o rol admin/owner autorizado, estado cancelable.

**FR-009: El sistema debe prevenir doble reserva del mismo slot**

- **Relacionado a:** EPIC-CANCHAHUB-03, US 3.3
- **Input:** court_id, start_at, end_at.
- **Processing:** control transaccional/locking logico, verificacion de solapamiento antes de confirmar.
- **Output:** confirmacion de lock o error de conflicto.
- **Validations:** no overlap contra estados `pending_payment`, `confirmed`, `in_progress`.

**FR-010: El sistema debe procesar pago online completo para confirmar reserva**

- **Relacionado a:** EPIC-CANCHAHUB-04, US 4.1
- **Input:** booking_id, payment_method_token.
- **Processing:** invocar PaymentProvider adapter, registrar intento, actualizar booking segun resultado.
- **Output:** `payment_status` (`succeeded`/`failed`/`pending`) y booking actualizado.
- **Validations:** booking en `pending_payment`, monto consistente, token valido.

**FR-011: El sistema debe registrar estados de pago y conciliacion desacoplada de proveedor**

- **Relacionado a:** EPIC-CANCHAHUB-04, US 4.2
- **Input:** eventos de pago (sync/async), provider_reference.
- **Processing:** persistir transiciones en tabla de pagos, reconciliar con reserva, soportar retries idempotentes.
- **Output:** historial de pagos auditable por transaccion.
- **Validations:** idempotency_key unica, transicion de estado valida, firma de evento cuando aplique.

**FR-012: El sistema debe enviar comprobante de pago y reserva por email**

- **Relacionado a:** EPIC-CANCHAHUB-04, US 4.3
- **Input:** booking_id, payment_id, email destino.
- **Processing:** construir template transaccional y enviar por servicio email.
- **Output:** envio registrado (`sent`/`failed`) con timestamp.
- **Validations:** email valido, booking `confirmed`, deduplicacion de envios.

**FR-013: El sistema debe soportar onboarding asistido de owners por admin**

- **Relacionado a:** EPIC-CANCHAHUB-05, US 5.1
- **Input:** solicitud owner (datos personales + complejo).
- **Processing:** crear request `pending_review`, permitir aprobacion/rechazo admin, activar owner.
- **Output:** estado de solicitud (`approved`, `rejected`, `changes_requested`).
- **Validations:** datos minimos requeridos, owner no duplicado por email/telefono.

**FR-014: El sistema debe permitir a owner gestionar disponibilidad y precios**

- **Relacionado a:** EPIC-CANCHAHUB-05, US 5.2
- **Input:** court_id, reglas de horario, precio por franja.
- **Processing:** guardar calendario operativo, validar conflictos con reservas ya confirmadas.
- **Output:** disponibilidad publicada y versionada.
- **Validations:** owner autorizado sobre court_id, precio > 0, franjas no solapadas.

**FR-015: El sistema debe permitir a owner gestionar reservas de sus canchas**

- **Relacionado a:** EPIC-CANCHAHUB-05, US 5.3
- **Input:** filtros por fecha/estado/cancha.
- **Processing:** listar reservas asociadas a complejos del owner, permitir acciones autorizadas (check-in, marcar no-show).
- **Output:** tablero con reservas y estados operativos.
- **Validations:** RBAC owner, acciones permitidas por estado.

**FR-016: El sistema debe permitir a admin aprobar o rechazar oferta de canchas**

- **Relacionado a:** EPIC-CANCHAHUB-06, US 6.1
- **Input:** onboarding_request_id, decision, motivo.
- **Processing:** aplicar decision y auditar actor/fecha/motivo.
- **Output:** entidad actualizada y notificacion al owner.
- **Validations:** solo rol admin, motivo obligatorio en rechazo.

**FR-017: El sistema debe permitir a admin gestionar catalogos base**

- **Relacionado a:** EPIC-CANCHAHUB-06, US 6.2
- **Input:** operaciones CRUD sobre deportes, reglas, estados configurables.
- **Processing:** aplicar cambios con control de integridad referencial.
- **Output:** catalogos actualizados y disponibles para frontend/backoffice.
- **Validations:** unicidad de claves de catalogo, soft delete cuando tenga referencias activas.

**FR-018: El sistema debe enviar emails transaccionales de ciclo de reserva**

- **Relacionado a:** EPIC-CANCHAHUB-06, US 6.3
- **Input:** eventos (`booking_confirmed`, `booking_cancelled`, `booking_reminder_24h`).
- **Processing:** encolar evento, renderizar template segun evento, registrar delivery status.
- **Output:** notificaciones enviadas y trazables.
- **Validations:** destinatario valido, no envio duplicado para mismo evento/booking.
