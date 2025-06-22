import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  const [company, setCompany] = useState(null); // 👈 for profile
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
  });
  const [jobs, setJobs] = useState([]);

  // Assume company ID is stored in localStorage after login
  const companyId = localStorage.getItem("loggedInId");

  // ✅ Fetch company profile
  const fetchCompanyProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/companies/getCompanyById/${companyId}`
      );
      setCompany(res.data.company);
    } catch (err) {
      console.error("Error fetching company profile:", err);
    }
  };

  // ✅ Get jobs posted by company
const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/jobs/companyJob/${companyId}`
      );
      setJobs(res.data.jobs);
    } catch (err) {
      console.error("Fetch jobs error:", err);
    }
  };

  // 🔁 On load
  useEffect(() => {
    fetchCompanyProfile();
    if (activeTab === "jobs") fetchJobs();
  }, [activeTab]);

  // ✅ Handle input changes
const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit new job
const handleSubmit = async (e) => {
         e.preventDefault();
    const payLoad = { jobData, companyId };
    console.log("Job Data:", payLoad);
    try {
      await axios.post("http://localhost:4000/api/jobs/createJob", {
        jobData,
        companyId,
      });
      alert("Job posted successfully!");
      setJobData({
        title: "",
        description: "",
        location: "",
        salary: "",
        skills: "",
      });
      fetchJobs();
    } catch (err) {
      console.error("Job post error:", err);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Company Dashboard
      </h1>

      {/* ✅ Company Profile Card */}
      {company && (
        <div className="bg-white p-4 rounded shadow-md max-w-xl mx-auto mb-6">
          <h2 className="text-xl font-bold text-gray-700">Company Profile</h2>
          <p className="mt-2">
            <strong>Company Name:</strong> {company.companyName}
          </p>
          <p>
            <strong>Email:</strong> {company.email}
          </p>
          <p>
            <strong>Location:</strong> {company.location}
          </p>
        </div>
      )}

      {/* ✅ Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded ${
            activeTab === "create"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Create Job
        </button>
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 rounded ${
            activeTab === "jobs" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          View Jobs
        </button>
      </div>

      {/* ✅ Create Job Form */}
      {activeTab === "create" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md max-w-xl mx-auto"
        >
          <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={jobData.salary}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={jobData.skills}
            onChange={handleChange}
            required
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Post Job
          </button>
        </form>
      )}

      {/* ✅ Job List */}
      {activeTab === "jobs" && (
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-5xl mx-auto mt-6 transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📄 Jobs You Posted
          </h2>

          {jobs.length === 0 ? (
            <p className="text-center text-gray-500">
              🚫 No jobs posted yet. Start hiring today!
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
                >
                  <h3 className="text-xl font-semibold text-blue-600">
                    {job.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{job.description}</p>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">📍 Location:</span>{" "}
                      {job.location}
                    </p>
                    <p>
                      <span className="font-medium">💰 Salary:</span>{" "}
                      {job.salary}
                    </p>
                    <p>
                      <span className="font-medium">🛠 Skills:</span>{" "}
                      {job.skills}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
