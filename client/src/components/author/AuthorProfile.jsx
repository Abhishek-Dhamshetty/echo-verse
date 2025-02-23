import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AuthorProfile() {
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
    if (currentUser) {
      setUserStatus(currentUser.blocked);
    }
  }, []);

  if (userStatus === null) {
    return <div className="text-center text-gray-300 text-xl">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-6">
      {userStatus ? (
        <div className="text-center text-red-400 text-2xl font-semibold">
          Your account is blocked. Please contact the admin.
        </div>
      ) : (
        <>
          <nav className="flex justify-center space-x-8 border-b border-gray-700 pb-4">
            <NavLink
              to="articles"
              className={({ isActive }) =>
                `px-4 py-2 text-lg font-semibold rounded-lg transition-all ${
                  isActive ? "bg-white-600 text-white" : "text-white-300 hover:text-white"
                }`
              }
            >
              Articles
            </NavLink>
            <NavLink
              to="article"
              className={({ isActive }) =>
                `px-4 py-2 text-lg font-semibold rounded-lg transition-all ${
                  isActive ? "bg-white-600 text-white" : "text-black-300 hover:text-white"
                }`
              }
            >
              Add New Article
            </NavLink>
          </nav>
          <div className="mt-6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default AuthorProfile;