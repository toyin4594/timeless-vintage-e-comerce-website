import React from 'react';

interface MaterialFilterProps {
  selectedMaterials: string[];
  onChange: (materials: string[]) => void;
}

const materials = [
  'Cotton',
  'Silk',
  'Wool',
  'Leather',
  'Denim',
  'Polyester',
  'Linen',
  'Velvet'
];

export default function MaterialFilter({ selectedMaterials, onChange }: MaterialFilterProps) {
  const toggleMaterial = (material: string) => {
    const newMaterials = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    onChange(newMaterials);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-amber-800 mb-4">Material</h3>
      <div className="space-y-2">
        {materials.map((material) => (
          <label key={material} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedMaterials.includes(material)}
              onChange={() => toggleMaterial(material)}
              className="text-amber-600 rounded border-amber-300 
                       focus:ring-amber-500 focus:ring-offset-0"
            />
            <span className="text-sm text-amber-700">{material}</span>
          </label>
        ))}
      </div>
    </div>
  );
}