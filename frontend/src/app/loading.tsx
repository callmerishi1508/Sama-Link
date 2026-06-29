import { ShieldAlert } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] z-[1000]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
          <div className="w-16 h-16 rounded-2xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-lg relative z-10">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold tracking-widest uppercase text-slate-800 dark:text-slate-200">Sama Link</h1>
          <p className="text-sm font-medium tracking-wide text-slate-500 mt-2 animate-pulse">Initializing OS...</p>
        </div>
      </div>
    </div>
  );
}
