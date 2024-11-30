import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CreditCard, Lock } from 'lucide-react';
import FormInput from '../ui/FormInput';

interface PaymentSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function PaymentSection({ register, errors }: PaymentSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-amber-900">Payment Information</h2>
        <div className="flex items-center gap-2 text-amber-600">
          <Lock className="h-4 w-4" />
          <span className="text-sm">Secure Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <FormInput
            label="Card Number"
            {...register('payment.cardNumber')}
            error={errors.payment?.cardNumber?.message as string}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <FormInput
          label="Expiration Date"
          {...register('payment.expiry')}
          error={errors.payment?.expiry?.message as string}
          placeholder="MM/YY"
        />
        <FormInput
          label="CVV"
          {...register('payment.cvv')}
          error={errors.payment?.cvv?.message as string}
          placeholder="123"
          type="password"
          maxLength={4}
        />
        <div className="md:col-span-2">
          <FormInput
            label="Cardholder Name"
            {...register('payment.cardholderName')}
            error={errors.payment?.cardholderName?.message as string}
            placeholder="As shown on card"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-amber-600">
        <CreditCard className="h-4 w-4" />
        <span>We accept Visa, Mastercard, and American Express</span>
      </div>
    </div>
  );
}