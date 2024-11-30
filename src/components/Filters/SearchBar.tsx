import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search vintage pieces..."
        className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-md 
                   text-amber-900 placeholder-amber-400
                   focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
    </div>
  );
}