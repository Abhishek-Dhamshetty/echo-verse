import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from '../../assets/logo.png';

function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [typewriterText, setTypewriterText] = useState('');
  const location = useLocation();
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const text = 'EchoVerse';
    let index = 0;
    let isDeleting = false;

    const typeWriterEffect = () => {
      setTypewriterText(text.slice(0, index));

      if (!isDeleting && index < text.length) {
        index++;
      } else if (isDeleting && index > 0) {
        index--;
      }

      if (index === text.length) {
        isDeleting = true;
        setTimeout(typeWriterEffect, 1000);
      } else if (index === 0) {
        isDeleting = false;
        setTimeout(typeWriterEffect, 1000);
      } else {
        setTimeout(typeWriterEffect, 250);
      }
    };

    typeWriterEffect();
  }, []);
  
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setDarkMode(!darkMode);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full h-15 z-50 shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">

          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" className="h-9 w-9" />
            <span className={`text-xl font-bold tracking-wider transition-all duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
              {typewriterText}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center ml-auto" style={{ gap: "20px" }}>
            <NavLink
              to="/"
              className={`nav-btn ${location.pathname === '/' ? 'active-btn' : ''}`}
            >
              Home
            </NavLink>

            {!isSignedIn ? (
              <>
                <NavLink to="/signin" className={`nav-btn ${location.pathname === '/signin' ? 'active-btn' : ''}`} style={{ gap: "20px" }}>
                  Sign In
                </NavLink>
                <NavLink to="/signup" className={`nav-btn ${location.pathname === '/signup' ? 'active-btn' : ''}`} style={{ gap: "20px" }}>
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2" style={{ gap: "20px" }}>
                  <img src={user.imageUrl} alt={user.firstName} className="h-9 w-9 rounded-full border-2 border-gray-600"  />
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`} >
                    {user.firstName}
                  </span>
                </div>
                <button onClick={handleSignOut} className="nav-btn bg-red-500 hover:bg-red-600 text-white" style={{ marginLeft: "20px" }}>
                  Sign Out
                </button>
              </div>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="theme-toggle">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
  .nav-btn {
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none; /* Underline removed */
    color: white;
    background: linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153));
    border-radius: 6px;
    transition: all 0.3s ease-in-out;
  }

  .nav-btn:hover {
    transform: scale(1.05);
  }

  .active-btn {
    background: linear-gradient(135deg, rgb(255, 182, 72), rgb(255, 94, 98));
    font-weight: bold;
    transform: scale(1.05);
  }
`}</style>

    </nav>
  );
}

export default Header;
