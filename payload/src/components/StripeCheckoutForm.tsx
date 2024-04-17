import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

// This is your test public API key.
const stripePromise = loadStripe("pk_test_51KrDzFGcfEQQlDX8XwBds4zmbG5zfjY6JdSQlPqLyMgv9JOEJyqXit5tft2N7IGyoIvZAx4sikw3OmKqBbou9gSw00LDSynn5o");

interface RouteParams {
    priceId: string; // Ensure that priceId is expected to be a string
}

const StripeCheckoutForm = () => {
    const { priceId } = useParams<RouteParams>(); // Use the defined interface here
    console.log('priceId', priceId)
    const fetchClientSecret = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/create-checkout-session`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ priceId }) // Now correctly typed
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.clientSecret;
        } catch (error) {
            console.error('Failed to fetch client secret:', error);
            throw error; // Re-throw to be handled by stripe.js
        }
    }, [priceId]); // Depend on priceId

    const options = { fetchClientSecret };

    useEffect(() => {
        if (priceId) {
            fetchClientSecret();
        }
    }, [priceId, fetchClientSecret]);

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
}

export default StripeCheckoutForm;
