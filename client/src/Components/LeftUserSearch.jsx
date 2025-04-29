import React, { useState } from 'react';

export default function LeftUserSearch({ onSearch, setActiveSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleFocus = () => setActiveSearch(true);
  const handleBlur = () => {
    // Only deactivate if input is empty
    if (searchText.trim() === '') {
      setActiveSearch(false);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };
  const handleClear = () => {
    setSearchText('');
    onSearch('');
    setActiveSearch(false);
  };

  return (
    <div className="relative p-2 flex items-center">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
        className="w-full bg-[rgb(55,55,55)] rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none"
      />
      {searchText && (
        <button
          onClick={handleClear}
          className="absolute right-5 text-gray-400 hover:text-white focus:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  );
}
