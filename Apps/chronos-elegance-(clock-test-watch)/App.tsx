
import React, { useState, useEffect } from 'react';
import { NumeralSystem, DisplayMode, Theme, THEME_CONFIG } from './types';
import AnalogClock from './components/AnalogClock';
import DigitalClock from './components/DigitalClock';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import WorldClock from './components/WorldClock';
import Alarm from './components/Alarm';
import FocusMode from './components/FocusMode';
import ClockControls from './components/ClockControls';
import { Alarm as AlarmType } from './types';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.ANALOG);
  const [numeralSystem, setNumeralSystem] = useState<NumeralSystem>(NumeralSystem.ARABIC);
  const [theme, setTheme] = useState<Theme>(Theme.GOLD);
  const [alarms, setAlarms] = useState<AlarmType[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      
      // Alarm Check
      const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const activeAlarm = alarms.find(a => a.enabled && a.time === currentTimeStr && now.getSeconds() === 0);
      if (activeAlarm) {
        // Simple visual alert for alarm
        alert(`Alarm: ${activeAlarm.time}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [alarms]);

  const addAlarm = (time: string) => {
    setAlarms([...alarms, { id: Date.now().toString(), time, enabled: true }]);
  };

  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(a => a.id !== id));
  };

  const currentThemeColors = THEME_CONFIG[theme];

  const renderClock = () => {
    switch (displayMode) {
      case DisplayMode.ANALOG:
        return <AnalogClock time={time} numeralSystem={numeralSystem} theme={theme} />;
      case DisplayMode.DIGITAL:
        return <DigitalClock time={time} numeralSystem={numeralSystem} theme={theme} />;
      case DisplayMode.STOPWATCH:
        return <Stopwatch theme={theme} />;
      case DisplayMode.TIMER:
        return <Timer theme={theme} />;
      case DisplayMode.WORLD:
        return <WorldClock theme={theme} />;
      case DisplayMode.ALARM:
        return (
          <Alarm 
            theme={theme} 
            alarms={alarms} 
            onAddAlarm={addAlarm} 
            onToggleAlarm={toggleAlarm} 
            onDeleteAlarm={deleteAlarm} 
          />
        );
      case DisplayMode.FOCUS:
        return <FocusMode theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070707] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-1000">
      
      {/* Dynamic Background Glows */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] blur-[160px] rounded-full transition-all duration-1000"
        style={{ backgroundColor: currentThemeColors.glow }}
      ></div>
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] blur-[160px] rounded-full transition-all duration-1000"
        style={{ backgroundColor: currentThemeColors.glow, opacity: 0.5 }}
      ></div>

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 flex flex-col items-center space-y-2 pointer-events-none z-30">
        <h1 className="text-3xl font-serif italic tracking-[0.3em] opacity-40">Chronos</h1>
        <div 
          className="h-px w-24 transition-all duration-1000" 
          style={{ background: `linear-gradient(90deg, transparent, ${currentThemeColors.primary}, transparent)` }}
        ></div>
      </div>

      {/* Fullscreen Toggle Button */}
      <button 
        onClick={toggleFullscreen}
        className="absolute top-12 right-12 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white/80"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
        )}
      </button>

      {/* Clock Display Area */}
      <main className="flex-1 flex items-center justify-center w-full max-w-4xl relative z-10 py-12">
        <div className="transition-all duration-700 ease-in-out w-full flex justify-center">
          <div key={displayMode} className="animate-in fade-in zoom-in duration-1000 w-full flex justify-center">
            {renderClock()}
          </div>
        </div>
      </main>

      {/* Controls */}
      <div className="mb-12 relative z-20 w-full flex justify-center px-4">
        <ClockControls 
          displayMode={displayMode}
          numeralSystem={numeralSystem}
          theme={theme}
          onModeChange={setDisplayMode}
          onNumeralChange={setNumeralSystem}
          onThemeChange={setTheme}
        />
      </div>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 text-[9px] uppercase tracking-[0.5em] text-neutral-700 font-bold pointer-events-none">
        Timeless Aesthetic Precision
      </footer>
    </div>
  );
};

export default App;
