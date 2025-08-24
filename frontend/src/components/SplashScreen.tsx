import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
  name: {
    first: string;
    last: string;
  };
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, name }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3500); // Animation duration
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (animationComplete) {
      // Trigger the callback after exit animation is complete
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      
      return () => clearTimeout(exitTimer);
    }
  }, [animationComplete, onComplete]);

  // Split letters for individual animation
  const firstNameLetters = name.first.split('');
  const lastNameLetters = name.last.split('');
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04 * i
      }
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };
  
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: -5,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={animationComplete ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 blur-3xl rounded-full"
          initial={{ backgroundColor: "#3b0764", scale: 0.4, opacity: 0 }}
          animate={{ 
            backgroundColor: ["#3b0764", "#4c1d95", "#7e22ce", "#a855f7", "#c084fc"],
            scale: [0.4, 1.2, 1],
            opacity: [0, 0.5, 0.2]
          }}
          transition={{ 
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.4, 0.8, 0.9, 1]
          }}
        />
        
        {/* First name */}
        <motion.div 
          className="text-7xl md:text-9xl font-bold text-center relative z-10 mb-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {firstNameLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
              variants={child}
              style={{ textShadow: "0 0 10px rgba(255, 65, 255, 0.7)" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Last name */}
        <motion.div 
          className="text-7xl md:text-9xl font-bold text-center relative z-10"
          variants={container}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {lastNameLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500"
              variants={child}
              style={{ textShadow: "0 0 10px rgba(65, 155, 255, 0.7)" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.p
          className="text-white text-center text-xl mt-8 opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
