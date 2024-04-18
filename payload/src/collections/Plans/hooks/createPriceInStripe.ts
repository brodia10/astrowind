import payload from 'payload';
import { CollectionAfterChangeHook } from 'payload/types';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-08-01' });

const createPriceInStripe: CollectionAfterChangeHook = async ({
    doc, // the current document state after the change
    operation, // the type of operation ('create' or 'update')
    previousDoc, // the document state before the change
}) => {
    // Only proceed if this is an update operation and the price has changed
    if (operation === 'update' && doc.price !== previousDoc?.price) {
        try {
            // Create a new price in Stripe associated with the plan's product ID
            const newPrice = await stripe.prices.create({
                product: doc.stripeProductId, // Assumes stripeProductId is stored on the plan
                unit_amount: doc.price, // Assumes price is in the smallest currency unit (e.g., cents for USD)
                currency: 'usd', // Set your currency
                recurring: { interval: 'month', usage_type: 'licensed' },
                // Specify 'recurring' if this is for a subscription plan
            });

            // Update the document in PayloadCMS with the new Stripe Price ID
            // This direct update should not re-trigger the hook in a problematic way, as the condition is specific to price changes
            await payload.update({
                collection: 'plans',
                id: doc.id,
                data: { stripePriceId: newPrice.id },
            });

        } catch (error) {
            console.error('Failed to create a new Stripe price:', error);
        }
    }

    return doc;
};

export default createPriceInStripe;