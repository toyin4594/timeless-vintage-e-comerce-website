import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  { name: 'All', path: '/' },
  { name: '60s', path: '/category/60s' },
  { name: '70s', path: '/category/70s' },
  { name: 'Formal Wear', path: '/category/formal' },
  { name: 'Casual Wear', path: '/category/casual' },
];

export default function CategoryFilter() {
  const location = useLocation();

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
              ${location.pathname === category.path
                ? 'bg-amber-800 text-white'
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}