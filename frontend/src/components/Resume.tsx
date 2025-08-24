import { useState } from 'react';
import { motion } from 'framer-motion';

const Resume = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumePath = '/AYAZ_NAZIR_Resume.pdf';
  
  const handleDownload = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = resumePath;
      link.download = 'AYAZ_NAZIR_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
    }, 800); // Simulated delay for download animation
  };
  
  const resumeCategories = [
    {
      title: 'Education',
      items: [
        {
          title: 'B.Tech in Computer Science',
          subtitle: 'Jamia Millia Islamia University',
          year: '2022-2026',
        //   description: 'Specialized in AI & ML, GPA: 8.15/10'
        }
      ]
    },
    {
      title: 'Experience',
      items: [
        {
          title: 'Full Stack Web Developer Intern',
          subtitle: 'Orinson Technologies Private Limited',
          year: 'Aug 2024 - Sept 2024',
          description: 'Developed full-stack web applications with React, Node.js and MongoDB'
        },
        // {
        //   title: 'ML Research Assistant',
        //   subtitle: 'University AI Lab',
        //   year: '2022',
        //   description: 'Implemented computer vision algorithms for object detection'
        // }
      ]
    },
    {
      title: 'Skills',
      items: [
        {
          title: 'Programming Languages',
          description: 'JavaScript, TypeScript, Python, C++'
        },
        {
          title: 'Frameworks & Libraries',
          description: 'React, Express.js, TensorFlow, Three.js'
        },
        {
          title: 'Tools & Platforms',
          description: 'Git, Docker, AWS, MongoDB'
        }
      ]
    }
  ];
  
  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-xl max-w-4xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-6 text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Resume
      </motion.h2>
      
      <div className="flex flex-col items-center mb-12">
        <motion.button
          className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-8 rounded-lg font-bold text-lg shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50"
          onClick={handleDownload}
          disabled={isDownloading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isDownloading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading...
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download Resume
            </span>
          )}
        </motion.button>
        <p className="text-gray-400 mt-3 text-sm">
          PDF format, optimized for ATS systems
        </p>
      </div>
      
      {/* Resume Mind Map Visualization */}
      <div className="rounded-xl bg-gray-900 p-6 shadow-inner">
        <h3 className="text-xl font-bold mb-6 text-center text-gray-300">Resume Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumeCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-gray-800 rounded-lg p-5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-cyan-400 mb-4 border-b border-gray-700 pb-2">
                {category.title}
              </h4>
              
              <div className="space-y-4">
                {category.items.map((item, idx) => (
                  <div key={idx} className="text-gray-300">
                    <div className="font-medium">{item.title}</div>
                    {item.subtitle && (
                      <div className="text-sm text-gray-400">{item.subtitle}</div>
                    )}
                    {item.year && (
                      <div className="text-xs text-cyan-500 mt-1">{item.year}</div>
                    )}
                    <div className="text-sm mt-1 text-gray-400">{item.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-8 text-gray-400">
        <p>For more detailed information, please download the complete resume</p>
      </div>
    </div>
  );
};

export default Resume;
