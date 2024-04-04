import payload from "payload";
import { Customer, Tenant } from 'payload/generated-types';
import { CollectionBeforeChangeHook } from "payload/types";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });

const isNewCustomDomainAdded = (data: Tenant, originalDomains: Tenant['domains'] = []): boolean => {
    return data.domains?.some(domain =>
        !domain.autoGenerated && !originalDomains?.some(od => od.domain === domain.domain)) || false;
};

const createStripeCustomer = async (email: string): Promise<string> => {
    try {
        const customer = await stripe.customers.create({ email });
        console.log('Stripe customer created with ID:', customer.id);
        return customer.id;
    } catch (error) {
        console.error('Error creating Stripe customer:', error);
        throw error;
    }
};

const updateOrCreatePayloadCustomer = async (email: string, stripeCustomerId: string): Promise<Customer> => {
    const findResult = await payload.find({
        collection: 'customers',
        where: { stripeCustomerId: { equals: stripeCustomerId } },
        limit: 1,
    });

    let customerResult: Customer;

    if (findResult.totalDocs === 0) {
        const createResult = await payload.create({
            collection: 'customers',
            data: { email, stripeCustomerId },
        });
        customerResult = createResult as Customer;
    } else {
        await payload.update({
            collection: 'customers',
            id: findResult.docs[0].id,
            data: { stripeCustomerId },
        });
        customerResult = findResult.docs[0];
    }

    return customerResult;
};

const configureStripeOnCustomDomainCreation: CollectionBeforeChangeHook = async ({ data, originalDoc, operation }) => {
    if (operation === 'update' && data.emailConfig) {
        const emailConfig = data.emailConfig


        if (emailConfig && data.domains) {
            const originalDomains = originalDoc.domains || [];

            if (isNewCustomDomainAdded(data as Tenant, originalDomains)) {
                const email = emailConfig.fromEmailAddress
                try {
                    const stripeCustomerId = await createStripeCustomer(email);
                    await updateOrCreatePayloadCustomer(email, stripeCustomerId);
                    // Additional logic for linking the Payload customer back to the Tenant could be added here
                } catch (error) {
                    console.error('Error processing domain addition and Stripe customer creation:', error);
                    throw error;
                }
            }
        }
    }
};

export default configureStripeOnCustomDomainCreation