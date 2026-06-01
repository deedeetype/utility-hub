"use client";
import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, X } from 'lucide-react';
// @ts-ignore
import Shield from 'lucide-react/dist/esm/icons/shield';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Shield size={15} className="text-indigo-400"/> Password Strength</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

interface Check { label: string; ok: boolean; }

function analyze(pw: string) {
  const checks: Check[] = [
    { label: 'At least 8 characters',      ok: pw.length >= 8 },
    { label: 'At least 14 characters',     ok: pw.length >= 14 },
    { label: 'Contains uppercase (A–Z)',   ok: /[A-Z]/.test(pw) },
    { label: 'Contains lowercase (a–z)',   ok: /[a-z]/.test(pw) },
    { label: 'Contains numbers (0–9)',     ok: /[0-9]/.test(pw) },
    { label: 'Contains symbols (!@#…)',    ok: /[^A-Za-z0-9]/.test(pw) },
    { label: 'No common patterns',         ok: !/^(password|123|abc|qwerty)/i.test(pw) },
  ];
  const score = checks.filter(c => c.ok).length;
  const levels = ['', 'Very Weak', 'Weak', 'Weak', 'Fair', 'Strong', 'Strong', 'Very Strong'];
  const colors = ['', 'bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-lime-500', 'bg-emerald-400', 'bg-emerald-500'];
  const texts  = ['', 'text-red-400','text-red-400','text-orange-400','text-amber-400','text-lime-400','text-emerald-400','text-emerald-400'];
  return { checks, score, label: levels[score] || '', barColor: colors[score] || '', textColor: texts[score] || '' };
}

export default function PasswordStrength() {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const r = analyze(pw);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[60px]"/>
      </div>
      <NavBar/>
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Shield size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Password <span className="text-indigo-400">Strength</span></h1>
          <p className="text-slate-400 text-lg">Check how secure your password is — locally, nothing is sent anywhere.</p>
        </header>

        {/* Input */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5 mb-5">
          <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Your password</label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Type or paste your password…"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-indigo-500 transition pr-12"
              autoComplete="off" spellCheck={false}
            />
            <button onClick={() => setShow(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition text-xs font-semibold px-1">
              {show ? 'HIDE' : 'SHOW'}
            </button>
          </div>
          {pw && (
            <button onClick={() => setPw('')} className="mt-2 text-xs text-slate-600 hover:text-slate-400 transition flex items-center gap-1">
              <X size={11}/> Clear
            </button>
          )}
        </div>

        {/* Score */}
        {pw && (
          <div className="space-y-4">
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Strength</span>
                <span className={`font-bold text-sm ${r.textColor}`}>{r.label}</span>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= r.score ? r.barColor : 'bg-slate-700'}`}/>
                ))}
              </div>
              <div className="mt-3 text-xs text-slate-500">{pw.length} characters</div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Checklist</div>
              <ul className="space-y-2">
                {r.checks.map(c => (
                  <li key={c.label} className="flex items-center gap-2.5 text-sm">
                    <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${c.ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/60 text-slate-600'}`}>
                      {c.ok ? '✓' : '×'}
                    </span>
                    <span className={c.ok ? 'text-slate-300' : 'text-slate-500'}>{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
