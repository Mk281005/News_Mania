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
    <div >
      
    </div>
  );
}

export default SearchBar;
