import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'NOT SET');
console.log('Supabase Key configured:', !!supabaseAnonKey);
console.log('Current origin:', window.location.origin);

// Verify URL and API key match (check project ID)
if (supabaseUrl && supabaseAnonKey) {
  try {
    // Extract project ID from URL
    const urlMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
    const projectIdFromUrl = urlMatch ? urlMatch[1] : null;
    
    // Try to extract project ID from API key (JWT)
    const keyParts = supabaseAnonKey.split('.');
    if (keyParts.length >= 2) {
      try {
        const payload = JSON.parse(atob(keyParts[1]));
        const projectIdFromKey = payload?.ref || null;
        
        if (projectIdFromUrl && projectIdFromKey && projectIdFromUrl !== projectIdFromKey) {
          console.error('⚠️ WARNING: URL and API Key project mismatch!');
          console.error(`URL project: ${projectIdFromUrl}`);
          console.error(`API Key project: ${projectIdFromKey}`);
          console.error('These must match! Get both from the same Supabase project.');
          alert('⚠️ WARNING: Your Supabase URL and API Key are from different projects! Please get both from the same project in Supabase Dashboard.');
        } else if (projectIdFromUrl && projectIdFromKey) {
          console.log('✅ URL and API Key project match:', projectIdFromUrl);
        }
      } catch (e) {
        // Couldn't decode JWT, that's okay
      }
    }
  } catch (e) {
    // Error checking, continue anyway
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = 'Missing Supabase environment variables. Please create a .env file in the root directory with:\n\nVITE_SUPABASE_URL=your_supabase_url\nVITE_SUPABASE_ANON_KEY=your_supabase_anon_key\n\nAfter creating the .env file, restart your development server.';
  console.error(errorMsg);
  alert(errorMsg);
  throw new Error(errorMsg);
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (e) {
  const errorMsg = `Invalid Supabase URL format: ${supabaseUrl}. Please check your VITE_SUPABASE_URL in .env file.`;
  console.error(errorMsg);
  alert(errorMsg);
  throw new Error(errorMsg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Use PKCE flow for better security and compatibility
  },
  global: {
    fetch: async (...args) => {
      try {
        const response = await fetch(...args);
        // Log failed requests for debugging
        if (!response.ok) {
          console.error('Supabase request failed:', {
            url: args[0],
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
          });
        }
        return response;
      } catch (error: any) {
        console.error('Supabase fetch error details:', {
          error,
          message: error?.message,
          name: error?.name,
          url: args[0],
          supabaseUrl,
          currentOrigin: window.location.origin,
        });
        // Re-throw the original error so Supabase can handle it properly
        throw error;
      }
    },
  },
});

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  teacher_id: string;
  student_email: string;
  subject: string;
  clarity_explanation: number;
  simplification: number;
  examples_analogies: number;
  engagement: number;
  pace_teaching: number;
  depth_knowledge: number;
  accuracy_info: number;
  concept_reinforcement: number;
  problem_solving: number;
  clarity_instructions: number;
  patience_approachability: number;
  motivation_encouragement: number;
  adaptability: number;
  visual_aids: number;
  technology_integration: number;
  interactive_methods: number;
  helping_understand: number;
  critical_thinking: number;
  homework_support: number;
  openness_feedback: number;
  comments: string;
  created_at: string;
}

export interface TeacherWithStats extends Teacher {
  average_rating: number;
  feedback_count: number;
}
