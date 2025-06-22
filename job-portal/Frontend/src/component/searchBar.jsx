// components/SearchBar.js
import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Search for jobs..."
        className="w-1/2 p-2 border border-gray-300 rounded-l"
      />
      <button className="bg-blue-600 text-white px-4 rounded-r">Search</button>
    </div>
  );
};

export default SearchBar;
