import React from 'react';
import { useStore } from '../../store/useStore';
import { useCheckout } from '../../contexts/CheckoutContext';
import { getProduct } from '../../utils/products';

export default function OrderSummary() {
  const { cart } = useStore();
  const { shippingMethod } = useCheckout();

  const cartItems = cart.map(item => ({
    ...item,
    product: getProduct(item.productId)
  }));

  const subtotal = cartItems.reduce((sum, item) => 
    sum + (item.product?.price * item.quantity), 0
  );
  
  const shippingCost = shippingMethod?.price || 0;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-amber-50 p-6 rounded-lg">
      <h2 className="text-xl font-medium text-amber-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex justify-between">
            <div className="flex gap-4">
              <img
                src={item.product?.images[0]}
                alt={item.product?.name}
                className="h-16 w-16 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium text-amber-900">{item.product?.name}</p>
                <p className="text-sm text-amber-600">Size: {item.size}</p>
                <p className="text-sm text-amber-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-amber-900">
              ${(item.product?.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-amber-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-amber-600">Subtotal</span>
          <span className="font-medium text-amber-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-amber-600">Shipping</span>
          <span className="font-medium text-amber-900">${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-medium border-t border-amber-200 pt-2">
          <span className="text-amber-900">Total</span>
          <span className="text-amber-900">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}