"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 antialiased font-sans">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-200 dark:border-red-900/50">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Critical System Error</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
            SAMA LINK encountered a fatal error. Please refresh the platform or contact administration.
          </p>
          
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <RefreshCcw className="w-4 h-4" />
            Restart Platform
          </button>
        </div>
      </body>
    </html>
  );
}
