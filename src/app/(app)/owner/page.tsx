import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function OwnerPage() {
  return (
    <Card data-testid="ownerPage">
      <CardHeader>
        <CardTitle>Owner Operations</CardTitle>
        <CardDescription>
          Base visual para gestion de disponibilidad, precios y reservas por complejo.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Esta pantalla se completa en la implementacion de EPIC-CANCHAHUB-05.
      </CardContent>
    </Card>
  );
}
