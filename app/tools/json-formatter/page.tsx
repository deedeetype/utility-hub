"use client";

import React, { useState } from 'react';
import { Code2, Copy, Minimize2, ArrowLeft, LayoutGrid } from 'lucide-react';
// @ts-ignore
import CheckCircle2 from 'lucide-react/dist/esm/icons/circle-check';
// @ts-ignore
import AlertCircle from 'lucide-react/dist/esm/icons/circle-alert';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
          <ArrowLeft size={16} /> Hub
        </a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Code2 size={15} className="text-indigo-400" /> JSON Formatter
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <LayoutGrid size={13} /> 1001WebTools
        </a>
      </div>
    </nav>
  );
}

type IndentSize = 2 | 4;

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState<IndentSize>(2);
  const [copied, setCopied] = useState(false);

  const result = (() => {
    if (!input.trim()) return { output: '', error: '', valid: false };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, indent), error: '', valid: true };
    } catch (e) {
      return { output: '', error: (e as Error).message, valid: false };
    }
  })();

  const minified = (() => {
    if (!result.valid) return '';
    try { return JSON.stringify(JSON.parse(input)); } catch { return ''; }
  })();

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/15 blur-[140px]" />
      </div>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4">
            <Code2 size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            JSON <span className="text-indigo-400">Formatter</span>
          </h1>
          <p className="text-slate-400 text-lg">Prettify, validate and minify JSON — nothing leaves your browser.</p>
        </header>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Indent:</span>
            {([2, 4] as IndentSize[]).map(n => (
              <button
                key={n}
                onClick={() => setIndent(n)}
                className={`px-3 py-1 rounded-lg border text-xs font-mono font-semibold transition-all ${
                  indent === n ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {n} spaces
              </button>
            ))}
          </div>

          {/* Validation badge */}
          {input.trim() && (
            <div className={`flex items-center gap-1.5 text-sm font-medium ${result.valid ? 'text-emerald-400' : 'text-red-400'}`}>
              {result.valid ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {result.valid ? 'Valid JSON' : 'Invalid JSON'}
            </div>
          )}

          <div className="ml-auto flex gap-2">
            {result.valid && (
              <>
                <button
                  onClick={() => copy(minified)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 transition"
                >
                  <Minimize2 size={13} /> Copy minified
                </button>
                <button
                  onClick={() => copy(result.output)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-400 transition"
                >
                  <Copy size={13} /> {copied ? 'Copied!' : 'Copy formatted'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Input JSON</span>
              <button onClick={() => setInput('')} className="text-xs text-slate-600 hover:text-slate-400 transition">Clear</button>
            </div>
            <textarea
              className="w-full h-[420px] p-5 bg-transparent text-slate-300 text-sm font-mono leading-relaxed outline-none resize-none placeholder:text-slate-600"
              placeholder={'{\n  "paste": "your JSON here"\n}'}
              value={input}
              onChange={e => setInput(e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Formatted output</span>
            </div>
            <div className="h-[420px] p-5 overflow-auto">
              {result.error ? (
                <div className="flex items-start gap-2 text-red-400 text-sm font-mono">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{result.error}</span>
                </div>
              ) : (
                <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap break-all">
                  {result.output || <span className="text-slate-600">Formatted JSON appears here…</span>}
                </pre>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
