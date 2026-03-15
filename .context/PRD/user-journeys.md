# Canchahub - User Journeys (MVP)

## Journey 1: Reserva completa sin friccion (Happy Path)

- **Persona:** Diego Rojas (Player)
- **Scenario:** Diego quiere reservar una cancha para hoy en la noche con su grupo.

### Steps

**Step 1**
- **User Action:** Inicia sesion en la WebApp.
- **System Response:** Valida credenciales y redirige al home de busqueda.
- **Pain Point:** Si login falla sin mensaje claro, el usuario abandona.

**Step 2**
- **User Action:** Filtra por deporte (futbol 7), zona y horario.
- **System Response:** Lista canchas con precio y slots disponibles en tiempo real.
- **Pain Point:** Latencia alta o datos desactualizados generan desconfianza.

**Step 3**
- **User Action:** Abre detalle de cancha y selecciona slot 20:00-21:00.
- **System Response:** Bloqueo temporal del slot durante checkout.
- **Pain Point:** Si no existe bloqueo temporal, puede ocurrir competencia por el mismo slot.

**Step 4**
- **User Action:** Confirma reserva y realiza pago online completo.
- **System Response:** Procesa pago via PaymentProvider adapter y marca reserva como confirmada si pago exitoso.
- **Pain Point:** Si pago tarda o no hay feedback de estado, el usuario puede duplicar intentos.

**Step 5**
- **User Action:** Revisa confirmacion.
- **System Response:** Muestra comprobante en pantalla y envia email de confirmacion con detalle de reserva.
- **Pain Point:** Si email no llega, baja la confianza en la reserva.

- **Expected Outcome:** Reserva pagada y confirmada en menos de 3 minutos.

### Alternative Paths / Edge Cases

- Si el pago es rechazado, el sistema libera slot y permite reintento con mensaje de causa.
- Si el slot se ocupa durante la seleccion, el sistema notifica conflicto y sugiere horarios cercanos.

---

## Journey 2: Cancelacion con politica moderada (Edge Case 1)

- **Persona:** Carla Mendoza (Capitana de equipo)
- **Scenario:** Carla necesita cancelar una reserva por lluvia y reorganizar al equipo.

### Steps

**Step 1**
- **User Action:** Ingresa a "Mis reservas" y selecciona la reserva activa.
- **System Response:** Muestra detalle, estado, hora de inicio y politica aplicable segun ventana.
- **Pain Point:** Si no entiende la politica, siente cobro injusto.

**Step 2**
- **User Action:** Presiona "Cancelar reserva".
- **System Response:** Calcula penalidad automaticamente:
  - >=24h antes: reembolso 100%
  - 6h-24h antes: reembolso 50%
  - <6h antes: sin reembolso
- **Pain Point:** Reglas ambiguas generan reclamos de soporte.

**Step 3**
- **User Action:** Confirma cancelacion.
- **System Response:** Cambia estado de reserva a `cancelled`, registra monto reembolsable y dispara evento de email.
- **Pain Point:** Si no hay trazabilidad de montos, afecta confianza.

**Step 4**
- **User Action:** Consulta resultado.
- **System Response:** Muestra comprobante de cancelacion y detalle economico de penalidad/reembolso.
- **Pain Point:** Falta de comprobante complica conciliacion con el equipo.

- **Expected Outcome:** Cancelacion procesada con reglas claras y evidencia de transaccion.

### Alternative Paths / Edge Cases

- Si la reserva ya esta en estado `in_progress` o `completed`, no permite cancelar.
- Si falla el proceso de reembolso, el estado queda `refund_pending` y se notifica a admin para resolucion manual.

---

## Journey 3: Onboarding asistido de owner y gestion diaria (Edge Case 2)

- **Persona:** Luis Aramayo (Owner) + Admin
- **Scenario:** Luis quiere digitalizar su complejo pero requiere apoyo inicial.

### Steps

**Step 1**
- **User Action:** Owner envia solicitud de onboarding con datos del complejo.
- **System Response:** Crea solicitud `pending_review` y notifica a admin.
- **Pain Point:** Si formulario es largo, owner abandona.

**Step 2**
- **User Action:** Admin revisa y aprueba solicitud.
- **System Response:** Crea/activa perfil owner, complejo y canchas base.
- **Pain Point:** Si aprobacion demora, se retrasa publicacion de oferta.

**Step 3**
- **User Action:** Owner define disponibilidad y precios por cancha.
- **System Response:** Valida solapamientos y publica slots para busqueda.
- **Pain Point:** Configuraciones complejas elevan errores de agenda.

**Step 4**
- **User Action:** Owner monitorea nuevas reservas en panel.
- **System Response:** Lista reservas con estado de pago y check-in.
- **Pain Point:** Si faltan filtros/estados, operacion diaria se vuelve manual otra vez.

- **Expected Outcome:** Owner operativo en menos de 24h con agenda digital activa.

### Alternative Paths / Edge Cases

- Si admin rechaza onboarding por datos incompletos, solicitud pasa a `changes_requested` con observaciones.
- Si owner intenta editar una franja con reserva ya confirmada, el sistema bloquea cambio y muestra motivo.
