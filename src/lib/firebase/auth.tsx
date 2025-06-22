'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, type User, type Auth } from 'firebase/auth';
import { app } from './client';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
  handleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isFirebaseConfigured = !!app;
const auth: Auth | null = isFirebaseConfigured ? getAuth(app!) : null;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleSignIn = async () => {
    if (!isFirebaseConfigured || !auth) {
        console.error("Firebase Auth not initialized.");
        toast({
            title: "Authentication Error",
            description: "The authentication service is not configured. Please contact support.",
            variant: "destructive",
        });
        return;
    }
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({
        title: "Sign-In Failed",
        description: "An error occurred while signing in with Google. Please try again.",
        variant: "destructive",
    });
    }
  };

  const handleSignOut = async () => {
    if (!isFirebaseConfigured || !auth) {
        console.error("Firebase Auth not initialized.");
        toast({
            title: "Authentication Error",
            description: "The authentication service is not configured. Please contact support.",
            variant: "destructive",
        });
        return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({
        title: "Sign-Out Failed",
        description: "An error occurred while signing out. Please try again.",
        variant: "destructive",
    });
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, isFirebaseConfigured, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
