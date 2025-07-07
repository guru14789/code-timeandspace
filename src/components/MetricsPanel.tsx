import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, XCircle, Info, Clock, HardDrive, Zap, Target } from 'lucide-react';
import { CodeMetrics } from '../types';

interface MetricsPanelProps {
  metrics: CodeMetrics | null;
  isAnalyzing: boolean;
  fullView?: boolean;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, isAnalyzing, fullView = false }) => {
  const getComplexityColor = (complexity: number) => {
    if (complexity <= 5) return 'text-green-400';
    if (complexity <= 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getComplexityBg = (complexity: number) => {
    if (complexity <= 5) return 'bg-green-500/20 border-green-500/30';
    if (complexity <= 10) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getBigOColor = (bigO: string) => {
    if (bigO.includes('1')) return 'text-green-400';
    if (bigO.includes('log') || bigO.includes('n)')) return 'text-blue-400';
    if (bigO.includes('n²') || bigO.includes('n^2')) return 'text-yellow-400';
    if (bigO.includes('2^n') || bigO.includes('n!')) return 'text-red-400';
    return 'text-gray-400';
  };

  const getBigOBg = (bigO: string) => {
    if (bigO.includes('1')) return 'bg-green-500/20 border-green-500/30';
    if (bigO.includes('log') || bigO.includes('n)')) return 'bg-blue-500/20 border-blue-500/30';
    if (bigO.includes('n²') || bigO.includes('n^2')) return 'bg-yellow-500/20 border-yellow-500/30';
    if (bigO.includes('2^n') || bigO.includes('n!')) return 'bg-red-500/20 border-red-500/30';
    return 'bg-gray-500/20 border-gray-500/30';
  };

  const getMaintainabilityColor = (index: number) => {
    if (index >= 80) return 'text-green-400';
    if (index >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!metrics) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-900 rounded-2xl border border-gray-800 p-8 h-full flex items-center justify-center"
      >
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Analysis Yet</h3>
          <p className="text-gray-500">Start typing code to see real-time metrics</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden h-full flex flex-col ${fullView ? 'p-6' : ''}`}
    >
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Code Metrics & Complexity Analysis</h3>
            <p className="text-sm text-gray-400">Real-time analysis with Big O notation</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Time & Space Complexity */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-4 rounded-xl border ${getBigOBg(metrics.timeComplexity.bigO)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Time Complexity</span>
              </div>
              <Info className="h-4 w-4 text-gray-500" />
            </div>
            <div className={`text-2xl font-bold ${getBigOColor(metrics.timeComplexity.bigO)}`}>
              {metrics.timeComplexity.bigO}
            </div>
            <div className="text-xs text-gray-500 mt-1">{metrics.timeComplexity.explanation}</div>
            <div className="text-xs text-gray-600 mt-1">
              Confidence: {Math.round(metrics.timeComplexity.confidence * 100)}%
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-4 rounded-xl border ${getBigOBg(metrics.spaceComplexity.bigO)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Space Complexity</span>
              </div>
              <Info className="h-4 w-4 text-gray-500" />
            </div>
            <div className={`text-2xl font-bold ${getBigOColor(metrics.spaceComplexity.bigO)}`}>
              {metrics.spaceComplexity.bigO}
            </div>
            <div className="text-xs text-gray-500 mt-1">{metrics.spaceComplexity.explanation}</div>
            <div className="text-xs text-gray-600 mt-1">
              Confidence: {Math.round(metrics.spaceComplexity.confidence * 100)}%
            </div>
          </motion.div>
        </div>

        {/* Complexity Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
            <Target className="h-4 w-4 text-blue-400" />
            <span>Complexity Analysis</span>
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Best Case</div>
              <div className={`text-lg font-bold ${getBigOColor(metrics.timeComplexity.bestCase)}`}>
                {metrics.timeComplexity.bestCase}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Average Case</div>
              <div className={`text-lg font-bold ${getBigOColor(metrics.timeComplexity.averageCase)}`}>
                {metrics.timeComplexity.averageCase}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Worst Case</div>
              <div className={`text-lg font-bold ${getBigOColor(metrics.timeComplexity.worstCase)}`}>
                {metrics.timeComplexity.worstCase}
              </div>
            </div>
          </div>
          {metrics.timeComplexity.factors.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-600">
              <div className="text-xs text-gray-400 mb-2">Complexity Factors:</div>
              <div className="flex flex-wrap gap-1">
                {metrics.timeComplexity.factors.map((factor, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Core Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-4 rounded-xl border ${getComplexityBg(metrics.cyclomaticComplexity)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Cyclomatic Complexity</span>
              <Info className="h-4 w-4 text-gray-500" />
            </div>
            <div className={`text-2xl font-bold ${getComplexityColor(metrics.cyclomaticComplexity)}`}>
              {metrics.cyclomaticComplexity}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics.cyclomaticComplexity <= 5 ? 'Low' : metrics.cyclomaticComplexity <= 10 ? 'Medium' : 'High'} complexity
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Lines of Code</span>
              <Info className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-blue-400">{metrics.linesOfCode}</div>
            <div className="text-xs text-gray-500 mt-1">Total lines</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 bg-gray-800 border border-gray-700 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Maintainability</span>
              <Info className="h-4 w-4 text-gray-500" />
            </div>
            <div className={`text-2xl font-bold ${getMaintainabilityColor(metrics.maintainabilityIndex)}`}>
              {metrics.maintainabilityIndex}
            </div>
            <div className="text-xs text-gray-500 mt-1">Index score</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-4 bg-gray-800 border border-gray-700 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Cognitive Complexity</span>
              <Info className="h-4 w-4 text-gray-500" />
            </div>
            <div className={`text-2xl font-bold ${getComplexityColor(metrics.cognitiveComplexity)}`}>
              {metrics.cognitiveComplexity}
            </div>
            <div className="text-xs text-gray-500 mt-1">Mental effort</div>
          </motion.div>
        </div>

        {/* Functions with Complexity */}
        {metrics.functions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800 rounded-xl p-4"
          >
            <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span>Functions ({metrics.functions.length})</span>
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {metrics.functions.map((func, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-white font-medium">{func.name}</span>
                      <span className="text-gray-400 text-sm ml-2">({func.linesOfCode} lines)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getComplexityBg(func.complexity)}`}>
                        CC: {func.complexity}
                      </div>
                      <div className="text-xs text-gray-400">{func.algorithmType}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-400">Time:</span>
                      <span className={getBigOColor(func.timeComplexity.bigO)}>{func.timeComplexity.bigO}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HardDrive className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-400">Space:</span>
                      <span className={getBigOColor(func.spaceComplexity.bigO)}>{func.spaceComplexity.bigO}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Algorithmic Patterns */}
        {metrics.algorithmicPatterns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gray-800 rounded-xl p-4"
          >
            <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
              <Target className="h-4 w-4 text-green-400" />
              <span>Detected Algorithms ({metrics.algorithmicPatterns.length})</span>
            </h4>
            <div className="space-y-2">
              {metrics.algorithmicPatterns.map((pattern, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{pattern.name}</span>
                    <span className="text-xs text-gray-400 capitalize">{pattern.type}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <span className="text-gray-400">Time: </span>
                      <span className={getBigOColor(pattern.timeComplexity)}>{pattern.timeComplexity}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Space: </span>
                      <span className={getBigOColor(pattern.spaceComplexity)}>{pattern.spaceComplexity}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{pattern.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Code Smells with Complexity Impact */}
        {metrics.codeSmells.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gray-800 rounded-xl p-4"
          >
            <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span>Code Smells ({metrics.codeSmells.length})</span>
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {metrics.codeSmells.map((smell, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium capitalize">{smell.type.replace('-', ' ')}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      smell.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                      smell.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {smell.severity}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{smell.message}</p>
                  {smell.complexityImpact && (
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div>
                        <span className="text-gray-500">Time Impact: </span>
                        <span className={getBigOColor(smell.complexityImpact.time)}>{smell.complexityImpact.time}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Space Impact: </span>
                        <span className={getBigOColor(smell.complexityImpact.space)}>{smell.complexityImpact.space}</span>
                      </div>
                    </div>
                  )}
                  <p className="text-gray-500 text-xs">{smell.suggestion}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Halstead Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <h4 className="font-semibold text-white mb-3">Halstead Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-white">{metrics.halsteadMetrics.vocabulary}</div>
              <div className="text-xs text-gray-400">Vocabulary</div>
            </div>
            <div className="text-center p-2 bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-white">{metrics.halsteadMetrics.length}</div>
              <div className="text-xs text-gray-400">Length</div>
            </div>
            <div className="text-center p-2 bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-white">{metrics.halsteadMetrics.difficulty.toFixed(1)}</div>
              <div className="text-xs text-gray-400">Difficulty</div>
            </div>
            <div className="text-center p-2 bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-white">{metrics.halsteadMetrics.volume.toFixed(0)}</div>
              <div className="text-xs text-gray-400">Volume</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};