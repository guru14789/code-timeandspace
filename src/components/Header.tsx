
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, BarChart3, TrendingUp, History, Activity, Menu, X, Github, Star } from 'lucide-react';
import logo from "./logo.png";

interface HeaderProps {
  activeView: 'editor' | 'metrics' | 'visualization' | 'history';
  onViewChange: (view: 'editor' | 'metrics' | 'visualization' | 'history') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onViewChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'editor', label: 'Code Editor', icon: Code },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'visualization', label: 'Visualization', icon: TrendingUp },
    { id: 'history', label: 'History', icon: History }
  ] as const;

  const handleNavClick = (viewId: typeof activeView) => {
    onViewChange(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-br-500 to-br-600 rounded-xl flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-white">Code Complexity Visualizer</h1>
              <p className="text-xs sm:text-sm text-gray-400">Trusted by millions of developers</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-white">CCV</h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* GitHub Star Button */}
            <motion.a
              href="https://github.com/your-username/code-complexity-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
            >
              <Github className="h-4 w-4 text-gray-300" />
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Star</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-400" />
              ) : (
                <Menu className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4"
            >
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
