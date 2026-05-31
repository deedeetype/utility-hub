"use client";

import React, { useState, useEffect } from 'react';
import { Timer, Languages, Zap, Turtle, Mic, Copy, Coffee, LayoutGrid, ArrowLeft } from 'lucide-react';

type LangKey = 'en' | 'fr' | 'es';
type SpeedKey = 'slow' | 'normal' | 'fast';

interface LangConfig {
  name: string;
  defaultWpm: number;
}

interface SpeedPreset {
  label: string;
  wpmOffset: number;
  icon: React.ReactNode;
}

const LANGUAGE_CONFIG: Record<LangKey, LangConfig> = {
  en: { name: 'English', defaultWpm: 150 },
  fr: { name: 'Français', defaultWpm: 130 },
  es: { name: 'Español', defaultWpm: 140 },
};

const SPEED_PRESETS: Record<SpeedKey, SpeedPreset> = {
  slow:   { label: 'Slow',          wpmOffset: -30, icon: <Turtle size={16} /> },
  normal: { label: 'Conversational', wpmOffset: 0,   icon: <Mic size={16} /> },
  fast:   { label: 'Hype',          wpmOffset: 40,  icon: <Zap size={16} /> },
};

export default function ScriptTimer() {
  const [text, setText] = useState('');
  const [lang, setLang] = useState<LangKey>('en');
  const [speed, setSpeed] = useState<SpeedKey>('normal');
  const [time, setTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
    const wpm = LANGUAGE_CONFIG[lang].defaultWpm + SPEED_PRESETS[speed].wpmOffset;
    setTime(words > 0 ? (words / wpm) * 60 : 0);
  }, [text, lang, speed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins > 0 ? `${mins}m ` : ''}${secs}s`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">

      {/* Background glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/15 blur-[140px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
            <ArrowLeft size={16} /> Hub
          </a>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Timer size={15} className="text-indigo-400" /> Script Timer
          </div>
          <div className="flex-1" />
          <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
            <LayoutGrid size={13} /> 1001WebTools
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">

        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4">
            <Timer size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Script <span className="text-indigo-400">Timer</span>
          </h1>
          <p className="text-slate-400 text-lg">Calibrate your speech for TikTok, Reels & Shorts.</p>
        </header>

        <div className="grid gap-6">

          {/* Controls */}
          <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            {/* Language */}
            <div className="flex items-center gap-3">
              <Languages size={18} className="text-slate-400 shrink-0" />
              <div className="flex gap-2">
                {(Object.keys(LANGUAGE_CONFIG) as LangKey[]).map(key => (
                  <button
                    key={key}
                    onClick={() => setLang(key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      lang === key
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {LANGUAGE_CONFIG[key].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed */}
            <div className="flex p-1 bg-slate-900/50 rounded-full border border-slate-700 gap-1">
              {(Object.keys(SPEED_PRESETS) as SpeedKey[]).map(key => (
                <button
                  key={key}
                  onClick={() => setSpeed(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    speed === key ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {SPEED_PRESETS[key].icon} {SPEED_PRESETS[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="relative group">
            <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/40 to-blue-500/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
            <div className="relative bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
              {/* Stats bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900/70 border-b border-slate-700/80">
                <div className="flex gap-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Words</div>
                    <div className="text-xl font-mono font-semibold text-white">{wordCount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Estimated time</div>
                    <div className={`text-xl font-mono font-semibold transition-colors ${time > 60 ? 'text-red-400' : 'text-indigo-400'}`}>
                      {formatTime(time)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyToClipboard}
                  title="Copy script"
                  className="p-2 hover:bg-slate-700 rounded-xl transition-colors text-slate-400 hover:text-white"
                >
                  <Copy size={18} />
                  {copied && <span className="sr-only">Copied!</span>}
                </button>
              </div>

              <textarea
                className="w-full h-[380px] p-6 bg-transparent text-slate-300 text-lg leading-relaxed outline-none resize-none placeholder:text-slate-600"
                placeholder="Paste or type your script here…"
                value={text}
                onChange={e => setText(e.target.value)}
              />

              {/* Over 60s warning */}
              {time > 60 && (
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-xl text-red-400 text-sm">
                  ⚠️ <strong>Too long for a Reel/Short!</strong> Cut ~{Math.round((time - 60) * (LANGUAGE_CONFIG[lang].defaultWpm + SPEED_PRESETS[speed].wpmOffset) / 60)} words to stay under 60s.
                </div>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-wrap justify-center gap-4 pt-2 pb-8">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105"
            >
              <Copy size={17} /> {copied ? 'Copied!' : 'Copy script'}
            </button>
            <a
              href="https://www.buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition-all text-slate-300 font-medium hover:scale-105"
            >
              <Coffee size={17} /> Buy me a coffee
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
