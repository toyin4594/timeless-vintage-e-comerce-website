import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#78350f',
      '::placeholder': {
        color: '#92400e',
      },
      ':-webkit-autofill': {
        color: '#78350f',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: true,
};

interface PaymentFormProps {
  onPaymentSuccess: (paymentMethod: any) => void;
  amount: number;
}

export default function PaymentForm({ onPaymentSuccess, amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!cardComplete) {
      toast.error('Please complete all card details');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      onPaymentSuccess(paymentMethod);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-amber-900">Payment Details</h2>
        <p className="text-sm text-amber-700">
          Amount to be charged: ${amount.toFixed(2)}
        </p>
        
        <div className="bg-white p-4 rounded-md border border-amber-200">
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            onChange={(e) => setCardComplete(e.complete)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || !cardComplete}
        className={`vintage-button w-full ${
          (processing || !cardComplete) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {processing ? 'Processing...' : 'Complete Purchase'}
      </button>

      <div className="text-center">
        <p className="text-xs text-amber-600">
          Your payment is secured with SSL encryption
        </p>
      </div>
    </form>
  );
}