import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const WAYL_WEBHOOK_SECRET = process.env.WAYL_WEBHOOK_SECRET;

interface WaylWebhookPayload {
  referenceId: string;
  id: string;
  total: string;
  currency: string;
  paymentMethod: string;
  status: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!WAYL_WEBHOOK_SECRET) return false;
  
  const expectedSignature = crypto
    .createHmac('sha256', WAYL_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const signature = req.headers['x-wayl-signature'] as string;
    const payload = JSON.stringify(req.body);

    // Verify webhook signature
    if (!signature || !verifyWebhookSignature(payload, signature)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const webhookData: WaylWebhookPayload = req.body;
    
    // Only process completed payments
    if (webhookData.status !== 'Completed') {
      return res.status(200).json({ message: 'Payment not completed yet' });
    }

    const { referenceId } = webhookData;
    
    // Parse reference ID to determine payment type
    if (referenceId.startsWith('sub_')) {
      // Subscription payment
      const parts = referenceId.split('_');
      const userId = parts[1];
      const planId = parts[2];
      
      console.log(`Subscription activated: ${userId}, plan: ${planId}`);
      
    } else if (referenceId.startsWith('pay_')) {
      // One-time payment
      const parts = referenceId.split('_');
      const userId = parts[1];
      const numImages = parseInt(parts[2]);
      
      console.log(`One-time payment processed: ${userId}, images: ${numImages}`);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}