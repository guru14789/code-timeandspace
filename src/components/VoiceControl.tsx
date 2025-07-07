import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Type, Zap } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface VoiceControlProps {
  onCommand: (command: string) => void;
}

export const VoiceControl: React.FC<VoiceControlProps> = ({ onCommand }) => {
  const { isListening, transcript, isSupported, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [lastCommand, setLastCommand] = useState('');

  useEffect(() => {
    if (transcript && transcript !== lastCommand) {
      setLastCommand(transcript);
      onCommand(transcript);
      resetTranscript();
    }
  }, [transcript, lastCommand, onCommand, resetTranscript]);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onCommand(textInput.trim());
      setTextInput('');
      setShowTextInput(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const commandSuggestions = [
    "Show me web design projects",
    "Display mobile development",
    "Show all projects",
    "Display my skills",
    "Show frontend skills",
    "Go to contact section"
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col items-end space-y-4">
        {/* Voice Commands Help */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-800 max-w-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="p-2 bg-gray-800 rounded-full"
                >
                  <Volume2 className="h-4 w-4 text-white" />
                </motion.div>
                <span className="text-sm font-semibold text-white">Listening...</span>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-400 mb-2">Try saying:</p>
                {commandSuggestions.slice(0, 4).map((suggestion, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-xs text-gray-500 flex items-center space-x-2"
                  >
                    <Zap className="h-3 w-3 text-white" />
                    <span>"{suggestion}"</span>
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input */}
        <AnimatePresence>
          {showTextInput && (
            <motion.form
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onSubmit={handleTextSubmit}
              className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-800"
            >
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type your command..."
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-all duration-300 font-medium"
                >
                  Send
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Control Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowTextInput(!showTextInput)}
            className="bg-gray-900 rounded-full p-4 shadow-2xl border border-gray-800 hover:bg-gray-800 transition-all duration-300 group"
          >
            <Type className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
          </motion.button>

          {isSupported && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleListening}
              className={`rounded-full p-4 shadow-2xl border transition-all duration-300 relative overflow-hidden ${
                isListening
                  ? 'bg-red-600 text-white border-red-500 shadow-red-600/25'
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <motion.div
                animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="relative z-10"
              >
                {isListening ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </motion.div>
              
              {isListening && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-red-500/20 rounded-full"
                />
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};