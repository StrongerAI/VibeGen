'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Home, Sparkles, Gem, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/generate', label: 'Generator', icon: Sparkles },
  { href: '/pricing', label: 'Pricing', icon: Gem },
];

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname === item.href ? 'text-foreground font-semibold' : 'text-foreground/60'
                  )}
                >
                  {item.label}
                </Link>
            ))}
          </nav>
        </div>
        
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <Menu />
                      <span className="sr-only">Open Menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="right">
                  <div className="p-4">
                      <Link href="/" className="mb-8 flex items-center" onClick={() => setOpen(false)}>
                          <Logo />
                      </Link>
                      <nav className="flex flex-col gap-4">
                          {navItems.map((item) => (
                              <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className={cn(
                                      'transition-colors hover:text-foreground/80 flex items-center gap-3 p-2 rounded-md',
                                      pathname === item.href ? 'text-foreground bg-muted font-semibold' : 'text-foreground/60'
                                  )}
                                >
                                  <item.icon className="h-5 w-5" />
                                  <span className="text-lg">{item.label}</span>
                                </Link>
                          ))}
                      </nav>
                  </div>
              </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
