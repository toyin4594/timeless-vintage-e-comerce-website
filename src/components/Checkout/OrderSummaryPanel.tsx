import React from 'react';
import { Package, Truck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { getProduct } from '../../utils/products';

interface OrderSummaryPanelProps {
  shippingMethod?: {
    name: string;
    price: number;
  };
}

export default function OrderSummaryPanel({ shippingMethod }: OrderSummaryPanelProps) {
  const { cart } = useStore();
  
  const cartItems = cart.map(item => ({
    ...item,
    product: getProduct(item.productId)
  }));

  const subtotal = cartItems.reduce((sum, item) => 
    sum + (item.product?.price || 0) * item.quantity, 0
  );
  
  const shippingCost = shippingMethod?.price || 0;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-amber-50 rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-medium text-amber-900">Order Summary</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex gap-4">
            <img
              src={item.product?.images[0]}
              alt={item.product?.name}
              className="h-16 w-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">{item.product?.name}</p>
              <p className="text-sm text-amber-600">Size: {item.size}</p>
              <p className="text-sm text-amber-600">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-amber-900">
              ${((item.product?.price || 0) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-amber-200 pt-4 space-y-2">
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

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-amber-600">
          <Package className="h-4 w-4" />
          <span>Free returns within 30 days</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-600">
          <Truck className="h-4 w-4" />
          <span>Estimated delivery: 5-7 business days</span>
        </div>
      </div>
    </div>
  );
}