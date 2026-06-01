"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, LayoutGrid, Timer } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Timer size={15} className="text-indigo-400"/> Countdown Timer</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

const PRESETS = [
  { label: "New Year's", date: () => { const n = new Date(); return new Date(n.getMonth() >= 11 && n.getDate() > 31 ? n.getFullYear()+2 : n.getFullYear()+1, 0, 1).toISOString().slice(0,16); } },
  { label: "Summer",     date: () => { const n = new Date(); return new Date(n.getFullYear() + (n.getMonth() >= 5 ? 1 : 0), 5, 21).toISOString().slice(0,16); } },
  { label: "1 week",     date: () => { const d = new Date(); d.setDate(d.getDate()+7); return d.toISOString().slice(0,16); } },
  { label: "100 days",   date: () => { const d = new Date(); d.setDate(d.getDate()+100); return d.toISOString().slice(0,16); } },
];

function pad(n: number) { return String(Math.floor(n)).padStart(2,'0'); }

export default function Countdown() {
  const [target, setTarget] = useState('');
  const [name, setName] = useState('');
  const [diff, setDiff] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!target) { setDiff(null); setDone(false); return; }
    const tick = () => {
      const d = new Date(target).getTime() - Date.now();
      if (d <= 0) { setDiff(0); setDone(true); } else { setDiff(d); setDone(false); }
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [target]);

  const days    = diff !== null ? Math.floor(diff / 86400000) : 0;
  const hours   = diff !== null ? Math.floor((diff % 86400000) / 3600000) : 0;
  const minutes = diff !== null ? Math.floor((diff % 3600000) / 60000) : 0;
  const seconds = diff !== null ? Math.floor((diff % 60000) / 1000) : 0;

  const minDate = new Date().toISOString().slice(0,16);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]"/>
      </div>
      <NavBar/>
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Timer size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Countdown <span className="text-indigo-400">Timer</span></h1>
          <p className="text-slate-400 text-lg">Count down to any date or event.</p>
        </header>

        {/* Inputs */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 mb-4 space-y-4">
          <div>
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Event name (optional)</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. My Birthday, Summer Vacation…" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition placeholder:text-slate-600"/>
          </div>
          <div>
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Target date & time</label>
            <input type="datetime-local" value={target} min={minDate} onChange={e=>setTarget(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"/>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map(p=>(
            <button key={p.label} onClick={()=>{setTarget(p.date());setName(p.label);}} className="px-3 py-1.5 rounded-xl text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition">{p.label}</button>
          ))}
        </div>

        {/* Countdown display */}
        {done ? (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-extrabold text-white">{name || 'It\'s time!'}</h2>
            <button onClick={()=>{setTarget('');setDone(false);}} className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition">Reset</button>
          </div>
        ) : diff !== null ? (
          <div>
            {name && <p className="text-center text-slate-400 text-sm mb-4">Until <span className="text-white font-semibold">{name}</span></p>}
            <div className="grid grid-cols-4 gap-3">
              {[{v:days,l:'Days'},{v:hours,l:'Hours'},{v:minutes,l:'Min'},{v:seconds,l:'Sec'}].map(s=>(
                <div key={s.l} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-4 text-center">
                  <div className="text-4xl font-extrabold text-white font-mono">{pad(s.v)}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            {target && (
              <p className="text-center text-xs text-slate-600 mt-4">
                {new Date(target).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 opacity-20 pointer-events-none">
            {['Days','Hours','Min','Sec'].map(l=>(
              <div key={l} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-4 text-center">
                <div className="text-4xl font-extrabold text-white font-mono">00</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{l}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
