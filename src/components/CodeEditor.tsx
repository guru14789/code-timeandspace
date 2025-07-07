import React from 'react';
import { motion } from 'framer-motion';
import { Code, Loader2, FileText, Zap } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  isAnalyzing: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, isAnalyzing }) => {
  const lines = code.split('\n');
  const lineCount = lines.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden h-full flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Code className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Code Editor</h3>
            <p className="text-sm text-gray-400">{lineCount} lines</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isAnalyzing && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="flex items-center space-x-2 text-blue-400"
            >
              <Loader2 className="h-4 w-4" />
              <span className="text-sm">Analyzing...</span>
            </motion.div>
          )}
          <div className="flex items-center space-x-1 text-gray-400">
            <Zap className="h-4 w-4" />
            <span className="text-sm">Real-time</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="flex h-full">
          {/* Line numbers */}
          <div className="bg-gray-800 border-r border-gray-700 px-3 py-4 select-none">
            <div className="text-gray-500 font-mono text-sm leading-6 text-right min-w-[2rem]">
              {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
                <div key={i + 1} className="h-6 flex items-center justify-end">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Code area */}
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-full p-4 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none leading-6 overflow-auto"
              placeholder="Paste your JavaScript/TypeScript code here for real-time complexity analysis..."
              spellCheck={false}
              style={{
                lineHeight: '1.5rem', // 24px to match line numbers
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace'
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-800 bg-gray-800/50">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{code.length} characters</span>
            </div>
            <div className="flex items-center space-x-1">
              <Code className="h-4 w-4" />
              <span>{lineCount} lines</span>
            </div>
            <div>JavaScript/TypeScript</div>
          </div>
          <div>Auto-save enabled</div>
        </div>
      </div>
    </motion.div>
  );
};