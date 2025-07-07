import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { MetricsPanel } from './components/MetricsPanel';
import { VisualizationPanel } from './components/VisualizationPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { BackgroundEffects } from './components/BackgroundEffects';
import { analyzeCode } from './utils/codeAnalyzer';
import { CodeMetrics, AnalysisHistory } from './types';

function App() {
  const [code, setCode] = useState(`function calculateFactorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

class DataProcessor {
  constructor(data) {
    this.data = data;
    this.processed = false;
  }

  process() {
    if (this.processed) return this.data;
    
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] > 0) {
        this.data[i] = this.data[i] * 2;
      } else if (this.data[i] < 0) {
        this.data[i] = Math.abs(this.data[i]);
      } else {
        this.data[i] = 1;
      }
    }
    
    this.processed = true;
    return this.data;
  }
}`);
  
  const [metrics, setMetrics] = useState<CodeMetrics | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState<'editor' | 'metrics' | 'visualization' | 'history'>('editor');

  useEffect(() => {
    const analyzeCodeDebounced = setTimeout(() => {
      if (code.trim()) {
        setIsAnalyzing(true);
        const newMetrics = analyzeCode(code);
        setMetrics(newMetrics);
        
        // Add to history
        const historyEntry: AnalysisHistory = {
          id: Date.now().toString(),
          timestamp: new Date(),
          metrics: newMetrics,
          codeLength: code.length
        };
        
        setHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
        setIsAnalyzing(false);
      }
    }, 500);

    return () => clearTimeout(analyzeCodeDebounced);
  }, [code]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundEffects />
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <main className="pt-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatePresence mode="wait">
            {activeView === 'editor' && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]"
              >
                <CodeEditor 
                  code={code} 
                  onChange={setCode} 
                  isAnalyzing={isAnalyzing}
                />
                <MetricsPanel 
                  metrics={metrics} 
                  isAnalyzing={isAnalyzing}
                />
              </motion.div>
            )}

            {activeView === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-[calc(100vh-120px)]"
              >
                <MetricsPanel 
                  metrics={metrics} 
                  isAnalyzing={isAnalyzing}
                  fullView={true}
                />
              </motion.div>
            )}

            {activeView === 'visualization' && (
              <motion.div
                key="visualization"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-[calc(100vh-120px)]"
              >
                <VisualizationPanel 
                  metrics={metrics}
                  history={history}
                />
              </motion.div>
            )}

            {activeView === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-[calc(100vh-120px)]"
              >
                <HistoryPanel 
                  history={history}
                  onClearHistory={() => setHistory([])}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;