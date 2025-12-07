import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Check if we have an active session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Failed to get session:', error);
      }
      if (isMounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    }).catch(err => {
      console.error('Session check error:', err);
      if (isMounted) {
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        if (isMounted) {
          setUser(session?.user ?? null);
          // Set loading to false when auth state changes
          if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in with email:', email);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL?.substring(0, 30) + '...');
      console.log('Current origin:', window.location.origin);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Sign in error details:', {
          message: error.message,
          status: error.status,
          name: error.name,
          cause: error.cause,
          fullError: error,
        });
        
        // Handle network/CORS errors
        if (error.message?.includes('Failed to fetch') || 
            error.message?.includes('NetworkError') ||
            error.message?.includes('Network request failed') ||
            error.message?.includes('Load failed') ||
            error.name === 'TypeError') {
          const diagnosticMsg = `🔴 Connection Error: Cannot reach Supabase.\n\nThis is usually a CORS issue. Fix it:\n\n1. Go to: https://app.supabase.com\n2. Select your project\n3. Go to Settings → API\n4. Scroll to "Allowed Origins"\n5. Click "Add origin"\n6. Add: ${window.location.origin}\n7. Click "Save"\n8. Wait 30-60 seconds\n9. Refresh this page and try again\n\nIf still not working:\n• Check project is active (not paused)\n• Verify .env URL is correct\n• Restart dev server\n• Check browser console (F12)`;
          throw new Error(diagnosticMsg);
        }
        
        // Handle email confirmation issues
        if (error.message?.includes('Email not confirmed') || 
            error.message?.includes('email_not_confirmed') ||
            error.status === 401) {
          throw new Error('Please confirm your email address before signing in. Check your inbox for the confirmation link. If you didn\'t receive it, check your spam folder or disable email confirmation in Supabase Dashboard → Authentication → Settings.');
        }
        
        // Handle invalid credentials - but check if it might be email confirmation
        if (error.message?.includes('Invalid login credentials') || 
            error.message?.includes('Invalid credentials') ||
            error.message?.includes('invalid_credentials') ||
            error.status === 400) {
          // Check if user exists but email is not confirmed
          const diagnosticMsg = `Invalid email or password.\n\nPossible causes:\n1. Wrong password - try the exact password you used during signup\n2. Email not confirmed - check your inbox for confirmation email\n3. Account doesn't exist - try signing up again\n\nTo fix email confirmation:\n• Go to Supabase Dashboard → Authentication → Settings\n• Disable "Confirm email" for development\n• Or check your email inbox for confirmation link`;
          throw new Error(diagnosticMsg);
        } else {
          throw new Error(error.message || 'Failed to sign in');
        }
      }
      
      if (!data.session) {
        throw new Error('Sign in failed. Please try again.');
      }
      
      console.log('Sign in successful:', data.user?.email);
    } catch (err: any) {
      console.error('Sign in exception:', err);
      // Re-throw with better error message if it's a network error
      if (err?.message?.includes('Failed to fetch') || 
          err?.name === 'TypeError' ||
          err?.message?.includes('Network request failed') ||
          err?.message?.includes('Load failed')) {
        const diagnosticMsg = `🔴 Connection Error: Cannot reach Supabase.\n\nFix CORS:\n1. https://app.supabase.com → Your Project → Settings → API\n2. Add "${window.location.origin}" to Allowed Origins\n3. Save and wait 30-60 seconds\n4. Refresh and try again`;
        throw new Error(diagnosticMsg);
      }
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Attempting sign up with email:', email);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL?.substring(0, 30) + '...');
      console.log('Current origin:', window.location.origin);
      
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });
      
      if (error) {
        console.error('Sign up error details:', {
          message: error.message,
          status: error.status,
          name: error.name,
          cause: error.cause,
        });
        
        // Handle network/CORS errors
        if (error.message?.includes('Failed to fetch') || 
            error.message?.includes('NetworkError') ||
            error.message?.includes('Network request failed') ||
            error.message?.includes('Load failed') ||
            error.name === 'TypeError') {
          const diagnosticMsg = `🔴 Connection Error: Cannot reach Supabase.\n\nThis is usually a CORS issue. Fix it:\n\n1. Go to: https://app.supabase.com\n2. Select your project\n3. Go to Settings → API\n4. Scroll to "Allowed Origins"\n5. Click "Add origin"\n6. Add: ${window.location.origin}\n7. Click "Save"\n8. Wait 30-60 seconds\n9. Refresh this page and try again\n\nIf still not working:\n• Check project is active (not paused)\n• Verify .env URL is correct\n• Restart dev server\n• Check browser console (F12)`;
          throw new Error(diagnosticMsg);
        }
        throw new Error(error.message || 'Failed to sign up');
      }
      
      // Check if email confirmation is required
      if (data.user && !data.session) {
        // Email confirmation required - user needs to confirm email before login
        console.log('Sign up successful but email confirmation required:', {
          userId: data.user.id,
          email: data.user.email,
          emailConfirmed: data.user.email_confirmed_at,
        });
        throw new Error('SIGNUP_SUCCESS_EMAIL_CONFIRMATION');
      }
      
      if (data.user && data.session) {
        console.log('Sign up successful and user is logged in:', data.user?.email);
      } else {
        console.warn('Sign up response:', { user: data.user, session: data.session });
      }
    } catch (err: any) {
      console.error('Sign up exception:', err);
      // Re-throw with better error message if it's a network error
      if (err?.message?.includes('Failed to fetch') || 
          err?.name === 'TypeError' ||
          err?.message?.includes('Network request failed') ||
          err?.message?.includes('Load failed')) {
        const diagnosticMsg = `🔴 Connection Error: Cannot reach Supabase.\n\nFix CORS:\n1. https://app.supabase.com → Your Project → Settings → API\n2. Add "${window.location.origin}" to Allowed Origins\n3. Save and wait 30-60 seconds\n4. Refresh and try again`;
        throw new Error(diagnosticMsg);
      }
      throw err;
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting sign out');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw new Error(error.message || 'Failed to sign out');
      }
      // Immediately clear local user state so UI updates even if onAuthStateChange is delayed
      setUser(null);
      console.log('Sign out successful');
    } catch (err) {
      console.error('Sign out exception:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
