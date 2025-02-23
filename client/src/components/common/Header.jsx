import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { userAutherContextObj } from '../../contexts/userAutherContext';
import logo from "../../assets/logo.jpg"
function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userAutherContextObj);
  const { isSignedIn, user, isLoaded } = useUser();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  async function handleSignOut() {
    await signOut();
    setCurrentUser(null);
    localStorage.removeItem('currentuser');
    navigate('/');
  }

  return (
    <>
      <nav className="bg-[#000000] shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="flex items-center">
                <span className="text-2xl font-bold text-white">
                  <img src={logo} alt="" style={{width:"50px"}}/>
                </span>
              </NavLink>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={toggleNavbar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
                aria-expanded={isExpanded}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isExpanded ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isExpanded ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-4">
              {!isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                        isActive ? 'text-black bg-white' : 'text-white bg-transparent hover:bg-gray-800'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/signin"
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                        isActive ? 'text-black bg-white' : 'text-white bg-transparent hover:bg-gray-800'
                      }`
                    }
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                        isActive ? 'text-black bg-white' : 'text-white bg-transparent hover:bg-gray-800'
                      }`
                    }
                  >
                    Sign Up
                  </NavLink>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="relative flex items-center">
                    <img
                      src={user.imageUrl}
                      alt={user.firstName}
                      className="h-10 w-10 rounded-full border-2 border-white "
                    />
                    <span className="ml-3 text-sm font-medium text-white">{user.firstName}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-105"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu backdrop */}
        <div 
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity md:hidden z-[999] ${
            isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleNavbar}
        />

        {/* Mobile menu panel */}
        <div 
          className={`fixed top-0 left-0 h-full w-64 bg-black/70 backdrop-blur-md transform transition-transform duration-300 ease-in-out md:hidden z-[1000] ${
            isExpanded ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-4 pt-16 pb-3 space-y-4">
            {!isSignedIn ? (
              <>
                <NavLink
                  to="/"
                  onClick={toggleNavbar}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-full text-base font-medium transition-all duration-200 ${
                      isActive ? 'text-black bg-white' : 'text-white hover:bg-white/10'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/signin"
                  onClick={toggleNavbar}
                  className={({ isActive }) =>
                    `no-underline block px-4 py-2 rounded-full text-base font-medium transition-all duration-200 ${
                      isActive ? 'text-black bg-white' : 'text-white hover:bg-white/10'
                    }`
                  }
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={toggleNavbar}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-full text-base font-medium transition-all duration-200  ${
                      isActive ? 'text-black bg-white' : 'text-white hover:bg-white/10'
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 px-4">
                  <img
                    src={user.imageUrl}
                    alt={user.firstName}
                    className="h-10 w-10 rounded-full border-2 border-white"
                  />
                  <span className="text-sm font-medium text-white">{user.firstName}</span>
                </div>
                {currentUser?.role && (
                  <span className="block px-4 py-1 text-xs font-bold text-white bg-white/20 rounded-full w-fit">
                    {currentUser.role}
                  </span>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    toggleNavbar();
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;