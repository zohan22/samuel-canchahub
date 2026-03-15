import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <Card data-testid="adminPage">
      <CardHeader>
        <CardTitle>Admin Governance</CardTitle>
        <CardDescription>
          Base visual para aprobaciones de onboarding y control de catalogos del MVP.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Esta pantalla se completa en la implementacion de EPIC-CANCHAHUB-06.
      </CardContent>
    </Card>
  );
}
