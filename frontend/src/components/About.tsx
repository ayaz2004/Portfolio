import { motion } from 'framer-motion';
import userConfig from '../data/userConfig';

const About = () => {
  return (
    <motion.div 
      className="bg-black bg-opacity-80 p-8 rounded-xl max-w-3xl mx-auto text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        About Me
      </motion.h2>
      
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-48 overflow-hidden rounded-full border-4 border-pink-500 shadow-lg shadow-pink-500/50">
            <img 
              src="/images/profile.jpeg" 
              alt="Ayaz Nazir" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2 text-pink-400">{userConfig.name.first} {userConfig.name.last}</h3>
            <p className="text-lg mb-4">
              {userConfig.title}
            </p>
            <p className="text-gray-300">
              I'm a passionate developer with expertise in modern web technologies and machine learning.
              I love building intuitive, high-performance applications that solve real-world problems.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Education</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-cyan-500 pl-4">
              <h4 className="text-xl font-medium">B.Tech in Computer Science</h4>
              <p className="text-gray-400">Jamia Millia Islamia University, 2022-2026</p>
              {/* <p className="text-gray-300 mt-2">
                Specialized in Artificial Intelligence and Machine Learning with a focus on computer vision and web development.
              </p> */}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">Fun Facts</h3>
          <ul className="space-y-2 list-disc list-inside text-gray-300">
            <li>Solved 900+ coding problems across LeetCode, GeeksForGeeks, and Codeforces</li>
            <li>Won the Mappls Appathon hackathon with ScrapMap project</li>
            <li>Love to explore new technologies and build practical applications</li>
            <li>Passionate about sustainable technology and AI ethics</li>
            <li>Enjoy learning new programming concepts</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
