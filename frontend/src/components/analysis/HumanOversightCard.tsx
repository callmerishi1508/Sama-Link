import { AlertCircle, CheckCircle2, UserCheck } from "lucide-react";

export function HumanOversightCard({ requiresConfirmation }: { requiresConfirmation: boolean }) {
  if (requiresConfirmation) {
    return (
      <div className="h-full glass-panel border border-amber-200/50 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 rounded-3xl p-6 md:p-8 flex flex-col items-start gap-4 relative overflow-hidden group shadow-lg backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[50px] rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 rounded-xl shadow-sm border border-amber-200 dark:border-amber-800/50">
            <UserCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">👤 Human Confirmation</h3>
        </div>
        <div className="relative z-10 w-full p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-500 animate-pulse-subtle shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-1">Review Required</h4>
            <p className="text-sm text-amber-800 dark:text-amber-500/90 leading-relaxed font-medium">
              Due to the critical nature of this incident, a human dispatcher must confirm the details before emergency services are escalated.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full glass-panel border border-emerald-200/50 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-3xl p-6 md:p-8 flex flex-col items-start gap-4 relative overflow-hidden group shadow-lg backdrop-blur-xl">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[50px] rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800/50">
          <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">👤 Human Confirmation</h3>
      </div>
      <div className="relative z-10 w-full p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-4">
        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1">Auto-Routed</h4>
          <p className="text-sm text-emerald-800 dark:text-emerald-500/90 leading-relaxed font-medium">
            This incident has been assessed and routed automatically. No immediate human confirmation is necessary.
          </p>
        </div>
      </div>
    </div>
  );
}
