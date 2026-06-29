import React, { useState } from 'react';
import { Palette, Moon, Sun, Monitor } from 'lucide-react';

export function AppearanceSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const [animationSpeed, setAnimationSpeed] = useState('Normal');

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Appearance & UX</h2>
        <p className="text-sm text-slate-500 mt-1">Customize the visual theme and presentation style of the platform.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-500" /> Theme Preference
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => !darkMode && toggleDarkMode()}
              className={`p-4 rounded-xl border ${!darkMode ? 'bg-slate-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'} flex flex-col items-center gap-3 transition-colors`}
            >
              <Sun className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-wider">Light Mode</span>
            </button>
            <button 
              onClick={() => darkMode && toggleDarkMode()}
              className={`p-4 rounded-xl border ${darkMode ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'} flex flex-col items-center gap-3 transition-colors`}
            >
              <Moon className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-wider">Dark Mode</span>
            </button>
            <button 
              className={`p-4 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex flex-col items-center gap-3 transition-colors opacity-50 cursor-not-allowed`}
            >
              <Monitor className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-wider">System</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-emerald-500" /> UX & Animation
          </h3>
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Animation Speed</div>
              <div className="text-xs text-slate-500">Adjust the speed of presentation modes and map overlays.</div>
            </div>
            <select 
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(e.target.value)}
              className="h-9 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
            >
              <option>Fast</option>
              <option>Normal</option>
              <option>Slow</option>
              <option>Reduced Motion</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
