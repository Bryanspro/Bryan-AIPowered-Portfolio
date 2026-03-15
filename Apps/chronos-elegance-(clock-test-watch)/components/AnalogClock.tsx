
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
  const minuteTicks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* Outer Rim */}
      <div
        className="absolute inset-0 border-8 border-neutral-800 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.6)] bg-[#0c0c0c]"
        style={{ borderColor: `${colors.primary}22` }}
      ></div>

      {/* Clock Face SVG */}
      <svg viewBox="0 0 400 400" className="w-full h-full transform transition-all duration-700">
        <defs>
          <filter id="hand-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="second-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Decorative inner rings */}
        <circle cx="200" cy="200" r="172" fill="none" stroke={colors.primary} strokeWidth="0.5" opacity="0.12" />
        <circle cx="200" cy="200" r="168" fill="none" stroke={colors.primary} strokeWidth="0.3" opacity="0.07" />

        {/* Tick marks — minute (thin) and hour (thick) */}
        {minuteTicks.map((i) => {
          const isHour = i % 5 === 0;
          const angle = (i * 6) * (Math.PI / 180);
          const innerR = isHour ? 148 : 155;
          const outerR = 163;
          const x1 = 200 + innerR * Math.sin(angle);
          const y1 = 200 - innerR * Math.cos(angle);
          const x2 = 200 + outerR * Math.sin(angle);
          const y2 = 200 - outerR * Math.cos(angle);
          return (
            <line
              key={`tick-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={colors.primary}
              strokeWidth={isHour ? '2.5' : '1'}
              opacity={isHour ? '0.6' : '0.2'}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour numerals (pulled inward slightly from tick ring) */}
        {markers.map((num) => {
          const angle = (num * 30) * (Math.PI / 180);
          const x = 200 + 130 * Math.sin(angle);
          const y = 200 - 130 * Math.cos(angle);
          const label = numeralSystem === NumeralSystem.ROMAN ? toRoman(num) : num.toString();
          return (
            <text
              key={num}
              x={x}
              y={y}
              fill={colors.accent}
              fontSize={numeralSystem === NumeralSystem.ROMAN ? '20' : '24'}
              fontWeight="300"
              textAnchor="middle"
              dominantBaseline="middle"
              className={`${numeralSystem === NumeralSystem.ROMAN ? 'font-serif' : 'font-sans'} transition-all duration-500 opacity-70 hover:opacity-100`}
            >
              {label}
            </text>
          );
        })}

        {/* Hour Hand (with short back-tail for balance) */}
        <line
          x1={200 - 18 * Math.sin(hoursDeg * Math.PI / 180)}
          y1={200 + 18 * Math.cos(hoursDeg * Math.PI / 180)}
          x2={200 + 80 * Math.sin(hoursDeg * Math.PI / 180)}
          y2={200 - 80 * Math.cos(hoursDeg * Math.PI / 180)}
          stroke={colors.accent}
          strokeWidth="7"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          filter="url(#hand-glow)"
        />

        {/* Minute Hand (with short back-tail) */}
        <line
          x1={200 - 22 * Math.sin(minutesDeg * Math.PI / 180)}
          y1={200 + 22 * Math.cos(minutesDeg * Math.PI / 180)}
          x2={200 + 118 * Math.sin(minutesDeg * Math.PI / 180)}
          y2={200 - 118 * Math.cos(minutesDeg * Math.PI / 180)}
          stroke={colors.secondary}
          strokeWidth="4.5"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          filter="url(#hand-glow)"
        />

        {/* Second Hand — classic tail counterbalance */}
        <line
          x1={200 + 30 * Math.sin((secondsDeg + 180) * Math.PI / 180)}
          y1={200 - 30 * Math.cos((secondsDeg + 180) * Math.PI / 180)}
          x2={200 + 140 * Math.sin(secondsDeg * Math.PI / 180)}
          y2={200 - 140 * Math.cos(secondsDeg * Math.PI / 180)}
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#second-glow)"
        />

        {/* Center Pin */}
        <circle cx="200" cy="200" r="9" fill="#111" stroke={colors.primary} strokeWidth="1.5" />
        <circle cx="200" cy="200" r="4" fill={colors.primary} />

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
          <path
            d="M20 10 A10 10 0 1 1 20 30 A10 10 0 1 0 20 10"
            fill={colors.primary}
            opacity="0.6"
            transform={`rotate(${moon.phase * 360}, 20, 20)`}
          />
        </g>

        {/* Date Window — between 4 and 5 o'clock */}
        <g transform="translate(245, 250)">
          <rect width="44" height="28" rx="4" fill="#0c0c0c" stroke={colors.primary} strokeWidth="1" opacity="0.7" />
          <text
            x="22" y="14"
            fill={colors.primary}
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-mono opacity-90"
          >
            {time.getDate()}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AnalogClock;
