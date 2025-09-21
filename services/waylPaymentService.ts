interface WaylLineItem {
  label: string;
  amount: number;
  type: 'increase' | 'decrease';
  image?: string;
}

interface CreateLinkRequest {
  referenceId: string;
  total: number;
  currency: string;
  lineItem: WaylLineItem[];
  webhookUrl: string;
  webhookSecret: string;
  redirectionUrl: string;
}

interface WaylLink {
  referenceId: string;
  id: string;
  total: string;
  currency: string;
  paymentMethod: string;
  status: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  url: string;
  webhookUrl: string;
  redirectionUrl: string;
}

import { supabase } from './supabase';

const WAYL_API_URL = process.env.NEXT_PUBLIC_WAYL_API_URL || 'https://api.thewayl.com';
const WAYL_WEBHOOK_SECRET = process.env.WAYL_WEBHOOK_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

class WaylPaymentService {
  private async getWaylApiKey(): Promise<string> {
    const { data, error } = await supabase.functions.invoke('payment-api');
    
    if (error || !data?.payment_api_key) {
      throw new Error('Payment API key not found');
    }
    
    return data.payment_api_key;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const apiKey = await this.getWaylApiKey();
    
    const response = await fetch(`${WAYL_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-WAYL-AUTHENTICATION': apiKey,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Wayl API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async createPaymentLink(params: {
    referenceId: string;
    amount: number;
    description: string;
    numImages?: number;
  }): Promise<WaylLink> {
    const { referenceId, amount, description } = params;
    
    const { data, error } = await supabase.functions.invoke('wayl-payment', {
      body: { referenceId, amount, description }
    });
    
    if (error) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
    
    return data.data;
  }

  async getPaymentLink(referenceId: string): Promise<WaylLink> {
    const response = await this.makeRequest(`/api/v1/links/${referenceId}`);
    return response.data;
  }

  async invalidatePaymentLink(referenceId: string): Promise<WaylLink> {
    const response = await this.makeRequest(`/api/v1/links/${referenceId}/invalidate`, {
      method: 'POST',
    });
    return response.data;
  }

  async verifyAuthKey(): Promise<boolean> {
    try {
      await this.makeRequest('/api/v1/verify-auth-key');
      return true;
    } catch {
      return false;
    }
  }
}

export const waylPaymentService = new WaylPaymentService();
export type { WaylLink, WaylLineItem };