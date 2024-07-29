"use client"
import React from 'react';

function SearchBar() {
  const handleKeyDown = (e) => {
    // console.log(e)
    if (e.key === 'Enter') {
      console.log(e.target.value);
    }
  };

  return (
    <div className="search-bar flex items-center gap-2 p-3 rounded-xl h-9 bg-gray-100">
      <img src="search.svg" className="w-6 h-6" alt="Search Icon" />
      <input 
        type="text" 
        className="bg-transparent flex-grow outline-none" 
        placeholder="Search"
        onKeyDown={handleKeyDown}
        aria-label="Search"
      />
    </div>
  );
}

export default SearchBar;
