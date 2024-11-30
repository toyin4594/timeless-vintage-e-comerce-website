import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';
import { ShippingInfo as ShippingInfoType } from '../../types';

interface ShippingInfoProps {
  shipping: ShippingInfoType;
}

export default function ShippingInfo({ shipping }: ShippingInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-amber-900 mb-4">Shipping Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-amber-700 mt-1" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Estimated Delivery
              </p>
              <p className="text-sm text-amber-700">{shipping.estimatedDelivery}</p>
            </div>
          </div>

          <div className="border-t border-amber-100 pt-4">
            <h4 className="text-sm font-medium text-amber-800 mb-2">
              Shipping Methods
            </h4>
            <div className="space-y-2">
              {shipping.methods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-amber-700">{method.name}</span>
                  <span className="text-amber-900 font-medium">
                    ${method.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-amber-100 pt-4">
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-amber-700 mt-1" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Returns & Exchanges
                </p>
                <p className="text-sm text-amber-700">{shipping.returns}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}