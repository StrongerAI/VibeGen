'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Sparkles, Gem } from 'lucide-react';
import type { FC } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: <Home /> },
  { href: '/generate', label: 'Generator', icon: <Sparkles /> },
  { href: '/pricing', label: 'Pricing', icon: <Gem /> },
];

export const MainNav: FC = () => {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
            <SidebarMenuButton 
              asChild 
              isActive={pathname === item.href} 
              tooltip={item.label}
              >
              <Link href={item.href}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
