import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically:
      // 1. Validate the form
      // 2. Process payment with Stripe
      // 3. Create order in your backend
      // 4. Clear the cart
      // For now, we'll just simulate success
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-serif text-amber-900 mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-amber-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={shippingDetails.firstName}
              onChange={(e) => setShippingDetails({...shippingDetails, firstName: e.target.value})}
              className="vintage-input"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-amber-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={shippingDetails.lastName}
              onChange={(e) => setShippingDetails({...shippingDetails, lastName: e.target.value})}
              className="vintage-input"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-amber-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={shippingDetails.address}
            onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
            className="vintage-input"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-amber-700">
              City
            </label>
            <input
              type="text"
              id="city"
              value={shippingDetails.city}
              onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
              className="vintage-input"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-amber-700">
              State
            </label>
            <input
              type="text"
              id="state"
              value={shippingDetails.state}
              onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
              className="vintage-input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-amber-700">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              value={shippingDetails.zipCode}
              onChange={(e) => setShippingDetails({...shippingDetails, zipCode: e.target.value})}
              className="vintage-input"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-amber-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={shippingDetails.country}
              onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})}
              className="vintage-input"
              required
            />
          </div>
        </div>

        <div className="border-t border-amber-200 pt-6">
          <button type="submit" className="vintage-button w-full">
            Complete Purchase
          </button>
        </div>
      </form>
    </div>
  );
}