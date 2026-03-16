
import React, { useState, useEffect, useRef } from 'react';
import { Theme, THEME_CONFIG } from '../types';
import { formatTimeSeconds } from '../utils';

interface TimerProps {
  theme: Theme;
}

const Timer: React.FC<TimerProps> = ({ theme }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (seconds > 0 && !isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            stop();
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
    setSeconds(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  const setTime = () => {
    const total = inputMinutes * 60 + inputSeconds;
    setSeconds(total);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const colors = THEME_CONFIG[theme];

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-md">
      {seconds === 0 && !isRunning ? (
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex gap-4 items-center justify-center w-full">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Min</span>
              <input 
                type="number" 
                min="0" 
                max="99"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(Math.min(99, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-20 h-20 bg-black/40 border border-white/10 rounded-2xl text-center text-3xl font-mono focus:outline-none focus:border-white/30 transition-all"
                style={{ color: colors.primary }}
              />
            </div>
            <span className="text-3xl opacity-20 mt-6">:</span>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Sec</span>
              <input 
                type="number" 
                min="0" 
                max="59"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-20 h-20 bg-black/40 border border-white/10 rounded-2xl text-center text-3xl font-mono focus:outline-none focus:border-white/30 transition-all"
                style={{ color: colors.primary }}
              />
            </div>
          </div>
          <button 
            onClick={setTime}
            disabled={inputMinutes === 0 && inputSeconds === 0}
            className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            style={{ 
              backgroundColor: `${colors.primary}20`,
              color: colors.primary,
              border: `1px solid ${colors.primary}40`
            }}
          >
            Set Timer
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-12 w-full">
          <div className="relative flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border-2 border-white/5 flex items-center justify-center relative">
              <div 
                className="absolute inset-0 rounded-full border-t-2 transition-all duration-1000"
                style={{ 
                  borderColor: colors.primary,
                  transform: `rotate(${seconds / (inputMinutes * 60 + inputSeconds) * 360}deg)`,
                  opacity: isRunning ? 1 : 0.3
                }}
              />
              <div className="text-6xl font-mono tracking-tighter" style={{ color: colors.primary }}>
                {formatTimeSeconds(seconds)}
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <button 
              onClick={isRunning ? stop : start}
              className="flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95"
              style={{ 
                backgroundColor: isRunning ? 'rgba(239, 68, 68, 0.1)' : `${colors.primary}20`,
                color: isRunning ? '#ef4444' : colors.primary,
                border: `1px solid ${isRunning ? 'rgba(239, 68, 68, 0.2)' : `${colors.primary}40`}`
              }}
            >
              {isRunning ? 'Pause' : 'Resume'}
            </button>
            <button 
              onClick={reset}
              className="flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
