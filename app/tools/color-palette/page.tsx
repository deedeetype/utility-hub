"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, LayoutGrid, Palette, Copy } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Palette size={15} className="text-indigo-400"/> Color Palette Generator</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

function hexToHsl(hex: string): [number,number,number] {
  const r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b); let h=0,s=0;
  const l=(max+min)/2;
  if(max!==min){const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;}}
  return [Math.round(h*360),Math.round(s*100),Math.round(l*100)];
}
function hslToHex(h:number,s:number,l:number):string{
  s/=100;l/=100;const a=s*Math.min(l,1-l);
  const f=(n:number)=>{const k=(n+h/30)%12;const c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,'0');};
  return `#${f(0)}${f(8)}${f(4)}`;
}
function isLight(hex:string){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return(r*299+g*587+b*114)/1000>128;}

type PaletteType = 'complementary'|'analogous'|'triadic'|'tetradic'|'monochromatic'|'split-complementary';

function generatePalette(hex: string, type: PaletteType): string[] {
  const [h,s,l] = hexToHsl(hex);
  const base = (deg: number) => hslToHex((h+deg+360)%360, s, l);
  switch(type){
    case 'complementary':       return [hex, base(180)];
    case 'analogous':           return [base(-30), hex, base(30), base(60)];
    case 'triadic':             return [hex, base(120), base(240)];
    case 'tetradic':            return [hex, base(90), base(180), base(270)];
    case 'split-complementary': return [hex, base(150), base(210)];
    case 'monochromatic':       return [10,30,50,70,90].map(li=>hslToHex(h,s,li));
    default:                    return [hex];
  }
}

const PALETTE_TYPES: { key: PaletteType; label: string; desc: string }[] = [
  { key:'complementary',       label:'Complementary',        desc:'2 opposite colors' },
  { key:'analogous',           label:'Analogous',            desc:'4 adjacent colors' },
  { key:'triadic',             label:'Triadic',              desc:'3 evenly spaced' },
  { key:'tetradic',            label:'Tetradic',             desc:'4 evenly spaced' },
  { key:'split-complementary', label:'Split Complementary',  desc:'3 colors' },
  { key:'monochromatic',       label:'Monochromatic',        desc:'5 shades' },
];

export default function ColorPaletteGenerator() {
  const [color, setColor] = useState('#6366f1');
  const [type, setType] = useState<PaletteType>('analogous');
  const [copiedIdx, setCopiedIdx] = useState<number|null>(null);

  const palette = useMemo(() => generatePalette(color, type), [color, type]);

  const copy = useCallback(async (hex: string, idx: number) => {
    await navigator.clipboard.writeText(hex).catch(()=>{});
    setCopiedIdx(idx); setTimeout(()=>setCopiedIdx(null),2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]"/>
      </div>
      <NavBar/>
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Palette size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Color Palette <span className="text-indigo-400">Generator</span></h1>
          <p className="text-slate-400 text-lg">Generate harmonious color palettes from any base color.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-5">
            {/* Color picker */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Base color</label>
              <div className="flex items-center gap-3">
                <label className="relative cursor-pointer">
                  <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="sr-only"/>
                  <div className="w-14 h-14 rounded-xl border-2 border-white/20 shadow-lg cursor-pointer transition hover:scale-105" style={{backgroundColor:color}}/>
                </label>
                <input type="text" value={color.toUpperCase()} onChange={e=>{if(/^#[0-9A-Fa-f]{6}$/.test(e.target.value))setColor(e.target.value);}} maxLength={7} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white uppercase focus:outline-none focus:border-indigo-500 transition"/>
              </div>
            </div>

            {/* Palette type */}
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Palette type</label>
              <div className="space-y-2">
                {PALETTE_TYPES.map(pt=>(
                  <button key={pt.key} onClick={()=>setType(pt.key)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm border transition-all ${type===pt.key?'bg-indigo-500 border-indigo-500 text-white':'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>
                    <span className="font-semibold">{pt.label}</span>
                    <span className={`ml-2 text-xs ${type===pt.key?'text-indigo-200':'text-slate-600'}`}>{pt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Palette display */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Generated palette — click to copy</div>
            <div className="rounded-2xl overflow-hidden border border-slate-700">
              {palette.map((hex, i) => (
                <div key={i} className="group cursor-pointer flex items-center justify-between px-5 py-5 hover:brightness-110 transition-all" style={{backgroundColor:hex}} onClick={()=>copy(hex,i)}>
                  <span className={`font-mono font-semibold text-sm ${isLight(hex)?'text-slate-800':'text-white'}`}>{hex.toUpperCase()}</span>
                  <span className={`text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-80 transition ${isLight(hex)?'text-slate-800':'text-white'}`}>
                    <Copy size={12}/>{copiedIdx===i?'Copied!':'Copy'}
                  </span>
                </div>
              ))}
            </div>

            {/* CSS output */}
            <div className="mt-4 bg-[#1e293b] border border-slate-700 rounded-2xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">CSS variables</div>
              <pre className="text-xs font-mono text-slate-400 whitespace-pre-wrap">
                {`:root {\n${palette.map((hex,i)=>`  --color-${i+1}: ${hex};`).join('\n')}\n}`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
