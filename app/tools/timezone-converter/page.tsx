"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
// @ts-ignore
import Globe from 'lucide-react/dist/esm/icons/globe';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Globe size={15} className="text-indigo-400"/> Timezone Converter</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

const POPULAR_TZ = [
  'America/New_York','America/Chicago','America/Denver','America/Los_Angeles',
  'America/Toronto','America/Vancouver','America/Sao_Paulo','America/Mexico_City',
  'Europe/London','Europe/Paris','Europe/Berlin','Europe/Madrid','Europe/Rome',
  'Europe/Moscow','Africa/Cairo','Africa/Johannesburg',
  'Asia/Dubai','Asia/Kolkata','Asia/Bangkok','Asia/Singapore',
  'Asia/Shanghai','Asia/Tokyo','Asia/Seoul','Australia/Sydney','Pacific/Auckland',
];

function convertTime(dateStr: string, fromTz: string, toTz: string): string {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      timeZone: toTz,
      weekday: 'short', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    }).format(date);
  } catch { return '—'; }
}

function getOffset(tz: string, date: Date): string {
  try {
    const s = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' }).format(date);
    const m = s.match(/GMT[+-]\d+(?::\d+)?/);
    return m ? m[0] : '';
  } catch { return ''; }
}

export default function TimezoneConverter() {
  const [datetime, setDatetime] = useState(() => new Date().toISOString().slice(0,16));
  const [fromTz, setFromTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York');
  const [targets, setTargets] = useState(['Europe/London','Asia/Tokyo','Australia/Sydney']);

  const now = new Date(datetime);

  const addTarget = (tz: string) => { if (!targets.includes(tz)) setTargets(t => [...t, tz]); };
  const removeTarget = (tz: string) => setTargets(t => t.filter(x => x !== tz));

  useEffect(() => {
    const id = setInterval(() => setDatetime(new Date().toISOString().slice(0,16)), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]"/>
      </div>
      <NavBar/>
      <main className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Globe size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Timezone <span className="text-indigo-400">Converter</span></h1>
          <p className="text-slate-400 text-lg">Convert any time between world timezones instantly.</p>
        </header>

        {/* Source */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 mb-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Source time</div>
          <div className="grid grid-cols-2 gap-3">
            <input type="datetime-local" value={datetime} onChange={e=>setDatetime(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition col-span-2 md:col-span-1"/>
            <select value={fromTz} onChange={e=>setFromTz(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition col-span-2 md:col-span-1">
              {POPULAR_TZ.map(tz=><option key={tz} value={tz}>{tz.replace('_',' ')} ({getOffset(tz, now)})</option>)}
            </select>
          </div>
          <div className="mt-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-indigo-300 font-medium">
            {convertTime(datetime, fromTz, fromTz)} — {fromTz}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2 mb-4">
          {targets.map(tz => (
            <div key={tz} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-slate-500 mb-0.5">{tz.replace(/_/g,' ')} <span className="text-slate-600">({getOffset(tz, now)})</span></div>
                <div className="text-white font-semibold">{convertTime(datetime, fromTz, tz)}</div>
              </div>
              <button onClick={()=>removeTarget(tz)} className="text-slate-600 hover:text-red-400 transition text-xl leading-none shrink-0">×</button>
            </div>
          ))}
        </div>

        {/* Add timezone */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Add timezone</div>
          <select defaultValue="" onChange={e=>{if(e.target.value)addTarget(e.target.value);e.target.value='';}} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition">
            <option value="" disabled>Select a timezone to add…</option>
            {POPULAR_TZ.filter(tz=>!targets.includes(tz)&&tz!==fromTz).map(tz=><option key={tz} value={tz}>{tz.replace(/_/g,' ')}</option>)}
          </select>
        </div>

        <button onClick={()=>setDatetime(new Date().toISOString().slice(0,16))} className="mt-4 w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-400 hover:text-white transition">
          Use current time
        </button>
      </main>
    </div>
  );
}
