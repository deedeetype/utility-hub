"use client";

import React, { useState, useCallback } from 'react';
import { Pipette, Copy, ArrowLeft, LayoutGrid } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
          <ArrowLeft size={16} /> Hub
        </a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Pipette size={15} className="text-indigo-400" /> Color Picker
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <LayoutGrid size={13} /> 1001WebTools
        </a>
      </div>
    </nav>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function generateShades(hex: string): string[] {
  const [r, g, b] = hexToRgb(hex);
  const [h, s] = rgbToHsl(r, g, b);
  const lightnesses = [95, 85, 70, 55, 40, 30, 20, 10];
  return lightnesses.map(l => hslToHex(h, s, l));
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function isLight(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1');
  const [copiedKey, setCopiedKey] = useState('');

  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const shades = generateShades(color);

  const copy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  }, []);

  const formats = [
    { label: 'HEX',  key: 'hex', value: color.toUpperCase() },
    { label: 'RGB',  key: 'rgb', value: `rgb(${r}, ${g}, ${b})` },
    { label: 'HSL',  key: 'hsl', value: `hsl(${h}, ${s}%, ${l}%)` },
    { label: 'CSS variable', key: 'css', value: `--color: ${color};` },
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
            <Pipette size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Color <span className="text-indigo-400">Picker</span>
          </h1>
          <p className="text-slate-400 text-lg">Pick a color, get HEX, RGB, HSL and a full shade palette.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: picker */}
          <div className="space-y-5">
            {/* Color preview + picker */}
            <div className="rounded-2xl overflow-hidden border border-slate-700">
              <div className="h-48 transition-colors" style={{ backgroundColor: color }} />
              <div className="bg-slate-800/60 p-4 flex items-center gap-4">
                <label className="relative cursor-pointer">
                  <input type="color" value={color} onChange={e => setColor(e.target.value)}
                    className="sr-only" />
                  <div className="w-12 h-12 rounded-xl border-2 border-white/20 shadow-lg cursor-pointer" style={{ backgroundColor: color }} />
                </label>
                <input
                  type="text"
                  value={color.toUpperCase()}
                  onChange={e => {
                    const v = e.target.value;
                    if (/^#[0-9A-Fa-f]{6}$/.test(v)) setColor(v);
                    else if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) setColor(v);
                  }}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-500 transition uppercase"
                  maxLength={7}
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Format values */}
            <div className="space-y-2">
              {formats.map(f => (
                <div key={f.key} className="bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{f.label}</div>
                    <div className="text-sm font-mono text-slate-200">{f.value}</div>
                  </div>
                  <button onClick={() => copy(f.value, f.key)} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition">
                    <Copy size={14} />
                    {copiedKey === f.key && <span className="sr-only">Copied</span>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: shades */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Shade palette</div>
            <div className="rounded-2xl overflow-hidden border border-slate-700">
              {shades.map((shade, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 py-4 transition-colors hover:brightness-110 cursor-pointer group"
                  style={{ backgroundColor: shade }}
                  onClick={() => copy(shade.toUpperCase(), `shade-${i}`)}
                >
                  <span className={`text-sm font-mono font-medium ${isLight(shade) ? 'text-slate-800' : 'text-white'}`}>
                    {shade.toUpperCase()}
                  </span>
                  <span className={`text-xs opacity-0 group-hover:opacity-60 transition-opacity flex items-center gap-1 ${isLight(shade) ? 'text-slate-800' : 'text-white'}`}>
                    <Copy size={12} />
                    {copiedKey === `shade-${i}` ? 'Copied!' : 'Copy'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
