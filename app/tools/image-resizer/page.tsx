"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Maximize2, ArrowLeft, LayoutGrid } from 'lucide-react';
// @ts-ignore
import Upload from 'lucide-react/dist/esm/icons/upload';
// @ts-ignore
import Download from 'lucide-react/dist/esm/icons/download';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
          <ArrowLeft size={16} /> Hub
        </a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Maximize2 size={15} className="text-indigo-400" /> Image Resizer
        </div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition">
          <img src="/logo.png" alt="1001FreeTools" className="w-6 h-6 rounded-md" />
        </a>
      </div>
    </nav>
  );
}

interface ImageInfo {
  url: string;
  name: string;
  width: number;
  height: number;
  size: number;
}

function fmt(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function ImageResizer() {
  const [original, setOriginal] = useState<ImageInfo | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [quality, setQuality] = useState(85);
  const [keepAspect, setKeepAspect] = useState(true);
  const [outputUrl, setOutputUrl] = useState('');
  const [outputSize, setOutputSize] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setOriginal({ url, name: file.name, width: img.width, height: img.height, size: file.size });
      setWidth(img.width);
      setHeight(img.height);
      setOutputUrl('');
    };
    img.src = url;
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };

  const onWidthChange = (v: number) => {
    setWidth(v);
    if (keepAspect && original) setHeight(Math.round(v / (original.width / original.height)));
  };

  const onHeightChange = (v: number) => {
    setHeight(v);
    if (keepAspect && original) setWidth(Math.round(v * (original.width / original.height)));
  };

  const resize = () => {
    if (!original) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      const mime = original.name.endsWith('.png') ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mime, quality / 100);
      setOutputUrl(dataUrl);
      const base64 = dataUrl.split(',')[1];
      setOutputSize(Math.round((base64.length * 3) / 4));
    };
    img.src = original.url;
  };

  const download = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    const ext = original?.name.endsWith('.png') ? 'png' : 'jpg';
    a.download = `resized-${width}x${height}.${ext}`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/15 blur-[140px]" />
      </div>
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4">
            <Maximize2 size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Image <span className="text-indigo-400">Resizer</span>
          </h1>
          <p className="text-slate-400 text-lg">Resize & compress images in your browser — nothing is uploaded.</p>
        </header>

        {/* Drop zone */}
        {!original ? (
          <div
            onDrop={onDrop}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all ${
              dragging ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/20'
            }`}
          >
            <Upload size={36} className="mx-auto mb-4 text-slate-500" />
            <p className="text-slate-400 text-lg font-medium mb-1">Drop an image here</p>
            <p className="text-slate-600 text-sm">or click to browse — JPG, PNG, WebP</p>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && loadFile(e.target.files[0])} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-5">
              {/* Original info */}
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Original</div>
                <div className="flex items-center gap-4">
                  <img src={original.url} alt="original" className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
                  <div className="text-sm text-slate-400 space-y-1">
                    <div className="text-white font-medium truncate max-w-[180px]">{original.name}</div>
                    <div>{original.width} × {original.height} px</div>
                    <div>{fmt(original.size)}</div>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 space-y-4">
                <div className="text-xs text-slate-500 uppercase tracking-wide">New dimensions</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Width (px)</label>
                    <input type="number" min={1} value={width} onChange={e => onWidthChange(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Height (px)</label>
                    <input type="number" min={1} value={height} onChange={e => onHeightChange(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-400">
                  <div onClick={() => setKeepAspect(v => !v)} className={`w-10 h-5 rounded-full transition-colors relative ${keepAspect ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${keepAspect ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  Lock aspect ratio
                </label>
              </div>

              {/* Quality */}
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Quality</div>
                  <span className="text-sm font-semibold text-white">{quality}%</span>
                </div>
                <input type="range" min={10} max={100} value={quality} onChange={e => setQuality(parseInt(e.target.value))}
                  className="w-full accent-indigo-500" />
                <div className="flex justify-between text-xs text-slate-600 mt-1"><span>Smaller file</span><span>Best quality</span></div>
              </div>

              <div className="flex gap-3">
                <button onClick={resize}
                  className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105">
                  Resize image
                </button>
                <button onClick={() => { setOriginal(null); setOutputUrl(''); }}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-xl transition">
                  Clear
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden flex flex-col">
              <div className="px-5 py-3 bg-slate-900/70 border-b border-slate-700/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                  {outputUrl ? `Output — ${fmt(outputSize)}` : 'Preview'}
                </span>
                {outputUrl && (
                  <button onClick={download} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-400 transition">
                    <Download size={13} /> Download
                  </button>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center p-6 min-h-64">
                {outputUrl
                  ? <img src={outputUrl} alt="output" className="max-w-full max-h-80 object-contain rounded-xl border border-slate-700" />
                  : <p className="text-slate-600 text-sm">Resized image appears here</p>
                }
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
