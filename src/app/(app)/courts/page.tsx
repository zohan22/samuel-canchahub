import type { CourtWithComplex } from '@/lib/types';

import { Clock3, MapPin, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const courts: CourtWithComplex[] = [
  {
    id: '7f4f1a43-71b8-4d50-8cc8-92f4ab54f093',
    complex_id: 'd69cc9e4-e9e6-4ca9-9c57-11d6469f7f38',
    name: 'Cancha 1 - Futbol 7',
    sport: 'futbol_7',
    price_per_hour: 110,
    status: 'active',
    created_at: '2026-03-10T09:10:00.000Z',
    updated_at: '2026-03-10T09:10:00.000Z',
    complex: {
      id: 'd69cc9e4-e9e6-4ca9-9c57-11d6469f7f38',
      name: 'Complejo Libertadores',
      address: 'Av. Juana Azurduy #421',
      status: 'active',
    },
  },
  {
    id: 'f88c7de2-34c2-4ec6-a13c-62cb5bc7b5f2',
    complex_id: 'e1d1bc9e-a0e8-42a0-9f15-c3f12e70b0f8',
    name: 'Cancha 2 - Futbol 8',
    sport: 'futbol_8',
    price_per_hour: 130,
    status: 'active',
    created_at: '2026-03-10T09:10:00.000Z',
    updated_at: '2026-03-10T09:10:00.000Z',
    complex: {
      id: 'e1d1bc9e-a0e8-42a0-9f15-c3f12e70b0f8',
      name: 'Arena Sucre Norte',
      address: 'Zona Norte, Calle 14',
      status: 'active',
    },
  },
  {
    id: '9be9e8db-727e-4f42-96ee-eb63931261d4',
    complex_id: '5b39fca3-3e56-4c25-b9b5-62f778ce4876',
    name: 'Cancha 3 - Multiuso',
    sport: 'futbol_5',
    price_per_hour: 90,
    status: 'active',
    created_at: '2026-03-10T09:10:00.000Z',
    updated_at: '2026-03-10T09:10:00.000Z',
    complex: {
      id: '5b39fca3-3e56-4c25-b9b5-62f778ce4876',
      name: 'Villa Armonia Sports',
      address: 'Villa Armonia, calle A',
      status: 'active',
    },
  },
  {
    id: 'ef9efd54-558b-4f1d-b45c-a53a73c4ec7f',
    complex_id: '2dbf62f3-7f74-44f8-bc1e-0d8ebef97c2f',
    name: 'Cancha 4 - Futbol 7 Premium',
    sport: 'futbol_7',
    price_per_hour: 145,
    status: 'active',
    created_at: '2026-03-10T09:10:00.000Z',
    updated_at: '2026-03-10T09:10:00.000Z',
    complex: {
      id: '2dbf62f3-7f74-44f8-bc1e-0d8ebef97c2f',
      name: 'Estadio Urbano 360',
      address: 'Centro historico, calle Bolivar',
      status: 'active',
    },
  },
];

export default function CourtsPage() {
  return (
    <div className="space-y-6" data-testid="courtsPage">
      <header className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-secondary/40 p-6">
        <p className="text-sm font-medium text-primary">Court Discovery & Availability</p>
        <h1 className="mt-2 font-heading text-3xl font-bold">Encuentra tu proximo partido con disponibilidad visible</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Demo de listado con mock data tipada por schema Supabase. Esta base se conecta a query real en la fase de
          implementacion de stories.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por complejo o deporte" className="pl-9" data-testid="court_search_input" />
          </div>
          <Button variant="secondary" data-testid="filter_by_zone_button">
            Filtrar por zona
          </Button>
          <Button variant="outline" data-testid="filter_by_price_button">
            Rango de precio
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2" data-testid="courts_grid">
        {courts.map(court => (
          <Card key={court.id} className="group hover:-translate-y-1 hover:shadow-glow">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{court.name}</CardTitle>
                  <CardDescription className="mt-1">{court.complex.name}</CardDescription>
                </div>
                <Badge variant="success">{court.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {court.complex.address}
              </p>
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <Clock3 className="h-4 w-4 text-primary" />
                Slots desde 06:00 hasta 23:00
              </p>
              <p className="text-base font-semibold text-foreground">
                BOB
                {court.price_per_hour}
                /hora
              </p>
            </CardContent>
            <CardFooter className="justify-between gap-2">
              <Badge variant="secondary">{court.sport}</Badge>
              <Button size="sm" data-testid="view_court_slots_button">
                Ver disponibilidad
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
