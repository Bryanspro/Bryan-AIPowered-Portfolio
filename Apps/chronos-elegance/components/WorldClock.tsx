
import React, { useState, useEffect } from 'react';
import { Theme, THEME_CONFIG, WorldTime } from '../types';
import { getTimeInTimezone, formatTwoDigits } from '../utils';

interface WorldClockProps {
  theme: Theme;
}

const DEFAULT_CITIES: WorldTime[] = [
  { id: '1', city: 'London', timezone: 'Europe/London' },
  { id: '2', city: 'New York', timezone: 'America/New_York' },
  { id: '3', city: 'Tokyo', timezone: 'Asia/Tokyo' },
  { id: '4', city: 'Dubai', timezone: 'Asia/Dubai' },
  { id: '5', city: 'Sydney', timezone: 'Australia/Sydney' },
];

const WorldClock: React.FC<WorldClockProps> = ({ theme }) => {
  const [times, setTimes] = useState<Record<string, Date>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, Date> = {};
      DEFAULT_CITIES.forEach(city => {
        newTimes[city.id] = getTimeInTimezone(city.timezone);
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const colors = THEME_CONFIG[theme];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      {DEFAULT_CITIES.map((city) => {
        const time = times[city.id];
        if (!time) return null;

        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;

        return (
          <div 
            key={city.id}
            className="group relative p-6 bg-black/40 border border-white/5 rounded-3xl overflow-hidden transition-all hover:border-white/20 hover:bg-black/60"
          >
            <div 
              className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            />
            
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">
                  {city.city}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono tracking-tighter" style={{ color: colors.primary }}>
                    {formatTwoDigits(displayHours)}:{formatTwoDigits(minutes)}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-600">{ampm}</span>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-[10px] text-neutral-700 font-mono">
                  :{formatTwoDigits(seconds)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorldClock;
