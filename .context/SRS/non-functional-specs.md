# Canchahub - Non-Functional Specifications (SRS)

## Contexto

- **Stack objetivo:** Next.js 15 (App Router), TypeScript, Supabase (PostgreSQL + Auth + Storage), Vercel, GitHub Actions.
- **Mercado inicial:** Sucre, Bolivia.
- **Canales MVP:** WebApp responsive + email transaccional.

## 1) Performance

- **NFR-PERF-001 (LCP):** LCP < 2.5s en p75 para home y listado de canchas (red 4G).
- **NFR-PERF-002 (TTI):** TTI < 3.5s en p75 para flujos de busqueda y checkout.
- **NFR-PERF-003 (API):** p95 < 500ms para endpoints de lectura; p95 < 800ms para endpoints transaccionales (reserva/pago).
- **NFR-PERF-004 (DB):** consultas simples p95 < 100ms; consultas con joins p95 < 250ms.
- **NFR-PERF-005 (Throughput MVP):** soportar 150 usuarios concurrentes y 20 reservas concurrentes sin degradacion critica.

## 2) Security

- **NFR-SEC-001 (Auth):** autenticacion via Supabase Auth con JWT (access token + refresh token).
- **NFR-SEC-002 (RBAC):** roles obligatorios `player`, `owner`, `admin`; controlado en API y RLS.
- **NFR-SEC-003 (Encryption):** TLS 1.2+ en transito (objetivo TLS 1.3); cifrado at rest provisto por Supabase.
- **NFR-SEC-004 (Validation):** validacion client-side y server-side con esquemas tipados (Zod o equivalente).
- **NFR-SEC-005 (Sesion):** access token <= 60 min; refresh token rotativo; logout invalida sesion local.
- **NFR-SEC-006 (OWASP):** mitigaciones para Injection, Broken Access Control, Security Misconfiguration, XSS y CSRF en endpoints sensibles.
- **NFR-SEC-007 (Secrets):** secretos solo via variables de entorno en Vercel/GitHub Actions; prohibido hardcodear llaves.

## 3) Scalability

- **NFR-SCAL-001 (Arquitectura stateless):** API routes sin estado para escalar horizontalmente en Vercel.
- **NFR-SCAL-002 (DB):** PostgreSQL en Supabase con indices para busqueda de slots, filtros y estados.
- **NFR-SCAL-003 (RLS):** politicas RLS habilitadas en tablas multi-tenant por owner/user.
- **NFR-SCAL-004 (Caching):** uso de cache-control en endpoints de catalogo y ISR/revalidate para contenido no critico.
- **NFR-SCAL-005 (Pagos):** capa `PaymentProvider` desacoplada para reemplazar mock por proveedor real sin romper API.

## 4) Accessibility

- **NFR-A11Y-001:** cumplimiento WCAG 2.1 nivel AA en vistas core.
- **NFR-A11Y-002:** navegacion 100% por teclado en registro, busqueda, reserva, pago y cancelacion.
- **NFR-A11Y-003:** etiquetas ARIA en componentes interactivos criticos (filtros, slots, formularios, modales).
- **NFR-A11Y-004:** contraste minimo 4.5:1 para texto normal y 3:1 para texto grande.
- **NFR-A11Y-005:** indicadores de foco visibles en todos los elementos interactivos.

## 5) Browser Support

- **Desktop:** Chrome, Firefox, Edge, Safari (ultimas 2 versiones estables).
- **Mobile:** iOS Safari y Android Chrome (ultimas 2 versiones estables).
- **Responsive:** soporte desde 360px de ancho en adelante.

## 6) Reliability

- **NFR-REL-001 (Uptime):** objetivo mensual 99.5% en MVP (camino a 99.9% post-MVP).
- **NFR-REL-002 (Error Rate):** tasa de errores 5xx < 1% diaria.
- **NFR-REL-003 (Recovery):** MTTR < 30 minutos para incidentes criticos de reserva/pago.
- **NFR-REL-004 (Idempotencia):** endpoints de pago y webhooks deben tolerar reintentos sin duplicar cobros.
- **NFR-REL-005 (Backups):** backup diario de BD con retencion minima de 7 dias en entorno productivo.

## 7) Maintainability

- **NFR-MNT-001:** TypeScript strict mode habilitado.
- **NFR-MNT-002:** ESLint + Prettier configurados y ejecutados en CI.
- **NFR-MNT-003:** cobertura minima >= 80% en logica de dominio critica (reservas, pagos, cancelacion).
- **NFR-MNT-004:** documentacion minima obligatoria: README, PRD, SRS, runbooks de incidentes.
- **NFR-MNT-005:** pipeline CI con checks de lint, type-check, test y build antes de merge.
