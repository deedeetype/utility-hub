"use client";

import React, { useState } from 'react';
import { Receipt, ArrowLeft, LayoutGrid } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Receipt size={15} className="text-emerald-400" /> Tip Calculator</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><LayoutGrid size={13} /> 1001WebTools</a>
      </div>
    </nav>
  );
}

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPct, setTipPct] = useState(18);
  const [customTip, setCustomTip] = useState('');
  const [people, setPeople] = useState(1);

  const billNum = parseFloat(bill) || 0;
  const activeTip = customTip !== '' ? (parseFloat(customTip) || 0) : tipPct;
  const tipAmount = billNum * (activeTip / 100);
  const total = billNum + tipAmount;
  const perPerson = people > 0 ? total / people : total;
  const tipPerPerson = people > 0 ? tipAmount / people : tipAmount;

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-emerald-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[140px]" />
      </div>
      <NavBar />
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 mb-4"><Receipt size={28} /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Tip <span className="text-emerald-400">Calculator</span></h1>
          <p className="text-slate-400 text-lg">Split the bill and calculate the tip instantly.</p>
        </header>

        <div className="space-y-5">
          {/* Bill amount */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Bill amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">$</span>
              <input type="number" min={0} step="0.01" placeholder="0.00" value={bill} onChange={e => setBill(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-3.5 text-2xl font-bold text-white focus:outline-none focus:border-emerald-500 transition" />
            </div>
          </div>

          {/* Tip % */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Tip percentage</label>
            <div className="flex gap-2 mb-3">
              {TIP_PRESETS.map(p => (
                <button key={p} onClick={() => { setTipPct(p); setCustomTip(''); }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${activeTip === p && customTip === '' ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>
                  {p}%
                </button>
              ))}
            </div>
            <div className="relative">
              <input type="number" min={0} max={100} placeholder="Custom %" value={customTip} onChange={e => setCustomTip(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition placeholder:text-slate-600" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
            </div>
          </div>

          {/* People */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Split between</label>
            <div className="flex items-center gap-4">
              <button onClick={() => setPeople(p => Math.max(1, p - 1))}
                className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition font-bold text-xl">−</button>
              <span className="text-3xl font-extrabold text-white flex-1 text-center">{people}</span>
              <button onClick={() => setPeople(p => Math.min(50, p + 1))}
                className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition font-bold text-xl">+</button>
              <span className="text-slate-400 text-sm">{people === 1 ? 'person' : 'people'}</span>
            </div>
          </div>

          {/* Results */}
          {billNum > 0 && (
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Breakdown</span>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { label: 'Bill',        value: `$${fmt(billNum)}`,    sub: '' },
                  { label: `Tip (${activeTip}%)`, value: `$${fmt(tipAmount)}`, sub: people > 1 ? `$${fmt(tipPerPerson)} / person` : '' },
                  { label: 'Total',       value: `$${fmt(total)}`,      sub: '' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0">
                    <span className="text-slate-400">{row.label}</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">{row.value}</div>
                      {row.sub && <div className="text-xs text-slate-500">{row.sub}</div>}
                    </div>
                  </div>
                ))}
                {people > 1 && (
                  <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <div className="text-xs text-emerald-400 uppercase tracking-wide mb-1">Each person pays</div>
                    <div className="text-4xl font-extrabold text-white">${fmt(perPerson)}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
