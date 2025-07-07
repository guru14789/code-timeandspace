
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Download, Upload, Trash2, Check, AlertCircle } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  isAnalyzing: boolean;
  error?: string | null;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, isAnalyzing, error }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  useEffect(() => {
    const lines = code.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-analysis.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the code?')) {
      onChange('');
    }
  };

  const examples = [
    {
      name: 'Sorting Algorithm',
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
    },
    {
      name: 'Binary Search',
      code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`
    },
    {
      name: 'Fibonacci',
      code: `function fibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}`
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900 rounded-2xl border border-gray-800 h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Code className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Code Editor</h3>
              <p className="text-sm text-gray-400">Paste or write your code below</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
            
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              title="Download code"
            >
              <Download className="h-4 w-4 text-gray-400" />
            </button>
            
            <label className="p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer" title="Upload file">
              <Upload className="h-4 w-4 text-gray-400" />
              <input
                type="file"
                accept=".js,.ts,.jsx,.tsx,.py,.cpp,.c,.java"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            
            <button
              onClick={handleClear}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              title="Clear code"
            >
              <Trash2 className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Example Templates */}
        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onChange(example.code)}
              className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 transition-colors"
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}

      {/* Code Editor */}
      <div className="flex-1 p-4">
        <div className="h-full bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="flex h-full">
            {/* Line Numbers */}
            <div className="bg-gray-900 p-4 text-right min-w-[3rem] border-r border-gray-700">
              {lineNumbers.map((num) => (
                <div key={num} className="text-gray-500 text-sm leading-6">
                  {num}
                </div>
              ))}
            </div>

            {/* Code Area */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 bg-transparent text-white font-mono text-sm resize-none outline-none leading-6"
                placeholder="// Start typing your code here...
// The analysis will update in real-time!"
                spellCheck={false}
                autoComplete="off"
              />
              
              {/* Analysis Status */}
              {isAnalyzing && (
                <div className="absolute top-2 right-2 bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                  Analyzing...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
