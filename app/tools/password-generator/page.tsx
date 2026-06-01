"use client";
import React, { useState, useCallback } from 'react';
import { ArrowLeft, LayoutGrid, Copy, RefreshCcw } from 'lucide-react';
// @ts-ignore
import KeyRound from 'lucide-react/dist/esm/icons/key-round';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><KeyRound size={15} className="text-indigo-400"/> Password Generator</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = /[0OIl1]/g;

function generate(len: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean; noAmbiguous: boolean }) {
  let chars = '';
  if (opts.upper)   chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (opts.lower)   chars += 'abcdefghijklmnopqrstuvwxyz';
  if (opts.numbers) chars += '0123456789';
  if (opts.symbols) chars += SYMBOLS;
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
  if (opts.noAmbiguous) chars = chars.replace(AMBIGUOUS, '');
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function strength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: '', color: '' };
  let s = 0;
  if (pw.length >= 8)  s++;
  if (pw.length >= 14) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { score: 0, label: '', color: '' },
    { score: 1, label: 'Very Weak', color: 'bg-red-500' },
    { score: 2, label: 'Weak',      color: 'bg-orange-500' },
    { score: 3, label: 'Fair',      color: 'bg-amber-500' },
    { score: 4, label: 'Strong',    color: 'bg-lime-500' },
    { score: 5, label: 'Very Strong', color: 'bg-emerald-500' },
  ];
  return map[Math.min(s, 5)];
}

export default function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true, noAmbiguous: false });
  const [pw, setPw] = useState('');
  const [copied, setCopied] = useState(false);

  const gen = useCallback(() => setPw(generate(len, opts)), [len, opts]);
  const copy = async () => { await navigator.clipboard.writeText(pw).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const s = strength(pw);

  const toggleOpt = (k: keyof typeof opts) => setOpts(o => ({ ...o, [k]: !o[k] }));

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]"/>
      </div>
      <NavBar/>
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><KeyRound size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Password <span className="text-indigo-400">Generator</span></h1>
          <p className="text-slate-400 text-lg">Generate strong, secure passwords instantly.</p>
        </header>

        {/* Output */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden mb-5">
          <div className="px-5 py-4 flex items-center justify-between gap-3">
            <span className="text-lg font-mono text-white break-all flex-1 min-h-7">{pw || <span className="text-slate-600">Click generate…</span>}</span>
            <div className="flex gap-2 shrink-0">
              <button onClick={gen} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"><RefreshCcw size={16}/></button>
              <button onClick={copy} disabled={!pw} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition disabled:opacity-30"><Copy size={16}/></button>
            </div>
          </div>
          {pw && (
            <div className="px-5 pb-4">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= s.score ? s.color : 'bg-slate-700'}`}/>
                ))}
              </div>
              {s.label && <p className="text-xs text-slate-500">{s.label}</p>}
            </div>
          )}
        </div>

        {copied && <p className="text-center text-sm text-emerald-400 mb-4">Copied!</p>}

        {/* Length */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 mb-4">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-slate-400">Length</span>
            <span className="text-white font-bold">{len}</span>
          </div>
          <input type="range" min={6} max={64} value={len} onChange={e => setLen(+e.target.value)} className="w-full accent-indigo-500"/>
          <div className="flex justify-between text-xs text-slate-600 mt-1"><span>6</span><span>64</span></div>
        </div>

        {/* Options */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 mb-5 space-y-3">
          {([
            ['upper',       'Uppercase (A–Z)'],
            ['lower',       'Lowercase (a–z)'],
            ['numbers',     'Numbers (0–9)'],
            ['symbols',     'Symbols (!@#…)'],
            ['noAmbiguous', 'Exclude ambiguous (0, O, I, l)'],
          ] as [keyof typeof opts, string][]).map(([k, label]) => (
            <label key={k} className="flex items-center justify-between cursor-pointer select-none">
              <span className="text-sm text-slate-300">{label}</span>
              <div onClick={() => toggleOpt(k)} className={`w-10 h-5 rounded-full transition-colors relative ${opts[k] ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${opts[k] ? 'translate-x-5' : 'translate-x-0.5'}`}/>
              </div>
            </label>
          ))}
        </div>

        <button onClick={gen} className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 text-lg">
          Generate Password
        </button>

        {/* Quick presets */}
        <div className="mt-5 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Presets</div>
          <div className="flex flex-wrap gap-2">
            {[{label:'PIN (4 digits)',len:4,u:false,l:false,n:true,s:false},{label:'Basic (8)',len:8,u:true,l:true,n:true,s:false},{label:'Strong (16)',len:16,u:true,l:true,n:true,s:true},{label:'Very Strong (32)',len:32,u:true,l:true,n:true,s:true}].map(p=>(
              <button key={p.label} onClick={()=>{setLen(p.len);setOpts({upper:p.u,lower:p.l,numbers:p.n,symbols:p.s,noAmbiguous:false});}} className="px-3 py-1.5 rounded-xl text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition">{p.label}</button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
