// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    console.log('Received request body:', body)
    
    const { referenceId, amount, description } = body
    
    if (!referenceId || !amount || !description) {
      throw new Error('Missing required fields: referenceId, amount, description')
    }
    
    // @ts-ignore
    const paymentKey = Deno.env.get('payment_api_key')
    
    if (!paymentKey) {
      throw new Error('payment_api_key not configured')
    }
    
    console.log('Payment key available:', !!paymentKey)

    const origin = req.headers.get('origin') || 'http://localhost:3000'
    
    const request = {
      referenceId,
      total: amount,
      currency: 'IQD',
      lineItem: [{
        label: description,
        amount: amount,
        type: 'increase',
        image: '',
      }],
      webhookUrl: `${origin}/api/webhooks/wayl`,
      webhookSecret: 'webhook_secret',
      redirectionUrl: `${origin}?payment=success`,
    }

    console.log('Sending request to Wayl:', JSON.stringify(request, null, 2))
    
    const response = await fetch('https://api.thewayl.com/api/v1/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WAYL-AUTHENTICATION': paymentKey,
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Wayl API error response:', errorText)
      throw new Error(`Wayl API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Wayl payment error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})