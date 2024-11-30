import React from 'react';
import { Filter } from 'lucide-react';
import { FilterOptions } from '../../types';
import PriceRangeSlider from './PriceRangeSlider';
import EraFilter from './EraFilter';
import ConditionFilter from './ConditionFilter';
import SizeFilter from './SizeFilter';
import MaterialFilter from './MaterialFilter';
import SearchBar from './SearchBar';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  return (
    <div className="w-72 bg-white p-6 rounded-lg shadow-sm border border-amber-100">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-amber-100">
        <Filter className="h-5 w-5 text-amber-800" />
        <h2 className="text-lg font-serif text-amber-900">Refine Search</h2>
      </div>

      <div className="space-y-8">
        <SearchBar 
          value={filters.searchQuery} 
          onChange={(query) => onFilterChange({ searchQuery: query })} 
        />

        <div>
          <h3 className="text-sm font-medium text-amber-800 mb-4">Price Range</h3>
          <PriceRangeSlider
            range={filters.priceRange}
            onChange={(range) => onFilterChange({ priceRange: range })}
          />
        </div>

        <EraFilter
          selectedEras={filters.eras}
          onChange={(eras) => onFilterChange({ eras })}
        />

        <ConditionFilter
          selectedConditions={filters.conditions}
          onChange={(conditions) => onFilterChange({ conditions })}
        />

        <SizeFilter
          selectedSizes={filters.sizes}
          onChange={(sizes) => onFilterChange({ sizes })}
        />

        <MaterialFilter
          selectedMaterials={filters.materials}
          onChange={(materials) => onFilterChange({ materials })}
        />

        <div className="pt-4 border-t border-amber-100">
          <button
            onClick={() => onFilterChange({
              searchQuery: '',
              priceRange: [0, 1000],
              eras: [],
              conditions: [],
              sizes: [],
              materials: []
            })}
            className="text-sm text-amber-600 hover:text-amber-800"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}