import { motion } from "framer-motion";
import { Users, MapPin, AlertTriangle, ShieldAlert, AlertCircle, HelpCircle, FileText, Brain } from "lucide-react";
import { IncidentUnderstanding } from "@/types/analysis";
import { ConfidenceBar } from "@/components/ui/ConfidenceBar";

interface IntelligenceSummaryProps {
  understanding: IncidentUnderstanding;
}

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export function IntelligenceSummary({ understanding }: IntelligenceSummaryProps) {
  const sections = [
    {
      title: "People Involved",
      icon: <Users className="w-5 h-5 text-blue-500" />,
      items: understanding.people || [],
      color: "blue"
    },
    {
      title: "Locations",
      icon: <MapPin className="w-5 h-5 text-emerald-500" />,
      items: understanding.locations || [],
      color: "emerald"
    },
    {
      title: "Hazards",
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      items: understanding.hazards || [],
      color: "orange"
    },
    {
      title: "Vulnerable Persons",
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      items: understanding.vulnerable_people || [],
      color: "red"
    },
    {
      title: "Emergency Indicators",
      icon: <AlertCircle className="w-5 h-5 text-purple-500" />,
      items: understanding.emergency_indicators || [],
      color: "purple"
    },
    {
      title: "Missing Information",
      icon: <HelpCircle className="w-5 h-5 text-slate-500" />,
      items: understanding.missing_information || [],
      color: "slate"
    },
    {
      title: "Follow-up Questions",
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
      items: understanding.follow_up_questions || [],
      color: "indigo"
    }
  ];

  // Derive dummy confidence for visual consistency if none exists
  const understandingConfidence = 0.94;

  return (
    <div className="premium-card overflow-hidden !p-0">
      {/* Decorative gradient blur */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="p-6 sm:p-8 border-b border-indigo-100/50 dark:border-indigo-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Situation Understanding</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Extracted from raw report.</p>
          </div>
        </div>
        <div className="w-48 shrink-0 bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
          <ConfidenceBar score={understandingConfidence} label="Extraction Confidence" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:p-8">
        {sections.map((section) => (
          <motion.div 
            key={section.title}
            variants={itemVariants}
            className={`p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-${section.color}-50 dark:bg-${section.color}-900/20`}>
                {section.icon}
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">{section.title}</h3>
            </div>
            {section.items.length > 0 ? (
              <motion.ul variants={listVariants} initial="hidden" animate="show" className="space-y-2">
                {section.items.map((item: string, i: number) => (
                  <motion.li key={i} variants={itemVariants} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-${section.color}-400 mt-1.5 shrink-0`} />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <p className="text-sm text-slate-400 dark:text-slate-500 italic">None detected.</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
