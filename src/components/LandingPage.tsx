import { useState, useEffect } from 'react';
import { LogIn, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Leaderboard from './Leaderboard';

// Check Supabase configuration on component mount
const checkSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    return {
      valid: false,
      message: 'Supabase environment variables are missing. Please check your .env file and restart the dev server.'
    };
  }
  
  if (!url.startsWith('https://') || !url.includes('.supabase.co')) {
    return {
      valid: false,
      message: 'Invalid Supabase URL format. Should be: https://your-project.supabase.co'
    };
  }
  
  return { valid: true };
};

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [configError, setConfigError] = useState('');
  const { signIn, signUp } = useAuth();

  useEffect(() => {
    const configCheck = checkSupabaseConfig();
    if (!configCheck.valid) {
      setConfigError(configCheck.message);
    } else {
      // Test connection to Supabase - use auth health endpoint
      const testConnection = async () => {
        try {
          const testUrl = import.meta.env.VITE_SUPABASE_URL;
          const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          console.log('Testing connection to:', testUrl);
          
          // Test with auth health endpoint which is more permissive
          const response = await fetch(`${testUrl}/auth/v1/health`, {
            method: 'GET',
            headers: {
              'apikey': anonKey || '',
            },
          });
          
          console.log('Connection test response:', {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
          });
          
          // 200-299 or 404 are acceptable (404 means endpoint doesn't exist but connection works)
          if (response.status === 0) {
            // Status 0 means CORS error - request was blocked
            setConfigError(`⚠️ CORS Error: Browser blocked the request.\n\n🔧 QUICK FIX:\n1. Go to: https://app.supabase.com\n2. Select your project\n3. Go to Settings → API\n4. Scroll to "Allowed Origins"\n5. Click "Add origin"\n6. Add: ${window.location.origin}\n7. Click "Save"\n8. Wait 30-60 seconds, then refresh this page\n\nYour Supabase URL: ${testUrl?.substring(0, 50)}...`);
          } else if (response.status >= 500) {
            setConfigError(`⚠️ Supabase server error (${response.status}). Your project might be paused or having issues. Check Supabase Dashboard.`);
          } else if (!response.ok && response.status !== 404) {
            // 404 is OK - means endpoint doesn't exist but connection works
            console.warn('Connection test returned non-200 status, but connection seems to work');
          }
          // If we get here without error, connection is working
        } catch (err: any) {
          console.error('Connection test error:', err);
          const errorMsg = err?.message || err?.toString() || 'Unknown error';
          
          if (errorMsg.includes('Failed to fetch') || 
              errorMsg.includes('NetworkError') || 
              err?.name === 'TypeError' ||
              errorMsg.includes('Load failed')) {
            setConfigError(`⚠️ Connection Error: Cannot reach Supabase.\n\n🔧 FIX CORS (Most Common):\n1. Open: https://app.supabase.com\n2. Select your project\n3. Go to Settings → API\n4. Find "Allowed Origins" section\n5. Click "Add origin"\n6. Add: ${window.location.origin}\n7. Click "Save"\n8. Wait 30-60 seconds, then refresh\n\n🔍 Other Checks:\n• Verify project is active (not paused) in Dashboard\n• Check .env file has correct URL (no trailing slash)\n• Restart dev server after .env changes\n• Check browser console (F12) for detailed errors\n\nYour URL: ${import.meta.env.VITE_SUPABASE_URL?.substring(0, 50)}...`);
          } else {
            setConfigError(`Connection test failed: ${errorMsg}`);
          }
        }
      };
      testConnection();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      console.log('Form submitted. Mode:', isSignUp ? 'Sign Up' : 'Sign In');
      
      if (isSignUp) {
        await signUp(email, password);
        // If we get here without error, signup was successful
        // Check if it's the email confirmation case
        setSuccess('Account created successfully! Please check your email to confirm your account before signing in.');
        setEmail('');
        setPassword('');
        setIsSignUp(false); // Switch to sign in mode
      } else {
        await signIn(email, password);
        // If sign in succeeds, the auth state will change and user will be redirected
        setSuccess('Sign in successful! Redirecting...');
      }
    } catch (err: any) {
      const errorMsg = err?.message || err?.toString() || 'An error occurred';
      console.error('Form submission error:', errorMsg);
      
      // Handle special case for email confirmation
      if (errorMsg === 'SIGNUP_SUCCESS_EMAIL_CONFIRMATION') {
        setSuccess('Account created successfully! Please check your email to confirm your account before signing in.');
        setEmail('');
        setPassword('');
        setIsSignUp(false);
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://sunbeamballia.edu.in/wp-content/uploads/WhatsApp-Image-2024-12-17-at-1.36.45-PM-1024x494.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 py-12 gap-8">
        <div className="flex-1 max-w-xl text-white text-center">
          <div className="flex flex-col items-center gap-6">
        <img
          src="https://robowunder.com/wp-content/uploads/2025/09/Sunbeam-School-Ballia.png"
          alt="Sunbeam School Logo"
          className="h-24 w-auto mb-4"
        />
        <div>
              <h1 className="text-5xl font-bold mb-4 flex items-center gap-3 justify-center lg:justify-start">
                <GraduationCap className="w-16 h-1" />
                ClassPulse
              </h1>
              <p className="text-xl italic font-light">
                "Measuring Feedback, Elevating Teaching"
              </p>
            </div>
          </div>

          <div className="mt-12 hidden lg:block">
            <Leaderboard isPublic={true} />
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-white/80">
                {isSignUp ? 'Sign up to give feedback' : 'Sign in to continue'}
              </p>
            </div>

            {configError && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 text-white px-4 py-3 rounded-lg text-sm mb-4">
                <div className="font-semibold mb-2">⚠️ Configuration Issue</div>
                <div className="whitespace-pre-line text-sm mb-3">{configError}</div>
                <div className="mt-3 pt-3 border-t border-yellow-500/30">
                  <div className="text-xs opacity-90 mb-2 font-semibold">Quick Fix:</div>
                  <a 
                    href="https://app.supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline text-yellow-300 hover:text-yellow-100 block mb-2"
                  >
                    🔗 Open Supabase Dashboard → Settings → API → Add CORS Origin
                  </a>
                  <div className="text-xs opacity-75">
                    See <code className="bg-black/20 px-1 rounded">CORS_FIX.md</code> for step-by-step guide
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="your.email@sunbeam.edu.in"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-2 rounded-lg text-sm whitespace-pre-line">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-white px-4 py-2 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogIn className="w-5 h-5" />
                {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                }}
                className="text-white/80 hover:text-white text-sm underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          <div className="mt-8 lg:hidden">
            <Leaderboard isPublic={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
