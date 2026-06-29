import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Users, AlertTriangle, Clock, HelpCircle, Flame } from "lucide-react";
import { useState } from "react";
import { IncidentUnderstanding } from "@/types/analysis";

interface PanelSectionProps {
  title: string;
  icon: React.ElementType;
  items: string[];
  colorClass: string;
  defaultOpen?: boolean;
}

function PanelSection({ title, icon: Icon, items, colorClass, defaultOpen = true }: PanelSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!items || items.length === 0) return null;

  return (
    <div className="border-b border-slate-200/50 dark:border-slate-800/50 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${colorClass}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
            {title} ({items.length})
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="text-slate-400 mt-0.5">•</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function IntelligencePanel({ understanding }: { understanding: IncidentUnderstanding }) {
  return (
    <div className="w-full h-full bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl flex flex-col overflow-hidden shadow-xl">
      <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
        <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Intelligence Report
        </h3>
        <p className="text-xs text-slate-500 mt-1">Extracted entities and context</p>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <PanelSection title="Locations" icon={MapPin} items={understanding.locations || []} colorClass="text-blue-500" />
        <PanelSection title="People" icon={Users} items={understanding.people || []} colorClass="text-indigo-500" />
        <PanelSection title="Hazards" icon={AlertTriangle} items={understanding.hazards || []} colorClass="text-rose-500" />
        <PanelSection title="Timeline Context" icon={Clock} items={understanding.timeline || []} colorClass="text-amber-500" />
        <PanelSection title="Emergency Indicators" icon={Flame} items={understanding.emergency_indicators || []} colorClass="text-orange-500" />
        <PanelSection title="Missing Info" icon={HelpCircle} items={understanding.missing_information || []} colorClass="text-slate-500" defaultOpen={false} />
      </div>
    </div>
  );
}
