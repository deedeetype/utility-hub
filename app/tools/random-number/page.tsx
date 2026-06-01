"use client";

import React, { useState } from 'react';
import { Hash, ArrowLeft, LayoutGrid, RefreshCcw, Copy } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Hash size={15} className="text-indigo-400" /> Random Number Generator</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generate = () => {
    setError('');
    if (min >= max) { setError('Min must be less than max.'); return; }
    if (unique && count > (max - min + 1)) { setError(`Can't pick ${count} unique numbers from range ${min}–${max}.`); return; }
    const nums: number[] = [];
    if (unique) {
      const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      nums.push(...pool.slice(0, count));
    } else {
      for (let i = 0; i < count; i++) nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setResults(nums);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(results.join(', ')).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[60px]" />
      </div>
      <NavBar />
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Hash size={28} /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Random <span className="text-indigo-400">Number</span></h1>
          <p className="text-slate-400 text-lg">Generate random numbers with custom rules.</p>
        </header>

        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 mb-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Min</label>
              <input type="number" value={min} onChange={e => setMin(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-center font-bold focus:outline-none focus:border-indigo-500 transition" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Max</label>
              <input type="number" value={max} onChange={e => setMax(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-center font-bold focus:outline-none focus:border-indigo-500 transition" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">How many numbers</label>
            <input type="number" min={1} max={100} value={count} onChange={e => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-center font-bold focus:outline-none focus:border-indigo-500 transition" />
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div onClick={() => setUnique(v => !v)} className={`w-10 h-5 rounded-full transition-colors relative ${unique ? 'bg-indigo-500' : 'bg-slate-700'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${unique ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-slate-400">No duplicates (unique picks)</span>
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <button onClick={generate}
          className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 text-xl mb-6 flex items-center justify-center gap-2">
          <RefreshCcw size={20} /> Generate
        </button>

        {results.length > 0 && (
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">{results.length} number{results.length > 1 ? 's' : ''}</span>
              <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-700 transition">
                <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-5">
              {results.length === 1 ? (
                <div className="text-center text-7xl font-extrabold text-white py-4">{results[0]}</div>
              ) : (
                <div className="flex flex-wrap gap-2 justify-center">
                  {results.map((n, i) => (
                    <div key={i} className="px-4 py-2 rounded-xl bg-indigo-500/15 border border-indigo-500/20 text-lg font-bold text-white">{n}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick presets */}
        <div className="mt-6 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Quick presets</div>
          <div className="flex flex-wrap gap-2">
            {[{label:'1–6 (die)',min:1,max:6,n:1},{label:'1–100',min:1,max:100,n:1},{label:'Lottery (1–49, 6x)',min:1,max:49,n:6,u:true},{label:'Coin (0–1)',min:0,max:1,n:1}].map(p => (
              <button key={p.label} onClick={() => { setMin(p.min); setMax(p.max); setCount(p.n); setUnique(!!p.u); setResults([]); setError(''); }}
                className="px-3 py-1.5 rounded-xl text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition">{p.label}</button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
