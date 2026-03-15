import { ArrowRight, CalendarClock, CheckCircle2, CircleDollarSign, Compass, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Compass,
    title: 'Descubre canchas reales en segundos',
    description:
      'Filtra por deporte, zona y precio en Sucre. Encuentra horarios activos sin perseguir respuestas por WhatsApp.',
  },
  {
    icon: CalendarClock,
    title: 'Reserva con disponibilidad en tiempo real',
    description: 'Selecciona slot, confirma en un solo flujo y evita conflictos de agenda para tu equipo.',
  },
  {
    icon: CircleDollarSign,
    title: 'Pago online y comprobante inmediato',
    description: 'Paga el 100% de la reserva y recibe respaldo por email para coordinar sin incertidumbre.',
  },
  {
    icon: ShieldCheck,
    title: 'Operacion segura para players y owners',
    description: 'Control por roles, trazabilidad de reservas y reglas de cancelacion moderada automatizadas.',
  },
];

const quickBenefits = [
  'Reserva pagada y confirmada en menos de 3 minutos.',
  'Menos dobles reservas con agenda digital centralizada.',
  'Visibilidad para owners con panel operativo diario.',
];

export default function HomePage() {
  return (
    <div data-testid="homePage">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl animate-fade-in-up text-center">
          <Badge className="mx-auto mb-5" variant="default">
            MVP activo en Sucre, Bolivia
          </Badge>
          <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Reserva canchas deportivas sin friccion, sin llamadas y sin caos de ultimo minuto.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Canchahub conecta players, capitanes de equipo y owners en un flujo unico: buscar, reservar, pagar y
            confirmar en una misma sesion.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" data-testid="hero_actions">
            <Button asChild size="lg" data-testid="start_booking_button" className="w-full sm:w-auto">
              <Link href="/login" className="inline-flex items-center gap-2">
                Comenzar reserva
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" data-testid="view_dashboard_button" className="w-full sm:w-auto">
              <Link href="/dashboard">Ver demo operativa</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container pb-20" data-testid="featuresSection">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-heading text-3xl font-bold">Lo esencial del MVP en una sola plataforma</p>
            <p className="mt-2 text-muted-foreground">Pensado para la realidad operativa de canchas en Sucre.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group border-border/80 bg-card/95 hover:-translate-y-1 hover:shadow-glow"
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <CardHeader>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container pb-20">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-card to-accent/15">
          <CardContent className="grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold">Flujo de reserva confiable para equipos reales</h2>
              <div className="mt-4 space-y-2">
                {quickBenefits.map(benefit => (
                  <p key={benefit} className="flex items-start gap-2 text-sm text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    {benefit}
                  </p>
                ))}
              </div>
            </div>
            <Button asChild size="lg" data-testid="cta_login_button">
              <Link href="/login">Ingresar a Canchahub</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
