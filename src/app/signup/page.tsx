'use client';

import type { FormEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';

export default function SignupPage() {
  const router = useRouter();
  const { signup, error } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await signup({ fullName, email, password });
      setSuccessMessage('Cuenta creada. Si tu proyecto exige confirmacion por email, valida tu bandeja.');
      router.push('/dashboard');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container flex min-h-screen items-center justify-center py-12" data-testid="signupPage">
      <Card className="w-full max-w-md border-primary/20 bg-card/95 shadow-glow">
        <CardHeader className="space-y-2">
          <CardTitle className="font-heading text-2xl">Crea tu cuenta</CardTitle>
          <CardDescription>Comienza a reservar canchas con confirmacion inmediata.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
            className="space-y-4"
            data-testid="signup_form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="full_name">Nombre completo</Label>
              <Input
                id="full_name"
                required
                value={fullName}
                onChange={event => setFullName(event.target.value)}
                data-testid="full_name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup_email">Email</Label>
              <Input
                id="signup_email"
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                data-testid="signup_email_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup_password">Password</Label>
              <Input
                id="signup_password"
                type="password"
                minLength={8}
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
                data-testid="signup_password_input"
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting} data-testid="signup_button">
              {isSubmitting
                ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Creando cuenta...
                    </>
                  )
                : (
                    'Crear cuenta'
                  )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" data-testid="signup_error_alert">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert variant="info" data-testid="signup_success_alert">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Ya tienes cuenta?
            {' '}
            <Link href="/login" className="font-semibold text-primary hover:underline" data-testid="go_login_link">
              Inicia sesion
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
