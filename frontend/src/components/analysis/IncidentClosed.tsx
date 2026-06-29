import { motion } from "framer-motion";
import {  ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IncidentClosed() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          delay: 0.2
        }}
        className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-emerald-500/20"
      >
        <ShieldCheck className="w-10 h-10" />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 uppercase">Incident Review Complete</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
          The emergency report has been processed, stakeholders have been routed, and the response is actively being monitored by operations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => window.location.href = '/history/INC-2026-8812'} 
            className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl gap-2 font-bold px-8 h-12 transition-all"
          >
            Archive Incident <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
