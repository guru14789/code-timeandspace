
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, BarChart3, TrendingUp, Zap, Users, Shield } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      onClose();
    }
  }, [onClose]);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    onClose();
  };

  const features = [
    {
      icon: Code,
      title: 'Real-time Analysis',
      description: 'Get instant feedback on your code complexity as you type'
    },
    {
      icon: BarChart3,
      title: 'Detailed Metrics',
      description: 'View comprehensive metrics including Big O complexity'
    },
    {
      icon: TrendingUp,
      title: 'Visual Insights',
      description: 'Interactive charts and visualizations for better understanding'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with millions of users in mind'
    },
    {
      icon: Users,
      title: 'Developer Friendly',
      description: 'Built by developers, for developers worldwide'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your code never leaves your browser - 100% client-side'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-2xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative p-8">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>

              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <Code className="h-8 w-8 text-white" />
                </motion.div>
                
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome to Code Complexity Visualizer
                </h2>
                <p className="text-gray-400 text-lg">
                  The ultimate tool for analyzing and understanding your code's complexity
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700"
                  >
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <feature.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30 mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  🚀 Trusted by Millions of Developers
                </h3>
                <p className="text-gray-300">
                  Join developers worldwide who use our tool to write better, more efficient code. 
                  Your code analysis happens entirely in your browser - no data is sent to our servers.
                </p>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  Get Started - It's Free!
                </motion.button>
                <p className="text-xs text-gray-500 mt-2">
                  No account required • No installation needed • Works offline
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
