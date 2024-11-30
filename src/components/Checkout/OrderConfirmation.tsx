import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderId } = location.state || { orderId: 'ORD-UNKNOWN' };

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
      </div>

      <h1 className="text-3xl font-serif text-amber-900 mb-4">
        Thank You for Your Order!
      </h1>

      <p className="text-amber-700 mb-6">
        Your order has been successfully placed and is being processed.
      </p>

      <div className="bg-amber-50 p-6 rounded-lg mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Package className="h-5 w-5 text-amber-700" />
          <span className="font-medium text-amber-900">Order Details</span>
        </div>
        <p className="text-amber-800 font-medium">Order ID: {orderId}</p>
      </div>

      <div className="space-y-4">
        <p className="text-amber-700">
          We'll send you a confirmation email with your order details and tracking
          information once your package ships.
        </p>

        <Link to="/" className="vintage-button inline-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}