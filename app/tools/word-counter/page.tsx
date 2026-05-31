"use client";

import React, { useState, useMemo } from 'react';
import { Type, Copy, ArrowLeft, LayoutGrid } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
          <ArrowLeft size={16} /> Hub
        </a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Type size={15} className="text-indigo-400" /> Word Counter
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <LayoutGrid size={13} /> 1001WebTools
        </a>
      </div>
    </nav>
  );
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 130);
    return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime, speakingTime };
  }, [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const STAT_CARDS = [
    { label: 'Words',       value: stats.words },
    { label: 'Characters',  value: stats.chars },
    { label: 'No spaces',   value: stats.charsNoSpaces },
    { label: 'Sentences',   value: stats.sentences },
    { label: 'Paragraphs',  value: stats.paragraphs },
    { label: 'Read time',   value: `${stats.readingTime} min` },
    { label: 'Speak time',  value: `${stats.speakingTime} min` },
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
            <Type size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Word <span className="text-indigo-400">Counter</span>
          </h1>
          <p className="text-slate-400 text-lg">Words, characters, sentences, reading time — instantly.</p>
        </header>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {STAT_CARDS.slice(0, 4).map(s => (
            <div key={s.label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white mb-1">{String(s.value)}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {STAT_CARDS.slice(4).map(s => (
            <div key={s.label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 text-center">
              <div className="text-2xl font-extrabold text-white mb-1">{String(s.value)}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="relative bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Your text</span>
            <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition">
              <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            className="w-full h-72 p-5 bg-transparent text-slate-300 text-base leading-relaxed outline-none resize-none placeholder:text-slate-600"
            placeholder="Paste or type your text here…"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-3">
          <button onClick={() => setText('')} className="text-xs text-slate-600 hover:text-slate-400 transition">
            Clear
          </button>
        </div>
      </main>
    </div>
  );
}
