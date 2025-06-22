// components/HeroSection.js
import React from "react";

const HeroSection = () => {
  return (
<div className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white text-center py-24 px-4 shadow-inner">
  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
    Find Your Dream Job Today
  </h2>
  <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
    Browse thousands of jobs from top companies and start your career journey now.
  </p>
  <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300">
    🔍 Explore Jobs
  </button>
</div>
  );
};

export default HeroSection;
