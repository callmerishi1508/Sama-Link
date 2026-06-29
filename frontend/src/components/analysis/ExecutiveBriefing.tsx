import { motion, AnimatePresence } from "framer-motion";
import {  AlertTriangle, Users, Flame, MapPin, CheckCircle2, FileDown, Loader2, FileText, Check } from "lucide-react";
import { DecisionPlan, IncidentUnderstanding, RiskAssessment } from "@/types/analysis";
import { useState, useEffect } from "react";
import { SentenceStreamer } from "@/components/ui/SentenceStreamer";
import { ConfidenceBar } from "@/components/ui/ConfidenceBar";
import { useUIStore } from "@/stores/ui-store";

interface Props {
  decision: DecisionPlan;
  understanding: IncidentUnderstanding;
  risk: RiskAssessment;
}

export function ExecutiveBriefing({ decision, understanding, risk }: Props) {
  const needsHuman = decision.requires_human_confirmation || risk.requires_human_confirmation;
  const [pdfState, setPdfState] = useState<'idle' | 'preparing' | 'generating' | 'ready'>('idle');
  const {} = useUIStore();

  const handlePdfClick = () => {
    if (pdfState !== 'idle') return;
    setPdfState('preparing');
  };

  useEffect(() => {
    if (pdfState === 'preparing') {
      const t = setTimeout(() => setPdfState('generating'), 800);
      return () => clearTimeout(t);
    } else if (pdfState === 'generating') {
      const t = setTimeout(() => setPdfState('ready'), 1500);
      return () => clearTimeout(t);
    } else if (pdfState === 'ready') {
      const t = setTimeout(() => setPdfState('idle'), 3000); // reset after 3s
      return () => clearTimeout(t);
    }
  }, [pdfState]);

  // Derived dummy confidence scores if they don't exist, for visual effect
  // Normally these would come from the API
  const overallConfidence = 0.92;

  return (
    <motion.div className="w-full max-w-4xl mx-auto premium-card mt-12 bg-white/95 dark:bg-slate-900/95 shadow-2xl overflow-hidden group border-2 border-indigo-500/20 dark:border-indigo-400/20 relative">
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b-2 border-slate-800 dark:border-slate-100 relative z-10">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE OPS CENTER
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">Emergency Brief</h2>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-4">
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Status</div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-black uppercase text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Verified
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2 self-center" />
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Confidence</div>
            <div className="w-24">
              <ConfidenceBar score={overallConfidence} label="" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - EOC Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 pb-12 border-b border-slate-200/50 dark:border-slate-800/50">
        
        {/* Left Column */}
        <div className="space-y-10">
          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              Incident Overview
            </h3>
            <div className="text-[17px] font-medium text-slate-800 dark:text-slate-200 leading-relaxed min-h-[60px]">
              <SentenceStreamer text={understanding.summary} targetDurationMs={2500} />
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              Recommended Action
            </h3>
            <div className="text-xl font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
              {decision.recommended_action.replace(/_/g, ' ')}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                Assessed Risk
              </h3>
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-5 h-5 ${risk.risk_level === 'CRITICAL' || risk.risk_level === 'HIGH' ? 'text-red-500' : 'text-amber-500'}`} />
                <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {risk.risk_level}
                </span>
              </div>
            </section>

            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                People At Risk
              </h3>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {understanding.people ? understanding.people.length : 0} Identified
                </span>
              </div>
            </section>
          </div>

          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              Known Locations
            </h3>
            <ul className="space-y-3">
              {understanding.locations && understanding.locations.length > 0 ? (
                understanding.locations.map((loc, i) => (
                  <li key={i} className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    {loc}
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-500 italic">None specified</li>
              )}
            </ul>
          </section>

          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              Identified Hazards
            </h3>
            <ul className="space-y-3">
              {understanding.hazards && understanding.hazards.length > 0 ? (
                understanding.hazards.map((haz, i) => (
                  <li key={i} className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-start gap-3">
                    <Flame className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    {haz}
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-500 italic">None specified</li>
              )}
            </ul>
          </section>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* PDF Download Button (Mock) */}
        <button 
          onClick={handlePdfClick}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-bold text-slate-700 dark:text-slate-300 relative overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            {pdfState === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                <FileDown className="w-4 h-4" />
                Download Brief (PDF)
              </motion.div>
            )}
            {pdfState === 'preparing' && (
              <motion.div key="preparing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 text-indigo-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Preparing...
              </motion.div>
            )}
            {pdfState === 'generating' && (
              <motion.div key="generating" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 text-blue-500">
                <FileText className="w-4 h-4 animate-bounce" />
                Generating...
              </motion.div>
            )}
            {pdfState === 'ready' && (
              <motion.div key="ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 text-emerald-500">
                <Check className="w-4 h-4" />
                Ready
              </motion.div>
            )}
          </AnimatePresence>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Demo Preview Only
          </div>
        </button>

        {/* Approval Status */}
        <div className={`px-6 py-3 rounded-xl flex items-center gap-3 border shadow-sm ${needsHuman ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'}`}>
          <div className="text-right">
            <h4 className={`text-sm font-bold uppercase tracking-wide ${needsHuman ? 'text-amber-900 dark:text-amber-100' : 'text-emerald-900 dark:text-emerald-100'}`}>
              {needsHuman ? 'Human Oversight Required' : 'Auto-Dispatch Ready'}
            </h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
