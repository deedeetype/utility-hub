"use client";
import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, Maximize2 } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Maximize2 size={15} className="text-indigo-400"/> Aspect Ratio Calculator</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

const PRESETS = [
  { label: '16:9',  ratio: [16, 9],  desc: 'HD Video, YouTube' },
  { label: '9:16',  ratio: [9, 16],  desc: 'TikTok, Reels, Shorts' },
  { label: '4:3',   ratio: [4, 3],   desc: 'Classic Photo' },
  { label: '1:1',   ratio: [1, 1],   desc: 'Instagram Square' },
  { label: '4:5',   ratio: [4, 5],   desc: 'Instagram Portrait' },
  { label: '21:9',  ratio: [21, 9],  desc: 'Ultrawide' },
  { label: '2:3',   ratio: [2, 3],   desc: 'Portrait Photo' },
  { label: '3:2',   ratio: [3, 2],   desc: 'DSLR Landscape' },
];

const SOCIAL = [
  { platform: 'YouTube Thumbnail', w: 1280, h: 720 },
  { platform: 'Instagram Post',    w: 1080, h: 1080 },
  { platform: 'Instagram Story',   w: 1080, h: 1920 },
  { platform: 'TikTok',            w: 1080, h: 1920 },
  { platform: 'Twitter/X Header',  w: 1500, h: 500 },
  { platform: 'LinkedIn Banner',   w: 1584, h: 396 },
  { platform: 'Facebook Cover',    w: 851,  h: 315 },
  { platform: 'OG Image',          w: 1200, h: 630 },
];

export default function AspectRatio() {
  const [w, setW] = useState('1920');
  const [h, setH] = useState('1080');
  const [lock, setLock] = useState<'w'|'h'>('h');

  const nw = parseFloat(w), nh = parseFloat(h);
  const ratio = (nw && nh) ? `${nw/gcd(nw,nh)} : ${nh/gcd(nw,nh)}` : '—';

  const applyPreset = (rw: number, rh: number) => {
    if (lock === 'h') { const nwVal = Math.round(nh * rw / rh); setW(String(nwVal)); }
    else              { const nhVal = Math.round(nw * rh / rw); setH(String(nhVal)); }
  };

  const calcMissing = (knownW: boolean, val: number, rw: number, rh: number) => {
    if (knownW) return Math.round(val * rh / rw);
    return Math.round(val * rw / rh);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]"/>
      </div>
      <NavBar/>
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Maximize2 size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Aspect Ratio <span className="text-indigo-400">Calculator</span></h1>
          <p className="text-slate-400 text-lg">Calculate dimensions for any aspect ratio instantly.</p>
        </header>

        {/* Dimensions */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Width (px)</label>
              <input type="number" value={w} onChange={e=>{setW(e.target.value);setLock('w');}} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Height (px)</label>
              <input type="number" value={h} onChange={e=>{setH(e.target.value);setLock('h');}} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition"/>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            Ratio: <span className="text-white font-bold text-lg">{ratio}</span>
          </div>
        </div>

        {/* Ratio presets */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 mb-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Common ratios — lock <button onClick={()=>setLock(l=>l==='w'?'h':'w')} className="text-indigo-400 hover:text-indigo-300 transition font-semibold">{lock==='w'?'width':'height'}</button> and click to calculate</div>
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map(p=>(
              <button key={p.label} onClick={()=>applyPreset(p.ratio[0],p.ratio[1])}
                className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 transition text-center">
                <div className="font-bold text-sm">{p.label}</div>
                <div className="text-xs text-slate-600 mt-0.5 leading-tight">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Social media reference */}
        {nw && nh && (
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Social media sizes at your ratio</div>
            <div className="space-y-2">
              {SOCIAL.map(s => {
                const g = gcd(s.w, s.h), sr = `${s.w/g}:${s.h/g}`;
                const gr = gcd(nw, nh);
                const matches = Math.abs((nw/gr)/(nh/gr) - s.w/s.h) < 0.01;
                return (
                  <div key={s.platform} className={`flex items-center justify-between text-sm ${matches?'text-white':'text-slate-500'}`}>
                    <span>{s.platform}</span>
                    <span className="font-mono">{s.w}×{s.h} {matches&&<span className="text-emerald-400 text-xs ml-1">✓ matches</span>}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
