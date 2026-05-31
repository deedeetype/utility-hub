"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, ArrowLeft, LayoutGrid } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Timer size={15} className="text-red-400" /> Pomodoro Timer</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><LayoutGrid size={13} /> 1001WebTools</a>
      </div>
    </nav>
  );
}

type Mode = 'work' | 'short' | 'long';
const DURATIONS: Record<Mode, number> = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
const LABELS: Record<Mode, string> = { work: 'Focus', short: 'Short Break', long: 'Long Break' };
const COLORS: Record<Mode, string> = { work: 'text-red-400', short: 'text-emerald-400', long: 'text-blue-400' };
const BG: Record<Mode, string> = { work: 'bg-red-500', short: 'bg-emerald-500', long: 'bg-blue-500' };

function beep(frequency: number, duration: number) {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch { /* audio not available */ }
}

export default function Pomodoro() {
  const [mode, setMode] = useState<Mode>('work');
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = DURATIONS[mode];
  const progress = 1 - timeLeft / total;
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');

  const switchMode = useCallback((m: Mode) => {
    setMode(m);
    setTimeLeft(DURATIONS[m]);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            if (mode === 'work') setSessions(s => s + 1);
            beep(880, 0.5);
            setTimeout(() => beep(880, 0.5), 600);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode]);

  useEffect(() => {
    document.title = running ? `${mins}:${secs} — ${LABELS[mode]}` : '1001WebTools — Pomodoro';
    return () => { document.title = '1001WebTools'; };
  }, [mins, secs, running, mode]);

  const radius = 110;
  const circ = 2 * Math.PI * radius;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[140px] transition-colors duration-1000 ${mode === 'work' ? 'bg-red-600/10' : mode === 'short' ? 'bg-emerald-600/10' : 'bg-blue-600/10'}`} />
      </div>
      <NavBar />
      <main className="max-w-md mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className={`inline-flex p-3 rounded-2xl border mb-4 transition-colors ${mode === 'work' ? 'bg-red-500/10 border-red-500/20 text-red-400' : mode === 'short' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
            <Timer size={28} />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-1">Pomodoro <span className={COLORS[mode]}>Timer</span></h1>
          <p className="text-slate-400">Sessions completed today: <span className="text-white font-bold">{sessions}</span></p>
        </header>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-10 bg-slate-800/50 p-1 rounded-2xl border border-slate-700/50">
          {(['work','short','long'] as Mode[]).map(m => (
            <button key={m} onClick={() => switchMode(m)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${mode === m ? `${BG[m]} text-white shadow-lg` : 'text-slate-400 hover:text-white'}`}>
              {LABELS[m]}
            </button>
          ))}
        </div>

        {/* Circle timer */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <svg width={260} height={260} className="-rotate-90">
              <circle cx={130} cy={130} r={radius} fill="none" stroke="#1e293b" strokeWidth={12} />
              <circle cx={130} cy={130} r={radius} fill="none"
                stroke={mode === 'work' ? '#ef4444' : mode === 'short' ? '#10b981' : '#3b82f6'}
                strokeWidth={12} strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - progress)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl font-extrabold text-white font-mono tracking-tight">{mins}:{secs}</div>
              <div className={`text-sm font-semibold mt-1 ${COLORS[mode]}`}>{LABELS[mode]}</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => setRunning(r => !r)}
            className={`flex-1 py-4 font-bold rounded-2xl transition-all shadow-lg text-white text-xl hover:scale-105 ${
              mode === 'work' ? 'bg-red-500 hover:bg-red-400 shadow-red-500/20' :
              mode === 'short' ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20' :
              'bg-blue-500 hover:bg-blue-400 shadow-blue-500/20'
            }`}
          >
            {running ? '⏸ Pause' : timeLeft === total ? '▶ Start' : '▶ Resume'}
          </button>
          <button onClick={() => switchMode(mode)}
            className="px-5 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition text-slate-400 hover:text-white font-bold">
            ↺
          </button>
        </div>
      </main>
    </div>
  );
}
