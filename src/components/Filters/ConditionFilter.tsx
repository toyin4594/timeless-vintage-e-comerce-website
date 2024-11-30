import React from 'react';

interface ConditionFilterProps {
  selectedConditions: string[];
  onChange: (conditions: string[]) => void;
}

const conditions = ['Excellent', 'Very Good', 'Good', 'Fair'];

export default function ConditionFilter({ selectedConditions, onChange }: ConditionFilterProps) {
  const toggleCondition = (condition: string) => {
    const newConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter(c => c !== condition)
      : [...selectedConditions, condition];
    onChange(newConditions);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-amber-800 mb-4">Condition</h3>
      <div className="space-y-2">
        {conditions.map((condition) => (
          <label key={condition} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedConditions.includes(condition)}
              onChange={() => toggleCondition(condition)}
              className="text-amber-600 rounded border-amber-300 
                       focus:ring-amber-500 focus:ring-offset-0"
            />
            <span className="text-sm text-amber-700">{condition}</span>
          </label>
        ))}
      </div>
    </div>
  );
}