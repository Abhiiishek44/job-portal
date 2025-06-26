
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserJobsView = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/jobs/getAllJobs");
      setJobs(res.data.jobs); // assuming your backend returns { jobs: [...] }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🔍 Available Job Listings
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available right now.</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-700">
                💼 {job.title}
              </h3>
              <p className="text-gray-700">🏢 Company: {job.companyName}</p>
              <p className="text-gray-700">📍 Location: {job.location}</p>
              <p className="text-gray-700">🕒 Posted: {job.postedDate || "Recently"}</p>
              <p className="text-gray-700 mt-2">
                📝 <strong>Description:</strong> {job.description}
              </p>

              <a
                href={job.applyLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserJobsView;
