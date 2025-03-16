import { useContext, useEffect, useState } from 'react';
import { userAutherContextObj } from '../../contexts/userAutherContext';
import { useUser } from '@clerk/clerk-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";
import { motion } from 'framer-motion';

// Import images
import blogImage1 from "../../assets/ic-1.png";
import blogImage2 from "../../assets/ic-2.png";

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAutherContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  async function onSelectRole(e) {
    setError('');
    const selectedRole = e.target.value;
    const allowedAdminEmail = "abhishekdhamshetty@gmail.com"; // Your email
  
    if (selectedRole === 'admin' && currentUser.email !== allowedAdminEmail) {
      setError("Only the authorized user can be an admin.");
      return;
    }
  
    currentUser.role = selectedRole;
    let res = null;
  
    try {
      if (selectedRole === 'author') {
        res = await axios.post(`${BACKEND_URL}/author-api/author`, currentUser);
      } else if (selectedRole === 'user') {
        res = await axios.post(`${BACKEND_URL}/user-api/user`, currentUser);
      } else if (selectedRole === 'admin') {
        res = await axios.post(`${BACKEND_URL}/admin-api/admin`, currentUser);
      }
  
      let { message, payload } = res.data;
      if (message === selectedRole) {
        setCurrentUser({ ...currentUser, ...payload });
        localStorage.setItem("currentuser", JSON.stringify(payload));
      } else {
        setError(message);
      }
    } catch (err) {
      setError(err.message);
    }
  }
  

  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
        blocked:false
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && error.length === 0) {
      navigate(`/admin-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  // Carousel Data (Image + Text)
  const slides = [
    {
      image: blogImage1,
      title: "Write & Publish",
      text: "Craft engaging articles with ease and share your stories with the world.",
    },
    {
      image: blogImage2,
      title: "Connect with Readers",
      text: "Engage with your audience, build a following, and join a vibrant community.",
    },
  ];

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-poppins">
      
      {isSignedIn===false && <>
      {/* Infinite Gradient Background with Continuous Flow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ backgroundPositionX: ["0%", "200%", "0%"] }} // Moves back to start smoothly
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg, violet, blue, green)", // Your 3 colors
            backgroundSize: "300% 100%", // Ensures smooth transition
          }}
        />
      </div>

      {/* Main Content Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl w-full bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl rounded-lg p-8 flex flex-col items-center text-center font-montserrat"
      >
        {/* Welcome Text */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-extrabold text-white mb-4 tracking-wide font-inter"
        >
          <Typewriter
            options={{
              strings: ["Welcome to EchoVerse.."],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 50,
              cursor: "|",
            }}
          />
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-6 text-lg tracking-wide font-poppins"
        >
          <Typewriter
            options={{
              strings: ["Your platform to share stories, connect with readers, and explore diverse perspectives.."],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 50,
              cursor: "|",
            }}
          />
        </motion.p>

        {/* Image & Content Carousel (Each Slide Contains Image + Text) */}
        <div className="relative w-full max-w-lg mx-auto">
          {/* Image Slide */}
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].image}
            alt="Blog Preview"
            className="w-full h-64 object-cover rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-2">
            <button 
              onClick={prevSlide} 
              className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
            >
              ◀
            </button>
            <button 
              onClick={nextSlide} 
              className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Text Below Image (Changes with Carousel) */}
        <div className="mt-4">
          <motion.h3 
            key={slides[currentIndex].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-white tracking-wide font-montserrat"
          >
            {slides[currentIndex].title}
          </motion.h3>
          <motion.p 
            key={slides[currentIndex].text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-400 text-md tracking-wide font-poppins"
          >
            {slides[currentIndex].text}
          </motion.p>
        </div>

      </motion.div></>}
      {isSignedIn===true && <>
        
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl rounded-lg overflow-hidden"
          >
            <div className="p-8 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative inline-block"
              >
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-white/10 shadow-xl"
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-0 right-0 bg-white rounded-full border-2 border-black w-4 h-4"
                />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mt-4"
              >
                Welcome, {user.firstName}!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400"
              >
                {user.emailAddresses[0].emailAddress}
              </motion.p>
            </div>

            <div className="p-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white text-center mb-4">Choose Your Journey</h3>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-900/20 text-red-200 p-4 rounded mb-4 border border-red-500/20"
                >
                  {error}
                  <button 
                    onClick={() => setError("")} 
                    className="float-right text-sm font-bold text-red-300 hover:text-red-100"
                  >
                    Dismiss
                  </button>
                </motion.div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['admin', 'author', 'user'].map((role, index) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 p-4 rounded-lg text-center cursor-pointer hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <input
                      type="radio"
                      name="role"
                      id={role}
                      value={role}
                      className="hidden"
                      onChange={onSelectRole}
                    />
                    <label htmlFor={role} className="block">
                      <div className="text-3xl mb-2">
                        {role === 'admin' ? '🔒' : role === 'author' ? '✍️' : '👤'}
                      </div>
                      <h4 className="font-bold capitalize text-white">{role}</h4>
                      <p className="text-sm text-gray-400">
                        {role === 'admin' 
                          ? 'Manage the platform and maintain standards'
                          : role === 'author'
                          ? 'Create and publish articles'
                          : 'Explore articles and engage'
                        }
                      </p>
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 text-center text-sm text-gray-500"
            >
              Your role defines your interaction with the BlogVerse community.
            </motion.div>
          </motion.div>
        
</>}
    </div>
  );
}

export default Home;
