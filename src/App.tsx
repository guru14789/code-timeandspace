
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { MetricsPanel } from './components/MetricsPanel';
import { VisualizationPanel } from './components/VisualizationPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { BackgroundEffects } from './components/BackgroundEffects';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WelcomeModal } from './components/WelcomeModal';
import { analyzeCode } from './utils/codeAnalyzer';
import { CodeMetrics, AnalysisHistory } from './types';

const defaultCode = `// Welcome to Code Complexity Visualizer
// Analyze your code's complexity in real-time

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

class DataProcessor {
  constructor(data) {
    this.data = data;
    this.cache = new Map();
  }

  processData() {
    const key = JSON.stringify(this.data);
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const result = this.data
      .filter(item => item.value > 0)
      .map(item => ({
        ...item,
        processed: true,
        timestamp: Date.now()
      }))
      .sort((a, b) => b.value - a.value);

    this.cache.set(key, result);
    return result;
  }
}

// Binary search implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`;

function App() {
  const [code, setCode] = useState(defaultCode);
  const [metrics, setMetrics] = useState<CodeMetrics | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState<'editor' | 'metrics' | 'visualization' | 'history'>('editor');
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized analysis function for better performance
  const analyzeCodeMemoized = useCallback(async (codeToAnalyze: string) => {
    if (!codeToAnalyze.trim()) return;
    
    try {
      setIsAnalyzing(true);
      setError(null);
      
      // Simulate async analysis for better UX
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const newMetrics = analyzeCode(codeToAnalyze);
      setMetrics(newMetrics);
      
      // Add to history with better performance
      const historyEntry: AnalysisHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        metrics: newMetrics,
        codeLength: codeToAnalyze.length
      };
      
      setHistory(prev => {
        const newHistory = [historyEntry, ...prev];
        // Keep only last 50 entries for performance
        return newHistory.slice(0, 50);
      });
    } catch (err) {
      setError('Analysis failed. Please check your code syntax.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // Debounced analysis for better performance
  useEffect(() => {
    const analyzeTimer = setTimeout(() => {
      analyzeCodeMemoized(code);
    }, 300);

    return () => clearTimeout(analyzeTimer);
  }, [code, analyzeCodeMemoized]);

  // Memoized view content for better performance
  const viewContent = useMemo(() => {
    switch (activeView) {
      case 'editor':
        return (
          <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
            <CodeEditor 
              code={code} 
              onChange={setCode} 
              isAnalyzing={isAnalyzing}
              error={error}
            />
            <MetricsPanel 
              metrics={metrics} 
              isAnalyzing={isAnalyzing}
            />
          </div>
        );
      case 'metrics':
        return (
          <div className="h-[calc(100vh-120px)]">
            <MetricsPanel 
              metrics={metrics} 
              isAnalyzing={isAnalyzing}
              fullView={true}
            />
          </div>
        );
      case 'visualization':
        return (
          <div className="h-[calc(100vh-120px)]">
            <VisualizationPanel 
              metrics={metrics}
              history={history}
            />
          </div>
        );
      case 'history':
        return (
          <div className="h-[calc(100vh-120px)]">
            <HistoryPanel 
              history={history}
              onClearHistory={() => setHistory([])}
              onRestoreCode={(historicalCode) => setCode(historicalCode)}
            />
          </div>
        );
      default:
        return null;
    }
  }, [activeView, code, metrics, history, isAnalyzing, error]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundEffects />
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <main className="pt-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {viewContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)}
      />

      {/* Global Loading Spinner */}
      {isAnalyzing && (
        <div className="fixed top-4 right-4 z-50">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default App;
