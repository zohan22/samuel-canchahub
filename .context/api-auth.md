# API Authentication - Canchahub

## Método de autenticación

- Supabase Auth con sesión por cookies (`@supabase/ssr`).
- Sesiones refrescadas en `middleware.ts` para mantener consistencia server/client.

## Flujo recomendado

1. `signup` vía `supabase.auth.signUp`.
2. Crear/asegurar perfil en `public.profiles` (`user_id = auth.uid()`).
3. `login` vía `supabase.auth.signInWithPassword`.
4. Middleware valida sesión en rutas protegidas.
5. RLS controla acceso a datos por rol y ownership.

## Archivos clave

- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/admin.ts`
- `src/contexts/auth-context.tsx`
- `middleware.ts`

## Uso en server code

Patrón:

1. Crear cliente con `createServer()`.
2. Obtener usuario con `supabase.auth.getUser()`.
3. Ejecutar query contra tablas con RLS.

## Rutas protegidas

Configuradas en middleware:

- `/dashboard`
- `/bookings`
- `/owner`
- `/admin`

Reglas:

- Usuario no autenticado + ruta protegida -> redirect a `/login?redirect=<ruta>`.
- Usuario autenticado + `/login` o `/signup` -> redirect a `/dashboard`.

## Seguridad

- `SUPABASE_SERVICE_ROLE_KEY` se usa solo en `admin.ts` (server-only).
- No exponer service role en cliente.
- RLS habilitado en todas las tablas de dominio.

## QA / Testing manual

Para probar endpoints protegidos:

1. Haz login en la app.
2. Verifica cookies `sb-*` en navegador.
3. Repite requests autenticados con esas cookies en herramientas externas.

## Notas operativas

- Si cambias variables en `.env`, reinicia proceso de desarrollo.
- Si cambias schema, regenera `src/types/supabase.ts`.
