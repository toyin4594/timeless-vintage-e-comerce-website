import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormInput from '../ui/FormInput';
import { CheckCircle } from 'lucide-react';

const guestCheckoutSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  shippingAddress: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    address1: z.string().min(5, 'Address is required'),
    address2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string().min(2, 'Country is required')
  }),
  billingAddress: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    address1: z.string().min(5, 'Address is required'),
    address2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string().min(2, 'Country is required')
  }),
  sameAsShipping: z.boolean()
});

type GuestCheckoutFormData = z.infer<typeof guestCheckoutSchema>;

interface GuestCheckoutFormProps {
  onSubmit: (data: GuestCheckoutFormData) => void;
}

export default function GuestCheckoutForm({ onSubmit }: GuestCheckoutFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<GuestCheckoutFormData>({
    resolver: zodResolver(guestCheckoutSchema),
    defaultValues: {
      sameAsShipping: true
    }
  });

  const sameAsShipping = watch('sameAsShipping');
  const shippingAddress = watch('shippingAddress');

  React.useEffect(() => {
    if (sameAsShipping && shippingAddress) {
      Object.keys(shippingAddress).forEach(key => {
        setValue(`billingAddress.${key}`, shippingAddress[key]);
      });
    }
  }, [sameAsShipping, shippingAddress, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-amber-900">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-medium text-amber-900">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            {...register('shippingAddress.firstName')}
            error={errors.shippingAddress?.firstName?.message}
          />
          <FormInput
            label="Last Name"
            {...register('shippingAddress.lastName')}
            error={errors.shippingAddress?.lastName?.message}
          />
          <div className="md:col-span-2">
            <FormInput
              label="Address Line 1"
              {...register('shippingAddress.address1')}
              error={errors.shippingAddress?.address1?.message}
            />
          </div>
          <div className="md:col-span-2">
            <FormInput
              label="Address Line 2 (Optional)"
              {...register('shippingAddress.address2')}
            />
          </div>
          <FormInput
            label="City"
            {...register('shippingAddress.city')}
            error={errors.shippingAddress?.city?.message}
          />
          <FormInput
            label="State"
            {...register('shippingAddress.state')}
            error={errors.shippingAddress?.state?.message}
          />
          <FormInput
            label="ZIP Code"
            {...register('shippingAddress.zipCode')}
            error={errors.shippingAddress?.zipCode?.message}
          />
          <FormInput
            label="Country"
            {...register('shippingAddress.country')}
            error={errors.shippingAddress?.country?.message}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-amber-900">Billing Address</h2>
          <label className="flex items-center gap-2 text-sm text-amber-700">
            <input
              type="checkbox"
              {...register('sameAsShipping')}
              className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
            />
            Same as shipping address
          </label>
        </div>

        {!sameAsShipping && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              {...register('billingAddress.firstName')}
              error={errors.billingAddress?.firstName?.message}
            />
            <FormInput
              label="Last Name"
              {...register('billingAddress.lastName')}
              error={errors.billingAddress?.lastName?.message}
            />
            <div className="md:col-span-2">
              <FormInput
                label="Address Line 1"
                {...register('billingAddress.address1')}
                error={errors.billingAddress?.address1?.message}
              />
            </div>
            <div className="md:col-span-2">
              <FormInput
                label="Address Line 2 (Optional)"
                {...register('billingAddress.address2')}
              />
            </div>
            <FormInput
              label="City"
              {...register('billingAddress.city')}
              error={errors.billingAddress?.city?.message}
            />
            <FormInput
              label="State"
              {...register('billingAddress.state')}
              error={errors.billingAddress?.state?.message}
            />
            <FormInput
              label="ZIP Code"
              {...register('billingAddress.zipCode')}
              error={errors.billingAddress?.zipCode?.message}
            />
            <FormInput
              label="Country"
              {...register('billingAddress.country')}
              error={errors.billingAddress?.country?.message}
            />
          </div>
        )}
      </div>

      <button type="submit" className="vintage-button w-full">
        Continue to Payment
      </button>
    </form>
  );
}