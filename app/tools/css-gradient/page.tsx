"use client";

import React, { useState, useCallback } from 'react';
import { Layers, Copy, ArrowLeft, LayoutGrid } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
          <ArrowLeft size={16} /> Hub
        </a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Layers size={15} className="text-indigo-400" /> CSS Gradient Generator
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <img src="/logo.png" alt="1001FreeTools" className="w-6 h-6 rounded-md" />
        </a>
      </div>
    </nav>
  );
}

type GradientType = 'linear' | 'radial' | 'conic';

interface Stop {
  id: number;
  color: string;
  position: number;
}

let nextId = 3;

export default function CssGradient() {
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    { id: 1, color: '#6366f1', position: 0 },
    { id: 2, color: '#06b6d4', position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const stopsStr = stops
    .slice()
    .sort((a, b) => a.position - b.position)
    .map(s => `${s.color} ${s.position}%`)
    .join(', ');

  const gradient = (() => {
    if (type === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`;
    if (type === 'radial') return `radial-gradient(circle, ${stopsStr})`;
    return `conic-gradient(from ${angle}deg, ${stopsStr})`;
  })();

  const css = `background: ${gradient};`;

  const copy = async () => {
    await navigator.clipboard.writeText(css).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateStop = (id: number, key: keyof Stop, value: string | number) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, [key]: value } : s));
  };

  const addStop = () => {
    const mid = Math.round((stops[0].position + stops[stops.length - 1].position) / 2);
    setStops(prev => [...prev, { id: nextId++, color: '#f59e0b', position: mid }]);
  };

  const removeStop = (id: number) => {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter(s => s.id !== id));
  };

  const TYPES: { key: GradientType; label: string }[] = [
    { key: 'linear', label: 'Linear' },
    { key: 'radial', label: 'Radial' },
    { key: 'conic',  label: 'Conic' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/15 blur-[140px]" />
      </div>
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4">
            <Layers size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            CSS Gradient <span className="text-indigo-400">Generator</span>
          </h1>
          <p className="text-slate-400 text-lg">Build beautiful gradients and copy the CSS instantly.</p>
        </header>

        {/* Preview */}
        <div className="rounded-2xl h-52 mb-6 border border-slate-700 transition-all" style={{ background: gradient }} />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-5">
            {/* Type */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Type</div>
              <div className="flex gap-2">
                {TYPES.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setType(t.key)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                      type === t.key ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Angle (linear & conic) */}
            {(type === 'linear' || type === 'conic') && (
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
                <div className="flex justify-between mb-3">
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Angle</div>
                  <span className="text-sm font-semibold text-white">{angle}°</span>
                </div>
                <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(parseInt(e.target.value))}
                  className="w-full accent-indigo-500" />
              </div>
            )}

            {/* Color stops */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-slate-500 uppercase tracking-wide">Color stops</div>
                <button onClick={addStop} className="text-xs text-indigo-400 hover:text-indigo-300 transition font-medium">+ Add stop</button>
              </div>
              <div className="space-y-3">
                {stops.slice().sort((a, b) => a.position - b.position).map(stop => (
                  <div key={stop.id} className="flex items-center gap-3">
                    <label className="relative cursor-pointer shrink-0">
                      <input type="color" value={stop.color} onChange={e => updateStop(stop.id, 'color', e.target.value)} className="sr-only" />
                      <div className="w-9 h-9 rounded-lg border-2 border-white/20 cursor-pointer" style={{ backgroundColor: stop.color }} />
                    </label>
                    <input
                      type="text"
                      value={stop.color.toUpperCase()}
                      onChange={e => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) updateStop(stop.id, 'color', e.target.value); }}
                      className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 transition uppercase"
                    />
                    <input
                      type="range" min={0} max={100} value={stop.position}
                      onChange={e => updateStop(stop.id, 'position', parseInt(e.target.value))}
                      className="flex-1 accent-indigo-500"
                    />
                    <span className="text-xs text-slate-500 w-8 text-right">{stop.position}%</span>
                    {stops.length > 2 && (
                      <button onClick={() => removeStop(stop.id)} className="text-slate-600 hover:text-red-400 transition text-lg leading-none">×</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CSS output */}
          <div className="space-y-4">
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">CSS</span>
                <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-400 transition">
                  <Copy size={12} /> {copied ? 'Copied!' : 'Copy CSS'}
                </button>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-300 whitespace-pre-wrap break-all">{css}</pre>
            </div>

            {/* Quick angle presets */}
            {type === 'linear' && (
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Quick angles</div>
                <div className="flex flex-wrap gap-2">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                    <button
                      key={a}
                      onClick={() => setAngle(a)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        angle === a ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {a}°
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Preset gradients */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Presets</div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { stops: [{ id: 10, color: '#6366f1', position: 0 }, { id: 11, color: '#ec4899', position: 100 }] },
                  { stops: [{ id: 12, color: '#06b6d4', position: 0 }, { id: 13, color: '#6366f1', position: 100 }] },
                  { stops: [{ id: 14, color: '#f59e0b', position: 0 }, { id: 15, color: '#ef4444', position: 100 }] },
                  { stops: [{ id: 16, color: '#10b981', position: 0 }, { id: 17, color: '#06b6d4', position: 100 }] },
                  { stops: [{ id: 18, color: '#8b5cf6', position: 0 }, { id: 19, color: '#06b6d4', position: 50 }, { id: 20, color: '#10b981', position: 100 }] },
                  { stops: [{ id: 21, color: '#f43f5e', position: 0 }, { id: 22, color: '#f59e0b', position: 100 }] },
                  { stops: [{ id: 23, color: '#1e293b', position: 0 }, { id: 24, color: '#0f172a', position: 100 }] },
                  { stops: [{ id: 25, color: '#fff', position: 0 }, { id: 26, color: '#e2e8f0', position: 100 }] },
                ].map((preset, i) => {
                  const bg = `linear-gradient(135deg, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`;
                  return (
                    <button
                      key={i}
                      onClick={() => { setStops(preset.stops); setType('linear'); setAngle(135); }}
                      className="h-10 rounded-lg border border-slate-700 hover:scale-105 transition-transform"
                      style={{ background: bg }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
