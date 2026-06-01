"use client";
import React, { useState, useMemo } from 'react';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
// @ts-ignore
import GitCompare from 'lucide-react/dist/esm/icons/git-compare';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><GitCompare size={15} className="text-indigo-400"/> Text Diff</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><LayoutGrid size={13}/> 1001FreeTools</a>
      </div>
    </nav>
  );
}

type DiffOp = { type: 'eq' | 'add' | 'del'; text: string };

function diffLines(a: string, b: string): DiffOp[] {
  const la = a.split('\n'), lb = b.split('\n');
  const m = la.length, n = lb.length;
  const dp: number[][] = Array.from({ length: m+1 }, () => new Array(n+1).fill(0));
  for (let i=m-1;i>=0;i--) for (let j=n-1;j>=0;j--)
    dp[i][j] = la[i]===lb[j] ? dp[i+1][j+1]+1 : Math.max(dp[i+1][j], dp[i][j+1]);
  const ops: DiffOp[] = [];
  let i=0, j=0;
  while (i<m || j<n) {
    if (i<m && j<n && la[i]===lb[j]) { ops.push({type:'eq',text:la[i]}); i++; j++; }
    else if (j<n && (i>=m || dp[i+1][j]>=dp[i][j+1])) { ops.push({type:'add',text:lb[j]}); j++; }
    else { ops.push({type:'del',text:la[i]}); i++; }
  }
  return ops;
}

export default function TextDiff() {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  const diff = useMemo(() => {
    if (!left && !right) return [];
    return diffLines(left, right);
  }, [left, right]);

  const added   = diff.filter(d=>d.type==='add').length;
  const removed = diff.filter(d=>d.type==='del').length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]"/>
      </div>
      <NavBar/>
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><GitCompare size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Text <span className="text-indigo-400">Diff</span></h1>
          <p className="text-slate-400 text-lg">Compare two texts and see the differences highlighted.</p>
        </header>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[{label:'Original',val:left,set:setLeft},{label:'Modified',val:right,set:setRight}].map(p=>(
            <div key={p.label} className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">{p.label}</span>
                <button onClick={()=>p.set('')} className="text-xs text-slate-600 hover:text-slate-400 transition">Clear</button>
              </div>
              <textarea className="w-full h-48 p-4 bg-transparent text-slate-300 text-sm font-mono leading-relaxed outline-none resize-none placeholder:text-slate-600"
                placeholder={`Paste ${p.label.toLowerCase()} text…`} value={p.val} onChange={e=>p.set(e.target.value)} spellCheck={false}/>
            </div>
          ))}
        </div>

        {/* Stats */}
        {(left || right) && (
          <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
              <span className="font-bold">+{added}</span> added
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <span className="font-bold">−{removed}</span> removed
            </div>
            {added === 0 && removed === 0 && <div className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-400 text-sm">Identical</div>}
          </div>
        )}

        {/* Diff output */}
        {diff.length > 0 && (
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Diff output</span>
            </div>
            <div className="p-4 font-mono text-sm overflow-auto max-h-96">
              {diff.map((op, i) => (
                <div key={i} className={`flex gap-3 px-2 py-0.5 rounded ${op.type==='add'?'bg-emerald-500/10 text-emerald-300':op.type==='del'?'bg-red-500/10 text-red-300':'text-slate-400'}`}>
                  <span className="w-4 shrink-0 text-xs opacity-60">{op.type==='add'?'+':op.type==='del'?'−':' '}</span>
                  <span className="whitespace-pre-wrap break-all">{op.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
