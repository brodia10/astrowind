// StripeService.ts
import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-08-01' });
  }


  async createCheckoutSession(customerId: string, priceId: string, successUrl: string, cancelUrl: string): Promise<string> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      console.log('Checkout session created:', session.id);
      return session.url;
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      throw new Error('Failed to initiate a Stripe checkout session. Please verify the checkout details and try again.');
    }
  }
}
