"use client";

import React, { useState } from 'react';
import { Dice6, ArrowLeft, LayoutGrid, RefreshCcw } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Dice6 size={15} className="text-indigo-400" /> Dice Roller</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100] as const;
type DieType = typeof DICE_TYPES[number];

interface Roll { die: DieType; value: number; id: number; }

const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[50,50]],
  2: [[25,25],[75,75]],
  3: [[25,25],[50,50],[75,75]],
  4: [[25,25],[75,25],[25,75],[75,75]],
  5: [[25,25],[75,25],[50,50],[25,75],[75,75]],
  6: [[25,25],[75,25],[25,50],[75,50],[25,75],[75,75]],
};

function D6Face({ value }: { value: number }) {
  const dots = DOT_POSITIONS[value] ?? [];
  return (
    <div className="w-16 h-16 bg-white rounded-xl shadow-xl flex items-center justify-center relative border-2 border-slate-200">
      <svg viewBox="0 0 100 100" className="w-full h-full p-2">
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={9} fill="#1e293b" />
        ))}
      </svg>
    </div>
  );
}

let rollId = 0;

export default function DiceRoller() {
  const [dieType, setDieType] = useState<DieType>(6);
  const [count, setCount] = useState(1);
  const [rolls, setRolls] = useState<Roll[]>([]);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    setTimeout(() => {
      const newRolls: Roll[] = Array.from({ length: count }, () => ({
        die: dieType,
        value: Math.floor(Math.random() * dieType) + 1,
        id: rollId++,
      }));
      setRolls(newRolls);
      setRolling(false);
    }, 400);
  };

  const total = rolls.reduce((s, r) => s + r.value, 0);
  const showD6Faces = dieType === 6 && count <= 6;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-600/10 blur-[60px]" />
      </div>
      <NavBar />
      <main className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Dice6 size={28} /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Dice <span className="text-indigo-400">Roller</span></h1>
          <p className="text-slate-400 text-lg">Roll any dice — D4 to D100.</p>
        </header>

        {/* Controls */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 mb-6 space-y-5">
          {/* Die type */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Die type</div>
            <div className="flex flex-wrap gap-2">
              {DICE_TYPES.map(d => (
                <button key={d} onClick={() => setDieType(d)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all ${dieType === d ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>
                  D{d}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center gap-5">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Number of dice</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setCount(c => Math.max(1, c - 1))}
                  className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition font-bold text-lg">−</button>
                <span className="text-2xl font-extrabold text-white w-8 text-center">{count}</span>
                <button onClick={() => setCount(c => Math.min(20, c + 1))}
                  className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition font-bold text-lg">+</button>
              </div>
            </div>
            <div className="text-slate-600 text-2xl font-light self-end mb-1">→</div>
            <div className="self-end mb-1">
              <div className="text-xs text-slate-500 mb-1">Rolling</div>
              <div className="text-lg font-bold text-white">{count}D{dieType}</div>
            </div>
          </div>
        </div>

        {/* Roll button */}
        <button onClick={roll} disabled={rolling}
          className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 text-xl mb-6">
          {rolling ? 'Rolling…' : '🎲 Roll!'}
        </button>

        {/* Results */}
        {rolls.length > 0 && !rolling && (
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Result</span>
              <span className="text-2xl font-extrabold text-indigo-400">Total: {total}</span>
            </div>
            <div className="p-5">
              {showD6Faces ? (
                <div className="flex flex-wrap gap-3 justify-center">
                  {rolls.map(r => <D6Face key={r.id} value={r.value} />)}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 justify-center">
                  {rolls.map(r => (
                    <div key={r.id} className="w-14 h-14 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex flex-col items-center justify-center">
                      <div className="text-xs text-indigo-400 font-medium">D{r.die}</div>
                      <div className="text-xl font-extrabold text-white">{r.value}</div>
                    </div>
                  ))}
                </div>
              )}
              {rolls.length > 1 && (
                <div className="mt-4 text-center text-sm text-slate-500">
                  {rolls.map(r => r.value).join(' + ')} = <span className="text-white font-bold">{total}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
