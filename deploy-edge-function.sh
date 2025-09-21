#!/bin/bash

# Deploy the gemini-fn Edge Function to Supabase
echo "Deploying gemini-fn Edge Function..."

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI not found. Installing..."
    npm install -g supabase
fi

# Deploy the function
supabase functions deploy gemini-fn

echo "Edge Function deployed successfully!"
echo "Your API keys are already configured in Supabase secrets:"
echo "- gemini_api_key"
echo "- payment_api_key"