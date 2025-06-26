'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4">
        <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.98-4.48 1.98-3.52 0-6.48-2.91-6.48-6.48s2.96-6.48 6.48-6.48c1.98 0 3.06.83 3.74 1.48l2.84-2.78C18.4 2.5 15.98 1.25 12.48 1.25c-5.48 0-9.98 4.48-9.98 9.98s4.5 9.98 9.98 9.98c2.98 0 5.25-1 7-3.25.96-1.15 1.73-2.91 1.73-5.25 0-.75-.08-1.48-.18-2.18h-8.82z"/>
    </svg>
);

const authSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

type AuthFormValues = z.infer<typeof authSchema>;

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignUpDialog({ open, onOpenChange }: SignUpDialogProps) {
  const { handleSignUp, handleSignIn, handleSignInWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
    }
    onOpenChange(isOpen);
  };

  const onSignUp = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      await handleSignUp(data.email, data.password);
      handleOpenChange(false);
      toast({
        title: 'Account Created!',
        description: 'You have been successfully signed in.',
      });
    } catch (err: any) {
      toast({
        title: 'Sign-Up Failed',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignIn = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      await handleSignInWithEmail(data.email, data.password);
      handleOpenChange(false);
      toast({
        title: 'Signed In!',
        description: 'Welcome back.',
      });
    } catch (err: any) {
      toast({
        title: 'Sign-In Failed',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const onGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await handleSignIn();
      handleOpenChange(false);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to VibeGen</DialogTitle>
          <DialogDescription>
            Sign in or create an account to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
            <Button variant="outline" type="button" onClick={onGoogleSignIn} disabled={isLoading || isGoogleLoading}>
                {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                <GoogleIcon />
                )}
                Continue with Google
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or with email
                    </span>
                </div>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={form.handleSubmit(onSignIn)}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-signin">Email</Label>
                      <Input id="email-signin" {...form.register('email')} placeholder="name@example.com" disabled={isLoading}/>
                      {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signin">Password</Label>
                      <Input id="password-signin" type="password" {...form.register('password')} disabled={isLoading} />
                      {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Sign In
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={form.handleSubmit(onSignUp)}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input id="email-signup" {...form.register('email')} placeholder="name@example.com" disabled={isLoading}/>
                      {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <Input id="password-signup" type="password" {...form.register('password')} disabled={isLoading}/>
                      {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
