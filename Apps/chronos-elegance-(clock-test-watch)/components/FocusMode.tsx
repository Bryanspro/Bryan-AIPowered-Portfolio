
import React, { useState, useEffect, useRef } from 'react';
import { Theme, THEME_CONFIG } from '../types';
import { formatTimeSeconds } from '../utils';

interface FocusModeProps {
  theme: Theme;
}

type FocusState = 'work' | 'break';

const FocusMode: React.FC<FocusModeProps> = ({ theme }) => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<FocusState>('work');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            handleModeSwitch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stop = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    stop();
    setSeconds(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const handleModeSwitch = () => {
    stop();
    const nextMode = mode === 'work' ? 'break' : 'work';
    setMode(nextMode);
    setSeconds(nextMode === 'work' ? 25 * 60 : 5 * 60);
    // Visual alert
    alert(nextMode === 'work' ? 'Time to work!' : 'Time for a break!');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const colors = THEME_CONFIG[theme];
  const totalSeconds = mode === 'work' ? 25 * 60 : 5 * 60;
  const progress = (seconds / totalSeconds) * 100;

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-md">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold">
          {mode === 'work' ? 'Focus Session' : 'Short Break'}
        </span>
        <div className="h-1 w-12 rounded-full" style={{ backgroundColor: colors.primary }} />
      </div>

      <div className="relative flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="w-80 h-80 transform -rotate-90">
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-white/5"
          />
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 150}
            strokeDashoffset={2 * Math.PI * 150 * (1 - progress / 100)}
            strokeLinecap="round"
            style={{ color: colors.primary }}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="text-7xl font-mono tracking-tighter" style={{ color: colors.primary }}>
            {formatTimeSeconds(seconds)}
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button 
          onClick={isRunning ? stop : start}
          className="flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95"
          style={{ 
            backgroundColor: isRunning ? 'rgba(239, 68, 68, 0.1)' : `${colors.primary}20`,
            color: isRunning ? '#ef4444' : colors.primary,
            border: `1px solid ${isRunning ? 'rgba(239, 68, 68, 0.2)' : `${colors.primary}40`}`
          }}
        >
          {isRunning ? 'Pause' : 'Start Focus'}
        </button>
        <button 
          onClick={reset}
          className="flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-2">
        <div className={`w-2 h-2 rounded-full transition-all ${mode === 'work' ? 'scale-125' : 'opacity-20'}`} style={{ backgroundColor: colors.primary }} />
        <div className={`w-2 h-2 rounded-full transition-all ${mode === 'break' ? 'scale-125' : 'opacity-20'}`} style={{ backgroundColor: colors.primary }} />
      </div>
    </div>
  );
};

export default FocusMode;
