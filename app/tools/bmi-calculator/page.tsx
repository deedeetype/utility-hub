"use client";

import React, { useState, useMemo } from 'react';
import { Activity, ArrowLeft, LayoutGrid } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Activity size={15} className="text-indigo-400" /> BMI Calculator</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

const CATEGORIES = [
  { max: 18.5, label: 'Underweight', color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20' },
  { max: 25.0, label: 'Normal',      color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { max: 30.0, label: 'Overweight',  color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  { max: Infinity, label: 'Obese',   color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20' },
];

function getCategory(bmi: number) {
  return CATEGORIES.find(c => bmi < c.max) ?? CATEGORIES[CATEGORIES.length - 1];
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState('170');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('7');
  const [weightKg, setWeightKg] = useState('70');
  const [weightLb, setWeightLb] = useState('154');

  const bmi = useMemo(() => {
    if (unit === 'metric') {
      const h = parseFloat(heightCm) / 100;
      const w = parseFloat(weightKg);
      if (!h || !w) return null;
      return w / (h * h);
    } else {
      const h = parseFloat(heightFt) * 12 + parseFloat(heightIn || '0');
      const w = parseFloat(weightLb);
      if (!h || !w) return null;
      return (w / (h * h)) * 703;
    }
  }, [unit, heightCm, heightFt, heightIn, weightKg, weightLb]);

  const cat = bmi ? getCategory(bmi) : null;

  // Gauge: 15–40 range mapped to 0–100%
  const gaugePercent = bmi ? Math.min(Math.max(((bmi - 15) / 25) * 100, 0), 100) : 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[60px]" />
      </div>
      <NavBar />
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Activity size={28} /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">BMI <span className="text-indigo-400">Calculator</span></h1>
          <p className="text-slate-400 text-lg">Calculate your Body Mass Index instantly.</p>
        </header>

        {/* Unit toggle */}
        <div className="flex gap-2 mb-6 bg-slate-800/50 p-1 rounded-2xl border border-slate-700/50">
          {(['metric', 'imperial'] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${unit === u ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}>
              {u} {u === 'metric' ? '(kg / cm)' : '(lb / ft)'}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          {/* Height */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Height</label>
            {unit === 'metric' ? (
              <div className="relative">
                <input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)} min={1}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-14" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">cm</span>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} min={1}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-10" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">ft</span>
                </div>
                <div className="relative flex-1">
                  <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} min={0} max={11}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-10" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">in</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Weight</label>
            <div className="relative">
              <input type="number" value={unit === 'metric' ? weightKg : weightLb} onChange={e => unit === 'metric' ? setWeightKg(e.target.value) : setWeightLb(e.target.value)} min={1}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-14" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{unit === 'metric' ? 'kg' : 'lb'}</span>
            </div>
          </div>
        </div>

        {/* Result */}
        {bmi && cat && (
          <div className={`${cat.bg} border ${cat.border} rounded-2xl p-6 text-center space-y-4`}>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Your BMI</div>
              <div className={`text-6xl font-extrabold ${cat.color}`}>{bmi.toFixed(1)}</div>
              <div className={`text-xl font-bold mt-1 ${cat.color}`}>{cat.label}</div>
            </div>

            {/* Gauge */}
            <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-red-500">
              <div className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-white rounded-full shadow-lg transition-all duration-700"
                style={{ left: `${gaugePercent}%` }} />
            </div>
            <div className="flex justify-between text-xs text-slate-500 -mt-2">
              <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
            </div>

            <div className="text-xs text-slate-500 mt-2">
              For informational purposes only. Consult a healthcare professional.
            </div>
          </div>
        )}

        {/* Reference table */}
        <div className="mt-5 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">BMI reference</div>
          <div className="space-y-2">
            {[{ range: '< 18.5', label: 'Underweight', color: 'text-blue-400' },
              { range: '18.5 – 24.9', label: 'Normal weight', color: 'text-emerald-400' },
              { range: '25 – 29.9', label: 'Overweight', color: 'text-amber-400' },
              { range: '≥ 30', label: 'Obese', color: 'text-red-400' }].map(r => (
              <div key={r.label} className="flex items-center justify-between text-sm">
                <span className={`font-mono font-semibold ${r.color}`}>{r.range}</span>
                <span className="text-slate-400">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
