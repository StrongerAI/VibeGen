'use client';

import { usePathname } from 'next/navigation';
import { TopNav } from '@/components/top-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showNav = pathname !== '/';

  if (showNav) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <TopNav />
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return <>{children}</>;
}
