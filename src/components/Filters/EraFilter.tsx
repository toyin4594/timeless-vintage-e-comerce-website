import React from 'react';

interface EraFilterProps {
  selectedEras: string[];
  onChange: (eras: string[]) => void;
}

const eras = ['50s', '60s', '70s', '80s', '90s'];

export default function EraFilter({ selectedEras, onChange }: EraFilterProps) {
  const toggleEra = (era: string) => {
    const newEras = selectedEras.includes(era)
      ? selectedEras.filter(e => e !== era)
      : [...selectedEras, era];
    onChange(newEras);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-amber-800 mb-4">Era</h3>
      <div className="flex flex-wrap gap-2">
        {eras.map((era) => (
          <button
            key={era}
            onClick={() => toggleEra(era)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
              ${selectedEras.includes(era)
                ? 'bg-amber-800 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
          >
            {era}
          </button>
        ))}
      </div>
    </div>
  );
}