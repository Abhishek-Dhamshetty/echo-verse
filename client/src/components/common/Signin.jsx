import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import lapImage from '../.././assets/lap.jpeg';

function Signin() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left Side - Hero Section */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 relative overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"
            ></motion.div>
          </div>
        </div>
        
        {/* Main Image with Enhanced Parallax Effect */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-cover bg-center grayscale opacity-60 hover:opacity-70 transition-all duration-700"
          style={{ 
            backgroundImage: `url(${lapImage})`,
            backgroundPosition: '50% 50%'
          }}
          
        />

        {/* Content Overlay with Animated Elements */}
        <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
          <div className="space-y-6">
            <motion.div 
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:rotate-12 transition-transform duration-300"
            >
              <span className="text-black text-2xl font-bold">B</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome to<br />BlogApp
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl text-gray-300 max-w-md"
            >
              Join our community of writers and readers. Share your stories, ideas, and perspectives with the world.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="h-[2px] bg-white/30"
              ></motion.div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Trusted by millions</p>
            </div>
            <p className="text-sm text-gray-400">© 2025 BlogApp. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Sign In Form */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white px-4 md:px-8 lg:px-16 relative"
      >
        {/* Animated Top Pattern */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-full opacity-50"
        ></motion.div>
        
        <div className="w-full max-w-md space-y-4 relative mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-8 space-y-3"
          >
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <SignIn 
             
            />
          </motion.div>

          {/* Animated Bottom Pattern */}
          <motion.div 
            animate={{ 
              rotate: [0, -360],
            }}
            transition={{
              duration: 60,
              ease: "linear",
              repeat: Infinity,
            }}
            className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-50 to-gray-100 rounded-tr-full opacity-50 -z-10"
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signin;