import React from 'react';

export default function LeftUserSearch({ onSearch }) {
  return (
    <div className="p-2 flex items-center space-x-2">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by username or email"
        className="w-full bg-[rgb(55,55,55)] rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
