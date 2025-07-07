import React from 'react';
import { motion } from 'framer-motion';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3 mb-12 justify-center"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 capitalize relative overflow-hidden ${
            activeCategory === category
              ? 'bg-white text-black shadow-lg border border-gray-300'
              : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800 hover:border-gray-700'
          }`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-white rounded-2xl"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};