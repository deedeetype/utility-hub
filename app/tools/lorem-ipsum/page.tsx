"use client";

import React, { useState } from 'react';
import { FileText, RefreshCw, Copy, ArrowLeft, LayoutGrid } from 'lucide-react';

const WORDS = `lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum curabitur pretium tincidunt lacus nulla gravida orci a odio nullam varius turpis hendrerit ante ipsum primis in faucibus orci luctus ultrices posuere cubilia curae praesent aliquam consequat mi at bibendum velit vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus malesuada fames turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie`.split(' ');

function generateWords(n: number, startLorem: boolean): string {
  const pool = [...WORDS];
  const result: string[] = [];
  for (let i = 0; i < n; i++) result.push(pool[i % pool.length]);
  if (startLorem) { result[0] = 'Lorem'; result[1] = 'ipsum'; }
  return result.join(' ');
}

function generateSentence(startLorem: boolean, idx: number): string {
  const len = 8 + Math.floor(Math.random() * 10);
  const w = generateWords(len, startLorem && idx === 0);
  return w.charAt(0).toUpperCase() + w.slice(1) + '.';
}

function generateParagraph(startLorem: boolean, idx: number): string {
  const count = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, (_, i) => generateSentence(startLorem, idx === 0 ? i : 1)).join(' ');
}

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
          <ArrowLeft size={16} /> Hub
        </a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <FileText size={15} className="text-indigo-400" /> Lorem Ipsum Generator
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" />
        </a>
      </div>
    </nav>
  );
}

type Mode = 'paragraphs' | 'sentences' | 'words';

export default function LoremIpsum() {
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [count, setCount] = useState(3);
  const [startLorem, setStartLorem] = useState(true);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = '';
    if (mode === 'paragraphs') {
      result = Array.from({ length: count }, (_, i) => generateParagraph(startLorem, i)).join('\n\n');
    } else if (mode === 'sentences') {
      result = Array.from({ length: count }, (_, i) => generateSentence(startLorem, i)).join(' ');
    } else {
      result = generateWords(count, startLorem);
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    setOutput(result);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const MODES: { key: Mode; label: string }[] = [
    { key: 'paragraphs', label: 'Paragraphs' },
    { key: 'sentences', label: 'Sentences' },
    { key: 'words', label: 'Words' },
  ];

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
            <FileText size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Lorem Ipsum <span className="text-indigo-400">Generator</span>
          </h1>
          <p className="text-slate-400 text-lg">Generate placeholder text instantly.</p>
        </header>

        {/* Controls */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 mb-6 flex flex-wrap gap-6 items-end">
          {/* Mode */}
          <div>
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Type</label>
            <div className="flex gap-2">
              {MODES.map(m => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    mode === m.key
                      ? 'bg-indigo-500 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div>
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Count</label>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={e => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Start with Lorem ipsum */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setStartLorem(v => !v)}
              className={`w-10 h-5 rounded-full transition-colors relative ${startLorem ? 'bg-indigo-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${startLorem ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-slate-400">Start with &ldquo;Lorem ipsum&rdquo;</span>
          </label>

          <button
            onClick={generate}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 ml-auto"
          >
            <RefreshCw size={16} /> Generate
          </button>
        </div>

        {/* Output */}
        <div className="relative bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
            <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Output</span>
            {output && (
              <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition">
                <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div className="p-5 min-h-48 text-slate-300 leading-relaxed whitespace-pre-wrap text-base">
            {output || <span className="text-slate-600">Your generated text will appear here…</span>}
          </div>
        </div>
      </main>
    </div>
  );
}
