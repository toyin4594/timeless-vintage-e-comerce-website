import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import FilterPanel from './Filters/FilterPanel';
import ProductCard from './ProductCard';
import { FilterOptions, Product } from '../types';
import { getProducts } from '../utils/products';

export default function ProductGrid() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: searchParams.get('q') || '',
    priceRange: [0, 1000],
    eras: [],
    conditions: [],
    sizes: [],
    materials: []
  });

  const products = getProducts();
  
  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = filters.searchQuery === '' || 
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesCategory = !category || product.category.toLowerCase() === category.toLowerCase();
    
    const matchesEra = filters.eras.length === 0 || 
      filters.eras.includes(product.era);
    
    const matchesCondition = filters.conditions.length === 0 || 
      filters.conditions.includes(product.condition);
    
    const matchesSize = filters.sizes.length === 0 || 
      product.sizes.some(size => filters.sizes.includes(size.name) && size.available);
    
    const matchesMaterial = filters.materials.length === 0 || 
      filters.materials.includes(product.material);
    
    const matchesPrice = product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1];

    return matchesSearch && matchesCategory && matchesEra && 
           matchesCondition && matchesSize && matchesMaterial && 
           matchesPrice;
  });

  return (
    <div className="flex gap-8">
      <aside className="w-72 flex-shrink-0">
        <FilterPanel
          filters={filters}
          onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
        />
      </aside>
      
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-amber-700">
            {filteredProducts.length} items found
          </p>
          <select 
            className="vintage-input"
            onChange={(e) => {/* Implement sorting */}}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}