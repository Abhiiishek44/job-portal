import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // "user" or "company"

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const [companyData, setCompanyData] = useState({
    companyName: "",
    email: "",
    password: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (role === "user") {
      setUserData((prev) => ({ ...prev, [name]: value }));
    } else {
      setCompanyData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      role === "user"
        ? "http://localhost:4000/api/users/register"
        : "http://localhost:4000/api/companies/register";


        
    const payload = role === "user" ? userData : companyData;
    console.log("Payload:", payload);

    try {
      const response = await axios.post(endpoint, payload);
        alert("Registration successful!");
        navigate("/login");
        console.log("Response:", response.data.message);
      } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-indigo-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Register Your Account</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={() => setRole("user")}
          className={`px-4 py-2 rounded ${role === "user" ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-700 transition`}
        >
          Register as User
        </button>
        <button
          onClick={() => setRole("company")}
          className={`px-4 py-2 rounded ${role === "company" ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-700 transition`}
        >
          Register as Company
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          {role === "user" ? "User" : "Company"} Registration
        </h2>

        {role === "user" ? (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={userData.mobileNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={companyData.companyName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={companyData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={role === "user" ? userData.email : companyData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={role === "user" ? userData.password : companyData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
