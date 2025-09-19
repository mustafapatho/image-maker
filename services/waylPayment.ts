const WAYL_API_URL = 'https://api.thewayl.com';
const WAYL_API_KEY = import.meta.env.VITE_PAYMENT_API_KEY;

interface CreateLinkRequest {
  referenceId: string;
  total: number;
  currency: string;
  lineItem: Array<{
    label: string;
    amount: number;
    type: 'increase' | 'decrease';
    image?: string;
  }>;
  webhookUrl?: string;
  webhookSecret?: string;
  redirectionUrl?: string;
}

interface PaymentLink {
  referenceId: string;
  id: string;
  total: string;
  currency: string;
  status: string;
  url: string;
  createdAt: string;
}

export const createPaymentLink = async (request: CreateLinkRequest): Promise<PaymentLink> => {
  const response = await fetch(`${WAYL_API_URL}/api/v1/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-WAYL-AUTHENTICATION': WAYL_API_KEY
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error('Failed to create payment link');
  }

  const result = await response.json();
  return result.data;
};

export const getPaymentLink = async (referenceId: string): Promise<PaymentLink> => {
  const response = await fetch(`${WAYL_API_URL}/api/v1/links/${referenceId}`, {
    headers: {
      'X-WAYL-AUTHENTICATION': WAYL_API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get payment link');
  }

  const result = await response.json();
  return result.data;
};