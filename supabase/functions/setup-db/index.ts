// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // @ts-ignore
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    // @ts-ignore
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Execute raw SQL to create the function
    const { error } = await supabase.from('_').select('*').limit(0)
    
    // Use direct SQL execution
    const { data, error: sqlError } = await supabase.rpc('exec', {
      sql: `
        CREATE OR REPLACE FUNCTION increment_user_images(user_id UUID, count INTEGER)
        RETURNS VOID AS $$
        BEGIN
          INSERT INTO user_profiles (id, total_images_generated)
          VALUES (user_id, count)
          ON CONFLICT (id)
          DO UPDATE SET total_images_generated = COALESCE(user_profiles.total_images_generated, 0) + count;
        END;
        $$ LANGUAGE plpgsql;
      `
    })

    if (sqlError) {
      throw sqlError
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Database function created successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})