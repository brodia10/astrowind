import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useCallback } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_51KrDzFGcfEQQlDX8XwBds4zmbG5zfjY6JdSQlPqLyMgv9JOEJyqXit5tft2N7IGyoIvZAx4sikw3OmKqBbou9gSw00LDSynn5o");

const StripeCheckoutForm = () => {
    const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session
        const res = await fetch("/create-checkout-session", {
            method: "POST",
        });
        const data = await res.json();
        return data.clientSecret;
    }, []);

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}

export default StripeCheckoutForm;