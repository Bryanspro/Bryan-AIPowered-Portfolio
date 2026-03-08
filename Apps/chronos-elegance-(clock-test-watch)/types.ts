
export enum NumeralSystem {
  ARABIC = 'Arabic',
  ROMAN = 'Roman'
}

export enum DisplayMode {
  ANALOG = 'Analog',
  DIGITAL = 'Digital',
  STOPWATCH = 'Stopwatch',
  TIMER = 'Timer',
  WORLD = 'World',
  ALARM = 'Alarm',
  FOCUS = 'Focus'
}

export interface WorldTime {
  id: string;
  city: string;
  timezone: string;
}

export interface Alarm {
  id: string;
  time: string; // HH:mm
  enabled: boolean;
}

export enum Theme {
  GOLD = 'Gold',
  MIDNIGHT = 'Midnight',
  CRIMSON = 'Crimson',
  EMERALD = 'Emerald'
}

export interface ClockSettings {
  numeralSystem: NumeralSystem;
  displayMode: DisplayMode;
  theme: Theme;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  text: string;
}

export const THEME_CONFIG: Record<Theme, ThemeColors> = {
  [Theme.GOLD]: {
    primary: '#D4AF37', // Metallic Gold
    secondary: '#F5E6BE',
    accent: '#ffffff',
    glow: 'rgba(212, 175, 55, 0.15)',
    text: 'text-amber-200'
  },
  [Theme.MIDNIGHT]: {
    primary: '#3b82f6', // Bright Blue
    secondary: '#93c5fd',
    accent: '#ffffff',
    glow: 'rgba(59, 130, 246, 0.15)',
    text: 'text-blue-200'
  },
  [Theme.CRIMSON]: {
    primary: '#ef4444', // Red
    secondary: '#fecaca',
    accent: '#ffffff',
    glow: 'rgba(239, 68, 68, 0.15)',
    text: 'text-red-200'
  },
  [Theme.EMERALD]: {
    primary: '#10b981', // Emerald Green
    secondary: '#a7f3d0',
    accent: '#ffffff',
    glow: 'rgba(16, 185, 129, 0.15)',
    text: 'text-emerald-200'
  }
};
