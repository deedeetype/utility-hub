"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, LayoutGrid, Copy } from 'lucide-react';
// @ts-ignore
import QrCode from 'lucide-react/dist/esm/icons/qr-code';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        {/* @ts-ignore */}
        <div className="flex items-center gap-2 text-sm font-medium text-white"><QrCode size={15} className="text-indigo-400" /> QR Code Generator</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://1001webtools.netlify.app');
  const [size, setSize] = useState(256);
  const [darkColor, setDarkColor] = useState('#ffffff');
  const [lightColor, setLightColor] = useState('#0f172a');
  const [dataUrl, setDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!text.trim()) { setDataUrl(''); return; }
    import('qrcode').then(mod => {
      mod.default.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: darkColor, light: lightColor },
      }).then(setDataUrl).catch(() => setDataUrl(''));
    });
  }, [text, size, darkColor, lightColor]);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    a.click();
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SIZES = [128, 256, 512];
  const PRESETS = [
    { label: 'URL', value: 'https://1001webtools.netlify.app' },
    { label: 'Email', value: 'mailto:hello@example.com' },
    { label: 'Phone', value: 'tel:+15551234567' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[60px]" />
      </div>
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4">
            {/* @ts-ignore */}
            <QrCode size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">QR Code <span className="text-indigo-400">Generator</span></h1>
          <p className="text-slate-400 text-lg">Generate QR codes instantly — runs entirely in your browser.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-5">
            {/* Text input */}
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Content</span>
                <button onClick={copyLink} className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs text-slate-500 hover:text-white hover:bg-slate-700 transition">
                  <Copy size={11} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                className="w-full h-28 p-4 bg-transparent text-slate-300 text-sm leading-relaxed outline-none resize-none placeholder:text-slate-600"
                placeholder="URL, text, email, phone…"
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>

            {/* Quick presets */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Quick presets</div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button key={p.label} onClick={() => setText(p.value)}
                    className="px-3 py-1.5 rounded-xl text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition">{p.label}</button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Size</div>
              <div className="flex gap-2">
                {SIZES.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${size === s ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Colors</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Foreground</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={darkColor} onChange={e => setDarkColor(e.target.value)} className="w-9 h-9 rounded-lg border border-slate-700 cursor-pointer bg-transparent" />
                    <span className="text-xs font-mono text-slate-400">{darkColor.toUpperCase()}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Background</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={lightColor} onChange={e => setLightColor(e.target.value)} className="w-9 h-9 rounded-lg border border-slate-700 cursor-pointer bg-transparent" />
                    <span className="text-xs font-mono text-slate-400">{lightColor.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Preview */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden flex flex-col">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Preview</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-8 min-h-64">
              {dataUrl
                ? <img src={dataUrl} alt="QR Code" className="rounded-xl max-w-full" style={{ imageRendering: 'pixelated' }} />
                : <p className="text-slate-600 text-sm">QR code appears here…</p>
              }
            </div>
            {dataUrl && (
              <div className="px-5 py-4 border-t border-slate-700/80">
                <button onClick={download}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-indigo-500/20">
                  ↓ Download PNG
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
