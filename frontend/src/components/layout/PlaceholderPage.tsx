import { LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          {description}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-500 shadow-sm">
            <Icon className="w-8 h-8" />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Coming in Next Phase</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              The {title} module is currently under development. It will provide advanced capabilities and deeper integrations in the upcoming release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
