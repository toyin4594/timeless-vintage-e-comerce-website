import { z } from 'zod';

const addressSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  address1: z.string().min(5, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  country: z.string().min(2, 'Country is required')
});

const paymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^[\d\s]{16,19}$/, 'Invalid card number')
    .transform(val => val.replace(/\s/g, '')),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)')
    .refine((val) => {
      const [month, year] = val.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }, 'Card has expired'),
  cvv: z.string()
    .regex(/^\d{3,4}$/, 'Invalid CVV'),
  cardholderName: z.string()
    .min(2, 'Cardholder name is required')
    .regex(/^[a-zA-Z\s]+$/, 'Invalid cardholder name')
});

export const guestCheckoutSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAsShipping: z.boolean(),
  payment: paymentSchema,
  shippingMethod: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number()
  })
});

export type GuestCheckoutFormData = z.infer<typeof guestCheckoutSchema>;