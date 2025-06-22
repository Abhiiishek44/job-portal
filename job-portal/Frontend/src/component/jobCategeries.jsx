// components/JobCategories.js
import React from "react";

const categories = ["Software", "Marketing", "Finance", "Design", "HR"];

const JobCategories = () => {
  return (
    <div className="py-10 px-6 text-center">
      <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
      <div className="flex justify-center flex-wrap gap-4">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white p-4 shadow rounded w-40">
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
