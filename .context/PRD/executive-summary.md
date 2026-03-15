# Canchahub - Executive Summary (MVP)

## 1) Problem Statement

Reservar canchas deportivas en Sucre, Bolivia sigue siendo un proceso manual (llamadas, WhatsApp y coordinacion informal). Para deportistas, equipos y entrenadores, esto crea incertidumbre de disponibilidad, tiempos de espera y baja visibilidad de opciones cercanas.

El impacto directo es operativo y emocional: perdida de tiempo, planes cancelados a ultimo minuto y menor frecuencia de practica deportiva. Para dueños de canchas, el modelo manual genera doble reserva, baja ocupacion en horarios valle y dificultad para crecer ingresos con datos confiables.

## 2) Solution Overview (MVP)

Construiremos una WebApp en Next.js 15 + Supabase para centralizar busqueda, reserva y pago online de canchas en Sucre.

- Descubrimiento de complejos y canchas por deporte, zona, precio y horario.
- Visualizacion de disponibilidad en tiempo real por bloques de tiempo.
- Reserva online con pago completo (provider adapter agnostico + mock provider para MVP).
- Politica de cancelacion moderada con reglas automaticas de penalidad/reembolso.
- Portal Owner para gestionar disponibilidad y reservas, con onboarding asistido por Admin.

Esta solucion reduce friccion para el jugador (buscar -> reservar -> pagar) y reduce errores operativos para el dueño (agenda centralizada y trazabilidad de estados).

## 3) Success Metrics (MVP)

### Adopcion

- Usuarios registrados (Player): >= 300 en primeros 90 dias.
- Complejos activos (Owner aprobados): >= 20 en primeros 90 dias.

### Engagement

- Conversion busqueda -> reserva pagada: >= 12% al dia 90.
- Tasa de re-reserva 30 dias (usuarios con >=2 reservas): >= 25%.

### Negocio

- Reservas pagadas acumuladas: >= 450 en primeros 90 dias.
- GMV acumulado 90 dias: >= BOB 54,000.
- Revenue plataforma (10% take rate): >= BOB 5,400.

## 4) Target Users (MVP)

- **Jugador amateur urbano:** adulto joven que organiza partidos con amigos y necesita disponibilidad confiable sin llamadas.
- **Capitan de equipo amateur:** coordina horarios de varias personas y requiere reservas predecibles y confirmacion inmediata.
- **Owner/Admin de complejo deportivo:** quiere reducir errores manuales, aumentar ocupacion y administrar agenda desde un panel.
