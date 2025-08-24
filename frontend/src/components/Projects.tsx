import { useState } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';

// Component for technology tag
const TechTag = ({ tech }) => {
  return (
    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-opacity-30 mr-2 mb-2"
      style={{
        backgroundColor: getTechColor(tech),
        boxShadow: `0 0 5px ${getTechColor(tech)}`
      }}>
      {tech}
    </span>
  );
};

// Function to generate consistent colors for tech tags
const getTechColor = (tech) => {
  // Simple hash function to generate color from string
  const hash = Array.from(tech).reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Generate HSL color with high saturation and light
  return `hsl(${Math.abs(hash) % 360}, 80%, 65%)`;
};

// Project card component
const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="bg-black bg-opacity-80 rounded-xl overflow-hidden flex flex-col h-full shadow-lg shadow-purple-900/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Project image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image || '/images/projects/placeholder.webp'} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 mb-4 flex-1">{project.description}</p>
        
        <div className="mb-4">
          {project.stack.map((tech) => (
            <TechTag key={`${project.id}-${tech}`} tech={tech} />
          ))}
        </div>
        
        <div className="flex space-x-3">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
              GitHub
            </a>
          )}
          
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-pink-700 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const technologies = Array.from(
    new Set(projectsData.flatMap(project => project.stack))
  ).sort();
  
  const filteredProjects = filter === 'all' 
    ? projectsData
    : projectsData.filter(project => project.stack.includes(filter));
  
  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-xl max-w-7xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-6 text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Projects
      </motion.h2>
      
      {/* Technology filter */}
      <div className="mb-8 overflow-x-auto py-4">
        <div className="flex space-x-2 min-w-max">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
              ${filter === 'all' 
                ? 'bg-purple-700 text-white shadow-lg shadow-purple-500/50' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            All Projects
          </button>
          
          {technologies.map(tech => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${filter === tech 
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-500/50' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No projects found with this technology.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
