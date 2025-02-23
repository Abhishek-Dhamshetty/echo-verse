import { useContext, useEffect, useState } from 'react';
import { userAutherContextObj } from '../../contexts/userAutherContext';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";
import { motion } from 'framer-motion';
import handwriting from "../../assets/handwriting.jpg"
import  book from "../../assets/bookspects.jpg"
function Home() {
  const { currentUser, setCurrentUser } = useContext(userAutherContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // Existing logic for onSelectRole remains the same
  async function onSelectRole(e) {
    setError('');
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post(`${BACKEND_URL}/author-api/author`, currentUser);
        let { message, payload } = res.data;
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'user') {
        res = await axios.post(`${BACKEND_URL}/user-api/user`, currentUser);
        let { message, payload } = res.data;
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'admin') {
        res = await axios.post(`${BACKEND_URL}/admin-api/admin`, currentUser);
        let { message, payload } = res.data;
        if (message === 'admin') {
          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
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

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
        />
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-full h-full border border-white/5 rounded-full"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-1/4 w-full h-full border border-white/10 rounded-full"
        />
      </div>

      <div className="max-w-4xl w-full px-4 relative z-10">
        {isSignedIn === false && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl rounded-lg overflow-hidden"
          >
            <div className="p-8 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white mb-4"
              >
                <Typewriter
                  options={{
                    strings: ["Welcome to BlogApp"],
                    autoStart: true,
                    loop: true,
                    delay: 50, // Adjusted typing speed
                    deleteSpeed: 50, // Speed at which text is erased
                    cursor: "|",
                  }}
                />
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 mb-6"
              >
                <Typewriter
                  options={{
                    strings: ["Your platform to share stories, connect with readers, and explore diverse perspectives."],
                    autoStart: true,
                    loop: true,
                    delay: 50, // Adjusted typing speed
                    deleteSpeed: 50, // Speed at which text is erased
                    cursor: "|",
                  }}
                />
                
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <img 
                    src={handwriting}
                    alt="✍️" 
                    className="rounded-md mb-4 opacity-80"
                  />
                  <h3 className="font-semibold text-lg text-white">Write & Publish</h3>
                  <p className="text-sm text-gray-400">Craft engaging articles with ease and share your stories with the world.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <img 
                    src={book}
                    alt="📖" 
                    className="rounded-md mb-4 opacity-80"
                  />
                  <h3 className="font-semibold text-lg text-white">Connect with Readers</h3>
                  <p className="text-sm text-gray-400">Engage with your audience, build a following, and join a vibrant community.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {isSignedIn === true && (
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
        )}
      </div>
    </div>
  );
}

export default Home;