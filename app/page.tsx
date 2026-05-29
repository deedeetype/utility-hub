"use client";

import React from 'react';
import { Timer, Zap, Rocket, Coffee, Github, ExternalLink, LayoutGrid } from 'lucide-react';

interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  tag: string;
}

const TOOLS: Tool[] = [
  {
    name: 'The Script Timer',
    description: 'Calibrate your speech for short-form content (TikTok, Reels, YT Shorts). Perfect your timing in seconds.',
    icon: <Timer className="w-6 h-6" />,
    color: 'bg-indigo-500',
    link: 'https://script-timer.netlify.app', 
    tag: 'Productivity'
  },
  {
    name: 'Coming Soon...',
    description: 'A high-performance utility to solve your next big frustration.',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-slate-700',
    link: '#',
    tag: 'Beta'
  },
  {
    name: 'Coming Soon...',
    description: 'Another zero-friction tool to simplify your daily workflow.',
    icon: <Rocket className="w-6 h-6" />,
    color: 'bg-slate-700',
    link: '#',
    tag: 'Ideating'
  }
];

export default function UtilityHub() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <header className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-6">
            <LayoutGrid size={32} />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            The <span className="text-indigo-400">Utility</span> Hub
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A curated constellation of zero-friction, high-performance tools designed to solve specific problems instantly. 
            <span className="block mt-2 font-medium text-slate-300">No accounts. No ads. No clutter.</span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((tool, idx) => (
            <a 
              key={idx} 
              href={tool.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-3xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800/60 hover:-translate-y-2 shadow-xl hover:shadow-indigo-500/10"
            >
              <div className={`inline-flex p-3 rounded-2xl ${tool.color} text-white mb-6 transition-transform group-hover:scale-110 duration-300`}>
                {tool.icon}
              </div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {tool.name}
                </h3>
                <ExternalLink size={18} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                {tool.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-400 border border-slate-700">
                  {tool.tag}
                </span>
                <span className="text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors">
                  Explore Tool →
                </span>
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-24 p-8 rounded-3xl bg-indigo-600/5 border border-indigo-500/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Fuel the Constellation 🚀</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            These tools are built with a passion for minimalism and efficiency. If they save you time, 
            consider supporting the development of the next utility.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://www.buymeacoffee.com" 
              target="_blank" 
              className="flex items-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105"
            >
              <Coffee size={20} /> Buy me a coffee
            </a>
            <a 
              href="https://github.com/deedeetype" 
              target="_blank" 
              className="flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700 hover:scale-105"
            >
              <Github size={20} /> View on GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
