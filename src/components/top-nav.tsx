'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Home, Sparkles, Gem, LogOut, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/generate', label: 'Generator', icon: Sparkles },
  { href: '/pricing', label: 'Pricing', icon: Gem },
];

export function TopNav() {
  const pathname = usePathname();
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
      <div className="container relative flex h-14 max-w-screen-2xl items-center justify-between px-6">
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
            <Skeleton className="h-10 w-28 rounded-md" />
          ) : user ? (
            <>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user.photoURL || undefined}
                  alt={user.displayName || 'User'}
                />
                <AvatarFallback>
                  {user.displayName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={handleSignIn}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
