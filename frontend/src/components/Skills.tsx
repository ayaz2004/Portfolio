import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import skillsData from '../data/skills.json';

const SkillNode = ({ skill, index, total, radius = 150, active, onHover }) => {
  // Calculate position in a circle
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return (
    <motion.div
      className={`absolute cursor-pointer transition-all duration-300 transform ${
        active ? 'z-10 scale-110' : 'z-0 scale-100'
      }`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ 
          backgroundColor: skill.color,
          boxShadow: `0 0 15px ${skill.color}`
        }}
      >
        <span className="text-xs font-bold text-black">
          {skill.level}
        </span>
      </div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
        <p className="text-white text-sm font-medium whitespace-nowrap">
          {skill.name}
        </p>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ category, skills, activeSkill, setActiveSkill }) => {
  return (
    <motion.div 
      className="mb-12 relative h-[400px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-cyan-400">
        {category}
      </h3>
      
      <div className="relative w-full h-[300px]">
        {skills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            index={index}
            total={skills.length}
            active={activeSkill === skill.name}
            onHover={setActiveSkill}
          />
        ))}
        
        {/* Center node */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-10 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">{category}</span>
          </div>
        </div>
        
        {/* Connecting lines */}
        {skills.map((skill, index) => (
          <svg key={`line-${skill.name}`} className="absolute left-0 top-0 w-full h-full z-0 pointer-events-none">
            <line
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${Math.cos((index / skills.length) * Math.PI * 2) * 150}px)`}
              y2={`calc(50% + ${Math.sin((index / skills.length) * Math.PI * 2) * 150}px)`}
              stroke={activeSkill === skill.name ? skill.color : "#ffffff33"}
              strokeWidth={activeSkill === skill.name ? "2" : "1"}
            />
          </svg>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  
  // Simulated logic for related projects based on skill hover
  useEffect(() => {
    if (activeSkill) {
      // In a real app, you'd look up projects that use this skill
      // This is just placeholder logic
      const delay = setTimeout(() => {
        setRelatedProjects([
          { name: "Project that uses " + activeSkill, link: "#" },
          { name: "Another " + activeSkill + " project", link: "#" }
        ]);
      }, 300);
      
      return () => clearTimeout(delay);
    } else {
      setRelatedProjects([]);
    }
  }, [activeSkill]);

  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-xl max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-6 text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Skills
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category) => (
          <SkillCategory
            key={category.category}
            category={category.category}
            skills={category.skills}
            activeSkill={activeSkill}
            setActiveSkill={setActiveSkill}
          />
        ))}
      </div>
      
      {/* Related projects section */}
      <motion.div
        className="mt-8"
        animate={{ 
          height: relatedProjects.length ? 'auto' : '0px',
          opacity: relatedProjects.length ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {relatedProjects.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-purple-400 mb-3">
              Projects using {activeSkill}:
            </h3>
            <ul className="space-y-2">
              {relatedProjects.map((project, index) => (
                <motion.li 
                  key={index}
                  className="text-white hover:text-purple-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a href={project.link}>{project.name}</a>
                </motion.li>
              ))}
            </ul>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Skills;
