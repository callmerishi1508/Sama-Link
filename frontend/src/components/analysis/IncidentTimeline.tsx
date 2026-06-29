import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, CircleDot, Clock, User, FileText, CheckCircle2, XCircle } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { useResourceStore } from "@/stores/resource-store";

const STAGES = [
  "Report Received",
  "Situation Understood",
  "Risk Assessed",
  "Stakeholders Routed",
  "Resources Assigned",
  "Dispatch Accepted",
  "Responpected En Route",
  "On Scene",
  "Incident Closed"
];

export function IncidentTimeline() {
  const { demoMode } = useUIStore();
  const dispatchLogs = useResourceStore(state => state.dispatchLogs);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const intervalTime = demoMode ? 2000 : 1200;
    
    if (currentStage < STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
      }, intervalTime);
      return () => clearTimeout(timer);
    }
  }, [currentStage, demoMode]);

  return (
    <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Operations Timeline</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Live event sequence & dispatch log</p>
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* Background Track */}
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />
        
        {/* Animated Progress Track */}
        <motion.div 
          className="absolute left-[15px] top-4 w-0.5 bg-indigo-500"
          initial={{ height: "0%" }}
          animate={{ height: `${(currentStage / (STAGES.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        <div className="space-y-6 relative mb-8">
          {STAGES.map((stage, index) => {
            const isCompleted = index <= currentStage;
            const isCurrent = index === currentStage;
            
            return (
               <div key={stage} className="flex items-start gap-6 relative z-10">
                 <motion.div
                   initial={false}
                   animate={{
                     backgroundColor: isCompleted ? "rgb(99 102 241)" : "rgb(248 250 252)",
                     borderColor: isCompleted ? "rgb(99 102 241)" : "rgb(226 232 240)",
                     scale: isCurrent ? 1.2 : 1
                   }}
                   className={`w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center shadow-sm transition-colors duration-500 dark:bg-slate-900 dark:border-slate-700`}
                 >
                   {isCompleted ? (
                     <Check className="w-4 h-4 text-white" />
                   ) : (
                     <CircleDot className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                   )}
                 </motion.div>
                 <div className={`transition-all duration-500 pt-1 ${isCompleted ? "opacity-100 translate-x-0" : "opacity-40 -translate-x-2"}`}>
                   <p className={`text-sm font-semibold tracking-wide ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-500'}`}>
                     {stage}
                   </p>
                 </div>
               </div>
            );
          })}
        </div>

        {/* Dispatch Log Section */}
        {dispatchLogs.length > 0 && (
          <div className="relative pt-6 border-t border-slate-200 dark:border-slate-800/50">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Dispatch Decision Log
            </h4>
            <div className="space-y-4">
              {dispatchLogs.map((log) => (
                <div key={log.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <User className="w-3.5 h-3.5" />
                      {log.operator}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Assigned: {log.assignedResource}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Reason:</span> {log.reason}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
                    {log.result === 'Success' ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> SUCCESS</span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1"><XCircle className="w-3 h-3" /> CONFLICT DETECTED</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
