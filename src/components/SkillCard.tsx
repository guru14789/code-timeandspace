import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const IconComponent = LucideIcons[skill.icon as keyof typeof LucideIcons] as React.ComponentType<any>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group bg-gray-900 rounded-3xl p-6 shadow-2xl hover:shadow-white/5 transition-all duration-500 border border-gray-800 hover:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="p-3 bg-gray-800 rounded-xl border border-gray-700 group-hover:bg-gray-700 transition-all duration-300"
            whileHover={{ rotate: 5 }}
          >
            <IconComponent className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h3 className="font-bold text-white text-lg">{skill.name}</h3>
            <p className="text-sm text-gray-400 capitalize">{skill.category}</p>
          </div>
        </div>
        <motion.span 
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-800 rounded-full h-3 border border-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ delay: index * 0.1 + 0.5, duration: 1.5, ease: "easeOut" }}
            className="bg-white h-3 rounded-full relative overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
            />
          </motion.div>
        </div>
        
        {/* Skill Level Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 1 }}
          className="absolute -top-8 bg-gray-800 px-2 py-1 rounded-lg text-xs text-white border border-gray-700"
          style={{ left: `${skill.level}%`, transform: 'translateX(-50%)' }}
        >
          {skill.level}%
        </motion.div>
      </div>
    </motion.div>
  );
};