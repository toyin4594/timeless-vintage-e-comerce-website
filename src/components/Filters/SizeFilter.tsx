import React from 'react';

interface SizeFilterProps {
  selectedSizes: string[];
  onChange: (sizes: string[]) => void;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function SizeFilter({ selectedSizes, onChange }: SizeFilterProps) {
  const toggleSize = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    onChange(newSizes);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-amber-800 mb-4">Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => toggleSize(size)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
              ${selectedSizes.includes(size)
                ? 'bg-amber-800 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}