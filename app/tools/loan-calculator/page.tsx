"use client";
import React, { useState, useMemo } from 'react';
import { ArrowLeft, LayoutGrid, Calculator } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Calculator size={15} className="text-indigo-400"/> Loan Calculator</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('5');

  const result = useMemo(() => {
    const P = parseFloat(principal), r = parseFloat(rate) / 100 / 12, n = parseFloat(years) * 12;
    if (!P || !n || isNaN(P) || isNaN(r) || isNaN(n)) return null;
    if (r === 0) { const m = P / n; return { monthly: m, total: m * n, interest: 0, n }; }
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    return { monthly, total, interest: total - P, n };
  }, [principal, rate, years]);

  const pct = result ? Math.round((result.interest / result.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]"/>
      </div>
      <NavBar/>
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Calculator size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Loan <span className="text-indigo-400">Calculator</span></h1>
          <p className="text-slate-400 text-lg">Calculate monthly payments and total interest.</p>
        </header>

        <div className="space-y-4 mb-6">
          {[
            { label: 'Loan amount', value: principal, set: setPrincipal, prefix: '$', placeholder: '10 000' },
            { label: 'Annual interest rate', value: rate, set: setRate, suffix: '%', placeholder: '5' },
            { label: 'Loan term', value: years, set: setYears, suffix: 'years', placeholder: '5' },
          ].map(f => (
            <div key={f.label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">{f.label}</label>
              <div className="relative">
                {f.prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">{f.prefix}</span>}
                <input type="number" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                  className={`w-full bg-slate-900 border border-slate-700 rounded-xl py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition ${f.prefix ? 'pl-9 pr-4' : f.suffix ? 'pl-4 pr-20' : 'px-4'}`}/>
                {f.suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">{f.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        {result && (
          <div className="space-y-3">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
              <div className="text-xs text-indigo-400 uppercase tracking-wide mb-2">Monthly payment</div>
              <div className="text-5xl font-extrabold text-white">${fmt(result.monthly)}</div>
              <div className="text-sm text-slate-400 mt-2">{result.n} payments</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: 'Total paid', value: `$${fmt(result.total)}` }, { label: 'Total interest', value: `$${fmt(result.interest)}` }].map(s => (
                <div key={s.label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 text-center">
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Visual breakdown */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Payment breakdown</div>
              <div className="flex h-4 rounded-full overflow-hidden">
                <div className="bg-indigo-500 transition-all" style={{ width: `${100 - pct}%` }}/>
                <div className="bg-red-500/70 flex-1"/>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"/>Principal ({100 - pct}%)</span>
                <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-red-500/70 inline-block"/>Interest ({pct}%)</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
