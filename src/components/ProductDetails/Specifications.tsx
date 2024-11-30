import React from 'react';
import { ProductSpecs } from '../../types';

interface SpecificationsProps {
  specs: ProductSpecs;
}

export default function Specifications({ specs }: SpecificationsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-900">Product Specifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-amber-800">Material</h4>
          <p className="text-amber-700">{specs.material}</p>
        </div>

        {specs.designer && (
          <div>
            <h4 className="text-sm font-medium text-amber-800">Designer</h4>
            <p className="text-amber-700">{specs.designer}</p>
          </div>
        )}

        {specs.madeIn && (
          <div>
            <h4 className="text-sm font-medium text-amber-800">Origin</h4>
            <p className="text-amber-700">{specs.madeIn}</p>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-amber-800 mb-2">Care Instructions</h4>
        <ul className="list-disc list-inside space-y-1">
          {specs.care.map((instruction, index) => (
            <li key={index} className="text-sm text-amber-700">{instruction}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-medium text-amber-800 mb-2">Features</h4>
        <ul className="list-disc list-inside space-y-1">
          {specs.features.map((feature, index) => (
            <li key={index} className="text-sm text-amber-700">{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}