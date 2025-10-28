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
    
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error('Failed to parse request JSON:', parseError);
      throw new Error('Invalid JSON in request body');
    }
    
    const { prompt, imageData, model = 'gemini-2.5-flash-image-preview' } = requestBody;
    console.log('Request data:', { 
      model, 
      hasImageData: !!imageData, 
      imageDataIsArray: Array.isArray(imageData),
      imageDataLength: Array.isArray(imageData) ? imageData.length : (imageData ? 1 : 0),
      promptLength: prompt?.length 
    });
    
    if (!prompt) {
      throw new Error('Prompt is required');
    }
    
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
    
    // Add generationConfig based on model type
    if (model.includes('image')) {
      body.generationConfig = {
        response_modalities: ['IMAGE', 'TEXT']
      }
    } else {
      body.generationConfig = {
        response_mime_type: 'text/plain'
      }
    }

    console.log('Calling Gemini API with body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    console.log('Gemini API response status:', response.status);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        const errorText = await response.text();
        console.error('Gemini API error (non-JSON):', errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }
      console.error('Gemini API error:', errorData);
      throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
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
    console.error('Edge Function Error:', error);
    console.error('Error stack:', error.stack);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorResponse = {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      details: error instanceof Error ? error.stack : String(error)
    };
    
    return new Response(
      JSON.stringify(errorResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})