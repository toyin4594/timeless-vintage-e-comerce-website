import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import FormInput from '../../ui/FormInput';

interface AddressFormProps {
  type: 'shipping' | 'billing';
  register: UseFormRegister<any>;
  errors: FieldErrors;
  prefix: string;
}

export default function AddressForm({ type, register, errors, prefix }: AddressFormProps) {
  const getError = (field: string) => {
    return errors[prefix]?.[field]?.message as string | undefined;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput
        label="First Name"
        {...register(`${prefix}.firstName`)}
        error={getError('firstName')}
      />
      <FormInput
        label="Last Name"
        {...register(`${prefix}.lastName`)}
        error={getError('lastName')}
      />
      <div className="md:col-span-2">
        <FormInput
          label="Address Line 1"
          {...register(`${prefix}.address1`)}
          error={getError('address1')}
        />
      </div>
      <div className="md:col-span-2">
        <FormInput
          label="Address Line 2 (Optional)"
          {...register(`${prefix}.address2`)}
        />
      </div>
      <FormInput
        label="City"
        {...register(`${prefix}.city`)}
        error={getError('city')}
      />
      <FormInput
        label="State"
        {...register(`${prefix}.state`)}
        error={getError('state')}
      />
      <FormInput
        label="ZIP Code"
        {...register(`${prefix}.zipCode`)}
        error={getError('zipCode')}
      />
      <FormInput
        label="Country"
        {...register(`${prefix}.country`)}
        error={getError('country')}
      />
    </div>
  );
}