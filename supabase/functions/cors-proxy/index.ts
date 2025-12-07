// Edge Function to proxy Supabase requests (NOT RECOMMENDED - Use Dashboard CORS instead)
// This is a workaround if you cannot find CORS settings in the new Supabase UI

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Supabase credentials from environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || ''

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Supabase credentials not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Parse request
    const url = new URL(req.url)
    const path = url.pathname.replace('/cors-proxy', '')
    const body = req.method !== 'GET' ? await req.json() : null

    // Route requests
    if (path.startsWith('/auth/')) {
      // Handle auth requests
      const authPath = path.replace('/auth', '')
      
      if (req.method === 'POST' && authPath === '/signup') {
        const { email, password } = body
        const { data, error } = await supabase.auth.signUp({ email, password })
        
        return new Response(
          JSON.stringify({ data, error }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      if (req.method === 'POST' && authPath === '/signin') {
        const { email, password } = body
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        
        return new Response(
          JSON.stringify({ data, error }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    } else if (path.startsWith('/rest/')) {
      // Handle database requests
      const tableMatch = path.match(/\/rest\/v1\/(\w+)/)
      if (tableMatch) {
        const table = tableMatch[1]
        
        if (req.method === 'GET') {
          const { data, error } = await supabase.from(table).select('*')
          return new Response(
            JSON.stringify({ data, error }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        
        if (req.method === 'POST') {
          const { data, error } = await supabase.from(table).insert(body)
          return new Response(
            JSON.stringify({ data, error }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      }
    }

    return new Response(
      JSON.stringify({ error: 'Route not found' }),
      { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

