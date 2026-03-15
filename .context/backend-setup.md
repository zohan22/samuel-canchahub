# Backend Setup - Canchahub

## Database Schema

Tablas fundacionales creadas en `public`:

- `profiles`: perfil de usuario, rol (`player`, `owner`, `admin`) y mapeo opcional a `auth.users` con `user_id`.
- `owner_onboarding_requests`: solicitud de onboarding de owners y revisión por admin.
- `sports_complexes`: complejos deportivos de owners.
- `courts`: canchas por complejo, deporte y precio base.
- `court_availability`: franjas de disponibilidad y override de precio.
- `bookings`: reservas, estado y montos de penalidad/reembolso.
- `payments`: trazabilidad de pagos por reserva (proveedor agnóstico).
- `email_notifications`: trazabilidad de envíos transaccionales.

Incluye:

- PK UUID (`gen_random_uuid()`), FKs y `CHECK` constraints.
- `created_at`/`updated_at` + trigger `set_updated_at()`.
- índices para performance en FKs, filtros y ordenamientos frecuentes.

## Row Level Security

RLS habilitado en todas las tablas del dominio `public`.

Funciones auxiliares:

- `public.is_admin()`
- `public.is_owner_of_complex(uuid)`
- `public.is_owner_of_court(uuid)`

Cobertura de políticas:

- Lectura pública de catálogo activo (`sports_complexes`, `courts`, `court_availability`).
- Lectura/escritura de perfiles y reservas por propietario de datos.
- Permisos owner para operar sus complejos/canchas.
- Permisos admin globales.

## Seed Data

Seed completo insertado:

- `profiles`: 8
- `owner_onboarding_requests`: 3
- `sports_complexes`: 5
- `courts`: 8
- `court_availability`: 15
- `bookings`: 6
- `payments`: 6
- `email_notifications`: 6

Objetivo del seed:

- Preservar UX de catálogo, disponibilidad y estado de reservas.
- Simular escenarios reales: `pending_payment`, `confirmed`, `cancelled`, `completed`.

## API/Auth Layer (Archivos)

- `src/lib/config.ts`: configuración centralizada y validación de env vars.
- `src/lib/supabase/client.ts`: browser client (`@supabase/ssr`).
- `src/lib/supabase/server.ts`: server client con `cookies()` async.
- `src/lib/supabase/admin.ts`: admin client (service role, server-only).
- `middleware.ts`: refresh de sesión + protección de rutas.
- `src/contexts/auth-context.tsx`: integración de Auth real con Supabase.
- `src/types/supabase.ts`: tipos de DB generados.
- `src/types/index.ts`: aliases del dominio.

## Variables de Entorno

Variables requeridas:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

Recomendado:

- Mantener alias opcional `SUPABASE_URL` para compatibilidad server-side.

## Comandos útiles (Bun)

```bash
bun add @supabase/ssr @supabase/supabase-js
supabase gen types --project-id tlsffquqaspqjgobuzsg > src/types/supabase.ts
```

## Troubleshooting

- Error de env faltante: valida `.env` y reinicia servidor.
- Error de sesión/cookies: revisa `middleware.ts` y el patrón `getAll/setAll`.
- Error de acceso RLS: validar `profiles.user_id` asociado al `auth.uid()` del usuario.
- Si cambias schema: regenera tipos con `supabase gen types`.

## Próximos pasos

1. Configurar URLs de redirect en Supabase Auth (`http://localhost:3000/**`).
2. Implementar páginas frontend (Fase frontend-setup) conectadas a `courts` y `sports_complexes`.
3. Conectar registro/login UI con `AuthProvider`.
