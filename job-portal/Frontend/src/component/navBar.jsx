// components/Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">NaukriNow</h1>
      <div className="space-x-4">
        <a href="/">Home</a>
        <a href="/jobs">Jobs</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </nav>
  );
};

export default Navbar;
