import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

export default function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif text-amber-900 mb-6">
          Payment Information
        </h2>
        <PaymentForm />
      </div>
    </Elements>
  );
}