import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div
          className="absolute inset-0 bg-[length:80px_80px] bg-repeat animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(107, 114, 128, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(107, 114, 128, 0.2) 1px, transparent 1px)
            `,
            animationDuration: '4s'
          }}
        />
      </div>

      {/* Three Elegant Orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-gray-700/10 to-gray-900/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-gray-600/8 to-black/12 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-gray-500/6 to-gray-800/10 rounded-full blur-2xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>

      {/* Floating Elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-gray-400/20 to-gray-600/30 rounded-full animate-ping"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Two Flowing Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B7280" stopOpacity="0" />
            <stop offset="50%" stopColor="#6B7280" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6B7280" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" stopOpacity="0" />
            <stop offset="50%" stopColor="#374151" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#374151" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,150 Q400,100 800,150 T1600,150"
          stroke="url(#flowGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{animationDuration: '3s'}}
        />
        <path
          d="M0,250 Q400,200 800,250 T1600,250"
          stroke="url(#flowGradient2)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{animationDuration: '4s', animationDelay: '1.5s'}}
        />
      </svg>

      {/* Subtle Code Symbols */}
      {['{', '}', '<', '>', '(', ')'].map((symbol, i) => (
        <div
          key={i}
          className="absolute text-gray-500/15 font-mono text-sm animate-pulse"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 2) * 40}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: '3s'
          }}
        >
          {symbol}
        </div>
      ))}

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/4 to-black/8 animate-pulse" style={{animationDuration: '6s'}}></div>
    </div>
  );
};