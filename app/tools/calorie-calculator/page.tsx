"use client";
import React, { useState, useMemo } from 'react';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
// @ts-ignore
import Flame from 'lucide-react/dist/esm/icons/flame';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16}/> Hub</a>
        <div className="w-px h-4 bg-slate-700"/>
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Flame size={15} className="text-orange-400"/> Calorie Calculator</div>
        <div className="flex-1"/>
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><img src="/logo.png" alt="1001FreeTools" width="24" height="24" loading="lazy" className="w-6 h-6 rounded-md" /></a>
      </div>
    </nav>
  );
}

const ACTIVITIES = [
  { label: 'Sedentary (desk job, no exercise)', factor: 1.2 },
  { label: 'Light (1–3 days/week)', factor: 1.375 },
  { label: 'Moderate (3–5 days/week)', factor: 1.55 },
  { label: 'Active (6–7 days/week)', factor: 1.725 },
  { label: 'Very Active (physical job + training)', factor: 1.9 },
];

export default function CalorieCalculator() {
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [unit, setUnit] = useState<'metric'|'imperial'>('metric');
  const [age, setAge] = useState('30');
  const [heightCm, setHeightCm] = useState('175');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');
  const [weightKg, setWeightKg] = useState('75');
  const [weightLb, setWeightLb] = useState('165');
  const [activity, setActivity] = useState(1);

  const result = useMemo(() => {
    const a = parseFloat(age);
    let h = unit === 'metric' ? parseFloat(heightCm) : parseFloat(heightFt) * 30.48 + parseFloat(heightIn || '0') * 2.54;
    let w = unit === 'metric' ? parseFloat(weightKg) : parseFloat(weightLb) * 0.453592;
    if (!a || !h || !w) return null;
    // Mifflin-St Jeor
    const bmr = gender === 'male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
    const tdee = bmr * ACTIVITIES[activity].factor;
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      lose05: Math.round(tdee - 500),
      lose1:  Math.round(tdee - 1000),
      gain:   Math.round(tdee + 500),
    };
  }, [gender, unit, age, heightCm, heightFt, heightIn, weightKg, weightLb, activity]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/10 blur-[60px]"/>
      </div>
      <NavBar/>
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-400 mb-4"><Flame size={28}/></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Calorie <span className="text-orange-400">Calculator</span></h1>
          <p className="text-slate-400 text-lg">Calculate your daily calorie needs (TDEE).</p>
        </header>

        <div className="space-y-4 mb-6">
          {/* Gender + unit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Gender</div>
              <div className="flex gap-2">
                {(['male','female'] as const).map(g => (
                  <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition capitalize ${gender===g?'bg-indigo-500 border-indigo-500 text-white':'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>{g}</button>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Units</div>
              <div className="flex gap-2">
                {(['metric','imperial'] as const).map(u => (
                  <button key={u} onClick={() => setUnit(u)} className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition capitalize ${unit===u?'bg-indigo-500 border-indigo-500 text-white':'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>{u}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Age */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Age</label>
            <div className="relative"><input type="number" value={age} onChange={e=>setAge(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-16"/><span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">years</span></div>
          </div>

          {/* Height */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Height</label>
            {unit === 'metric'
              ? <div className="relative"><input type="number" value={heightCm} onChange={e=>setHeightCm(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-14"/><span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">cm</span></div>
              : <div className="flex gap-3">
                  <div className="relative flex-1"><input type="number" value={heightFt} onChange={e=>setHeightFt(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-10"/><span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">ft</span></div>
                  <div className="relative flex-1"><input type="number" value={heightIn} onChange={e=>setHeightIn(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-10"/><span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">in</span></div>
                </div>
            }
          </div>

          {/* Weight */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Weight</label>
            <div className="relative"><input type="number" value={unit==='metric'?weightKg:weightLb} onChange={e=>unit==='metric'?setWeightKg(e.target.value):setWeightLb(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-indigo-500 transition pr-14"/><span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{unit==='metric'?'kg':'lb'}</span></div>
          </div>

          {/* Activity */}
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5">
            <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Activity level</label>
            <select value={activity} onChange={e=>setActivity(+e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition">
              {ACTIVITIES.map((a,i)=><option key={i} value={i}>{a.label}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div className="space-y-3">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
              <div className="text-xs text-orange-400 uppercase tracking-wide mb-2">Daily calories to maintain weight (TDEE)</div>
              <div className="text-5xl font-extrabold text-white">{result.tdee}</div>
              <div className="text-sm text-slate-400 mt-1">kcal / day · BMR: {result.bmr} kcal</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{label:'Lose 0.5 kg/wk',val:result.lose05,color:'text-blue-400'},{label:'Lose 1 kg/wk',val:result.lose1,color:'text-indigo-400'},{label:'Gain 0.5 kg/wk',val:result.gain,color:'text-emerald-400'}].map(g=>(
                <div key={g.label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 text-center">
                  <div className={`text-xl font-extrabold ${g.color}`}>{g.val}</div>
                  <div className="text-xs text-slate-500 mt-1">{g.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
