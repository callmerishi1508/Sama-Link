import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function BrowserCompatibilityCard() {
  const browsers = [
    { name: 'Chrome', supported: true },
    { name: 'Edge', supported: true },
    { name: 'Brave', supported: true },
    { name: 'Opera', supported: true },
    { name: 'Safari', supported: false },
    { name: 'Firefox', supported: false }
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center">
      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        Voice Intelligence Unavailable
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Your current browser does not natively support the Web Speech API required for secure, on-device voice processing. You can still type your report.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left">
        {browsers.map(b => (
          <div key={b.name} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
            {b.supported ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
