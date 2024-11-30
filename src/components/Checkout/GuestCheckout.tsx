import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '../../store/useStore';
import { guestCheckoutSchema, type GuestCheckoutFormData } from '../../utils/validation/checkoutSchemas';
import { processOrder } from '../../utils/checkout/orderProcessing';
import ContactForm from './forms/ContactForm';
import AddressForm from './forms/AddressForm';
import PaymentSection from './PaymentSection';
import OrderSummaryPanel from './OrderSummaryPanel';
import ShippingOptions from './ShippingOptions';
import toast from 'react-hot-toast';

export default function GuestCheckout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<GuestCheckoutFormData>({
    resolver: zodResolver(guestCheckoutSchema),
    defaultValues: {
      sameAsShipping: true
    }
  });

  const sameAsShipping = watch('sameAsShipping');
  const shippingAddress = watch('shippingAddress');
  const shippingMethod = watch('shippingMethod');

  React.useEffect(() => {
    if (sameAsShipping && shippingAddress) {
      Object.keys(shippingAddress).forEach(key => {
        setValue(`billingAddress.${key}`, shippingAddress[key]);
      });
    }
  }, [sameAsShipping, shippingAddress, setValue]);

  const onSubmit = async (data: GuestCheckoutFormData) => {
    try {
      const result = await processOrder({
        formData: data,
        paymentMethodId: 'dummy-payment-id',
        cart
      });

      if (result.success) {
        clearCart();
        navigate('/order-success', {
          state: {
            orderNumber: result.orderNumber,
            customerEmail: data.email,
            estimatedDelivery: result.estimatedDelivery
          }
        });
        toast.success('Order placed successfully!');
      }
    } catch (error) {
      toast.error('Failed to process order. Please try again.');
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <ContactForm register={register} errors={errors} />

            <div className="space-y-6">
              <h2 className="text-xl font-medium text-amber-900">Shipping Address</h2>
              <AddressForm
                type="shipping"
                register={register}
                errors={errors}
                prefix="shippingAddress"
              />
            </div>

            <ShippingOptions
              selected={shippingMethod}
              onChange={(method) => setValue('shippingMethod', method)}
              error={errors.shippingMethod?.message as string}
            />

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
                <AddressForm
                  type="billing"
                  register={register}
                  errors={errors}
                  prefix="billingAddress"
                />
              )}
            </div>

            <PaymentSection register={register} errors={errors} />

            <button type="submit" className="vintage-button w-full">
              Place Order
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <OrderSummaryPanel shippingMethod={shippingMethod} />
        </div>
      </div>
    </div>
  );
}