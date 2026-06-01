"use client";

import React, { useState, useMemo } from 'react';
import { Hash, Copy, ArrowLeft, LayoutGrid, X } from 'lucide-react';
// @ts-ignore
import ArrowLeftRight from 'lucide-react/dist/esm/icons/arrow-left-right';
// @ts-ignore
import AlertCircle from 'lucide-react/dist/esm/icons/circle-alert';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
          <ArrowLeft size={16} /> Hub
        </a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Hash size={15} className="text-indigo-400" /> Base64 Encoder / Decoder
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" />
        </a>
      </div>
    </nav>
  );
}

type Mode = 'encode' | 'decode';

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' };
    try {
      if (mode === 'encode') return { output: btoa(unescape(encodeURIComponent(input))), error: '' };
      return { output: decodeURIComponent(escape(atob(input.trim()))), error: '' };
    } catch {
      return { output: '', error: mode === 'decode' ? 'Invalid Base64 string.' : 'Encoding failed.' };
    }
  }, [input, mode]);

  const copy = async () => {
    await navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    setMode(m => m === 'encode' ? 'decode' : 'encode');
    setInput(output);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/15 blur-[60px]" />
      </div>
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4">
            <Hash size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Base64 <span className="text-indigo-400">Encoder / Decoder</span>
          </h1>
          <p className="text-slate-400 text-lg">Encode or decode Base64 strings instantly, in your browser.</p>
        </header>

        {/* Mode toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
              mode === 'encode' ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            Encode
          </button>
          <button onClick={swap} title="Swap" className="p-2 rounded-xl text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition">
            <ArrowLeftRight size={18} />
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
              mode === 'decode' ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                {mode === 'encode' ? 'Plain text' : 'Base64 string'}
              </span>
              <button onClick={() => setInput('')} className="text-xs text-slate-600 hover:text-slate-400 transition">Clear</button>
            </div>
            <textarea
              className="w-full h-64 p-5 bg-transparent text-slate-300 text-sm font-mono leading-relaxed outline-none resize-none placeholder:text-slate-600"
              placeholder={mode === 'encode' ? 'Type or paste text to encode…' : 'Paste Base64 string to decode…'}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </div>

          {/* Output */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                {mode === 'encode' ? 'Base64 string' : 'Decoded text'}
              </span>
              {output && (
                <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition">
                  <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className="h-64 p-5 overflow-auto">
              {error ? (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} /> {error}
                </div>
              ) : (
                <p className="text-slate-300 text-sm font-mono break-all whitespace-pre-wrap">
                  {output || <span className="text-slate-600">Output appears here…</span>}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
