import type { Booking, DashboardMetric } from '@/lib/types';

import { ArrowUpRight, CalendarCheck2, MapPinned, WalletCards } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const dashboardMetrics: DashboardMetric[] = [
  {
    id: 'conversion',
    label: 'Conversion busqueda -> reserva',
    value: '12.8%',
    trend: '+1.4% vs semana pasada',
  },
  {
    id: 'paid-bookings',
    label: 'Reservas pagadas (90 dias)',
    value: '462',
    trend: 'Objetivo MVP superado',
  },
  {
    id: 'gmv',
    label: 'GMV acumulado',
    value: 'BOB 55,240',
    trend: '+4.6% sobre meta',
  },
];

const recentBookings: Booking[] = [
  {
    id: '6fbc1c4f-7f75-4d85-b13b-56f44f14f98f',
    player_id: '8a70d41d-307a-460f-85b8-4f6b9f6c3631',
    court_id: 'a59f9a3b-f6c4-4900-a0d1-04f5cbfe1078',
    start_at: '2026-03-15T20:00:00.000Z',
    end_at: '2026-03-15T21:00:00.000Z',
    status: 'confirmed',
    amount_total: 110,
    penalty_amount: 0,
    refund_amount: 0,
    created_at: '2026-03-15T14:11:00.000Z',
    updated_at: '2026-03-15T14:11:00.000Z',
  },
  {
    id: '8e87ce8c-1178-4c13-b980-c33288f78e30',
    player_id: 'bd4c67ed-3abf-4b57-bf48-9f1ca14f8436',
    court_id: 'fd3030eb-b89c-4f6f-80e0-c8d7e87df1e6',
    start_at: '2026-03-16T18:00:00.000Z',
    end_at: '2026-03-16T19:00:00.000Z',
    status: 'pending_payment',
    amount_total: 95,
    penalty_amount: 0,
    refund_amount: 0,
    created_at: '2026-03-15T14:26:00.000Z',
    updated_at: '2026-03-15T14:26:00.000Z',
  },
  {
    id: '41f5fbde-102a-44f3-bf85-6df5719462e5',
    player_id: 'f96f1501-2c42-4d7a-9a5e-f3c08db9f1db',
    court_id: 'f8ab3d0b-3480-4f0c-8dd5-4ac3ef512301',
    start_at: '2026-03-16T21:00:00.000Z',
    end_at: '2026-03-16T22:00:00.000Z',
    status: 'cancelled',
    amount_total: 120,
    penalty_amount: 60,
    refund_amount: 60,
    created_at: '2026-03-14T19:43:00.000Z',
    updated_at: '2026-03-15T10:05:00.000Z',
  },
];

const statusVariant: Record<string, 'default' | 'secondary' | 'success' | 'outline'> = {
  confirmed: 'success',
  pending_payment: 'secondary',
  cancelled: 'outline',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6" data-testid="dashboardPage">
      <section className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-accent/15 p-6">
        <p className="text-sm font-medium text-primary">Panel operativo MVP</p>
        <h1 className="mt-2 font-heading text-3xl font-bold">Visibilidad total de reservas, pagos y ocupacion</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Este dashboard resume los KPIs definidos para Canchahub: conversion de reserva pagada, reservas activas y
          rendimiento comercial del marketplace.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3" data-testid="metrics_grid">
        {dashboardMetrics.map((metric, index) => (
          <Card key={metric.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 90}ms` }}>
            <CardHeader className="pb-2">
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle className="text-3xl">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="inline-flex items-center gap-1 text-xs text-primary">
                <ArrowUpRight className="h-4 w-4" />
                {metric.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-xl">
              <CalendarCheck2 className="h-5 w-5 text-primary" />
              Reservas recientes
            </CardTitle>
            <CardDescription>Mock data tipada desde el schema de Supabase para validar la UI de operaciones.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBookings.map(booking => (
              <article key={booking.id} className="rounded-lg border border-border/80 bg-background/70 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={statusVariant[booking.status] ?? 'default'}>{booking.status}</Badge>
                  <p className="text-xs text-muted-foreground">{new Date(booking.start_at).toLocaleString('es-BO')}</p>
                </div>
                <p className="mt-2 font-medium text-foreground">
                  Reserva #
                  {booking.id.slice(0, 8)}
                </p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span>
                    Monto: BOB
                    {booking.amount_total}
                  </span>
                  <span>
                    Penalidad: BOB
                    {booking.penalty_amount}
                  </span>
                  <span>
                    Reembolso: BOB
                    {booking.refund_amount}
                  </span>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-xl">
              <WalletCards className="h-5 w-5 text-primary" />
              Atajos rapidos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="secondary" data-testid="new_booking_button">
              Crear reserva nueva
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="open_owner_ops_button">
              Abrir Owner Ops
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="open_admin_review_button">
              Revisar onboarding
            </Button>
            <Separator />
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPinned className="h-3.5 w-3.5" />
              Cobertura demo: Sucre Centro, Zona Norte y Villa Armonia.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
