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
    console.log('Edge Function called');
    const { prompt, imageData, model = 'gemini-2.5-flash-image-preview' } = await req.json()
    console.log('Request data:', { 
      model, 
      hasImageData: !!imageData, 
      imageDataIsArray: Array.isArray(imageData),
      imageDataLength: Array.isArray(imageData) ? imageData.length : (imageData ? 1 : 0),
      promptLength: prompt?.length 
    });
    
    // @ts-ignore
    const geminiKey = Deno.env.get('gemini_api_key')
    // @ts-ignore  
    const paymentKey = Deno.env.get('payment_api_key')
    
    console.log('API keys available:', { hasGeminiKey: !!geminiKey, hasPaymentKey: !!paymentKey });
    
    if (!geminiKey) {
      throw new Error('gemini_api_key not configured')
    }

    const imageParts = [];
    if (imageData) {
      if (Array.isArray(imageData)) {
        imageParts.push(...imageData.map(img => ({ inline_data: { mime_type: img.mimeType, data: img.data } })));
      } else {
        imageParts.push({ inline_data: { mime_type: imageData.mimeType, data: imageData.data } });
      }
    }
    
    console.log('Image parts count:', imageParts.length);

    const body: any = {
      contents: [{
        parts: [
          ...imageParts,
          { text: prompt }
        ]
      }]
    }
    
    // Only add generationConfig for non-image models
    if (!model.includes('image')) {
      body.generationConfig = {
        response_mime_type: 'text/plain'
      }
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Gemini API error')
    }

    const data = await response.json()
    
    // Check if the API returned an error in the response body
    if (data.error) {
      throw new Error(data.error.message || 'Gemini API error')
    }

    return new Response(
      JSON.stringify(data),
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