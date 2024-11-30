import React from 'react';
import { Truck, Zap } from 'lucide-react';

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: typeof Truck | typeof Zap;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 12.99,
    description: '5-7 business days',
    icon: Truck
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 24.99,
    description: '2-3 business days',
    icon: Zap
  }
];

interface ShippingOptionsProps {
  selected?: ShippingMethod;
  onChange: (method: ShippingMethod) => void;
  error?: string;
}

export default function ShippingOptions({ selected, onChange, error }: ShippingOptionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-amber-900">Shipping Method</h3>
      
      <div className="space-y-2">
        {shippingMethods.map((method) => {
          const Icon = method.icon;
          return (
            <label
              key={method.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                ${selected?.id === method.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-amber-200 hover:border-amber-300'
                }`}
            >
              <input
                type="radio"
                name="shippingMethod"
                checked={selected?.id === method.id}
                onChange={() => onChange(method)}
                className="text-amber-600 focus:ring-amber-500"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-amber-600" />
                  <span className="font-medium text-amber-900">{method.name}</span>
                </div>
                <p className="text-sm text-amber-600 mt-1">{method.description}</p>
              </div>
              <span className="font-medium text-amber-900">${method.price.toFixed(2)}</span>
            </label>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}