import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full py-3 px-6 outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 transition duration-300"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;