
import React from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AnalysisHistory } from '../types';

interface HistoryPanelProps {
  history: AnalysisHistory[];
  onClearHistory: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClearHistory }) => {
  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-red-300" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-green-300" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getComplexityColor = (complexity: number) => {
    if (complexity <= 5) return 'text-green-300';
    if (complexity <= 10) return 'text-yellow-300';
    return 'text-red-300';
  };

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-8 h-full flex items-center justify-center"
      >
        <div className="text-center">
          <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Analysis History</h3>
          <p className="text-gray-400">Your analysis history will appear here as you work</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 h-full flex flex-col"
    >
      <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700">
              <History className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Analysis History</h3>
              <p className="text-sm text-gray-400">{history.length} analysis sessions</p>
            </div>
          </div>
          
          <motion.button
            onClick={onClearHistory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-gray-900 to-gray-800 text-red-300 rounded-lg hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700 transition-colors border border-gray-700"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear History</span>
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {history.map((entry, index) => {
            const previousEntry = history[index + 1];
            
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {entry.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {entry.codeLength} characters
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Complexity</span>
                      {previousEntry && getTrendIcon(
                        entry.metrics.cyclomaticComplexity,
                        previousEntry.metrics.cyclomaticComplexity
                      )}
                    </div>
                    <div className={`text-lg font-bold ${getComplexityColor(entry.metrics.cyclomaticComplexity)}`}>
                      {entry.metrics.cyclomaticComplexity}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Maintainability</span>
                      {previousEntry && getTrendIcon(
                        entry.metrics.maintainabilityIndex,
                        previousEntry.metrics.maintainabilityIndex
                      )}
                    </div>
                    <div className="text-lg font-bold text-blue-300">
                      {entry.metrics.maintainabilityIndex}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Lines</span>
                      {previousEntry && getTrendIcon(
                        entry.metrics.linesOfCode,
                        previousEntry.metrics.linesOfCode
                      )}
                    </div>
                    <div className="text-lg font-bold text-purple-300">
                      {entry.metrics.linesOfCode}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Code Smells</span>
                      {previousEntry && getTrendIcon(
                        entry.metrics.codeSmells.length,
                        previousEntry.metrics.codeSmells.length
                      )}
                    </div>
                    <div className="text-lg font-bold text-yellow-300">
                      {entry.metrics.codeSmells.length}
                    </div>
                  </div>
                </div>

                {entry.metrics.functions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="text-xs text-gray-400 mb-2">
                      Functions: {entry.metrics.functions.length}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.metrics.functions.slice(0, 5).map((func, funcIndex) => (
                        <span
                          key={funcIndex}
                          className="px-2 py-1 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 text-xs rounded border border-gray-700"
                        >
                          {func.name} ({func.complexity})
                        </span>
                      ))}
                      {entry.metrics.functions.length > 5 && (
                        <span className="px-2 py-1 bg-gradient-to-br from-gray-900 to-gray-800 text-xs text-gray-400 rounded border border-gray-700">
                          +{entry.metrics.functions.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
