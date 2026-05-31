"use client";

import React, { useState, useMemo } from 'react';
import { Calendar, ArrowLeft, LayoutGrid } from 'lucide-react';

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"><ArrowLeft size={16} /> Hub</a>
        <div className="w-px h-4 bg-slate-700" />
        <div className="flex items-center gap-2 text-sm font-medium text-white"><Calendar size={15} className="text-indigo-400" /> Age Calculator</div>
        <div className="flex-1" />
        <a href="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition"><LayoutGrid size={13} /> 1001WebTools</a>
      </div>
    </nav>
  );
}

export default function AgeCalculator() {
  const [dob, setDob] = useState('');

  const result = useMemo(() => {
    if (!dob) return null;
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    if (birth > now) return null;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    // Next birthday
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000);
    const isBirthdayToday = daysUntilBirthday === 365 || (birth.getDate() === now.getDate() && birth.getMonth() === now.getMonth());

    return { years, months, days, totalDays, totalWeeks, totalHours, daysUntilBirthday: isBirthdayToday ? 0 : daysUntilBirthday, isBirthdayToday };
  }, [dob]);

  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>
      <NavBar />
      <main className="max-w-lg mx-auto px-6 py-12 md:py-16">
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-4"><Calendar size={28} /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Age <span className="text-indigo-400">Calculator</span></h1>
          <p className="text-slate-400 text-lg">Find out your exact age down to the day.</p>
        </header>

        {/* Date input */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 mb-6">
          <label className="block text-xs text-slate-500 uppercase tracking-wide mb-3">Date of birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} max={maxDate}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg text-white focus:outline-none focus:border-indigo-500 transition" />
        </div>

        {result && (
          <div className="space-y-4">
            {/* Birthday banner */}
            {result.isBirthdayToday && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center text-amber-400 font-bold text-lg">
                🎂 Happy Birthday! 🎉
              </div>
            )}

            {/* Main age */}
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 text-center">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Your age</div>
              <div className="flex justify-center gap-8">
                {[
                  { value: result.years, label: 'Years' },
                  { value: result.months, label: 'Months' },
                  { value: result.days, label: 'Days' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-5xl font-extrabold text-white">{s.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: result.totalDays.toLocaleString(), label: 'Total days' },
                { value: result.totalWeeks.toLocaleString(), label: 'Total weeks' },
                { value: result.totalHours.toLocaleString(), label: 'Total hours' },
              ].map(s => (
                <div key={s.label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 text-center">
                  <div className="text-xl font-extrabold text-indigo-300">{s.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Next birthday */}
            {!result.isBirthdayToday && (
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Next birthday in</div>
                <div className="text-2xl font-extrabold text-white">{result.daysUntilBirthday} day{result.daysUntilBirthday !== 1 ? 's' : ''}</div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
