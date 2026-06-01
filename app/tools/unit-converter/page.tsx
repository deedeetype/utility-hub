"use client";

import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
// @ts-ignore
import ArrowLeftRight from 'lucide-react/dist/esm/icons/arrow-left-right';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><ArrowLeftRight size={15} className="text-indigo-400" /> Unit Converter</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

interface Unit { label: string; toBase: (v: number) => number; fromBase: (v: number) => number; }
interface Category { name: string; emoji: string; units: Unit[]; }

const CATEGORIES: Category[] = [
  {
    name: 'Length', emoji: '📏',
    units: [
      { label: 'Kilometers (km)',    toBase: v => v * 1000,       fromBase: v => v / 1000 },
      { label: 'Meters (m)',         toBase: v => v,              fromBase: v => v },
      { label: 'Centimeters (cm)',   toBase: v => v / 100,        fromBase: v => v * 100 },
      { label: 'Millimeters (mm)',   toBase: v => v / 1000,       fromBase: v => v * 1000 },
      { label: 'Miles (mi)',         toBase: v => v * 1609.344,   fromBase: v => v / 1609.344 },
      { label: 'Yards (yd)',         toBase: v => v * 0.9144,     fromBase: v => v / 0.9144 },
      { label: 'Feet (ft)',          toBase: v => v * 0.3048,     fromBase: v => v / 0.3048 },
      { label: 'Inches (in)',        toBase: v => v * 0.0254,     fromBase: v => v / 0.0254 },
    ],
  },
  {
    name: 'Weight', emoji: '⚖️',
    units: [
      { label: 'Tonnes (t)',         toBase: v => v * 1000,       fromBase: v => v / 1000 },
      { label: 'Kilograms (kg)',     toBase: v => v,              fromBase: v => v },
      { label: 'Grams (g)',          toBase: v => v / 1000,       fromBase: v => v * 1000 },
      { label: 'Milligrams (mg)',    toBase: v => v / 1e6,        fromBase: v => v * 1e6 },
      { label: 'Pounds (lb)',        toBase: v => v * 0.453592,   fromBase: v => v / 0.453592 },
      { label: 'Ounces (oz)',        toBase: v => v * 0.0283495,  fromBase: v => v / 0.0283495 },
    ],
  },
  {
    name: 'Temperature', emoji: '🌡️',
    units: [
      { label: 'Celsius (°C)',       toBase: v => v,              fromBase: v => v },
      { label: 'Fahrenheit (°F)',    toBase: v => (v - 32) * 5/9, fromBase: v => v * 9/5 + 32 },
      { label: 'Kelvin (K)',         toBase: v => v - 273.15,     fromBase: v => v + 273.15 },
    ],
  },
  {
    name: 'Volume', emoji: '🧴',
    units: [
      { label: 'Liters (L)',         toBase: v => v,              fromBase: v => v },
      { label: 'Milliliters (mL)',   toBase: v => v / 1000,       fromBase: v => v * 1000 },
      { label: 'Gallons (gal)',      toBase: v => v * 3.78541,    fromBase: v => v / 3.78541 },
      { label: 'Quarts (qt)',        toBase: v => v * 0.946353,   fromBase: v => v / 0.946353 },
      { label: 'Pints (pt)',         toBase: v => v * 0.473176,   fromBase: v => v / 0.473176 },
      { label: 'Cups (cup)',         toBase: v => v * 0.236588,   fromBase: v => v / 0.236588 },
      { label: 'Fl. oz (fl oz)',     toBase: v => v * 0.029574,   fromBase: v => v / 0.029574 },
    ],
  },
  {
    name: 'Area', emoji: '🗺️',
    units: [
      { label: 'Sq. km (km²)',       toBase: v => v * 1e6,        fromBase: v => v / 1e6 },
      { label: 'Sq. meters (m²)',    toBase: v => v,              fromBase: v => v },
      { label: 'Sq. cm (cm²)',       toBase: v => v / 1e4,        fromBase: v => v * 1e4 },
      { label: 'Sq. miles (mi²)',    toBase: v => v * 2589988.1,  fromBase: v => v / 2589988.1 },
      { label: 'Acres',              toBase: v => v * 4046.86,    fromBase: v => v / 4046.86 },
      { label: 'Sq. feet (ft²)',     toBase: v => v * 0.092903,   fromBase: v => v / 0.092903 },
    ],
  },
];

function fmt(n: number): string {
  if (!isFinite(n)) return '—';
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(4);
  const fixed = parseFloat(n.toPrecision(8));
  return String(fixed);
}

export default function UnitConverter() {
  const [catIdx, setCatIdx] = useState(0);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState('1');

  const cat = CATEGORIES[catIdx];
  const num = parseFloat(value);
  const converted = isNaN(num) ? '' : fmt(cat.units[toIdx].fromBase(cat.units[fromIdx].toBase(num)));

  const swap = () => { setFromIdx(toIdx); setToIdx(fromIdx); };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[60px]" />
      </div>
      <NavBar />
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4">
            <ArrowLeftRight size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Unit <span className="text-indigo-400">Converter</span></h1>
          <p className="text-slate-400 text-lg">Convert between any units instantly.</p>
        </header>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c, i) => (
            <button key={c.name} onClick={() => { setCatIdx(i); setFromIdx(0); setToIdx(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${catIdx === i ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {/* From */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">From</label>
            <select value={fromIdx} onChange={e => setFromIdx(parseInt(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white mb-3 focus:outline-none focus:border-indigo-500 transition">
              {cat.units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
            </select>
            <input type="number" value={value} onChange={e => setValue(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-2xl font-bold text-white focus:outline-none focus:border-indigo-500 transition" />
          </div>

          {/* Swap */}
          <div className="flex justify-center">
            <button onClick={swap} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition">
              <ArrowLeftRight size={18} />
            </button>
          </div>

          {/* To */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">To</label>
            <select value={toIdx} onChange={e => setToIdx(parseInt(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white mb-3 focus:outline-none focus:border-indigo-500 transition">
              {cat.units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
            </select>
            <div className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-2xl font-bold text-indigo-300 min-h-[54px]">
              {converted || <span className="text-slate-600 text-base">—</span>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
