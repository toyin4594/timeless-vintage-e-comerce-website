import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import FormInput from '../../ui/FormInput';

interface ContactFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function ContactForm({ register, errors }: ContactFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-amber-900">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message as string}
          placeholder="your@email.com"
        />
        <FormInput
          label="Phone"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message as string}
          placeholder="(123) 456-7890"
        />
      </div>
    </div>
  );
}