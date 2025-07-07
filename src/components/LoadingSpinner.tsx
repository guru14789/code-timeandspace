
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-800">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
      />
      <span className="text-sm text-gray-300">Analyzing...</span>
    </div>
  );
};
