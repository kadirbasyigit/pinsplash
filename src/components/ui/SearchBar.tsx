import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from './input';

interface SearchBarProps {
  error?: boolean;
}

export function SearchBar({ error = false }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <form role="search" className="relative max-w-md w-full">
      <label htmlFor="search-input" className="sr-only">
        Search for photos
      </label>
      <Input
        id="search-input"
        variant="search"
        type="search"
        placeholder="Search image Eg. landscape"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        aria-label="Search for photos"
        error={error}
      />
      <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded flex items-center justify-center ${error ? 'bg-background-error-subtle' : 'bg-icon-brand-background'}`} aria-hidden="true">
        <Search size={14} className={error ? 'text-icon-error' : 'text-icon-brand'} />
      </div>
      {searchValue && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon-primary hover:text-icon-primary-hover"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
}