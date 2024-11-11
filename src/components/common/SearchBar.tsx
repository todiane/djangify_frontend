// src/components/common/SearchBar.tsx
'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search..." }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 text-sm rounded-md 
                 bg-background border border-input
                 hover:border-ring focus:border-ring
                 focus:outline-none focus:ring-1 focus:ring-ring
                 transition-colors"
      />
    </div>
  );
}
