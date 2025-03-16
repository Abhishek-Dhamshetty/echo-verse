import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Users, Shield } from "lucide-react";

function AdminProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-400 via-transparent to-blue-200 opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 mt-12" style={{ marginTop: "60px" }}>
        {/* Navigation Header */}
        <div className="flex justify-between items-center py-4 px-8 rounded-lg shadow-lg bg-gray-800/90 backdrop-blur-md border border-gray-700">
          <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto" style={{ marginLeft: "10px",background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))",color:"goldenrod" }}>
            <Shield className="w-7 h-7 text-blue-400 animate-bounce" />
            Admin Dashboard
          </h1>

          
        </div>

        {/* Outlet Container */}
        <div className="bg-gray-900/90 backdrop-blur-md rounded-xl p-8 shadow-lg mt-8 border border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
