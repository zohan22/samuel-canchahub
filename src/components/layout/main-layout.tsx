'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode
}

const STORAGE_KEY = 'canchahub-sidebar-collapsed';

export function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const savedValue = globalThis.localStorage.getItem(STORAGE_KEY);
    setCollapsed(savedValue === 'true');
  }, []);

  const handleCollapseToggle = () => {
    const nextValue = !collapsed;
    setCollapsed(nextValue);
    globalThis.localStorage.setItem(STORAGE_KEY, String(nextValue));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapseToggle={handleCollapseToggle}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className={cn('transition-all duration-200 md:pl-72', collapsed && 'md:pl-20')}>
        <Navbar onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6" data-testid="mainLayout">
          {children}
        </main>
      </div>
    </div>
  );
}
