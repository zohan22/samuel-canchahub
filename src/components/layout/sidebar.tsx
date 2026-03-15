'use client';

import { Building2, CalendarDays, ChevronLeft, ChevronRight, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onCollapseToggle: () => void
  onMobileClose: () => void
}

const links = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/courts',
    label: 'Canchas',
    icon: Building2,
  },
  {
    href: '/bookings',
    label: 'Reservas',
    icon: CalendarDays,
  },
  {
    href: '/owner',
    label: 'Owner Ops',
    icon: Users,
  },
  {
    href: '/admin',
    label: 'Admin',
    icon: ShieldCheck,
  },
];

export function Sidebar({ collapsed, mobileOpen, onCollapseToggle, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden border-r border-border/70 bg-card/95 backdrop-blur md:block',
          'transition-all duration-200 ease-out',
          collapsed ? 'w-20' : 'w-72',
        )}
        data-testid="appSidebar"
      >
        <SidebarContent collapsed={collapsed} pathname={pathname} onCollapseToggle={onCollapseToggle} />
      </aside>

      <div
        className={cn('fixed inset-0 z-40 bg-black/40 md:hidden', mobileOpen ? 'block' : 'hidden')}
        onClick={onMobileClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 border-r border-border/70 bg-card shadow-2xl transition-transform duration-200 md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <SidebarContent collapsed={false} pathname={pathname} onCollapseToggle={onMobileClose} />
      </aside>
    </>
  );
}

interface SidebarContentProps {
  collapsed: boolean
  pathname: string
  onCollapseToggle: () => void
}

function SidebarContent({ collapsed, pathname, onCollapseToggle }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col" data-testid="sidebarContent">
      <div className="flex h-16 items-center gap-2 border-b border-border/70 px-4">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">C</div>
        {!collapsed && <p className="font-heading text-lg font-semibold">Canchahub</p>}
      </div>

      <nav className="flex-1 space-y-1 p-3" data-testid="sidebar_nav">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition',
                'hover:bg-accent hover:text-accent-foreground',
                active && 'bg-primary/15 text-primary',
              )}
              data-testid={`${link.label.toLowerCase().replaceAll(' ', '_')}_link`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/70 p-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn('w-full justify-start gap-2', collapsed && 'justify-center')}
          onClick={onCollapseToggle}
          data-testid="collapse_sidebar_button"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && 'Colapsar'}
        </Button>
      </div>
    </div>
  );
}
