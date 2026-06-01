"use client";
import React, { useState, useCallback } from 'react';
import { ArrowLeft, LayoutGrid, Copy } from 'lucide-react';
// @ts-ignore
import Radio from 'lucide-react/dist/esm/icons/radio';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Radio size={15} className="text-indigo-400"/> Morse Code Converter</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><LayoutGrid size={13}/> 1001FreeTools</a>
      </div>
    </nav>
  );
}

const MORSE: Record<string, string> = {
  A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',
  L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',
  W:'.--',X:'-..-',Y:'-.--',Z:'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
  '6':'-....','7':'--...','8':'---..','9':'----.',
  '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','-':'-....-',
  '/':'-..-.',':':'---...',';':'-.-.-.','=':'-...-','@':'.--.-.','&':'.-...',
};
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));

const toMorse = (text: string) => text.toUpperCase().split('').map(c=>c===' '?'/':(MORSE[c]||'')).filter(Boolean).join(' ');
const fromMorse = (morse: string) => morse.split(' / ').map(word=>word.split(' ').map(c=>MORSE_REV[c]||'').join('')).join(' ');

function beep(ctx: AudioContext, dot: boolean) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = 600;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  osc.start(); osc.stop(ctx.currentTime + (dot ? 0.1 : 0.3));
}

type Mode = 'encode' | 'decode';

export default function MorseCode() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);

  const output = mode === 'encode' ? toMorse(input) : fromMorse(input);

  const copy = async () => { await navigator.clipboard.writeText(output).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const play = useCallback(async () => {
    if (playing) return;
    const morse = mode === 'encode' ? toMorse(input) : input;
    if (!morse.trim()) return;
    setPlaying(true);
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const unit = 100;
    let t = ctx.currentTime;
    for (const ch of morse) {
      if (ch === '.') { await new Promise(r=>setTimeout(r,unit)); if(!playing) break; const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=600;g.gain.setValueAtTime(0.3,t);o.start(t);t+=0.1;o.stop(t);await new Promise(r=>setTimeout(r,unit)); t+=0.1; }
      else if (ch === '-') { await new Promise(r=>setTimeout(r,unit*3)); const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=600;g.gain.setValueAtTime(0.3,t);o.start(t);t+=0.3;o.stop(t);await new Promise(r=>setTimeout(r,unit*3)); t+=0.3; }
      else if (ch === ' ') { await new Promise(r=>setTimeout(r,unit*3)); t+=0.3; }
      else if (ch === '/') { await new Promise(r=>setTimeout(r,unit*7)); t+=0.7; }
    }
    setPlaying(false);
  }, [input, mode, playing]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]"/>
      </div>
      <NavBar/>
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Radio size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Morse Code <span className="text-indigo-400">Converter</span></h1>
          <p className="text-slate-400 text-lg">Convert text to Morse code and back. Play the audio.</p>
        </header>

        <div className="flex items-center justify-center gap-4 mb-8">
          {(['encode','decode'] as Mode[]).map(m=>(
            <button key={m} onClick={()=>setMode(m)} className={`px-6 py-2.5 rounded-xl font-semibold text-sm border transition-all ${mode===m?'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20':'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>
              {m==='encode'?'Text → Morse':'Morse → Text'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex justify-between items-center">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">{mode==='encode'?'Text':'Morse code'}</span>
              <button onClick={()=>setInput('')} className="text-xs text-slate-600 hover:text-slate-400 transition">Clear</button>
            </div>
            <textarea className="w-full h-52 p-5 bg-transparent text-slate-300 text-base font-mono leading-relaxed outline-none resize-none placeholder:text-slate-600"
              placeholder={mode==='encode'?'Type your text here…':'... . - - . -'}
              value={input} onChange={e=>setInput(e.target.value)} spellCheck={false}/>
          </div>
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex justify-between items-center">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">{mode==='encode'?'Morse code':'Text'}</span>
              {output && <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-700 transition"><Copy size={12}/>{copied?'Copied!':'Copy'}</button>}
            </div>
            <div className="h-52 p-5 overflow-auto text-slate-300 text-base font-mono leading-relaxed whitespace-pre-wrap break-all">
              {output || <span className="text-slate-600">Output appears here…</span>}
            </div>
          </div>
        </div>

        {mode === 'encode' && input && (
          <button onClick={play} disabled={playing}
            className="mt-4 w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition flex items-center justify-center gap-2 font-medium">
            {playing ? '♪ Playing…' : '▶ Play Morse audio'}
          </button>
        )}

        {/* Reference table */}
        <div className="mt-6 bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Quick reference</div>
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c=>(
              <div key={c} className="text-center">
                <div className="text-sm font-bold text-slate-300">{c}</div>
                <div className="text-xs text-slate-600 font-mono">{MORSE[c]}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
