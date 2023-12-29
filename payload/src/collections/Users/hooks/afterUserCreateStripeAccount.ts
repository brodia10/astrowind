import payload from 'payload';
import type { AfterChangeHook } from 'payload/dist/collections/config/types';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
});

export const afterUserCreateStripeSetup: AfterChangeHook = async ({
    doc,
    operation,
}) => {
    if (operation === 'create' && doc.email) {
        try {
            // Step 1: Create Tenant
            const tenant = await payload.create({
                collection: 'tenants',
                data: {
                    name: `${doc.username}'s Tenant`, // Customize as needed
                    // ... other tenant details
                },
            });

            // Step 2: Create Stripe Customer
            const stripeCustomer = await stripe.customers.create({
                email: doc.email, // Ensure the user has an email field
            });

            // Step 3: Save Stripe Customer ID in tenantStripeConfigs collection
            const tenantStripeConfig = await payload.create({
                collection: 'tenantStripeConfigs',
                data: {
                    tenantId: tenant.id, // Associate with the newly created tenant
                    stripeCustomerId: stripeCustomer.id,
                },
            });

            // Step 4: Associate User with Tenant and Role
            // Update the user with tenant and role information
            await payload.update({
                collection: 'users',
                id: doc.id,
                data: {
                    tenants: tenant.id,
                    // role: "roleID or roleName", // Assign the role to the user as needed
                    // ... any additional user details
                },
            });


        } catch (error) {
            console.error('Error in afterUserCreateStripeSetup hook:', error);
            // Handle error appropriately
        }
    }

    return doc; // Return the updated document
};

