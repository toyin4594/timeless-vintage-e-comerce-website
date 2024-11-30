import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingSchema } from '../../../utils/validationSchemas';
import { useCheckout } from '../../../contexts/CheckoutContext';
import FormInput from '../../ui/FormInput';
import ShippingOptions from '../ShippingOptions';

export default function ShippingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shippingSchema)
  });
  const { updateShippingInfo, nextStep } = useCheckout();

  const onSubmit = (data) => {
    updateShippingInfo(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-medium text-amber-900">Shipping Address</h2>

      <FormInput
        label="Street Address"
        {...register('address')}
        error={errors.address?.message}
      />

      <FormInput
        label="Apartment, suite, etc."
        {...register('apartment')}
        error={errors.apartment?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          label="City"
          {...register('city')}
          error={errors.city?.message}
        />
        <FormInput
          label="State"
          {...register('state')}
          error={errors.state?.message}
        />
        <FormInput
          label="ZIP Code"
          {...register('zipCode')}
          error={errors.zipCode?.message}
        />
      </div>

      <FormInput
        label="Country"
        {...register('country')}
        error={errors.country?.message}
      />

      <ShippingOptions />

      <button type="submit" className="vintage-button w-full">
        Continue to Payment
      </button>
    </form>
  );
}