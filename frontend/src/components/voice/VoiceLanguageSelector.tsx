import { useVoiceStore } from '@/stores/voice-store';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en-US', label: 'English' },
  { code: 'hi-IN', label: 'Hindi' },
  { code: 'te-IN', label: 'Telugu' },
  { code: 'ta-IN', label: 'Tamil' },
];

export function VoiceLanguageSelector() {
  const { language, setLanguage, status } = useVoiceStore();

  return (
    <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
      <Globe className="w-3.5 h-3.5 text-slate-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        disabled={status === 'listening' || status === 'processing'}
        className="bg-transparent text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none cursor-pointer appearance-none disabled:opacity-50"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-900">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
