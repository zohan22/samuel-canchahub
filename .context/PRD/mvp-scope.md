# Canchahub - MVP Scope

## 1) In Scope (Must Have)

### EPIC-CANCHAHUB-01 - Authentication & Account Core

- **US 1.1:** Como player, quiero registrarme con email y password para crear mi cuenta.
- **US 1.2:** Como usuario, quiero iniciar sesion y cerrar sesion para acceder de forma segura.
- **US 1.3:** Como usuario, quiero recuperar mi password para volver a acceder si lo olvido.

### EPIC-CANCHAHUB-02 - Court Discovery & Availability

- **US 2.1:** Como player, quiero buscar canchas por deporte, zona y rango de precio para evaluar opciones.
- **US 2.2:** Como player, quiero ver slots disponibles por fecha y hora para elegir un horario real.
- **US 2.3:** Como player, quiero ver detalle de la cancha (fotos, reglas, ubicacion, precio) para decidir con confianza.

### EPIC-CANCHAHUB-03 - Booking & Cancellation Policy

- **US 3.1:** Como player, quiero crear una reserva para bloquear un slot disponible.
- **US 3.2:** Como player, quiero cancelar mi reserva segun politica moderada para gestionar cambios.
- **US 3.3:** Como sistema, quiero evitar doble reserva del mismo slot para garantizar consistencia.

### EPIC-CANCHAHUB-04 - Payments (Online Full Payment)

- **US 4.1:** Como player, quiero pagar online el 100% de mi reserva para confirmarla al instante.
- **US 4.2:** Como sistema, quiero registrar estados de pago y conciliacion mediante un adapter agnostico para soportar proveedor futuro.
- **US 4.3:** Como player, quiero recibir comprobante de pago/reserva por email para tener respaldo.

### EPIC-CANCHAHUB-05 - Owner Operations (Assisted Onboarding)

- **US 5.1:** Como owner, quiero que admin me habilite y configure mi complejo para iniciar operacion sin friccion.
- **US 5.2:** Como owner, quiero administrar disponibilidad y precio de mis canchas para optimizar ocupacion.
- **US 5.3:** Como owner, quiero ver y gestionar reservas de mis canchas para operar el dia a dia.

### EPIC-CANCHAHUB-06 - Admin Governance & Notifications

- **US 6.1:** Como admin, quiero aprobar/rechazar solicitudes de owners y complejos para asegurar calidad de oferta.
- **US 6.2:** Como admin, quiero gestionar catalogos base (deportes, reglas, estados) para mantener consistencia.
- **US 6.3:** Como sistema, quiero enviar emails de confirmacion, cancelacion y recordatorio para reducir no-show.

## 2) Out of Scope (Nice to Have, v2+)

- App movil nativa (iOS/Android).
- Motor de precios dinamicos por demanda.
- Programa de membresias/suscripciones para jugadores frecuentes.
- Sistema de ratings y reviews publico.
- Integracion con WhatsApp API para notificaciones transaccionales.
- Integraciones contables/facturacion electronica avanzada.
- Multi-ciudad y multi-pais con tenancy completo.

## 3) Success Criteria del MVP

### Criterios de aceptacion funcional

- Flujo end-to-end funcional: registro/login -> busqueda -> reserva -> pago -> confirmacion email.
- Owners operan agenda digital y pueden actualizar disponibilidad sin intervencion tecnica.
- Admin puede aprobar onboarding y monitorear estados criticos de reserva/pago.

### Metricas minimas a alcanzar (90 dias)

- >= 300 players registrados.
- >= 20 complejos activos.
- >= 450 reservas pagadas.
- Conversion busqueda -> reserva pagada >= 12%.
- Tasa de error en reservas/pagos < 1.5%.

### Condiciones para lanzamiento

- Cumplimiento de FR y NFR criticos (auth, pagos, integridad de disponibilidad, seguridad basica).
- Pruebas UAT en Sucre con al menos 3 complejos y 30 reservas piloto.
- Monitoreo operativo habilitado (logs, alertas de fallas de pago y errores 5xx).
