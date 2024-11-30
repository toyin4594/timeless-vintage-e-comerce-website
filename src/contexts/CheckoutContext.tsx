import React, { createContext, useContext, useState } from 'react';

interface CheckoutContextType {
  currentStep: number;
  customerInfo: any;
  shippingInfo: any;
  shippingMethod: any;
  updateCustomerInfo: (info: any) => void;
  updateShippingInfo: (info: any) => void;
  updateShippingMethod: (method: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        customerInfo,
        shippingInfo,
        shippingMethod,
        updateCustomerInfo: setCustomerInfo,
        updateShippingInfo: setShippingInfo,
        updateShippingMethod: setShippingMethod,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}