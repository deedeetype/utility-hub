"use client";

import React, { useState, useMemo } from 'react';
import { Wrench, Copy, ArrowLeft, LayoutGrid } from 'lucide-react';
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
          <Wrench size={15} className="text-indigo-400" /> Regex Tester
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" />
        </a>
      </div>
    </nav>
  );
}

const FLAG_LIST = ['g', 'i', 'm', 's'] as const;
type Flag = typeof FLAG_LIST[number];

interface Match {
  index: number;
  length: number;
  value: string;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState<Set<Flag>>(new Set(['g']));
  const [testStr, setTestStr] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleFlag = (f: Flag) => setFlags(prev => {
    const next = new Set(prev);
    next.has(f) ? next.delete(f) : next.add(f);
    return next;
  });

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern || !testStr) return { matches: [], error: '', highlighted: testStr };
    try {
      const re = new RegExp(pattern, [...flags].join(''));
      const matchList: Match[] = [];
      let m: RegExpExecArray | null;
      const exec = new RegExp(pattern, [...flags].join(''));
      if (flags.has('g')) {
        while ((m = exec.exec(testStr)) !== null) {
          matchList.push({ index: m.index, length: m[0].length, value: m[0], groups: m.slice(1) });
          if (m[0].length === 0) exec.lastIndex++;
        }
      } else {
        m = re.exec(testStr);
        if (m) matchList.push({ index: m.index, length: m[0].length, value: m[0], groups: m.slice(1) });
      }

      // Build highlighted HTML segments
      const segments: { text: string; match: boolean }[] = [];
      let cursor = 0;
      for (const match of matchList) {
        if (match.index > cursor) segments.push({ text: testStr.slice(cursor, match.index), match: false });
        segments.push({ text: testStr.slice(match.index, match.index + match.length), match: true });
        cursor = match.index + match.length;
      }
      if (cursor < testStr.length) segments.push({ text: testStr.slice(cursor), match: false });

      return { matches: matchList, error: '', highlighted: segments };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlighted: testStr };
    }
  }, [pattern, flags, testStr]);

  const copy = async () => {
    await navigator.clipboard.writeText(`/${pattern}/${[...flags].join('')}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Wrench size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Regex <span className="text-indigo-400">Tester</span>
          </h1>
          <p className="text-slate-400 text-lg">Test regular expressions with live match highlighting.</p>
        </header>

        {/* Pattern input */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 mb-4">
          <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Pattern</label>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-mono text-lg">/</span>
            <input
              type="text"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="e\.g\. \d{3}-\d{4}"
              spellCheck={false}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition"
            />
            <span className="text-slate-500 font-mono text-lg">/</span>
            <div className="flex gap-1.5">
              {FLAG_LIST.map(f => (
                <button
                  key={f}
                  onClick={() => toggleFlag(f)}
                  className={`w-8 h-8 rounded-lg text-sm font-mono font-bold border transition-all ${
                    flags.has(f) ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {pattern && (
              <button onClick={copy} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 transition">
                <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
              <AlertCircle size={15} /> {error}
            </div>
          )}
        </div>

        {/* Match count */}
        {pattern && testStr && !error && (
          <div className="mb-3 text-sm">
            <span className={matches.length > 0 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
              {matches.length === 0 ? 'No matches found' : `${matches.length} match${matches.length > 1 ? 'es' : ''} found`}
            </span>
          </div>
        )}

        {/* Test string with highlights */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden mb-4">
          <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
            <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Test string</span>
          </div>
          <textarea
            className="w-full h-36 p-5 bg-transparent text-slate-300 text-base font-mono leading-relaxed outline-none resize-none placeholder:text-slate-600"
            placeholder="Paste the string you want to test against…"
            value={testStr}
            onChange={e => setTestStr(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Highlighted output */}
        {testStr && !error && (
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden mb-4">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Matches highlighted</span>
            </div>
            <div className="p-5 font-mono text-base leading-relaxed whitespace-pre-wrap break-all">
              {Array.isArray(highlighted)
                ? highlighted.map((seg, i) =>
                    seg.match
                      ? <mark key={i} className="bg-indigo-500/30 text-indigo-200 rounded px-0.5 not-italic">{seg.text}</mark>
                      : <span key={i} className="text-slate-400">{seg.text}</span>
                  )
                : <span className="text-slate-400">{testStr}</span>
              }
            </div>
          </div>
        )}

        {/* Match list */}
        {matches.length > 0 && (
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Match details</div>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-mono">
                  <span className="text-slate-600 w-6">#{i + 1}</span>
                  <span className="text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">{m.value}</span>
                  <span className="text-slate-500">at index {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-slate-500">groups: {m.groups.map(g => `"${g}"`).join(', ')}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
