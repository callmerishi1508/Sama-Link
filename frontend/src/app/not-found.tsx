import { Search, Home, Siren } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <Search className="w-10 h-10" />
      </div>
      
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Resource Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10">
        The requested module, incident, or system resource could not be located in the operations registry.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <Link
          href="/"
          className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Home className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Command Dashboard</h3>
          <p className="text-xs text-slate-500 text-center">Return to main operations center</p>
        </Link>
        
        <Link
          href="/report"
          className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-rose-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Siren className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Report Incident</h3>
          <p className="text-xs text-slate-500 text-center">Create a new intelligence report</p>
        </Link>
        
        <Link
          href="/incidents"
          className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Incident Search</h3>
          <p className="text-xs text-slate-500 text-center">Find an active operation</p>
        </Link>
      </div>
    </div>
  );
}
