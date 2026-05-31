"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Timer, Search, ExternalLink, LayoutGrid,
  Type, Code2, Image as ImageIcon, Palette, Wrench,
  FileText, Hash, Maximize2, Pipette, Layers,
  Coffee, GitFork, Menu, X, Zap, Rocket, Star, ChevronRight,
} from 'lucide-react';

type Status = 'live' | 'beta' | 'coming-soon';
type CategoryKey = 'all' | 'productivity' | 'text' | 'code' | 'media' | 'design';

interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: CategoryKey;
  link: string;
  status: Status;
}

const CATEGORIES: { key: CategoryKey; label: string; icon: React.ReactNode }[] = [
  { key: 'all',          label: 'All Tools',    icon: <LayoutGrid size={15} /> },
  { key: 'productivity', label: 'Productivity', icon: <Timer size={15} /> },
  { key: 'text',         label: 'Text',         icon: <Type size={15} /> },
  { key: 'code',         label: 'Code',         icon: <Code2 size={15} /> },
  { key: 'media',        label: 'Media',        icon: <ImageIcon size={15} /> },
  { key: 'design',       label: 'Design',       icon: <Palette size={15} /> },
];

const TOOLS: Tool[] = [
  {
    name: 'Script Timer',
    description: 'Calibrate your speech for short-form content — TikTok, Reels, YT Shorts. Perfect your timing in seconds.',
    icon: <Timer size={22} />,
    category: 'productivity',
    link: '/tools/script-timer',
    status: 'live',
  },
  {
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and reading time instantly. Perfect for SEO copy, social posts, and essays.',
    icon: <Type size={22} />,
    category: 'text',
    link: '#',
    status: 'coming-soon',
  },
  {
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in seconds — choose paragraphs, words, or sentences on demand.',
    icon: <FileText size={22} />,
    category: 'text',
    link: '#',
    status: 'coming-soon',
  },
  {
    name: 'Case Converter',
    description: 'Switch between UPPERCASE, lowercase, Title Case, camelCase, snake_case and more in one click.',
    icon: <Type size={22} />,
    category: 'text',
    link: '#',
    status: 'coming-soon',
  },
  {
    name: 'Base64 Encoder / Decoder',
    description: 'Encode or decode any text or file to Base64 format instantly, entirely in your browser.',
    icon: <Hash size={22} />,
    category: 'code',
    link: '#',
    status: 'coming-soon',
  },
  {
    name: 'JSON Formatter',
    description: 'Prettify, minify, and validate JSON with syntax highlighting. No data ever leaves your browser.',
    icon: <Code2 size={22} />,
    category: 'code',
    link: '#',
    status: 'coming-soon',
  },
  {
    name: 'Regex Tester',
    description: 'Write, test, and debug regular expressions with live match highlighting and pattern explanations.',
    icon: <Wrench size={22} />,
    category: 'code',
    link: '#',
    status: 'coming-soon',
  },
  {
    name: 'Image Resizer',
    description: 'Resize and compress images directly in your browser — no uploads, no servers, instant results.',
    icon: <Maximize2 size={22} />,
    category: 'media',
    link: '#',
    status: 'coming-soon',
  },
  {
    name: 'Color Picker',
    description: 'Pick colors, generate palettes, and convert between HEX, RGB, HSL and more.',
    icon: <Pipette size={22} />,
    category: 'design',
    link: '#',
    status: 'coming-soon',
  },
  {
    name: 'CSS Gradient Generator',
    description: 'Build beautiful CSS gradients visually and copy the code instantly. Linear, radial, and conic.',
    icon: <Layers size={22} />,
    category: 'design',
    link: '#',
    status: 'coming-soon',
  },
];

const STATUS_CONFIG: Record<Status, { label: string; classes: string }> = {
  live:          { label: 'Live',         classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  beta:          { label: 'Beta',         classes: 'bg-amber-500/10  text-amber-400  border-amber-500/20'  },
  'coming-soon': { label: 'Coming Soon',  classes: 'bg-slate-700/50  text-slate-500  border-slate-600/30'  },
};

export default function UtilityHub() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = TOOLS.filter(tool => {
    const matchCat = activeCategory === 'all' || tool.category === activeCategory;
    const q = query.toLowerCase();
    const matchQ = !q || tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const selectCategory = (key: CategoryKey) => {
    setActiveCategory(key);
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">

      {/* Background glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-700/10 blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-blue-700/10 blur-[160px]" />
      </div>

      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 mr-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/20 text-indigo-400">
              <LayoutGrid size={17} />
            </div>
            <span className="font-bold text-white text-[17px] tracking-tight">
              1001<span className="text-indigo-400">WebTools</span>
            </span>
          </a>

          {/* Search bar – desktop */}
          <div className="flex-1 max-w-sm relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search tools…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-9 pr-14 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] text-slate-600 border border-slate-700 bg-slate-800 font-mono pointer-events-none">
              ⌘K
            </kbd>
          </div>

          <div className="flex-1" />

          {/* Nav links – desktop */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#tools" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition">
              Browse Tools
            </a>
            <a href="#suggest" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition">
              Suggest a Tool
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/60 px-6 py-4 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tools…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition"
              />
            </div>
            <a href="#tools" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-400 hover:text-white py-1 transition">Browse Tools</a>
            <a href="#suggest" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-400 hover:text-white py-1 transition">Suggest a Tool</a>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-6">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="text-center py-20 md:py-28">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <Zap size={11} /> Free utilities for the modern web
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-5 leading-[1.08]">
            Your everyday<br />
            <span className="text-indigo-400">web toolkit</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            Fast, focused tools for creators, developers, and makers.{' '}
            <span className="text-slate-300 font-medium">No accounts. No ads. No clutter.</span>
          </p>

          {/* Stats row */}
          <div className="inline-flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { value: `${TOOLS.length}+`, label: 'Tools & growing' },
              { value: '100%',             label: 'Free forever'    },
              { value: '0',               label: 'Registrations'   },
              { value: '0',               label: 'Ads'             },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tool browser ─────────────────────────────────────────────── */}
        <section id="tools" className="pb-24">

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(cat => {
              const count = cat.key === 'all' ? TOOLS.length : TOOLS.filter(t => t.category === cat.key).length;
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    active
                      ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                  <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${active ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-500">
              <Search size={40} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">No tools match &ldquo;<span className="text-slate-300">{query}</span>&rdquo;</p>
              <button onClick={() => setQuery('')} className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition">
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(tool => {
                const status = STATUS_CONFIG[tool.status];
                const isLive = tool.status === 'live';
                const catLabel = CATEGORIES.find(c => c.key === tool.category)?.label ?? '';
                return (
                  <a
                    key={tool.name}
                    href={isLive ? tool.link : undefined}
                    target={isLive && tool.link.startsWith('http') ? '_blank' : undefined}
                    rel={isLive && tool.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`group flex flex-col bg-slate-800/30 border border-slate-700/40 rounded-2xl p-6 transition-all duration-300 ${
                      isLive
                        ? 'hover:border-indigo-500/40 hover:bg-slate-800/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10'
                        : 'opacity-60 cursor-default'
                    }`}
                  >
                    {/* Top row: icon + badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                        isLive ? 'bg-indigo-500/15 text-indigo-400' : 'bg-slate-700/50 text-slate-500'
                      }`}>
                        {tool.icon}
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${status.classes}`}>
                        {status.label}
                      </span>
                    </div>

                    {/* Name + description */}
                    <h3 className={`text-lg font-bold mb-2 transition-colors ${
                      isLive ? 'text-white group-hover:text-indigo-300' : 'text-slate-400'
                    }`}>
                      {tool.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1">
                      {tool.description}
                    </p>

                    {/* Bottom row */}
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                        {catLabel}
                      </span>
                      {isLive && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                          Launch <ExternalLink size={11} />
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section id="suggest" className="pb-24">
          <div className="rounded-3xl bg-indigo-600/5 border border-indigo-500/15 p-10 md:p-14 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
              <Rocket size={28} />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4">Got an idea for a tool?</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Have a repetitive task a focused utility could solve? Suggest it — chances are someone else has the same frustration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:david.laborieux@gmail.com?subject=Tool Suggestion — 1001WebTools"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105"
              >
                <Star size={17} /> Suggest a tool
              </a>
              <a
                href="https://www.buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700 hover:scale-105"
              >
                <Coffee size={17} /> Support the project
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/20 text-indigo-400">
                  <LayoutGrid size={15} />
                </div>
                <span className="font-bold text-white">1001<span className="text-indigo-400">WebTools</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Fast, focused utilities for the modern web. Free forever.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest">Categories</h4>
              <ul className="space-y-2.5">
                {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                  <li key={cat.key}>
                    <button
                      onClick={() => selectCategory(cat.key)}
                      className="text-sm text-slate-500 hover:text-indigo-400 transition flex items-center gap-1.5"
                    >
                      <ChevronRight size={12} /> {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest">Links</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'All Tools',       href: '#tools'                            },
                  { label: 'Suggest a Tool',  href: '#suggest'                          },
                  { label: 'GitHub',          href: 'https://github.com/deedeetype'    },
                  { label: 'Buy me a coffee', href: 'https://www.buymeacoffee.com'     },
                ].map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-slate-500 hover:text-indigo-400 transition flex items-center gap-1.5"
                    >
                      <ChevronRight size={12} /> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promise */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest">Our Promise</h4>
              <ul className="space-y-2.5">
                {['100% Free', 'No registration', 'No ads', 'Runs in your browser', 'Privacy first'].map(item => (
                  <li key={item} className="text-sm text-slate-500 flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <span>© {new Date().getFullYear()} 1001WebTools — Built with ♥</span>
            <a
              href="https://github.com/deedeetype"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-400 transition"
            >
              <GitFork size={12} /> deedeetype
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
