import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCheckout } from '../../../contexts/CheckoutContext';
import { useStore } from '../../../store/useStore';
import { processOrder } from '../../../utils/orderProcessing';
import toast from 'react-hot-toast';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#78350f',
      '::placeholder': {
        color: '#92400e',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
};

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const { customerInfo, shippingInfo, shippingMethod } = useCheckout();
  const { cart, clearCart } = useStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const cardElement = elements.getElement(CardElement);

    try {
      if (!cardElement) throw new Error('Card element not found');

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      const order = await processOrder({
        paymentMethodId: paymentMethod.id,
        customerInfo,
        shippingInfo,
        shippingMethod,
        cart
      });

      clearCart();
      toast.success('Order placed successfully!');
      // Navigate to order confirmation
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-medium text-amber-900">Payment Information</h2>

      <div className="bg-white p-4 rounded-md border border-amber-200">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`vintage-button w-full ${
          processing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {processing ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}