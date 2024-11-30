import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Printer, Download, ArrowRight } from 'lucide-react';

interface OrderSuccessProps {
  orderNumber: string;
  orderSummary: {
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    subtotal: number;
    shipping: number;
    total: number;
  };
  customerEmail: string;
  estimatedDelivery: string;
}

export default function OrderSuccess({
  orderNumber,
  orderSummary,
  customerEmail,
  estimatedDelivery,
}: OrderSuccessProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-serif text-amber-900 mb-2">
          Thank You for Your Order!
        </h1>
        <p className="text-amber-700">
          A confirmation email has been sent to {customerEmail}
        </p>
      </div>

      <div className="bg-amber-50 p-6 rounded-lg mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-medium text-amber-900">Order #{orderNumber}</h2>
            <p className="text-sm text-amber-700">
              Estimated Delivery: {estimatedDelivery}
            </p>
          </div>
          <Package className="h-6 w-6 text-amber-700" />
        </div>

        <div className="border-t border-amber-200 pt-4 space-y-4">
          {orderSummary.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-amber-800">
                {item.quantity}x {item.name}
              </span>
              <span className="text-amber-900 font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t border-amber-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-amber-700">Subtotal</span>
              <span className="text-amber-900">${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-700">Shipping</span>
              <span className="text-amber-900">${orderSummary.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-amber-900">Total</span>
              <span className="text-amber-900">${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-amber-200 rounded-md text-amber-700 hover:bg-amber-50"
          >
            <Printer className="h-4 w-4" />
            Print Receipt
          </button>
          <button
            onClick={() => {/* Implement download functionality */}}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-amber-200 rounded-md text-amber-700 hover:bg-amber-50"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        <Link
          to="/account/register"
          className="flex items-center justify-center gap-2 vintage-button w-full"
        >
          Create an Account for Faster Checkout
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          to="/"
          className="block text-center text-amber-600 hover:text-amber-800"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}