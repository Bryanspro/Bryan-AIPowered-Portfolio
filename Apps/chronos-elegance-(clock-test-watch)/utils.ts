
export const toRoman = (num: number): string => {
  const romanMap: Record<number, string> = {
    1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
    7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII'
  };
  return romanMap[num] || num.toString();
};

export const formatTwoDigits = (num: number): string => {
  return num.toString().padStart(2, '0');
};

export const formatTimeMs = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}.${formatTwoDigits(centiseconds)}`;
};

export const formatTimeSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
  }
  return `${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
};

export const getTimeInTimezone = (timezone: string): Date => {
  const date = new Date();
  const invdate = new Date(date.toLocaleString('en-US', {
    timeZone: timezone
  }));
  return invdate;
};

export const getMoonPhase = (date: Date): { phase: number; name: string } => {
  const lp = 2551443;
  const now = new Date(date.getTime());
  const newMoon = new Date(1970, 0, 7, 20, 35, 0);
  const phase = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
  const phasePercent = phase / lp;
  
  let name = "";
  if (phasePercent < 0.0625 || phasePercent > 0.9375) name = "New Moon";
  else if (phasePercent < 0.1875) name = "Waxing Crescent";
  else if (phasePercent < 0.3125) name = "First Quarter";
  else if (phasePercent < 0.4375) name = "Waxing Gibbous";
  else if (phasePercent < 0.5625) name = "Full Moon";
  else if (phasePercent < 0.6875) name = "Waning Gibbous";
  else if (phasePercent < 0.8125) name = "Last Quarter";
  else name = "Waning Crescent";

  return { phase: phasePercent, name };
};
