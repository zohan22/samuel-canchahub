import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingsPage() {
  return (
    <div className="space-y-4" data-testid="bookingsPage">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Mis reservas</CardTitle>
          <CardDescription>
            Vista demo de estados de reserva. La logica completa (filtros, cancelacion, timeline) se implementa en Fase
            7 por story.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
