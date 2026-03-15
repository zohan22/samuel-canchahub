'use client';

import { CalendarClock, CircleUserRound, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onMobileMenuOpen: () => void
}

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/courts', label: 'Canchas' },
  { href: '/bookings', label: 'Mis reservas' },
];

export function Navbar({ onMobileMenuOpen }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header
      className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur"
      data-testid="appNavbar"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          aria-label="Abrir menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={onMobileMenuOpen}
          data-testid="mobile_menu_toggle"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="inline-flex items-center gap-2" data-testid="brand_link">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CalendarClock className="h-5 w-5" />
          </span>
          <span className="font-heading text-lg font-semibold">Canchahub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" data-testid="main_nav">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground',
                pathname.startsWith(link.href) && 'bg-primary/10 text-primary',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2" data-testid="user_menu">
          <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 sm:flex">
            <CircleUserRound className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">{user?.email ?? 'Invitado'}</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              void handleLogout();
            }}
            data-testid="logout_button"
            className="gap-1"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
}
