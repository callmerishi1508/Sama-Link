import { motion } from "framer-motion";
import { Mic, Globe, Clock, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AnalysisResponse } from "@/types/analysis";

interface VoiceIntelligenceCardProps {
  metadata: NonNullable<AnalysisResponse['voiceMetadata']>;
}

export function VoiceIntelligenceCard({ metadata }: VoiceIntelligenceCardProps) {
  if (!metadata) return null;

  return (
    <motion.div 
      className="glass-panel p-6 rounded-3xl border border-indigo-200/50 dark:border-indigo-900/50 shadow-sm relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <Mic className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Voice Intelligence
            {metadata.processed && (
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                <CheckCircle2 className="w-3 h-3" /> Processed
              </span>
            )}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">On-device acoustic analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            <Clock className="w-4 h-4 text-slate-400" />
            Duration
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {(metadata.durationMs / 1000).toFixed(1)}s
          </div>
        </div>
        
        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            <Globe className="w-4 h-4 text-slate-400" />
            Language
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {metadata.language === 'en-US' ? 'English' : metadata.language}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Confidence
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {Math.round(metadata.confidence * 100)}%
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Keywords
          </div>
          <div className="text-xl font-bold text-rose-700 dark:text-rose-400">
            {metadata.keywords?.length || 0}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
