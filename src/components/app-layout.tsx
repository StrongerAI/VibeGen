'use client';

import { TopNav } from '@/components/top-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <TopNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
