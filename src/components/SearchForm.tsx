'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const LoadingSpinner = () => (
  <svg 
    style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4" 
      style={{ opacity: 0.25 }}
    ></circle>
    <path 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
      style={{ opacity: 0.75 }}
    ></path>
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </svg>
);

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="div-block-2">
      <form onSubmit={handleSearch} className="search w-form">
        <label htmlFor="search" className="field-label"  style={{ 
              color: '#fff'
            }}>
          Encuentra de manera fácil y rápida la información que necesitas.
        </label>
        <div className="div-block-3">
          <input 
            className="search-input w-input" 
            maxLength={256} 
            name="query" 
            placeholder="Buscar" 
            type="search" 
            id="search" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required 
          />
          <button 
            type="submit" 
            className="search-button w-button"
            disabled={isSearching}
            style={{ 
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              opacity: isSearching ? 0.7 : 1,
              cursor: isSearching ? 'wait' : 'pointer'
            }}
          >
            {isSearching ? <LoadingSpinner /> : 'Buscar'}
          </button>
        </div>
      </form>
    </div>
  );
}
