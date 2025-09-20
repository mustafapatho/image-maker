## To Enable The Functionality of Payments :
Payment System Setup Requirements
1. Stripe Account Setup
Create a Stripe account at https://stripe.com

Get your Publishable Key and Secret Key from the Stripe dashboard

Add these keys to your .env.local file:

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

Copy
2. Firebase Setup (for user management)
Create a Firebase project at https://console.firebase.google.com

Enable Authentication with Google sign-in

Enable Firestore database

Download the Firebase config and add to .env.local

3. Webhook Configuration
In your Stripe dashboard, set up a webhook endpoint pointing to: your-domain.com/api/webhooks/stripe

Select these events: checkout.session.completed, invoice.payment_succeeded, customer.subscription.updated

Copy the webhook signing secret to .env.local as STRIPE_WEBHOOK_SECRET

4. Product Setup in Stripe
Create products in Stripe dashboard for:

Individual image generation (e.g., $2 per image)

Monthly subscription plans (e.g., $19/month for 100 images)

Copy the Price IDs to your environment variables

5. Domain Configuration
Set your domain URL in .env.local as NEXT_PUBLIC_APP_URL=https://yourdomain.com

6. Test Before Going Live
Use Stripe test keys first

Test the complete flow: sign up → purchase → generate images

Switch to live keys only after testing

The payment system supports both one-time purchases and monthly subscriptions, with automatic credit management and user authentication.


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

