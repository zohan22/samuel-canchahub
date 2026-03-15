# Canchahub Frontend Setup

## Requisitos

- Bun 1.3+
- Variables de entorno en `.env`

## Variables de entorno minimas

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

## Comandos principales

```bash
bun install
bun run dev
bun run build
bun run lint
bun run typecheck
```

## Rutas demo

- `/` landing principal
- `/login` login con Supabase Auth
- `/signup` registro basico
- `/dashboard` panel operativo demo
- `/courts` listado demo de canchas

## Notas

- Las rutas `/dashboard`, `/courts`, `/bookings`, `/owner`, `/admin` estan protegidas por `middleware.ts`.
- La capa visual usa Tailwind CSS v3 + componentes estilo shadcn/ui en `src/components/ui`.
- El layout app usa sidebar colapsable con persistencia en `localStorage`.
