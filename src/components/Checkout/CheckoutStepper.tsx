import React from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';
import { CheckCircle } from 'lucide-react';

const steps = [
  { id: 'customer', label: 'Customer Info' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' }
];

export function CheckoutStepper() {
  const { currentStep } = useCheckout();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full
                  ${currentStep > index
                    ? 'bg-green-500'
                    : currentStep === index
                    ? 'bg-amber-600'
                    : 'bg-amber-200'
                  } text-white`}
              >
                {currentStep > index ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="ml-2 text-sm font-medium text-amber-900">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 bg-amber-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}