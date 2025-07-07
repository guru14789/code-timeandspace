import React from 'react';
import { motion } from 'framer-motion';
import { Code, BarChart3, TrendingUp, History, Activity } from 'lucide-react';

interface HeaderProps {
  activeView: 'editor' | 'metrics' | 'visualization' | 'history';
  onViewChange: (view: 'editor' | 'metrics' | 'visualization' | 'history') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'editor', label: 'Code Editor', icon: Code },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'visualization', label: 'Visualization', icon: TrendingUp },
    { id: 'history', label: 'History', icon: History }
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Code Complexity Visualizer</h1>
              <p className="text-sm text-gray-400">Real-time code analysis & metrics</p>
            </div>
          </motion.div>

          <nav className="flex space-x-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};