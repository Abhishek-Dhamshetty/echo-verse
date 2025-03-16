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
    <div className="bg-blue-200 min-h-screen text-gray-200 p-6" style={{marginTop:"50px"}}>
      {userStatus ? (
        <div className="text-center text-red-400 text-2xl font-semibold">
          Your account is blocked. Please contact the admin.
        </div>
      ) : (
        <>
          <nav className="flex justify-center space-x-8  pb-4 pt-4" >
              <NavLink
              to="articles"
              className="px-4 py-2 text-lg font-semibold rounded-lg transition-all hover:text-white mx-3"
              style={({ isActive }) => ({
                background: isActive 
                  ? "linear-gradient(135deg, rgb(255, 215, 0), rgb(218, 165, 32), rgb(184, 134, 11))"  // Gold Gradient when Active
                  : "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))",  // Default Gradient
                color: isActive ? "white" : "gold", // Active Text → Gold, Default → White
                textDecoration: "none",
              })}
            >
              Articles
            </NavLink>

            <NavLink
              to="article"
              className="px-4 py-2 text-lg font-semibold rounded-lg transition-all hover:text-white"
              style={({ isActive }) => ({
                background: isActive 
                  ? "linear-gradient(135deg, rgb(255, 215, 0), rgb(218, 165, 32), rgb(184, 134, 11))"  // Gold Gradient when Active
                  : "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))",  // Default Gradient
                color: isActive ? "white" : "gold", // Active Text → Gold, Default → White
                textDecoration: "none",
              })}>
              Add New Article
            </NavLink>
          </nav>
          <div className="mt-6 p-2">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default AuthorProfile;