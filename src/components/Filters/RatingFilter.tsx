import React from 'react';
import { Star } from 'lucide-react';

interface RatingFilterProps {
  minRating: number;
  onChange: (rating: number) => void;
}

export default function RatingFilter({ minRating, onChange }: RatingFilterProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-amber-800 mb-3">Minimum Rating</h3>
      <div className="flex flex-col gap-2">
        {[4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={minRating === rating}
              onChange={() => onChange(rating)}
              className="text-amber-600 focus:ring-amber-500"
            />
            <div className="flex items-center">
              {Array.from({ length: rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="ml-1 text-sm text-amber-700">& up</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}