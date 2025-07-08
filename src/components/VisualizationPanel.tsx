import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, Clock, HardDrive, Zap } from 'lucide-react';
import { CodeMetrics, AnalysisHistory } from '../types';

interface VisualizationPanelProps {
  metrics: CodeMetrics | null;
  history: AnalysisHistory[];
}

export const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ metrics, history }) => {
  const historyData = history.slice(0, 10).reverse().map((entry, index) => ({
    index: index + 1,
    complexity: entry.metrics.cyclomaticComplexity,
    maintainability: entry.metrics.maintainabilityIndex,
    linesOfCode: entry.metrics.linesOfCode,
    cognitive: entry.metrics.cognitiveComplexity,
    timeComplexityScore: getComplexityScore(entry.metrics.timeComplexity.bigO),
    spaceComplexityScore: getComplexityScore(entry.metrics.spaceComplexity.bigO),
    timestamp: entry.timestamp.toLocaleTimeString()
  }));

  const functionComplexityData = metrics?.functions.map(func => ({
    name: func.name.length > 15 ? func.name.substring(0, 15) + '...' : func.name,
    complexity: func.complexity,
    lines: func.linesOfCode,
    timeScore: getComplexityScore(func.timeComplexity.bigO),
    spaceScore: getComplexityScore(func.spaceComplexity.bigO),
    algorithmType: func.algorithmType
  })) || [];

  const complexityScatterData = metrics?.functions.map(func => ({
    x: getComplexityScore(func.timeComplexity.bigO),
    y: getComplexityScore(func.spaceComplexity.bigO),
    name: func.name,
    size: func.linesOfCode
  })) || [];

  const codeSmellsData = metrics?.codeSmells.reduce((acc, smell) => {
    const existing = acc.find(item => item.type === smell.type);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ type: smell.type.replace('-', ' '), count: 1 });
    }
    return acc;
  }, [] as { type: string; count: number }[]) || [];

  const algorithmPatternsData = metrics?.algorithmicPatterns.map(pattern => ({
    name: pattern.name,
    timeScore: getComplexityScore(pattern.timeComplexity),
    spaceScore: getComplexityScore(pattern.spaceComplexity),
    confidence: pattern.confidence * 100,
    type: pattern.type
  })) || [];

  const radarData = metrics ? [
    {
      metric: 'Time Efficiency',
      value: Math.max(100 - getComplexityScore(metrics.timeComplexity.bigO) * 20, 0),
      fullMark: 100
    },
    {
      metric: 'Space Efficiency',
      value: Math.max(100 - getComplexityScore(metrics.spaceComplexity.bigO) * 20, 0),
      fullMark: 100
    },
    {
      metric: 'Maintainability',
      value: metrics.maintainabilityIndex,
      fullMark: 100
    },
    {
      metric: 'Code Quality',
      value: Math.max(100 - (metrics.codeSmells.length * 15), 0),
      fullMark: 100
    },
    {
      metric: 'Readability',
      value: Math.max(100 - (metrics.cognitiveComplexity * 5), 0),
      fullMark: 100
    },
    {
      metric: 'Complexity',
      value: Math.max(100 - (metrics.cyclomaticComplexity * 8), 0),
      fullMark: 100
    }
  ] : [];

  const COLORS = ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#F97316'];

  function getComplexityScore(bigO: string): number {
    if (bigO.includes('1')) return 1;
    if (bigO.includes('log')) return 2;
    if (bigO.includes('n)') && !bigO.includes('²') && !bigO.includes('^')) return 3;
    if (bigO.includes('n log n')) return 4;
    if (bigO.includes('n²') || bigO.includes('n^2')) return 5;
    if (bigO.includes('2^n')) return 6;
    if (bigO.includes('n!')) return 7;
    return 3;
  }

  if (!metrics) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-8 h-full flex items-center justify-center"
      >
        <div className="text-center">
          <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Data to Visualize</h3>
          <p className="text-gray-400"> Analyze some code to see beautiful complexity visualizations</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full overflow-y-auto"
    >
      {/* Complexity Trends */}
      <div className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-300" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Complexity Trends Over Time</h3>
            <p className="text-sm text-gray-400">Historical analysis including Big O complexity</p>
          </div>
        </div>
        
        {historyData.length > 1 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="index" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line type="monotone" dataKey="complexity" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} name="Cyclomatic" />
                <Line type="monotone" dataKey="cognitive" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444' }} name="Cognitive" />
                <Line type="monotone" dataKey="timeComplexityScore" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} name="Time Complexity" />
                <Line type="monotone" dataKey="spaceComplexityScore" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B' }} name="Space Complexity" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-400">
            <p>Need more analysis history to show trends</p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Function Complexity with Big O */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Function Complexity Analysis</h3>
              <p className="text-sm text-gray-400">Time & space complexity by function</p>
            </div>
          </div>
          
          {functionComplexityData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={functionComplexityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value, name) => {
                      if (name === 'timeScore') return [`O(complexity): ${value}`, 'Time Complexity'];
                      if (name === 'spaceScore') return [`O(complexity): ${value}`, 'Space Complexity'];
                      return [value, name];
                    }}
                  />
                  <Bar dataKey="timeScore" fill="#10B981" radius={[2, 2, 0, 0]} name="Time Complexity" />
                  <Bar dataKey="spaceScore" fill="#F59E0B" radius={[2, 2, 0, 0]} name="Space Complexity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>No functions detected</p>
            </div>
          )}
        </motion.div>

        {/* Time vs Space Complexity Scatter */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
              <Zap className="h-5 w-5 text-green-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Time vs Space Complexity</h3>
              <p className="text-sm text-gray-400">Function efficiency mapping</p>
            </div>
          </div>
          
          {complexityScatterData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={complexityScatterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="x" 
                    stroke="#9CA3AF" 
                    name="Time Complexity"
                    domain={[0, 7]}
                    tickFormatter={(value) => {
                      const labels = ['', 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)', 'O(n!)'];
                      return labels[value] || '';
                    }}
                  />
                  <YAxis 
                    dataKey="y" 
                    stroke="#9CA3AF" 
                    name="Space Complexity"
                    domain={[0, 7]}
                    tickFormatter={(value) => {
                      const labels = ['', 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)', 'O(n!)'];
                      return labels[value] || '';
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value, name, props) => {
                      if (name === 'Time Complexity' || name === 'Space Complexity') {
                        const labels = ['', 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)', 'O(n!)'];
                        return [labels[value as number] || 'Unknown', name];
                      }
                      return [value, name];
                    }}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return `Function: ${payload[0].payload.name}`;
                      }
                      return label;
                    }}
                  />
                  <Scatter dataKey="y" fill="#8B5CF6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>No function data available</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Algorithm Patterns */}
      {algorithmPatternsData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700">
              <Activity className="h-5 w-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">🔍 Detected Algorithm Patterns ({algorithmPatternsData.length})</h3>
              <p className="text-sm text-gray-400">Algorithmic complexity analysis with performance insights</p>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={algorithmPatternsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="timeScore" fill="#3B82F6" radius={[2, 2, 0, 0]} name="Time Complexity Score" />
                <Bar dataKey="spaceScore" fill="#EF4444" radius={[2, 2, 0, 0]} name="Space Complexity Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Smells */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
              <PieChartIcon className="h-5 w-5 text-red-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Code Smells Distribution</h3>
              <p className="text-sm text-gray-400">Issues affecting complexity</p>
            </div>
          </div>
          
          {codeSmellsData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={codeSmellsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {codeSmellsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>No code smells detected! 🎉</p>
            </div>
          )}
        </motion.div>

        {/* Overall Quality Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
              <Activity className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Code Quality Radar</h3>
              <p className="text-sm text-gray-400">Overall efficiency assessment</p>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  tickCount={5}
                />
                <Radar
                  name="Quality Score"
                  dataKey="value"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Complexity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-black to-gray-950 rounded-2xl border border-gray-800 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
            <Clock className="h-5 w-5 text-purple-300" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Complexity Summary</h3>
            <p className="text-sm text-gray-400">Big O analysis overview</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 text-center">
            <Clock className="h-8 w-8 text-blue-300 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-300">{metrics.timeComplexity.bigO}</div>
            <div className="text-sm text-gray-400">Time Complexity</div>
            <div className="text-xs text-gray-500 mt-1">{metrics.timeComplexity.explanation}</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 text-center">
            <HardDrive className="h-8 w-8 text-green-300 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-300">{metrics.spaceComplexity.bigO}</div>
            <div className="text-sm text-gray-400">Space Complexity</div>
            <div className="text-xs text-gray-500 mt-1">{metrics.spaceComplexity.explanation}</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 text-center">
            <BarChart3 className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-300">{metrics.cyclomaticComplexity}</div>
            <div className="text-sm text-gray-400">Cyclomatic</div>
            <div className="text-xs text-gray-500 mt-1">Decision points</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 text-center">
            <TrendingUp className="h-8 w-8 text-purple-300 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-300">{metrics.maintainabilityIndex}</div>
            <div className="text-sm text-gray-400">Maintainability</div>
            <div className="text-xs text-gray-500 mt-1">Quality index</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};