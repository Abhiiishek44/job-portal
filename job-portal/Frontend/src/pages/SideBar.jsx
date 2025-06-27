import React from "react";
import {
  FaUserPlus,
  FaBriefcase,
  FaLightbulb,
  FaLandmark,
  FaUsers,
  FaTrophy,
  FaHeart,
  FaBookmark,
  FaHistory,
  FaChalkboardTeacher,
} from "react-icons/fa";

// MenuItem component (customizable per design system)
const MenuItem = ({ icon, label, active, badge }) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${
        active ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
};

const Sidebar = () => {
  return (
  <div className="w-72 h-204 overflow-y-auto bg-white shadow-md rounded-lg p-6">
  <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard</h2>

  <div className="space-y-2 text-sm text-gray-800">
    <MenuItem icon={<FaUserPlus />} label="Registrations/Applications" />
    <MenuItem icon={<FaBriefcase />} label="My Jobs" active />
    <MenuItem icon={<FaLightbulb />} label="My Opportunities" />
    <MenuItem icon={<FaLandmark />} label="My Festivals" />
    <MenuItem icon={<FaUsers />} label="Referrals" />
    <MenuItem icon={<FaUserPlus />} label="My Rounds" badge="New" />
    <MenuItem icon={<FaTrophy />} label="Unstop Awards Nominations" />
    <MenuItem icon={<FaHeart />} label="Watchlist" />
    <MenuItem icon={<FaBookmark />} label="Bookmarked Questions" />
    <MenuItem icon={<FaHistory />} label="Recently Viewed" />
    <MenuItem icon={<FaChalkboardTeacher />} label="Mentor Sessions" />
  </div>
</div>

  );
};

export default Sidebar;
