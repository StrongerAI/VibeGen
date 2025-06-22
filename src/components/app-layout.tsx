'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarInset } from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { MainNav } from '@/components/main-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show the sidebar on the landing page
  const showSidebar = pathname !== '/';

  if (showSidebar) {
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <MainNav />
        </Sidebar>
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    );
  }

  return <>{children}</>;
}
