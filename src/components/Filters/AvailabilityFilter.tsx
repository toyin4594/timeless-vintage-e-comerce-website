import React from 'react';

interface AvailabilityFilterProps {
  inStock: boolean;
  onChange: (inStock: boolean) => void;
}

export default function AvailabilityFilter({ inStock, onChange }: AvailabilityFilterProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-amber-800 mb-3">Availability</h3>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => onChange(e.target.checked)}
          className="text-amber-600 focus:ring-amber-500 rounded"
        />
        <span className="text-sm text-amber-700">In Stock Only</span>
      </label>
    </div>
  );
}