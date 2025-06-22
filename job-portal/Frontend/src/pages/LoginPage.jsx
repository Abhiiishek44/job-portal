import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // "user" or "company"
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [companyData, setCompanyData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    console.log(e.target.name);
    if (role === "user") {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    } else {
      setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };
 const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint =
    role === "user"
      ? "http://localhost:4000/api/users/login"
      : "http://localhost:4000/api/companies/login";

  const payload = role === "user" ? userData : companyData;

  try {
    const res = await axios.post(endpoint, payload); // res is the response

    // ✅ Make sure the response contains the expected data
    if (res.data && res.data[role]?._id) {
      const id = res.data[role]._id;

      localStorage.setItem("loggedInId", id);
      localStorage.setItem("role", role);

      alert("Login successful!");

      // ✅ Redirect
      role === "user"
        ? navigate("/userDashboard")
        : navigate("/CompanyDashboard");
    } else {
      alert("Invalid response from server");
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please check your credentials.");
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Login to Your Account</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={() => handleRoleChange("user")}
          className={`px-4 py-2 rounded ${
            role === "user" ? "bg-blue-600" : "bg-gray-700"
          } hover:bg-blue-700 transition`}
        >
          I'm a User
        </button>
        <button
          onClick={() => handleRoleChange("company")}
          className={`px-4 py-2 rounded ${
            role === "company" ? "bg-blue-600" : "bg-gray-700"
          } hover:bg-blue-700 transition`}
        >
          I'm a Company
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          {role === "user" ? "User" : "Company"} Login
        </h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            //value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            //value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
