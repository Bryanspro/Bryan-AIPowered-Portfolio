
import React from 'react';
import { NumeralSystem, Theme, THEME_CONFIG } from '../types';
import { toRoman, getMoonPhase } from '../utils';

interface AnalogClockProps {
  time: Date;
  numeralSystem: NumeralSystem;
  theme: Theme;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time, numeralSystem, theme }) => {
  const colors = THEME_CONFIG[theme];
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  const moon = getMoonPhase(time);

  const secondsDeg = (seconds / 60) * 360;
  const minutesDeg = ((minutes + seconds / 60) / 60) * 360;
  const hoursDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  const markers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
      {/* Outer Rim */}
      <div 
        className="absolute inset-0 border-8 border-neutral-800 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.6)] bg-[#0c0c0c]"
        style={{ borderColor: `${colors.primary}22` }}
      ></div>
      
      {/* Clock Face SVG */}
      <svg viewBox="0 0 400 400" className="w-full h-full transform transition-all duration-700">
        {/* Markers */}
        {markers.map((num) => {
          const angle = (num * 30) * (Math.PI / 180);
          const x = 200 + 155 * Math.sin(angle);
          const y = 200 - 155 * Math.cos(angle);
          const label = numeralSystem === NumeralSystem.ROMAN ? toRoman(num) : num.toString();

          return (
            <text
              key={num}
              x={x}
              y={y}
              fill={colors.accent}
              fontSize={numeralSystem === NumeralSystem.ROMAN ? "24" : "28"}
              fontWeight="300"
              textAnchor="middle"
              dominantBaseline="middle"
              className={`${numeralSystem === NumeralSystem.ROMAN ? 'font-serif' : 'font-sans'} transition-all duration-500 opacity-60 hover:opacity-100`}
            >
              {label}
            </text>
          );
        })}

        {/* Hour Hand */}
        <line
          x1="200" y1="200"
          x2={200 + 80 * Math.sin(hoursDeg * Math.PI / 180)}
          y2={200 - 80 * Math.cos(hoursDeg * Math.PI / 180)}
          stroke={colors.accent}
          strokeWidth="6"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Minute Hand */}
        <line
          x1="200" y1="200"
          x2={200 + 120 * Math.sin(minutesDeg * Math.PI / 180)}
          y2={200 - 120 * Math.cos(minutesDeg * Math.PI / 180)}
          stroke={colors.secondary}
          strokeWidth="4"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Second Hand */}
        <line
          x1="200" y1="200"
          x2={200 + 140 * Math.sin(secondsDeg * Math.PI / 180)}
          y2={200 - 140 * Math.cos(secondsDeg * Math.PI / 180)}
          stroke={colors.primary}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Center Pin */}
        <circle cx="200" cy="200" r="6" fill="#000" stroke={colors.accent} strokeWidth="1" />
        <circle cx="200" cy="200" r="2" fill={colors.primary} />

        {/* Moon Phase */}
        <g transform="translate(180, 260)">
          <circle cx="20" cy="20" r="15" fill="#0c0c0c" stroke={colors.primary} strokeWidth="0.5" opacity="0.2" />
          <text 
            x="20" y="45" 
            fill={colors.accent} 
            fontSize="8" 
            textAnchor="middle" 
            className="uppercase tracking-[0.2em] opacity-30 font-bold"
          >
            {moon.name}
          </text>
          {/* Simple Moon Icon */}
          <path 
            d="M20 10 A10 10 0 1 1 20 30 A10 10 0 1 0 20 10" 
            fill={colors.primary} 
            opacity="0.6"
            transform={`rotate(${moon.phase * 360}, 20, 20)`}
          />
        </g>

        {/* Date Window */}
        <g transform="translate(280, 185)">
          <rect width="40" height="30" rx="4" fill="#0c0c0c" stroke={colors.primary} strokeWidth="0.5" opacity="0.3" />
          <text 
            x="20" y="15" 
            fill={colors.primary} 
            fontSize="16" 
            fontWeight="bold" 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="font-mono opacity-80"
          >
            {time.getDate()}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AnalogClock;
