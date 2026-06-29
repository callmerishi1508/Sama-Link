import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 text-center relative overflow-hidden group">
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center max-w-sm"
      >
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shadow-inner border border-indigo-100 dark:border-indigo-800/50 mb-6">
          <MapPin className="w-8 h-8 text-indigo-500" />
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Geospatial Intelligence</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
            &quot;Extracting coordinates from unstructured text...&quot;
          </p>
        </div>
        
        <div className="w-full text-left bg-white/60 dark:bg-black/40 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 block">
            Examples of actionable locations
          </span>
          <ul className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> &quot;Near Central Railway Station&quot;
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> &quot;House No. 14, Main Street&quot;
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> &quot;Corner of 5th and Broadway&quot;
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
