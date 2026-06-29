import { Loader2 } from "lucide-react";

export function PageLoader({ title = "Loading Module..." }: { title?: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm font-medium tracking-wide animate-pulse">{title}</p>
      </div>
    </div>
  );
}
