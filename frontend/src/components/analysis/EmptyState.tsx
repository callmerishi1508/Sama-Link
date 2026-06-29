import { ShieldAlert, BrainCircuit, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function EmptyState() {
  const steps = [
    {
      icon: <BrainCircuit className="w-5 h-5 text-indigo-500" />,
      title: "Understand the situation",
      description: "Extracts context and identifies entities from raw emergency reports.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
      title: "Explain the risk",
      description: "Evaluates severity using deterministic rules and calculates priority.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      title: "Recommend the safest response",
      description: "Prepares immediate action plans tailored to the specific hazards.",
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      title: "Keep humans in control",
      description: "Requires explicit operator confirmation before dispatching resources.",
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">How SAMA LINK Works</h3>
        <p className="text-slate-500 dark:text-slate-400">An intelligence layer that amplifies human capability during critical moments.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent hidden lg:block -z-10" />
        
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (idx * 0.1) }}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
