## To Enable The Functionality of Payments :
Payment System Setup Requirements (Wayl API)
1. Get Wayl API Credentials
Contact Wayl to get your API authentication key

Add this key to your .env.local file:

WAYL_API_KEY=your_wayl_authentication_key_here

Copy
2. Configure Wayl API Settings
Choose your server environment:

Production: https://api.thewayl.com

Testing: https://api.thewayl-staging.com

Add the API URL to your .env.local file:

WAYL_API_URL=https://api.thewayl.com

Copy
3. Set Up Webhook Endpoint
Wayl will send payment notifications to your webhook

Your webhook URL will be: your-domain.com/api/webhooks/wayl

Create a webhook secret and add to .env.local:

WAYL_WEBHOOK_SECRET=your_secure_webhook_secret

Copy
4. Configure Pricing
Set your pricing in the app configuration:

Price per image (e.g., 2000 IQD per image)

Subscription plans (e.g., 19000 IQD/month for 100 images)

Currency is set to IQD (Iraqi Dinar)

5. Domain Configuration
Set your domain URL in .env.local:

NEXT_PUBLIC_APP_URL=https://yourdomain.com

Copy
6. Test the Payment Flow
Use Wayl's testing server first

Test: user signs up → creates payment link → pays → gets credits

Switch to production server after testing

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

