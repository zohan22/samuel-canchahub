'use client';

import type { FormEvent } from 'react';
import { AlertTriangle, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login, error } = useAuth();

  const [email, setEmail] = useState('player.demo@canchahub.bo');
  const [password, setPassword] = useState('Demo123!');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const getRedirectTo = () => {
    if (typeof window === 'undefined') {
      return '/dashboard';
    }

    const value = new URLSearchParams(globalThis.location.search).get('redirect');
    return value?.startsWith('/') ? value : '/dashboard';
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push(getRedirectTo());
    }
    catch {
      setLocalError('No se pudo iniciar sesion. Revisa email/password y vuelve a intentar.');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container flex min-h-screen items-center justify-center py-12" data-testid="loginPage">
      <Card className="w-full max-w-md border-primary/20 bg-card/95 shadow-glow">
        <CardHeader className="space-y-2">
          <CardTitle className="font-heading text-2xl">Ingresa a Canchahub</CardTitle>
          <CardDescription>Gestiona reservas y disponibilidad desde un flujo seguro con Supabase Auth.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="info" data-testid="demo_credentials_alert">
            <AlertTitle>Credenciales demo</AlertTitle>
            <AlertDescription>
              Usa
              {' '}
              <strong>player.demo@canchahub.bo</strong>
              {' '}
              y
              {' '}
              <strong>Demo123!</strong>
              . Si no existe, crea este usuario en
              Supabase Auth y su profile asociado.
            </AlertDescription>
          </Alert>

          <form
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
            className="space-y-4"
            data-testid="login_form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                data-testid="email_input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                data-testid="password_input"
              />
            </div>

            {(localError || error) && (
              <Alert variant="destructive" data-testid="auth_error_alert">
                <AlertTriangle className="mb-2 h-4 w-4" />
                <AlertDescription>{localError ?? error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting} data-testid="login_button">
              {isSubmitting
                ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Ingresando...
                    </>
                  )
                : (
                    'Iniciar sesion'
                  )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Todavia no tienes cuenta?
            {' '}
            <Link className="font-semibold text-primary underline-offset-2 hover:underline" href="/signup" data-testid="signup_link">
              Crear cuenta
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
