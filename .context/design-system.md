# Design System - Canchahub

**Fase:** Frontend Setup (Fase 3)
**Paleta elegida:** Azul Profesional
**Estilo visual:** Moderno-Bold
**Layout:** Sidebar Collapsible + Top Navbar
**Estrategia UI:** shadcn/ui style components (local code)

## Integracion backend-frontend

- Tipos base: `src/types/supabase.ts`
- Helpers frontend: `src/lib/types.ts`
- Beneficio: frontend comparte contratos con DB (row/insert/update) y evita mismatches.

## Paleta de colores (HSL)

- `--primary`: azul principal para CTAs y estados de foco.
- `--secondary`: azul claro para superficies secundarias.
- `--accent`: cian suave para highlights.
- `--background`: base clara con gradientes atmosfericos.
- `--foreground`: texto principal de alto contraste.
- `--success` y `--destructive`: feedback semantico.

Tokens definidos en `src/app/globals.css` y mapeados en `tailwind.config.ts`.

## Tipografia

- Heading: `Space Grotesk`
- Body: `Manrope`

Configurado en `src/app/layout.tsx` con `next/font/google`.

## Componentes UI

Ubicacion: `src/components/ui`

- `button.tsx` variantes: `default`, `secondary`, `outline`, `ghost`, `danger`
- `card.tsx` con `CardHeader`, `CardContent`, `CardFooter`
- `input.tsx`, `textarea.tsx`, `label.tsx`
- `badge.tsx`, `alert.tsx`, `separator.tsx`, `skeleton.tsx`

## Layout components

Ubicacion: `src/components/layout`

- `navbar.tsx`: marca, nav principal, menu usuario
- `sidebar.tsx`: links de dominio, estados active/hover, version mobile
- `main-layout.tsx`: combina navbar + sidebar con persistencia de colapso

## Paginas demo

- `src/app/page.tsx`: landing orientada a reserva de canchas (copy no generico)
- `src/app/login/page.tsx`: login real con Supabase Auth + credenciales demo
- `src/app/(app)/dashboard/page.tsx`: KPIs y reservas recientes tipadas
- `src/app/(app)/courts/page.tsx`: discovery de canchas con mock data tipada

## Reglas de uso

- Usar tokens (`bg-primary`, `text-muted-foreground`, etc.) en vez de colores hardcodeados.
- Tipar mock data y props de dominio desde `@/lib/types`.
- Mantener `data-testid` en elementos interactivos clave.
- Reutilizar componentes de `src/components/ui` antes de crear variantes nuevas.
