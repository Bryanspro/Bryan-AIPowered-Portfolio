
import React from 'react';
import { NumeralSystem, DisplayMode, Theme, THEME_CONFIG } from '../types';

interface ClockControlsProps {
  numeralSystem: NumeralSystem;
  displayMode: DisplayMode;
  theme: Theme;
  onNumeralChange: (system: NumeralSystem) => void;
  onModeChange: (mode: DisplayMode) => void;
  onThemeChange: (theme: Theme) => void;
}

const ClockControls: React.FC<ClockControlsProps> = ({
  numeralSystem,
  displayMode,
  theme,
  onNumeralChange,
  onModeChange,
  onThemeChange
}) => {
  return (
    <div className="flex flex-col gap-8 items-center p-8 bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl mt-12 w-full max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {/* Mode Toggle */}
        <div className="flex flex-col items-center gap-3 col-span-1 md:col-span-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Display Mode</span>
          <div className="flex flex-wrap bg-black/40 p-1 rounded-xl border border-white/5 w-full justify-center gap-1">
            {Object.values(DisplayMode).map((mode) => (
              <button
                key={mode}
                onClick={() => onModeChange(mode)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all rounded-lg ${
                  displayMode === mode 
                  ? 'bg-neutral-800 text-white shadow-lg' 
                  : 'text-neutral-500 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Numeral Toggle (Only for Analog/Digital) */}
        {(displayMode === DisplayMode.ANALOG || displayMode === DisplayMode.DIGITAL) && (
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Numerals</span>
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 w-full">
              {Object.values(NumeralSystem).map((system) => (
                <button
                  key={system}
                  onClick={() => onNumeralChange(system)}
                  className={`flex-1 px-3 py-2 text-xs font-semibold transition-all rounded-lg ${
                    numeralSystem === system 
                    ? 'bg-neutral-800 text-white shadow-lg' 
                    : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  {system}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Theme Toggle */}
        <div className={`flex flex-col items-center gap-3 ${
          (displayMode === DisplayMode.ANALOG || displayMode === DisplayMode.DIGITAL) ? 'col-span-1 md:col-span-2' : 'col-span-1 md:col-span-3'
        }`}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Theme</span>
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 w-full overflow-x-auto">
            {Object.values(Theme).map((t) => (
              <button
                key={t}
                onClick={() => onThemeChange(t)}
                className={`flex-1 px-3 py-2 text-xs font-semibold transition-all rounded-lg flex items-center justify-center gap-2 ${
                  theme === t 
                  ? 'bg-neutral-800 text-white shadow-lg' 
                  : 'text-neutral-500 hover:text-white'
                }`}
              >
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: THEME_CONFIG[t].primary }}
                />
                <span className="hidden lg:inline">{t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockControls;
