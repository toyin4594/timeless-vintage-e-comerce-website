import React from 'react';

interface PriceRangeSliderProps {
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

export default function PriceRangeSlider({ range, onChange }: PriceRangeSliderProps) {
  const [min, max] = range;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    onChange([newMin, max]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    onChange([min, newMax]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div>
          <label className="text-xs text-amber-600">Min</label>
          <input
            type="number"
            value={min}
            onChange={handleMinChange}
            className="w-full vintage-input text-sm"
            min={0}
            max={max}
          />
        </div>
        <div>
          <label className="text-xs text-amber-600">Max</label>
          <input
            type="number"
            value={max}
            onChange={handleMaxChange}
            className="w-full vintage-input text-sm"
            min={min}
          />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={1000}
        value={max}
        onChange={handleMaxChange}
        className="w-full"
      />
    </div>
  );
}