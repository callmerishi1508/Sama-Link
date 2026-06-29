import { RiskAssessment } from "@/types/analysis";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function RiskCard({ risk }: { risk: RiskAssessment }) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500 text-white shadow-red-500/30';
      case 'HIGH': return 'bg-orange-500 text-white shadow-orange-500/30';
      case 'MEDIUM': return 'bg-amber-500 text-white shadow-amber-500/30';
      case 'LOW': return 'bg-emerald-500 text-white shadow-emerald-500/30';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getBorderColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-amber-500';
      case 'LOW': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const getRiskPercentage = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 95;
      case 'HIGH': return 75;
      case 'MEDIUM': return 50;
      case 'LOW': return 20;
      default: return 0;
    }
  };

  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors duration-500 ${getBorderColor(risk.risk_level)}`} />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-5 h-5 ${getBorderColor(risk.risk_level).replace('bg-', 'text-')}`} />
            <CardTitle className="text-xl">Risk Assessment</CardTitle>
          </div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className={`px-4 py-1.5 rounded-full font-bold text-sm shadow-md tracking-wider ${getRiskColor(risk.risk_level)}`}
          >
            {risk.risk_level}
          </motion.div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Risk Meter Visual */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Risk Level</span>
            <span>{risk.risk_level}</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${getRiskPercentage(risk.risk_level)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${getBorderColor(risk.risk_level)}`}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1 pt-1">
            <span>LOW</span>
            <span>MEDIUM</span>
            <span>HIGH</span>
            <span>CRITICAL</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
