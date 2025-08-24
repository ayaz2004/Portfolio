import { motion } from 'framer-motion';

const achievementItems = [
  {
    id: 1,
    title: 'Winner – Mappls Appathon',
    description: 'Created ScrapMap, an innovative solution for waste management that visualizes scrap collection points and optimizes collection routes.',
    icon: '🏆',
    color: 'from-amber-500 to-yellow-300'
  },
  {
    id: 2,
    title: 'Solved 900+ Coding Problems',
    description: 'Consistently solved algorithm challenges on LeetCode, GeeksForGeeks, Codeforces, and other platforms to sharpen problem-solving skills.',
    icon: '💻',
    color: 'from-blue-500 to-cyan-300'
  },
  {
    id: 3,
    title: 'DeepLearning.AI Certifications',
    description: 'Completed specialized courses in Machine Learning and Deep Learning, focusing on neural networks and computer vision applications.',
    icon: '🧠',
    color: 'from-green-500 to-emerald-300'
  },
  {
    id: 4,
    title: 'NPTEL Certification',
    description: 'Successfully completed advanced courses in Data Structures and Algorithms with excellent performance.',
    icon: '📚',
    color: 'from-violet-500 to-purple-300'
  },
  {
    id: 5,
    title: 'Coding Ninjas Certification',
    description: 'Earned certification in Advanced Web Development, mastering modern frontend and backend technologies.',
    icon: '⚡',
    color: 'from-red-500 to-orange-300'
  }
];

const AchievementCard = ({ achievement, index }) => {
  return (
    <motion.div
      className="mb-8 flex items-start"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-3xl shadow-lg`}>
        {achievement.icon}
      </div>
      <div className="ml-6">
        <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
        <p className="text-gray-300">{achievement.description}</p>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-xl max-w-4xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-10 text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Achievements
      </motion.h2>
      
      <div className="space-y-6">
        {achievementItems.map((achievement, index) => (
          <AchievementCard 
            key={achievement.id} 
            achievement={achievement}
            index={index}
          />
        ))}
      </div>
      
      <motion.div 
        className="mt-12 p-6 border border-purple-500 rounded-lg bg-purple-900 bg-opacity-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-purple-300 mb-4">
          <span className="mr-2">🚀</span>
          Always Learning, Always Growing
        </h3>
        <p className="text-gray-300">
          Beyond formal achievements, I'm committed to continuous learning and staying updated with the
          latest technologies. I regularly participate in tech communities, contribute to open-source projects,
          and explore new frameworks and tools to expand my skillset.
        </p>
      </motion.div>
    </div>
  );
};

export default Achievements;
