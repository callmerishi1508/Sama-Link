import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Siren, UserCheck, PhoneCall } from "lucide-react";
import { DecisionPlan } from "@/types/analysis";

export function TimelineVisualizer({ decision }: { decision: DecisionPlan }) {
  // A visual representation of next steps based on the decision
  const steps = [
    { label: "Current Status", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, active: true },
    { label: `${decision.recommended_actor} Notified`, icon: <UserCheck className="w-5 h-5 text-blue-500" />, active: false },
    { label: "Family/Emergency Contacted", icon: <PhoneCall className="w-5 h-5 text-indigo-500" />, active: false },
    { label: "Await Confirmation", icon: <Clock className="w-5 h-5 text-amber-500" />, active: false },
    { label: "Emergency Escalation (If needed)", icon: <Siren className="w-5 h-5 text-red-500" />, active: false },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 px-2">Next Steps</h3>
      
      <div className="relative">
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="relative flex flex-row md:flex-col items-center gap-4 text-center group"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${step.active ? 'bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-sm' : 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600'}`}>
                {step.active ? step.icon : <Circle className="w-4 h-4 text-slate-400" />}
              </div>
              
              <div className="flex-1 md:w-full md:px-2 text-left md:text-center">
                <p className={`text-sm font-medium ${step.active ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {step.label}
                </p>
                {step.active && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Completed</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
