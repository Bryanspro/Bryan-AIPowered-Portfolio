
import React, { useState, useEffect, useRef } from 'react';
import { Theme, THEME_CONFIG } from '../types';
import { formatTimeMs } from '../utils';

interface StopwatchProps {
  theme: Theme;
}

const Stopwatch: React.FC<StopwatchProps> = ({ theme }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (isRunning) {
      setLaps([time, ...laps]);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const colors = THEME_CONFIG[theme];

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-md">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-72 h-72 rounded-full border-2 border-white/5 flex items-center justify-center relative">
          <div 
            className="absolute inset-0 rounded-full border-t-2 transition-all duration-300"
            style={{ 
              borderColor: colors.primary,
              transform: `rotate(${(time % 60000) / 60000 * 360}deg)`,
              opacity: isRunning ? 1 : 0.3
            }}
          />
          <div className="text-6xl font-mono tracking-tighter" style={{ color: colors.primary }}>
            {formatTimeMs(time)}
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
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button 
          onClick={isRunning ? lap : reset}
          className="flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
        >
          {isRunning ? 'Lap' : 'Reset'}
        </button>
      </div>

      {laps.length > 0 && (
        <div className="w-full max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {laps.map((lapTime, index) => (
            <div key={index} className="flex justify-between items-center py-3 px-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Lap {laps.length - index}</span>
              <span className="font-mono text-sm text-neutral-300">{formatTimeMs(lapTime)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
