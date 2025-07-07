import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group bg-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-white/5 transition-all duration-500 border border-gray-800 hover:border-gray-700"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/30 transition-colors border border-white/30"
          >
            <ExternalLink className="h-4 w-4 text-white" />
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/30 transition-colors border border-white/30"
          >
            <Github className="h-4 w-4 text-white" />
          </motion.a>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="px-3 py-1 bg-white/80 text-black rounded-full text-sm font-medium capitalize backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
            {project.title}
          </h3>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ArrowRight className="h-5 w-5 text-white" />
          </motion.div>
        </div>
        
        <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};