"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Shuffle, ArrowLeft, LayoutGrid, RefreshCcw } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Shuffle size={15} className="text-indigo-400" /> Spin the Wheel</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

const COLORS = ['#6366f1','#ec4899','#f59e0b','#10b981','#06b6d4','#8b5cf6','#ef4444','#84cc16','#f97316','#14b8a6','#a855f7','#3b82f6'];

export default function SpinWheel() {
  const [items, setItems] = useState(['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']);
  const [input, setInput] = useState('Alice\nBob\nCharlie\nDiana\nEve\nFrank');
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState('');
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentRotRef = useRef(0);

  const drawWheel = useCallback((rot: number) => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    const ctx = canvas.getContext('2d')!;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 8;
    const arc = (2 * Math.PI) / items.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    items.forEach((item, i) => {
      const start = rot + i * arc;
      const end = start + arc;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.min(14, 120 / items.length)}px sans-serif`;
      const label = item.length > 14 ? item.slice(0, 13) + '…' : item;
      ctx.fillText(label, r - 12, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pointer
    ctx.beginPath();
    ctx.moveTo(canvas.width - 4, cy);
    ctx.lineTo(canvas.width - 28, cy - 12);
    ctx.lineTo(canvas.width - 28, cy + 12);
    ctx.closePath();
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
  }, [items]);

  useEffect(() => { drawWheel(currentRotRef.current); }, [drawWheel]);

  const spin = () => {
    if (spinning || items.length < 2) return;
    setWinner('');
    setSpinning(true);
    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.random() * 2 * Math.PI;
    const totalRotation = extraSpins * 2 * Math.PI + randomAngle;
    const duration = 4000;
    const start = performance.now();
    const startRot = currentRotRef.current;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = startRot + totalRotation * easeOut(progress);
      currentRotRef.current = current;
      drawWheel(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const arc = (2 * Math.PI) / items.length;
        // Pointer is at angle 0 (right side), normalize
        const normalized = ((current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(((2 * Math.PI - normalized) % (2 * Math.PI)) / arc) % items.length;
        setWinner(items[idx]);
      }
    };
    requestAnimationFrame(animate);
  };

  const applyInput = () => {
    const list = input.split('\n').map(s => s.trim()).filter(Boolean);
    if (list.length >= 2) { setItems(list); setWinner(''); }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[140px]" />
      </div>
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Shuffle size={28} /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Spin the <span className="text-indigo-400">Wheel</span></h1>
          <p className="text-slate-400 text-lg">Add your options and let fate decide.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Wheel */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <canvas ref={canvasRef} width={320} height={320} className="rounded-full" />
            </div>
            <button
              onClick={spin}
              disabled={spinning || items.length < 2}
              className="px-10 py-3.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 text-lg"
            >
              {spinning ? 'Spinning…' : 'Spin!'}
            </button>
            {winner && (
              <div className="text-center animate-bounce-once">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Winner</div>
                <div className="text-3xl font-extrabold text-white bg-indigo-500/15 border border-indigo-500/30 px-6 py-3 rounded-2xl">{winner} 🎉</div>
              </div>
            )}
          </div>

          {/* Items editor */}
          <div className="space-y-4">
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Options (one per line, min 2)</span>
                <span className="text-xs text-slate-500">{items.length} items</span>
              </div>
              <textarea
                className="w-full h-64 p-5 bg-transparent text-slate-300 text-sm leading-relaxed outline-none resize-none placeholder:text-slate-600"
                placeholder={"Alice\nBob\nCharlie\n…"}
                value={input}
                onChange={e => setInput(e.target.value)}
              />
            </div>
            <button
              onClick={applyInput}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium rounded-xl transition"
            >
              <RefreshCcw size={15} /> Update wheel
            </button>

            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Quick add</div>
              <div className="flex flex-wrap gap-2">
                {['Yes / No', 'Mon / Tue / Wed / Thu / Fri', '1 / 2 / 3 / 4 / 5 / 6'].map(preset => (
                  <button key={preset} onClick={() => { setInput(preset.replace(/ \/ /g, '\n')); setItems(preset.split(' / ')); setWinner(''); }}
                    className="px-3 py-1 rounded-lg text-xs border border-slate-700 text-slate-500 hover:text-white hover:border-slate-500 transition"
                  >{preset}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
