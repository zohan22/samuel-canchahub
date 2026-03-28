# Court Discovery & Availability

**Jira Key:** CH-5  
**Status:** TO DO  
**Priority:** HIGH  
**Phase:** Foundation

---

## Epic Description

Esta epica permite que el player descubra canchas segun sus necesidades y confirme disponibilidad real antes de iniciar una reserva. Es critica para reducir friccion en el journey principal de reserva y para construir confianza en la plataforma.

Incluye busqueda con filtros combinados, visualizacion de slots por fecha/hora y detalle completo de cancha/complejo para toma de decision. Debe priorizar performance y claridad de informacion en mobile y desktop.

**Business Value:**  
Mejora la conversion busqueda -> reserva al ofrecer informacion confiable y accionable en pocos pasos, reduciendo abandono por incertidumbre o datos desactualizados.

---

## User Stories

1. **CH-6** - As a player, I want to search courts by sport, zone, and price range so that I can evaluate options.
2. **CH-7** - As a player, I want to view available slots by date and time so that I can choose a real schedule.
3. **CH-8** - As a player, I want to view court details so that I can decide with confidence.

---

## Scope

### In Scope

- Listado de canchas con filtros combinados (deporte, zona, precio, fecha).
- Consulta de disponibilidad por slots y estados (`available`, `held`, `booked`).
- Vista de detalle con fotos, reglas, ubicacion y precio.
- Paginacion y validaciones de parametros de busqueda.

### Out of Scope (Future)

- Recomendador inteligente por historial.
- Mapa avanzado con clustering y rutas.
- Personalizacion por preferencias guardadas.

---

## Acceptance Criteria (Epic Level)

1. Busqueda devuelve resultados consistentes con filtros aplicados.
2. Disponibilidad refleja estado real de slots en ventana de fechas configurada.
3. Detalle de cancha presenta informacion suficiente para decidir reserva.
4. Errores de consulta muestran feedback claro y no bloqueante.

---

## Related Functional Requirements

- **FR-004:** Busqueda de canchas con filtros combinados.
- **FR-005:** Disponibilidad por slots en tiempo real.
- **FR-006:** Detalle completo de cancha y complejo.

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Query and Performance

- Validar y normalizar query params en API.
- Paginacion consistente para escalabilidad.
- Tiempos de respuesta alineados a NFR-PERF.

### Database Schema

**Tables:** `sports_complexes`, `courts`, `court_availability`, `bookings` (conceptual SRS).  
**Nota:** validar schema real via Supabase MCP en fases de implementacion.

### Security Requirements

- Sanitizacion de input de busqueda.
- RLS para datos no publicables o inactivos.

---

## Dependencies

### External Dependencies

- Supabase DB/Storage para metadatos y fotos.

### Internal Dependencies

- Requiere base de autenticacion (EPIC-CH-1) para flujos autenticados.

### Blocks

- Booking checkout depende de disponibilidad confiable.

---

## Success Metrics

### Functional Metrics

- p95 de endpoints de lectura dentro de objetivo SRS.
- Resultados de busqueda y slots sin inconsistencias funcionales criticas.

### Business Metrics

- Aportar a conversion busqueda -> reserva pagada >= 12% al dia 90.

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
| --- | --- | --- | --- |
| Datos desactualizados de disponibilidad | High | Medium | Estrategia de lectura atomica y estado de slots consistente |
| Filtros ambiguos para usuario final | Medium | Medium | UX clara, valores por defecto y mensajes de no-resultados |
| Latencia alta en consultas de disponibilidad | High | Medium | Indices, paginacion y optimizacion de consultas |

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/feature-test-plan.md` (Fase 5)

### Test Coverage Requirements

- **Unit Tests:** validaciones de filtros y mapeo de respuesta.
- **Integration Tests:** endpoints de busqueda/disponibilidad/detalle con DB.
- **E2E Tests:** flujo de discovery desde filtros hasta seleccion de slot.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-CH-5-court-discovery-availability/feature-implementation-plan.md` (Fase 6)

### Recommended Story Order

1. [CH-6] - Search courts with filters - Foundation
2. [CH-7] - View slot availability - Core selection
3. [CH-8] - View court detail - Decision support

### Estimated Effort

- **Development:** 1 sprint
- **Testing:** 0.5 sprint
- **Total:** 1.5 sprints

---

## Notes

Custom fields UPEX no detectados en workspace; se usa fallback en description de Jira stories para Scope/AC/Business Rules.

---

## Related Documentation

- **PRD:** `.context/PRD/mvp-scope.md`, `.context/PRD/user-journeys.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-004 a FR-006)
- **Architecture:** `.context/SRS/architecture-specs.md`
- **API Contracts:** `.context/SRS/api-contracts.yaml`
