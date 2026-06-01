"use client";

import React, { useState } from 'react';
import { Coins, ArrowLeft, LayoutGrid } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Coins size={15} className="text-indigo-400" /> Coin Flipper</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

type Side = 'heads' | 'tails';

export default function CoinFlipper() {
  const [result, setResult] = useState<Side | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<Side[]>([]);
  const [animKey, setAnimKey] = useState(0);

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    setResult(null);
    setAnimKey(k => k + 1);
    setTimeout(() => {
      const side: Side = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(side);
      setHistory(h => [side, ...h].slice(0, 20));
      setFlipping(false);
    }, 800);
  };

  const heads = history.filter(h => h === 'heads').length;
  const tails = history.filter(h => h === 'tails').length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[60px]" />
      </div>
      <NavBar />
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 mb-4"><Coins size={28} /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Coin <span className="text-amber-400">Flipper</span></h1>
          <p className="text-slate-400 text-lg">Heads or tails? Let fate decide.</p>
        </header>

        {/* Coin */}
        <div className="flex justify-center mb-8">
          <style>{`
            @keyframes coinFlip {
              0%   { transform: rotateY(0deg); }
              100% { transform: rotateY(1440deg); }
            }
            .coin-flip { animation: coinFlip 0.8s ease-out forwards; }
          `}</style>
          <div
            key={animKey}
            className={`w-44 h-44 rounded-full flex items-center justify-center text-6xl shadow-2xl cursor-pointer select-none transition-all ${flipping ? 'coin-flip' : ''} ${
              result === 'heads' ? 'bg-gradient-to-br from-amber-300 to-amber-500 shadow-amber-500/30' :
              result === 'tails'  ? 'bg-gradient-to-br from-slate-400 to-slate-600 shadow-slate-500/30' :
              'bg-gradient-to-br from-amber-300 to-amber-500 shadow-amber-500/20'
            }`}
            onClick={flip}
          >
            {result === 'tails' ? '🦅' : '👑'}
          </div>
        </div>

        {/* Result */}
        <div className="text-center mb-8 min-h-16">
          {result && !flipping && (
            <div className="animate-in fade-in">
              <div className="text-4xl font-extrabold text-white capitalize mb-1">{result}!</div>
              <div className="text-slate-400 text-sm">Click the coin to flip again</div>
            </div>
          )}
          {!result && !flipping && (
            <p className="text-slate-500">Click the coin — or the button below</p>
          )}
        </div>

        <button onClick={flip} disabled={flipping}
          className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-lg shadow-amber-500/20 hover:scale-105 text-xl mb-8">
          {flipping ? 'Flipping…' : 'Flip!'}
        </button>

        {/* Stats + history */}
        {history.length > 0 && (
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 space-y-4">
            <div className="flex justify-around text-center">
              <div>
                <div className="text-2xl font-extrabold text-amber-400">{heads}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Heads 👑</div>
              </div>
              <div className="w-px bg-slate-700" />
              <div>
                <div className="text-2xl font-extrabold text-slate-300">{tails}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Tails 🦅</div>
              </div>
              <div className="w-px bg-slate-700" />
              <div>
                <div className="text-2xl font-extrabold text-white">{history.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {history.map((h, i) => (
                <span key={i} className={`text-sm px-2 py-0.5 rounded-lg font-medium ${h === 'heads' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/60 text-slate-400'}`}>
                  {h === 'heads' ? '👑 H' : '🦅 T'}
                </span>
              ))}
            </div>
            <button onClick={() => setHistory([])} className="text-xs text-slate-600 hover:text-slate-400 transition">Clear history</button>
          </div>
        )}
      </main>
    </div>
  );
}
