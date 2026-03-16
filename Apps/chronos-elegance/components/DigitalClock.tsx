
import React from 'react';
import { NumeralSystem, Theme, THEME_CONFIG } from '../types';
import { toRoman, formatTwoDigits } from '../utils';

interface DigitalClockProps {
  time: Date;
  numeralSystem: NumeralSystem;
  theme: Theme;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ time, numeralSystem, theme }) => {
  const colors = THEME_CONFIG[theme];
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  const amPm = hours >= 12 ? 'PM' : 'AM';

  const renderPart = (val: number, isHour: boolean = false) => {
    if (numeralSystem === NumeralSystem.ROMAN) {
      // For Roman digital, 0 is tricky but let's use XII for 12/0 in hour context
      if (isHour) return toRoman(val % 12 || 12);
      return val === 0 ? '0' : toRoman(val);
    }
    return formatTwoDigits(isHour ? (val % 12 || 12) : val);
  };

  const numeralClass = numeralSystem === NumeralSystem.ROMAN ? 'font-serif' : 'font-mono';

  const dayProgress = ((hours * 3600 + minutes * 60 + seconds) / 86400) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-xl">
      <div className={`flex items-baseline space-x-4 text-white text-6xl md:text-8xl tracking-tight transition-all duration-500 ${numeralClass}`}>
        <div className="min-w-[2ch] text-center">{renderPart(hours, true)}</div>
        <div className="animate-pulse opacity-30" style={{ color: colors.primary }}>:</div>
        <div className="min-w-[2ch] text-center">{renderPart(minutes)}</div>
        <div className="hidden md:flex items-baseline space-x-2">
            <div className="animate-pulse opacity-30 text-4xl md:text-6xl" style={{ color: colors.primary }}>:</div>
            <div className="text-4xl md:text-6xl min-w-[2ch]" style={{ color: colors.primary }}>{renderPart(seconds)}</div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 px-12">
        <div className="flex justify-between text-[8px] uppercase tracking-[0.3em] text-neutral-600 font-bold">
          <span>Sunrise</span>
          <span>Sunset</span>
        </div>
        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-1000 ease-linear"
            style={{ 
              width: `${dayProgress}%`,
              backgroundColor: colors.primary,
              boxShadow: `0 0 10px ${colors.primary}`
            }}
          />
        </div>
      </div>

      <div className="text-neutral-500 text-xl font-medium tracking-[0.2em] flex items-center space-x-4">
        <span style={{ color: colors.secondary }} className="opacity-80">{amPm}</span>
        <span className="h-1 w-1 rounded-full bg-neutral-800"></span>
        <span className="uppercase text-xs tracking-[0.3em] opacity-40">
          {time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
};

export default DigitalClock;
