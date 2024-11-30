import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerInfoSchema } from '../../../utils/validationSchemas';
import { useCheckout } from '../../../contexts/CheckoutContext';
import FormInput from '../../ui/FormInput';

export default function CustomerInfoForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(customerInfoSchema)
  });
  const { updateCustomerInfo, nextStep } = useCheckout();

  const onSubmit = (data) => {
    updateCustomerInfo(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-medium text-amber-900">Customer Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <FormInput
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <FormInput
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <FormInput
        label="Phone"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <button type="submit" className="vintage-button w-full">
        Continue to Shipping
      </button>
    </form>
  );
}