"use client";

import React, { useState } from 'react';
import { Type, Copy, ArrowLeft, LayoutGrid } from 'lucide-react';

function toTitleCase(s: string) {
  return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}
function toSentenceCase(s: string) {
  return s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}
function toCamelCase(s: string) {
  return s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
}
function toPascalCase(s: string) {
  const c = toCamelCase(s);
  return c.charAt(0).toUpperCase() + c.slice(1);
}
function toSnakeCase(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}
function toKebabCase(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
function toConstantCase(s: string) {
  return toSnakeCase(s).toUpperCase();
}
function toAlternating(s: string) {
  return s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
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
          <Type size={15} className="text-indigo-400" /> Case Converter
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <img src="/logo.png" alt="1001FreeTools" className="w-6 h-6 rounded-md" />
        </a>
      </div>
    </nav>
  );
}

interface CaseOption {
  label: string;
  example: string;
  fn: (s: string) => string;
}

const CASES: CaseOption[] = [
  { label: 'UPPERCASE',      example: 'HELLO WORLD',  fn: s => s.toUpperCase() },
  { label: 'lowercase',      example: 'hello world',  fn: s => s.toLowerCase() },
  { label: 'Title Case',     example: 'Hello World',  fn: toTitleCase },
  { label: 'Sentence case',  example: 'Hello world.', fn: toSentenceCase },
  { label: 'camelCase',      example: 'helloWorld',   fn: toCamelCase },
  { label: 'PascalCase',     example: 'HelloWorld',   fn: toPascalCase },
  { label: 'snake_case',     example: 'hello_world',  fn: toSnakeCase },
  { label: 'kebab-case',     example: 'hello-world',  fn: toKebabCase },
  { label: 'CONSTANT_CASE',  example: 'HELLO_WORLD',  fn: toConstantCase },
  { label: 'aLtErNaTiNg',    example: 'hElLo wOrLd',  fn: toAlternating },
];

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

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
            Case <span className="text-indigo-400">Converter</span>
          </h1>
          <p className="text-slate-400 text-lg">Transform text between any case format in one click.</p>
        </header>

        {/* Input */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden mb-6">
          <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
            <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Input text</span>
          </div>
          <textarea
            className="w-full h-36 p-5 bg-transparent text-slate-300 text-base leading-relaxed outline-none resize-none placeholder:text-slate-600"
            placeholder="Type or paste your text here…"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>

        {/* Case results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CASES.map((c, idx) => {
            const result = input ? c.fn(input) : c.example;
            const isExample = !input;
            return (
              <div key={c.label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 flex items-center justify-between gap-3 group">
                <div className="min-w-0">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{c.label}</div>
                  <div className={`text-sm font-mono truncate ${isExample ? 'text-slate-600' : 'text-slate-200'}`}>{result}</div>
                </div>
                {!isExample && (
                  <button
                    onClick={() => copy(result, idx)}
                    className="shrink-0 p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition"
                  >
                    <Copy size={14} />
                    {copiedIdx === idx && <span className="sr-only">Copied</span>}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {!input && (
          <p className="text-center text-xs text-slate-600 mt-4">Examples shown — type something above to convert</p>
        )}
      </main>
    </div>
  );
}
