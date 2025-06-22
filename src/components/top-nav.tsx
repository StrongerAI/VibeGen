
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Home, Sparkles, Gem, Menu, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React from 'react';
import { useAuth } from '@/lib/firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/generate', label: 'Generator', icon: Sparkles },
  { href: '/pricing', label: 'Pricing', icon: Gem },
];

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { user, loading, handleSignIn, handleSignOut } = useAuth();
  const isLanding = pathname === '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b',
        isLanding
          ? 'border-transparent'
          : 'border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems
              .filter((item) => !isLanding || item.href !== '/')
              .map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname === item.href
                      ? 'text-foreground font-semibold'
                      : 'text-foreground/60'
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.photoURL || undefined}
                      alt={user.displayName || 'User'}
                    />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleSignIn}>Sign In</Button>
          )}

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <Link
                    href="/"
                    className="mb-8 flex items-center"
                    onClick={() => setOpen(false)}
                  >
                    <Logo />
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navItems
                      .filter((item) => !isLanding || item.href !== '/')
                      .map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'transition-colors hover:text-foreground/80 flex items-center gap-3 p-2 rounded-md',
                            pathname === item.href
                              ? 'text-foreground bg-muted font-semibold'
                              : 'text-foreground/60'
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
      </div>
    </header>
  );
}
