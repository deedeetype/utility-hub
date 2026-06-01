"use client";
import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, Percent } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Percent size={15} className="text-indigo-400"/> Percentage Calculator</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

type Mode = 'pct-of' | 'what-pct' | 'change';

const MODES: { key: Mode; label: string; desc: string }[] = [
  { key: 'pct-of',   label: 'X% of Y',            desc: 'What is X% of Y?' },
  { key: 'what-pct', label: 'X is what % of Y?',  desc: 'X is what percentage of Y?' },
  { key: 'change',   label: '% Change',            desc: 'Percentage increase or decrease' },
];

function fmt(n: number) {
  if (!isFinite(n)) return '—';
  return parseFloat(n.toPrecision(8)).toString();
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('pct-of');
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const na = parseFloat(a), nb = parseFloat(b);
  const result = (() => {
    if (isNaN(na) || isNaN(nb)) return null;
    if (mode === 'pct-of')   return { value: fmt((na / 100) * nb), label: `${na}% of ${nb}` };
    if (mode === 'what-pct') return nb === 0 ? null : { value: fmt((na / nb) * 100) + '%', label: `${na} is __% of ${nb}` };
    if (mode === 'change')   return nb === 0 ? null : { value: fmt(((nb - na) / Math.abs(na)) * 100) + '%', label: `${na} → ${nb}` };
    return null;
  })();

  const clear = () => { setA(''); setB(''); };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]"/>
      </div>
      <NavBar/>
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Percent size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Percentage <span className="text-indigo-400">Calculator</span></h1>
          <p className="text-slate-400 text-lg">Calculate percentages, discounts and changes instantly.</p>
        </header>

        {/* Mode tabs */}
        <div className="flex flex-col gap-2 mb-6">
          {MODES.map(m => (
            <button key={m.key} onClick={() => { setMode(m.key); clear(); }}
              className={`px-4 py-3 rounded-xl text-sm font-medium border text-left transition-all ${mode===m.key?'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20':'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white'}`}>
              <div className="font-semibold">{m.label}</div>
              <div className={`text-xs mt-0.5 ${mode===m.key?'text-indigo-200':'text-slate-600'}`}>{m.desc}</div>
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 mb-5 space-y-4">
          {mode === 'pct-of' && (<>
            <div className="flex items-center gap-3">
              <input type="number" value={a} onChange={e=>setA(e.target.value)} placeholder="%" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white text-center focus:outline-none focus:border-indigo-500 transition"/>
              <span className="text-slate-500 font-medium">% of</span>
              <input type="number" value={b} onChange={e=>setB(e.target.value)} placeholder="Value" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white text-center focus:outline-none focus:border-indigo-500 transition"/>
            </div>
          </>)}
          {mode === 'what-pct' && (<>
            <div className="flex items-center gap-3">
              <input type="number" value={a} onChange={e=>setA(e.target.value)} placeholder="X" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white text-center focus:outline-none focus:border-indigo-500 transition"/>
              <span className="text-slate-500 font-medium">is __% of</span>
              <input type="number" value={b} onChange={e=>setB(e.target.value)} placeholder="Y" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white text-center focus:outline-none focus:border-indigo-500 transition"/>
            </div>
          </>)}
          {mode === 'change' && (<>
            <div className="flex items-center gap-3">
              <div className="flex-1"><label className="block text-xs text-slate-500 mb-1.5">From</label>
                <input type="number" value={a} onChange={e=>setA(e.target.value)} placeholder="Original" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white text-center focus:outline-none focus:border-indigo-500 transition"/>
              </div>
              <div className="flex-1"><label className="block text-xs text-slate-500 mb-1.5">To</label>
                <input type="number" value={b} onChange={e=>setB(e.target.value)} placeholder="New value" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white text-center focus:outline-none focus:border-indigo-500 transition"/>
              </div>
            </div>
          </>)}
        </div>

        {result && (
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
            <div className="text-xs text-indigo-400 uppercase tracking-wide mb-2">{result.label}</div>
            <div className="text-5xl font-extrabold text-white">{result.value}</div>
          </div>
        )}

        {/* Common shortcuts */}
        <div className="mt-5 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Quick calculations</div>
          <div className="flex flex-wrap gap-2">
            {[{label:'10% of 100',a:'10',b:'100',m:'pct-of'},{label:'20% off $80',a:'20',b:'80',m:'pct-of'},{label:'7.5% tax on $50',a:'7.5',b:'50',m:'pct-of'},{label:'50 is what % of 200',a:'50',b:'200',m:'what-pct'}].map(p=>(
              <button key={p.label} onClick={()=>{setMode(p.m as Mode);setA(p.a);setB(p.b);}} className="px-3 py-1.5 rounded-xl text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition">{p.label}</button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
