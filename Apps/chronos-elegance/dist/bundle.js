// index.tsx
import React7 from "react";
import ReactDOM from "react-dom/client";

// App.tsx
import { useState as useState6, useEffect as useEffect5 } from "react";

// types.ts
var NumeralSystem = /* @__PURE__ */ ((NumeralSystem2) => {
  NumeralSystem2["ARABIC"] = "Arabic";
  NumeralSystem2["ROMAN"] = "Roman";
  return NumeralSystem2;
})(NumeralSystem || {});
var DisplayMode = /* @__PURE__ */ ((DisplayMode2) => {
  DisplayMode2["ANALOG"] = "Analog";
  DisplayMode2["DIGITAL"] = "Digital";
  DisplayMode2["STOPWATCH"] = "Stopwatch";
  DisplayMode2["TIMER"] = "Timer";
  DisplayMode2["WORLD"] = "World";
  DisplayMode2["ALARM"] = "Alarm";
  DisplayMode2["FOCUS"] = "Focus";
  return DisplayMode2;
})(DisplayMode || {});
var Theme = /* @__PURE__ */ ((Theme9) => {
  Theme9["GOLD"] = "Gold";
  Theme9["MIDNIGHT"] = "Midnight";
  Theme9["CRIMSON"] = "Crimson";
  Theme9["EMERALD"] = "Emerald";
  return Theme9;
})(Theme || {});
var THEME_CONFIG = {
  ["Gold" /* GOLD */]: {
    primary: "#D4AF37",
    // Metallic Gold
    secondary: "#F5E6BE",
    accent: "#ffffff",
    glow: "rgba(212, 175, 55, 0.15)",
    text: "text-amber-200"
  },
  ["Midnight" /* MIDNIGHT */]: {
    primary: "#3b82f6",
    // Bright Blue
    secondary: "#93c5fd",
    accent: "#ffffff",
    glow: "rgba(59, 130, 246, 0.15)",
    text: "text-blue-200"
  },
  ["Crimson" /* CRIMSON */]: {
    primary: "#ef4444",
    // Red
    secondary: "#fecaca",
    accent: "#ffffff",
    glow: "rgba(239, 68, 68, 0.15)",
    text: "text-red-200"
  },
  ["Emerald" /* EMERALD */]: {
    primary: "#10b981",
    // Emerald Green
    secondary: "#a7f3d0",
    accent: "#ffffff",
    glow: "rgba(16, 185, 129, 0.15)",
    text: "text-emerald-200"
  }
};

// utils.ts
var toRoman = (num) => {
  const romanMap = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII"
  };
  return romanMap[num] || num.toString();
};
var formatTwoDigits = (num) => {
  return num.toString().padStart(2, "0");
};
var formatTimeMs = (ms) => {
  const minutes = Math.floor(ms / 6e4);
  const seconds = Math.floor(ms % 6e4 / 1e3);
  const centiseconds = Math.floor(ms % 1e3 / 10);
  return `${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}.${formatTwoDigits(centiseconds)}`;
};
var formatTimeSeconds = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
  }
  return `${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
};
var getTimeInTimezone = (timezone) => {
  const date = /* @__PURE__ */ new Date();
  const invdate = new Date(date.toLocaleString("en-US", {
    timeZone: timezone
  }));
  return invdate;
};
var getMoonPhase = (date) => {
  const lp = 2551443;
  const now = new Date(date.getTime());
  const newMoon = new Date(1970, 0, 7, 20, 35, 0);
  const phase = (now.getTime() - newMoon.getTime()) / 1e3 % lp;
  const phasePercent = phase / lp;
  let name = "";
  if (phasePercent < 0.0625 || phasePercent > 0.9375)
    name = "New Moon";
  else if (phasePercent < 0.1875)
    name = "Waxing Crescent";
  else if (phasePercent < 0.3125)
    name = "First Quarter";
  else if (phasePercent < 0.4375)
    name = "Waxing Gibbous";
  else if (phasePercent < 0.5625)
    name = "Full Moon";
  else if (phasePercent < 0.6875)
    name = "Waning Gibbous";
  else if (phasePercent < 0.8125)
    name = "Last Quarter";
  else
    name = "Waning Crescent";
  return { phase: phasePercent, name };
};

// components/AnalogClock.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var AnalogClock = ({ time, numeralSystem, theme }) => {
  const colors = THEME_CONFIG[theme];
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  const moon = getMoonPhase(time);
  const secondsDeg = seconds / 60 * 360;
  const minutesDeg = (minutes + seconds / 60) / 60 * 360;
  const hoursDeg = (hours % 12 + minutes / 60) / 12 * 360;
  const markers = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteTicks = Array.from({ length: 60 }, (_, i) => i);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 border-8 border-neutral-800 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.6)] bg-[#0c0c0c]",
        style: { borderColor: `${colors.primary}22` }
      }
    ),
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 400 400", className: "w-full h-full transform transition-all duration-700", children: [
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsxs("filter", { id: "hand-glow", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
          /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "3", result: "blur" }),
          /* @__PURE__ */ jsxs("feMerge", { children: [
            /* @__PURE__ */ jsx("feMergeNode", { in: "blur" }),
            /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("filter", { id: "second-glow", x: "-100%", y: "-100%", width: "300%", height: "300%", children: [
          /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "2", result: "blur" }),
          /* @__PURE__ */ jsxs("feMerge", { children: [
            /* @__PURE__ */ jsx("feMergeNode", { in: "blur" }),
            /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("circle", { cx: "200", cy: "200", r: "172", fill: "none", stroke: colors.primary, strokeWidth: "0.5", opacity: "0.12" }),
      /* @__PURE__ */ jsx("circle", { cx: "200", cy: "200", r: "168", fill: "none", stroke: colors.primary, strokeWidth: "0.3", opacity: "0.07" }),
      minuteTicks.map((i) => {
        const isHour = i % 5 === 0;
        const angle = i * 6 * (Math.PI / 180);
        const innerR = isHour ? 148 : 155;
        const outerR = 163;
        const x1 = 200 + innerR * Math.sin(angle);
        const y1 = 200 - innerR * Math.cos(angle);
        const x2 = 200 + outerR * Math.sin(angle);
        const y2 = 200 - outerR * Math.cos(angle);
        return /* @__PURE__ */ jsx(
          "line",
          {
            x1,
            y1,
            x2,
            y2,
            stroke: colors.primary,
            strokeWidth: isHour ? "2.5" : "1",
            opacity: isHour ? "0.6" : "0.2",
            strokeLinecap: "round"
          },
          `tick-${i}`
        );
      }),
      markers.map((num) => {
        const angle = num * 30 * (Math.PI / 180);
        const x = 200 + 130 * Math.sin(angle);
        const y = 200 - 130 * Math.cos(angle);
        const label = numeralSystem === "Roman" /* ROMAN */ ? toRoman(num) : num.toString();
        return /* @__PURE__ */ jsx(
          "text",
          {
            x,
            y,
            fill: colors.accent,
            fontSize: numeralSystem === "Roman" /* ROMAN */ ? "20" : "24",
            fontWeight: "300",
            textAnchor: "middle",
            dominantBaseline: "middle",
            className: `${numeralSystem === "Roman" /* ROMAN */ ? "font-serif" : "font-sans"} transition-all duration-500 opacity-70 hover:opacity-100`,
            children: label
          },
          num
        );
      }),
      /* @__PURE__ */ jsx(
        "line",
        {
          x1: 200 - 18 * Math.sin(hoursDeg * Math.PI / 180),
          y1: 200 + 18 * Math.cos(hoursDeg * Math.PI / 180),
          x2: 200 + 80 * Math.sin(hoursDeg * Math.PI / 180),
          y2: 200 - 80 * Math.cos(hoursDeg * Math.PI / 180),
          stroke: colors.accent,
          strokeWidth: "7",
          strokeLinecap: "round",
          className: "transition-all duration-1000 ease-out",
          filter: "url(#hand-glow)"
        }
      ),
      /* @__PURE__ */ jsx(
        "line",
        {
          x1: 200 - 22 * Math.sin(minutesDeg * Math.PI / 180),
          y1: 200 + 22 * Math.cos(minutesDeg * Math.PI / 180),
          x2: 200 + 118 * Math.sin(minutesDeg * Math.PI / 180),
          y2: 200 - 118 * Math.cos(minutesDeg * Math.PI / 180),
          stroke: colors.secondary,
          strokeWidth: "4.5",
          strokeLinecap: "round",
          className: "transition-all duration-1000 ease-out",
          filter: "url(#hand-glow)"
        }
      ),
      /* @__PURE__ */ jsx(
        "line",
        {
          x1: 200 + 30 * Math.sin((secondsDeg + 180) * Math.PI / 180),
          y1: 200 - 30 * Math.cos((secondsDeg + 180) * Math.PI / 180),
          x2: 200 + 140 * Math.sin(secondsDeg * Math.PI / 180),
          y2: 200 - 140 * Math.cos(secondsDeg * Math.PI / 180),
          stroke: colors.primary,
          strokeWidth: "1.5",
          strokeLinecap: "round",
          filter: "url(#second-glow)"
        }
      ),
      /* @__PURE__ */ jsx("circle", { cx: "200", cy: "200", r: "9", fill: "#111", stroke: colors.primary, strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx("circle", { cx: "200", cy: "200", r: "4", fill: colors.primary }),
      /* @__PURE__ */ jsxs("g", { transform: "translate(180, 260)", children: [
        /* @__PURE__ */ jsx("circle", { cx: "20", cy: "20", r: "15", fill: "#0c0c0c", stroke: colors.primary, strokeWidth: "0.5", opacity: "0.2" }),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: "20",
            y: "45",
            fill: colors.accent,
            fontSize: "8",
            textAnchor: "middle",
            className: "uppercase tracking-[0.2em] opacity-30 font-bold",
            children: moon.name
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M20 10 A10 10 0 1 1 20 30 A10 10 0 1 0 20 10",
            fill: colors.primary,
            opacity: "0.6",
            transform: `rotate(${moon.phase * 360}, 20, 20)`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("g", { transform: "translate(245, 250)", children: [
        /* @__PURE__ */ jsx("rect", { width: "44", height: "28", rx: "4", fill: "#0c0c0c", stroke: colors.primary, strokeWidth: "1", opacity: "0.7" }),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: "22",
            y: "14",
            fill: colors.primary,
            fontSize: "14",
            fontWeight: "bold",
            textAnchor: "middle",
            dominantBaseline: "middle",
            className: "font-mono opacity-90",
            children: time.getDate()
          }
        )
      ] })
    ] })
  ] });
};
var AnalogClock_default = AnalogClock;

// components/DigitalClock.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DigitalClock = ({ time, numeralSystem, theme }) => {
  const colors = THEME_CONFIG[theme];
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const amPm = hours >= 12 ? "PM" : "AM";
  const renderPart = (val, isHour = false) => {
    if (numeralSystem === "Roman" /* ROMAN */) {
      if (isHour)
        return toRoman(val % 12 || 12);
      return val === 0 ? "0" : toRoman(val);
    }
    return formatTwoDigits(isHour ? val % 12 || 12 : val);
  };
  const numeralClass = numeralSystem === "Roman" /* ROMAN */ ? "font-serif" : "font-mono";
  const dayProgress = (hours * 3600 + minutes * 60 + seconds) / 86400 * 100;
  return /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center justify-center space-y-8 w-full max-w-xl", children: [
    /* @__PURE__ */ jsxs2("div", { className: `flex items-baseline space-x-4 text-white text-6xl md:text-8xl tracking-tight transition-all duration-500 ${numeralClass}`, children: [
      /* @__PURE__ */ jsx2("div", { className: "min-w-[2ch] text-center", children: renderPart(hours, true) }),
      /* @__PURE__ */ jsx2("div", { className: "animate-pulse opacity-30", style: { color: colors.primary }, children: ":" }),
      /* @__PURE__ */ jsx2("div", { className: "min-w-[2ch] text-center", children: renderPart(minutes) }),
      /* @__PURE__ */ jsxs2("div", { className: "hidden md:flex items-baseline space-x-2", children: [
        /* @__PURE__ */ jsx2("div", { className: "animate-pulse opacity-30 text-4xl md:text-6xl", style: { color: colors.primary }, children: ":" }),
        /* @__PURE__ */ jsx2("div", { className: "text-4xl md:text-6xl min-w-[2ch]", style: { color: colors.primary }, children: renderPart(seconds) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "w-full flex flex-col gap-2 px-12", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex justify-between text-[8px] uppercase tracking-[0.3em] text-neutral-600 font-bold", children: [
        /* @__PURE__ */ jsx2("span", { children: "Sunrise" }),
        /* @__PURE__ */ jsx2("span", { children: "Sunset" })
      ] }),
      /* @__PURE__ */ jsx2("div", { className: "h-[2px] w-full bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx2(
        "div",
        {
          className: "h-full transition-all duration-1000 ease-linear",
          style: {
            width: `${dayProgress}%`,
            backgroundColor: colors.primary,
            boxShadow: `0 0 10px ${colors.primary}`
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "text-neutral-500 text-xl font-medium tracking-[0.2em] flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx2("span", { style: { color: colors.secondary }, className: "opacity-80", children: amPm }),
      /* @__PURE__ */ jsx2("span", { className: "h-1 w-1 rounded-full bg-neutral-800" }),
      /* @__PURE__ */ jsx2("span", { className: "uppercase text-xs tracking-[0.3em] opacity-40", children: time.toLocaleDateString(void 0, { weekday: "long", month: "short", day: "numeric" }) })
    ] })
  ] });
};
var DigitalClock_default = DigitalClock;

// components/Stopwatch.tsx
import { useState, useEffect, useRef } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var Stopwatch = ({ theme }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
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
      if (timerRef.current)
        clearInterval(timerRef.current);
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
      if (timerRef.current)
        clearInterval(timerRef.current);
    };
  }, []);
  const colors = THEME_CONFIG[theme];
  return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-12 w-full max-w-md", children: [
    /* @__PURE__ */ jsx3("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ jsxs3("div", { className: "w-72 h-72 rounded-full border-2 border-white/5 flex items-center justify-center relative", children: [
      /* @__PURE__ */ jsx3(
        "div",
        {
          className: "absolute inset-0 rounded-full border-t-2 transition-all duration-300",
          style: {
            borderColor: colors.primary,
            transform: `rotate(${time % 6e4 / 6e4 * 360}deg)`,
            opacity: isRunning ? 1 : 0.3
          }
        }
      ),
      /* @__PURE__ */ jsx3("div", { className: "text-6xl font-mono tracking-tighter", style: { color: colors.primary }, children: formatTimeMs(time) })
    ] }) }),
    /* @__PURE__ */ jsxs3("div", { className: "flex gap-4 w-full", children: [
      /* @__PURE__ */ jsx3(
        "button",
        {
          onClick: isRunning ? stop : start,
          className: "flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95",
          style: {
            backgroundColor: isRunning ? "rgba(239, 68, 68, 0.1)" : `${colors.primary}20`,
            color: isRunning ? "#ef4444" : colors.primary,
            border: `1px solid ${isRunning ? "rgba(239, 68, 68, 0.2)" : `${colors.primary}40`}`
          },
          children: isRunning ? "Stop" : "Start"
        }
      ),
      /* @__PURE__ */ jsx3(
        "button",
        {
          onClick: isRunning ? lap : reset,
          className: "flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 bg-white/5 text-white/60 border border-white/10 hover:bg-white/10",
          children: isRunning ? "Lap" : "Reset"
        }
      )
    ] }),
    laps.length > 0 && /* @__PURE__ */ jsx3("div", { className: "w-full max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar", children: laps.map((lapTime, index) => /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-center py-3 px-4 bg-white/5 rounded-xl border border-white/5", children: [
      /* @__PURE__ */ jsxs3("span", { className: "text-[10px] uppercase tracking-widest text-neutral-500 font-bold", children: [
        "Lap ",
        laps.length - index
      ] }),
      /* @__PURE__ */ jsx3("span", { className: "font-mono text-sm text-neutral-300", children: formatTimeMs(lapTime) })
    ] }, index)) })
  ] });
};
var Stopwatch_default = Stopwatch;

// components/Timer.tsx
import { useState as useState2, useEffect as useEffect2, useRef as useRef2 } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var Timer = ({ theme }) => {
  const [seconds, setSeconds] = useState2(0);
  const [isRunning, setIsRunning] = useState2(false);
  const [inputMinutes, setInputMinutes] = useState2(0);
  const [inputSeconds, setInputSeconds] = useState2(0);
  const timerRef = useRef2(null);
  const start = () => {
    if (seconds > 0 && !isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            stop();
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    }
  };
  const stop = () => {
    setIsRunning(false);
    if (timerRef.current)
      clearInterval(timerRef.current);
  };
  const reset = () => {
    stop();
    setSeconds(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };
  const setTime = () => {
    const total = inputMinutes * 60 + inputSeconds;
    setSeconds(total);
  };
  useEffect2(() => {
    return () => {
      if (timerRef.current)
        clearInterval(timerRef.current);
    };
  }, []);
  const colors = THEME_CONFIG[theme];
  return /* @__PURE__ */ jsx4("div", { className: "flex flex-col items-center gap-12 w-full max-w-md", children: seconds === 0 && !isRunning ? /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center gap-8 w-full", children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex gap-4 items-center justify-center w-full", children: [
      /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx4("span", { className: "text-[10px] uppercase tracking-widest text-neutral-500 font-bold", children: "Min" }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "number",
            min: "0",
            max: "99",
            value: inputMinutes,
            onChange: (e) => setInputMinutes(Math.min(99, Math.max(0, parseInt(e.target.value) || 0))),
            className: "w-20 h-20 bg-black/40 border border-white/10 rounded-2xl text-center text-3xl font-mono focus:outline-none focus:border-white/30 transition-all",
            style: { color: colors.primary }
          }
        )
      ] }),
      /* @__PURE__ */ jsx4("span", { className: "text-3xl opacity-20 mt-6", children: ":" }),
      /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx4("span", { className: "text-[10px] uppercase tracking-widest text-neutral-500 font-bold", children: "Sec" }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "number",
            min: "0",
            max: "59",
            value: inputSeconds,
            onChange: (e) => setInputSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0))),
            className: "w-20 h-20 bg-black/40 border border-white/10 rounded-2xl text-center text-3xl font-mono focus:outline-none focus:border-white/30 transition-all",
            style: { color: colors.primary }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx4(
      "button",
      {
        onClick: setTime,
        disabled: inputMinutes === 0 && inputSeconds === 0,
        className: "w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none",
        style: {
          backgroundColor: `${colors.primary}20`,
          color: colors.primary,
          border: `1px solid ${colors.primary}40`
        },
        children: "Set Timer"
      }
    )
  ] }) : /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center gap-12 w-full", children: [
    /* @__PURE__ */ jsx4("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ jsxs4("div", { className: "w-72 h-72 rounded-full border-2 border-white/5 flex items-center justify-center relative", children: [
      /* @__PURE__ */ jsx4(
        "div",
        {
          className: "absolute inset-0 rounded-full border-t-2 transition-all duration-1000",
          style: {
            borderColor: colors.primary,
            transform: `rotate(${seconds / (inputMinutes * 60 + inputSeconds) * 360}deg)`,
            opacity: isRunning ? 1 : 0.3
          }
        }
      ),
      /* @__PURE__ */ jsx4("div", { className: "text-6xl font-mono tracking-tighter", style: { color: colors.primary }, children: formatTimeSeconds(seconds) })
    ] }) }),
    /* @__PURE__ */ jsxs4("div", { className: "flex gap-4 w-full", children: [
      /* @__PURE__ */ jsx4(
        "button",
        {
          onClick: isRunning ? stop : start,
          className: "flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95",
          style: {
            backgroundColor: isRunning ? "rgba(239, 68, 68, 0.1)" : `${colors.primary}20`,
            color: isRunning ? "#ef4444" : colors.primary,
            border: `1px solid ${isRunning ? "rgba(239, 68, 68, 0.2)" : `${colors.primary}40`}`
          },
          children: isRunning ? "Pause" : "Resume"
        }
      ),
      /* @__PURE__ */ jsx4(
        "button",
        {
          onClick: reset,
          className: "flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 bg-white/5 text-white/60 border border-white/10 hover:bg-white/10",
          children: "Cancel"
        }
      )
    ] })
  ] }) });
};
var Timer_default = Timer;

// components/WorldClock.tsx
import { useState as useState3, useEffect as useEffect3 } from "react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var DEFAULT_CITIES = [
  { id: "1", city: "London", timezone: "Europe/London" },
  { id: "2", city: "New York", timezone: "America/New_York" },
  { id: "3", city: "Tokyo", timezone: "Asia/Tokyo" },
  { id: "4", city: "Dubai", timezone: "Asia/Dubai" },
  { id: "5", city: "Sydney", timezone: "Australia/Sydney" }
];
var WorldClock = ({ theme }) => {
  const [times, setTimes] = useState3({});
  useEffect3(() => {
    const updateTimes = () => {
      const newTimes = {};
      DEFAULT_CITIES.forEach((city) => {
        newTimes[city.id] = getTimeInTimezone(city.timezone);
      });
      setTimes(newTimes);
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1e3);
    return () => clearInterval(interval);
  }, []);
  const colors = THEME_CONFIG[theme];
  return /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl", children: DEFAULT_CITIES.map((city) => {
    const time = times[city.id];
    if (!time)
      return null;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return /* @__PURE__ */ jsxs5(
      "div",
      {
        className: "group relative p-6 bg-black/40 border border-white/5 rounded-3xl overflow-hidden transition-all hover:border-white/20 hover:bg-black/60",
        children: [
          /* @__PURE__ */ jsx5(
            "div",
            {
              className: "absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity",
              style: { backgroundColor: colors.primary }
            }
          ),
          /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-end", children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx5("span", { className: "text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold", children: city.city }),
              /* @__PURE__ */ jsxs5("div", { className: "flex items-baseline gap-2", children: [
                /* @__PURE__ */ jsxs5("span", { className: "text-3xl font-mono tracking-tighter", style: { color: colors.primary }, children: [
                  formatTwoDigits(displayHours),
                  ":",
                  formatTwoDigits(minutes)
                ] }),
                /* @__PURE__ */ jsx5("span", { className: "text-[10px] font-bold text-neutral-600", children: ampm })
              ] })
            ] }),
            /* @__PURE__ */ jsx5("div", { className: "text-right", children: /* @__PURE__ */ jsxs5("span", { className: "text-[10px] text-neutral-700 font-mono", children: [
              ":",
              formatTwoDigits(seconds)
            ] }) })
          ] })
        ]
      },
      city.id
    );
  }) });
};
var WorldClock_default = WorldClock;

// components/Alarm.tsx
import { useState as useState4 } from "react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var Alarm = ({ theme, alarms, onAddAlarm, onToggleAlarm, onDeleteAlarm }) => {
  const [newAlarmTime, setNewAlarmTime] = useState4("08:00");
  const colors = THEME_CONFIG[theme];
  return /* @__PURE__ */ jsxs6("div", { className: "flex flex-col items-center gap-8 w-full max-w-md", children: [
    /* @__PURE__ */ jsxs6("div", { className: "w-full flex gap-4 p-6 bg-black/40 border border-white/5 rounded-3xl", children: [
      /* @__PURE__ */ jsx6(
        "input",
        {
          type: "time",
          value: newAlarmTime,
          onChange: (e) => setNewAlarmTime(e.target.value),
          className: "flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xl font-mono focus:outline-none focus:border-white/30 transition-all",
          style: { color: colors.primary }
        }
      ),
      /* @__PURE__ */ jsx6(
        "button",
        {
          onClick: () => onAddAlarm(newAlarmTime),
          className: "px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95",
          style: {
            backgroundColor: `${colors.primary}20`,
            color: colors.primary,
            border: `1px solid ${colors.primary}40`
          },
          children: "Add"
        }
      )
    ] }),
    /* @__PURE__ */ jsx6("div", { className: "w-full space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar", children: alarms.length === 0 ? /* @__PURE__ */ jsx6("div", { className: "text-center py-12 text-neutral-600 text-xs uppercase tracking-[0.2em]", children: "No alarms set" }) : alarms.map((alarm) => /* @__PURE__ */ jsxs6(
      "div",
      {
        className: `flex justify-between items-center p-5 bg-black/40 border rounded-2xl transition-all ${alarm.enabled ? "border-white/10" : "border-white/5 opacity-50"}`,
        children: [
          /* @__PURE__ */ jsx6("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsx6("span", { className: "text-2xl font-mono tracking-tighter", style: { color: alarm.enabled ? colors.primary : "inherit" }, children: alarm.time }) }),
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx6(
              "button",
              {
                onClick: () => onToggleAlarm(alarm.id),
                className: `w-12 h-6 rounded-full relative transition-all ${alarm.enabled ? "" : "bg-neutral-800"}`,
                style: { backgroundColor: alarm.enabled ? colors.primary : void 0 },
                children: /* @__PURE__ */ jsx6(
                  "div",
                  {
                    className: `absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${alarm.enabled ? "left-7" : "left-1"}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx6(
              "button",
              {
                onClick: () => onDeleteAlarm(alarm.id),
                className: "text-neutral-600 hover:text-red-500 transition-colors",
                children: /* @__PURE__ */ jsxs6("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx6("path", { d: "M3 6h18" }),
                  /* @__PURE__ */ jsx6("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
                  /* @__PURE__ */ jsx6("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" })
                ] })
              }
            )
          ] })
        ]
      },
      alarm.id
    )) })
  ] });
};
var Alarm_default = Alarm;

// components/FocusMode.tsx
import { useState as useState5, useEffect as useEffect4, useRef as useRef3 } from "react";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var FocusMode = ({ theme }) => {
  const [seconds, setSeconds] = useState5(25 * 60);
  const [isRunning, setIsRunning] = useState5(false);
  const [mode, setMode] = useState5("work");
  const timerRef = useRef3(null);
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            handleModeSwitch();
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    }
  };
  const stop = () => {
    setIsRunning(false);
    if (timerRef.current)
      clearInterval(timerRef.current);
  };
  const reset = () => {
    stop();
    setSeconds(mode === "work" ? 25 * 60 : 5 * 60);
  };
  const handleModeSwitch = () => {
    stop();
    const nextMode = mode === "work" ? "break" : "work";
    setMode(nextMode);
    setSeconds(nextMode === "work" ? 25 * 60 : 5 * 60);
    alert(nextMode === "work" ? "Time to work!" : "Time for a break!");
  };
  useEffect4(() => {
    return () => {
      if (timerRef.current)
        clearInterval(timerRef.current);
    };
  }, []);
  const colors = THEME_CONFIG[theme];
  const totalSeconds = mode === "work" ? 25 * 60 : 5 * 60;
  const progress = seconds / totalSeconds * 100;
  return /* @__PURE__ */ jsxs7("div", { className: "flex flex-col items-center gap-12 w-full max-w-md", children: [
    /* @__PURE__ */ jsxs7("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsx7("span", { className: "text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold", children: mode === "work" ? "Focus Session" : "Short Break" }),
      /* @__PURE__ */ jsx7("div", { className: "h-1 w-12 rounded-full", style: { backgroundColor: colors.primary } })
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "relative flex items-center justify-center", children: [
      /* @__PURE__ */ jsxs7("svg", { className: "w-80 h-80 transform -rotate-90", children: [
        /* @__PURE__ */ jsx7(
          "circle",
          {
            cx: "160",
            cy: "160",
            r: "150",
            stroke: "currentColor",
            strokeWidth: "2",
            fill: "transparent",
            className: "text-white/5"
          }
        ),
        /* @__PURE__ */ jsx7(
          "circle",
          {
            cx: "160",
            cy: "160",
            r: "150",
            stroke: "currentColor",
            strokeWidth: "4",
            fill: "transparent",
            strokeDasharray: 2 * Math.PI * 150,
            strokeDashoffset: 2 * Math.PI * 150 * (1 - progress / 100),
            strokeLinecap: "round",
            style: { color: colors.primary },
            className: "transition-all duration-1000 ease-linear"
          }
        )
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2", children: /* @__PURE__ */ jsx7("div", { className: "text-7xl font-mono tracking-tighter", style: { color: colors.primary }, children: formatTimeSeconds(seconds) }) })
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "flex gap-4 w-full", children: [
      /* @__PURE__ */ jsx7(
        "button",
        {
          onClick: isRunning ? stop : start,
          className: "flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95",
          style: {
            backgroundColor: isRunning ? "rgba(239, 68, 68, 0.1)" : `${colors.primary}20`,
            color: isRunning ? "#ef4444" : colors.primary,
            border: `1px solid ${isRunning ? "rgba(239, 68, 68, 0.2)" : `${colors.primary}40`}`
          },
          children: isRunning ? "Pause" : "Start Focus"
        }
      ),
      /* @__PURE__ */ jsx7(
        "button",
        {
          onClick: reset,
          className: "flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 bg-white/5 text-white/60 border border-white/10 hover:bg-white/10",
          children: "Reset"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx7("div", { className: `w-2 h-2 rounded-full transition-all ${mode === "work" ? "scale-125" : "opacity-20"}`, style: { backgroundColor: colors.primary } }),
      /* @__PURE__ */ jsx7("div", { className: `w-2 h-2 rounded-full transition-all ${mode === "break" ? "scale-125" : "opacity-20"}`, style: { backgroundColor: colors.primary } })
    ] })
  ] });
};
var FocusMode_default = FocusMode;

// components/ClockControls.tsx
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
var ClockControls = ({
  numeralSystem,
  displayMode,
  theme,
  onNumeralChange,
  onModeChange,
  onThemeChange
}) => {
  return /* @__PURE__ */ jsx8("div", { className: "flex flex-col gap-8 items-center p-8 bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl mt-12 w-full max-w-2xl", children: /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 w-full", children: [
    /* @__PURE__ */ jsxs8("div", { className: "flex flex-col items-center gap-3 col-span-1 md:col-span-3", children: [
      /* @__PURE__ */ jsx8("span", { className: "text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold", children: "Display Mode" }),
      /* @__PURE__ */ jsx8("div", { className: "flex flex-wrap bg-black/40 p-1 rounded-xl border border-white/5 w-full justify-center gap-1", children: Object.values(DisplayMode).map((mode) => /* @__PURE__ */ jsx8(
        "button",
        {
          onClick: () => onModeChange(mode),
          className: `px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all rounded-lg ${displayMode === mode ? "bg-neutral-800 text-white shadow-lg" : "text-neutral-500 hover:text-white"}`,
          children: mode
        },
        mode
      )) })
    ] }),
    (displayMode === "Analog" /* ANALOG */ || displayMode === "Digital" /* DIGITAL */) && /* @__PURE__ */ jsxs8("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx8("span", { className: "text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold", children: "Numerals" }),
      /* @__PURE__ */ jsx8("div", { className: "flex bg-black/40 p-1 rounded-xl border border-white/5 w-full", children: Object.values(NumeralSystem).map((system) => /* @__PURE__ */ jsx8(
        "button",
        {
          onClick: () => onNumeralChange(system),
          className: `flex-1 px-3 py-2 text-xs font-semibold transition-all rounded-lg ${numeralSystem === system ? "bg-neutral-800 text-white shadow-lg" : "text-neutral-500 hover:text-white"}`,
          children: system
        },
        system
      )) })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: `flex flex-col items-center gap-3 ${displayMode === "Analog" /* ANALOG */ || displayMode === "Digital" /* DIGITAL */ ? "col-span-1 md:col-span-2" : "col-span-1 md:col-span-3"}`, children: [
      /* @__PURE__ */ jsx8("span", { className: "text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold", children: "Theme" }),
      /* @__PURE__ */ jsx8("div", { className: "flex bg-black/40 p-1 rounded-xl border border-white/5 w-full overflow-x-auto", children: Object.values(Theme).map((t) => /* @__PURE__ */ jsxs8(
        "button",
        {
          onClick: () => onThemeChange(t),
          className: `flex-1 px-3 py-2 text-xs font-semibold transition-all rounded-lg flex items-center justify-center gap-2 ${theme === t ? "bg-neutral-800 text-white shadow-lg" : "text-neutral-500 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsx8(
              "div",
              {
                className: "w-2 h-2 rounded-full",
                style: { backgroundColor: THEME_CONFIG[t].primary }
              }
            ),
            /* @__PURE__ */ jsx8("span", { className: "hidden lg:inline", children: t })
          ]
        },
        t
      )) })
    ] })
  ] }) });
};
var ClockControls_default = ClockControls;

// App.tsx
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
var App = () => {
  const [time, setTime] = useState6(/* @__PURE__ */ new Date());
  const [displayMode, setDisplayMode] = useState6("Analog" /* ANALOG */);
  const [numeralSystem, setNumeralSystem] = useState6("Arabic" /* ARABIC */);
  const [theme, setTheme] = useState6("Gold" /* GOLD */);
  const [alarms, setAlarms] = useState6([]);
  const [isFullscreen, setIsFullscreen] = useState6(false);
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
  useEffect5(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  useEffect5(() => {
    const timer = setInterval(() => {
      const now = /* @__PURE__ */ new Date();
      setTime(now);
      const currentTimeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const activeAlarm = alarms.find((a) => a.enabled && a.time === currentTimeStr && now.getSeconds() === 0);
      if (activeAlarm) {
        alert(`Alarm: ${activeAlarm.time}`);
      }
    }, 1e3);
    return () => clearInterval(timer);
  }, [alarms]);
  const addAlarm = (time2) => {
    setAlarms([...alarms, { id: Date.now().toString(), time: time2, enabled: true }]);
  };
  const toggleAlarm = (id) => {
    setAlarms(alarms.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };
  const deleteAlarm = (id) => {
    setAlarms(alarms.filter((a) => a.id !== id));
  };
  const currentThemeColors = THEME_CONFIG[theme];
  const renderClock = () => {
    switch (displayMode) {
      case "Analog" /* ANALOG */:
        return /* @__PURE__ */ jsx9(AnalogClock_default, { time, numeralSystem, theme });
      case "Digital" /* DIGITAL */:
        return /* @__PURE__ */ jsx9(DigitalClock_default, { time, numeralSystem, theme });
      case "Stopwatch" /* STOPWATCH */:
        return /* @__PURE__ */ jsx9(Stopwatch_default, { theme });
      case "Timer" /* TIMER */:
        return /* @__PURE__ */ jsx9(Timer_default, { theme });
      case "World" /* WORLD */:
        return /* @__PURE__ */ jsx9(WorldClock_default, { theme });
      case "Alarm" /* ALARM */:
        return /* @__PURE__ */ jsx9(
          Alarm_default,
          {
            theme,
            alarms,
            onAddAlarm: addAlarm,
            onToggleAlarm: toggleAlarm,
            onDeleteAlarm: deleteAlarm
          }
        );
      case "Focus" /* FOCUS */:
        return /* @__PURE__ */ jsx9(FocusMode_default, { theme });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs9("div", { className: "min-h-screen w-full bg-[#070707] text-white flex flex-col items-center relative transition-colors duration-1000 pt-16 pb-8 px-6", children: [
    /* @__PURE__ */ jsx9(
      "div",
      {
        className: "absolute top-[-20%] left-[-10%] w-[60%] h-[60%] blur-[160px] rounded-full transition-all duration-1000",
        style: { backgroundColor: currentThemeColors.glow }
      }
    ),
    /* @__PURE__ */ jsx9(
      "div",
      {
        className: "absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] blur-[160px] rounded-full transition-all duration-1000",
        style: { backgroundColor: currentThemeColors.glow, opacity: 0.5 }
      }
    ),
    /* @__PURE__ */ jsxs9("div", { className: "absolute top-6 left-0 right-0 flex flex-col items-center space-y-2 pointer-events-none z-30", children: [
      /* @__PURE__ */ jsx9("h1", { className: "text-3xl font-serif italic tracking-[0.3em] opacity-40", children: "Chronos" }),
      /* @__PURE__ */ jsx9(
        "div",
        {
          className: "h-px w-24 transition-all duration-1000",
          style: { background: `linear-gradient(90deg, transparent, ${currentThemeColors.primary}, transparent)` }
        }
      )
    ] }),
    /* @__PURE__ */ jsx9(
      "button",
      {
        onClick: toggleFullscreen,
        className: "absolute top-6 right-12 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white/80",
        title: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
        children: isFullscreen ? /* @__PURE__ */ jsxs9("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx9("path", { d: "M8 3v3a2 2 0 0 1-2 2H3" }),
          /* @__PURE__ */ jsx9("path", { d: "M21 8h-3a2 2 0 0 1-2-2V3" }),
          /* @__PURE__ */ jsx9("path", { d: "M3 16h3a2 2 0 0 1 2 2v3" }),
          /* @__PURE__ */ jsx9("path", { d: "M16 21v-3a2 2 0 0 1 2-2h3" })
        ] }) : /* @__PURE__ */ jsxs9("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx9("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }),
          /* @__PURE__ */ jsx9("path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }),
          /* @__PURE__ */ jsx9("path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }),
          /* @__PURE__ */ jsx9("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx9("main", { className: "flex items-center justify-center w-full max-w-4xl relative z-10 py-4", children: /* @__PURE__ */ jsx9("div", { className: "transition-all duration-700 ease-in-out w-full flex justify-center", children: /* @__PURE__ */ jsx9("div", { className: "animate-in fade-in zoom-in duration-1000 w-full flex justify-center", children: renderClock() }, displayMode) }) }),
    /* @__PURE__ */ jsx9("div", { className: "mb-6 relative z-20 w-full flex justify-center px-4", children: /* @__PURE__ */ jsx9(
      ClockControls_default,
      {
        displayMode,
        numeralSystem,
        theme,
        onModeChange: setDisplayMode,
        onNumeralChange: setNumeralSystem,
        onThemeChange: setTheme
      }
    ) }),
    /* @__PURE__ */ jsx9("footer", { className: "mt-4 text-[9px] uppercase tracking-[0.5em] text-neutral-700 font-bold pointer-events-none", children: "Timeless Aesthetic Precision" })
  ] });
};
var App_default = App;

// index.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx10(React7.StrictMode, { children: /* @__PURE__ */ jsx10(App_default, {}) })
);
