import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
const ProfileCard = () => {
  const [name, setName] = useState("");
  const [username] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [project, setProject] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const handleSkillChange = (e) => {
    setSkills(e.target.value.split(",").map((skill) => skill.trim()));
  };

const handleSave = async () => {
  setIsEditing(false);
  const userId = localStorage.getItem("loggedInId");

  let resume = resumeUrl; // use existing resumeUrl by default
   // Upload new resume if file is selected
  if (file) {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", userId);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/uploadResume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      resume = `http://localhost:4000/${res.data.filePath.replace(/\\/g, "/")}`;
      setResumeUrl(resume); // update state too (not required immediately)
      alert("Resume uploaded successfully!");
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("Upload failed!");
      return;
    }
  }
    // Save profile data to backend
  try {
    console.log("Using resume URL:", resume);
    await axios.post(`http://localhost:4000/api/userProfile/setProfile`, {
      userId,
      name,
      about,
      skills,
      experience,
      education,
      project,
      resumeUrl: resume, // ✅ use local resume variable
    });
    alert("Profile saved successfully!");
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Profile save failed!");
  }
};

  // Fetch user data from backend or localStorage
  const featchUserData = async () => {
    const localId = localStorage.getItem("loggedInId");
    try {
      axios
        .get(`http://localhost:4000/api/userProfile/getProfile/${localId}`)
        .then((response) => {
          const data = response.data.profile;
          setName(data.name);
          setAbout(data.about);
          setSkills(data.skills);
          setExperience(data.experience);
          setEducation(data.education);
          setProject(data.project);
          setResumeUrl(data.resumeUrl);
        });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
     
    featchUserData();
  }, []);

  // Resume upload functionality

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleUpload = async () => {
   
  // };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl absolute right-0 w-full mx-auto">
      <div className="flex items-center mb-4 bg-gray-100 p-4 rounded-lg">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-500">{username}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">About</h3>
        <p className="text-gray-700">{about}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Experience</h3>
        <p className="text-gray-700">{experience}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <p className="text-gray-700">{education}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Projects</h3>
        <p className="text-gray-700">{project}</p>
      </div>
      {/* //resume upload */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Resume</h3>
        {resumeUrl ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Resume
          </a>
        ) : (
          <p className="text-gray-700">No resume uploaded yet.</p>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-b-none w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto  ">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <label className="block mb-2 text-sm font-semibold">Name</label>
            <input
              className="w-full border px-4 py-2 rounded mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block mb-2 text-sm font-semibold">About</label>
            <textarea
              className="w-full border px-4 py-2 rounded mb-4"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <label className="block mb-2 text-sm font-semibold">
              Skills (comma separated)
            </label>
            <input
              className="w-full border px-4 py-2 rounded mb-4"
              value={skills.join(", ")}
              onChange={handleSkillChange}
            />

            <label className="block mb-2 text-sm font-semibold">
              Experience
            </label>
            <input
              className="w-full border px-4 py-2 rounded mb-4"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />

            <label className="block mb-2 text-sm font-semibold">
              Education
            </label>
            <input
              className="w-full border px-4 py-2 rounded mb-4"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />

            <label className="block mb-2 text-sm font-semibold">Project</label>
            <input
              className="w-full border px-4 py-2 rounded mb-4"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />

            <form action="/upload" method="POST" encType="multipart/form-data">
              <label className="block mb-2 text-sm font-semibold">
                Resume upload
              </label>
              <input type="file" name="resume" onChange={handleChange} />
            </form>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
