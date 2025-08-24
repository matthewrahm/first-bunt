'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PerformanceToggleProps {
  onToggle: (mode: 'performance' | 'quality') => void;
  currentMode: 'performance' | 'quality';
}

export default function PerformanceToggle({
  onToggle,
  currentMode,
}: PerformanceToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-8 right-8 z-50">
      <motion.div
        className="bg-ink-800/90 backdrop-blur-sm rounded-full p-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-silver-200 hover:text-silver-300 transition-colors px-3 py-2 rounded-full"
        >
          <div className="w-3 h-3 rounded-full bg-current" />
          <span className="text-sm font-medium">
            {currentMode === 'performance' ? 'Performance' : 'Quality'}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 bg-ink-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-ink-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              <button
                onClick={() => {
                  onToggle('performance');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  currentMode === 'performance'
                    ? 'bg-silver-300 text-ink-900 font-medium'
                    : 'text-silver-200 hover:bg-ink-700'
                }`}
              >
                🚀 Performance Mode
                <div className="text-xs text-ink-400 mt-1">
                  Faster loading, lighter scenes
                </div>
              </button>
              <button
                onClick={() => {
                  onToggle('quality');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  currentMode === 'quality'
                    ? 'bg-silver-300 text-ink-900 font-medium'
                    : 'text-silver-200 hover:bg-ink-700'
                }`}
              >
                ✨ Quality Mode
                <div className="text-xs text-ink-400 mt-1">
                  Full 3D scenes, may be slower
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
