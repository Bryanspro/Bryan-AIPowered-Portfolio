
import React, { useState } from 'react';
import { Theme, THEME_CONFIG, Alarm as AlarmType } from '../types';

interface AlarmProps {
  theme: Theme;
  alarms: AlarmType[];
  onAddAlarm: (time: string) => void;
  onToggleAlarm: (id: string) => void;
  onDeleteAlarm: (id: string) => void;
}

const Alarm: React.FC<AlarmProps> = ({ theme, alarms, onAddAlarm, onToggleAlarm, onDeleteAlarm }) => {
  const [newAlarmTime, setNewAlarmTime] = useState('08:00');
  const colors = THEME_CONFIG[theme];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      <div className="w-full flex gap-4 p-6 bg-black/40 border border-white/5 rounded-3xl">
        <input 
          type="time" 
          value={newAlarmTime}
          onChange={(e) => setNewAlarmTime(e.target.value)}
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xl font-mono focus:outline-none focus:border-white/30 transition-all"
          style={{ color: colors.primary }}
        />
        <button 
          onClick={() => onAddAlarm(newAlarmTime)}
          className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95"
          style={{ 
            backgroundColor: `${colors.primary}20`,
            color: colors.primary,
            border: `1px solid ${colors.primary}40`
          }}
        >
          Add
        </button>
      </div>

      <div className="w-full space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {alarms.length === 0 ? (
          <div className="text-center py-12 text-neutral-600 text-xs uppercase tracking-[0.2em]">
            No alarms set
          </div>
        ) : (
          alarms.map((alarm) => (
            <div 
              key={alarm.id}
              className={`flex justify-between items-center p-5 bg-black/40 border rounded-2xl transition-all ${
                alarm.enabled ? 'border-white/10' : 'border-white/5 opacity-50'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-mono tracking-tighter" style={{ color: alarm.enabled ? colors.primary : 'inherit' }}>
                  {alarm.time}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onToggleAlarm(alarm.id)}
                  className={`w-12 h-6 rounded-full relative transition-all ${
                    alarm.enabled ? '' : 'bg-neutral-800'
                  }`}
                  style={{ backgroundColor: alarm.enabled ? colors.primary : undefined }}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      alarm.enabled ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
                <button 
                  onClick={() => onDeleteAlarm(alarm.id)}
                  className="text-neutral-600 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alarm;
