import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Brain from './components/Brain';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import SplashScreen from './components/SplashScreen';
import CloseButton from './components/CloseButton';

// Configuration
import userConfig from './data/userConfig';

export default function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Handle section selection from Brain component
  const handleSelectSection = (sectionId: string) => {
    // If clicking the same section, toggle content visibility
    if (activeSection === sectionId) {
      setShowContent(!showContent);
      return;
    }
    
    // If changing sections
    if (showContent) {
      // First hide current content
      setShowContent(false);
      // Then change section after animation completes
      setTimeout(() => {
        setActiveSection(sectionId);
        setShowContent(true);
      }, 300);
    } else {
      // Directly change and show if content is already hidden
      setActiveSection(sectionId);
      setShowContent(true);
    }
  };

  // Close the current section
  const handleCloseSection = () => {
    setShowContent(false);
  };

  // Auto-select "about" section after splash screen
  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setActiveSection('about');
        setShowContent(true);
      }, 1000); // Delay for the brain to become visible

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Render the active section component
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'achievements':
        return <Achievements />;
      case 'resume':
        return <Resume />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen 
            onComplete={handleSplashComplete} 
            name={userConfig.name}
          />
        )}
      </AnimatePresence>

      {/* Background particles/stars effect */}
      <div className="absolute inset-0 z-0">
        <div className="stars"></div>
      </div>
      
      {/* 3D Brain visualization */}
      {!showSplash && (
        <Brain 
          onSelectSection={handleSelectSection} 
          activeSection={activeSection} 
        />
      )}

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={activeSection}
            className="absolute inset-0 flex items-center justify-center z-10 p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pointer-events-auto max-h-[90vh] overflow-y-auto w-full relative">
              {/* Close button */}
              <CloseButton onClick={handleCloseSection} />
              
              {renderActiveSection()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating ChatBot - only show after splash */}
      {!showSplash && <ChatBot />}
    </div>
  );
}
