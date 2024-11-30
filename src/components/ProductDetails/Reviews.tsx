import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Review } from '../../types';

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h3 className="text-lg font-medium text-amber-900">Customer Reviews</h3>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < averageRating
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-amber-700">
              {averageRating.toFixed(1)} out of 5
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-amber-100 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-amber-700">{review.userName}</span>
              <span className="text-xs text-amber-500">{review.date}</span>
            </div>
            <p className="text-amber-800 mb-2">{review.comment}</p>
            <button className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-800">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}