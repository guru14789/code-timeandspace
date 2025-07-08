import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-50">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-gray-600 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-l from-gray-700 to-transparent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-t from-gray-500 to-transparent rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative flex flex-col items-center">
        {/* Main loading container */}
        <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-800/95 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-700 shadow-2xl">
          <div className="relative">
            {/* Large spinner with gradient border */}
            <div className="w-8 h-8 rounded-full border-4 border-transparent bg-gradient-to-r from-gray-400 via-gray-500 to-black animate-spin">
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-800/95"></div>
            </div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-500/30 via-transparent to-gray-500/30 animate-pulse"></div>
            
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gray-600/20 via-transparent to-gray-600/20 animate-ping"></div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl font-semibold bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
              Analyzing...
            </span>
            <div className="flex space-x-1 mt-1">
              <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gray-500 via-gray-400 to-gray-600 rounded-full animate-pulse"></div>
        </div>
        
        {/* Subtle loading message */}
        <p className="mt-4 text-sm text-gray-500 animate-pulse">
          Please wait while we process your request...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;