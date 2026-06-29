import { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, HeartPulse, Activity, Flame, UserMinus, ShieldAlert, Waves, Car, Droplet, Skull, AlertTriangle, Cpu } from "lucide-react";
import { useAnalysisStore } from "@/stores/analysis-store";
import { useIncidentStore } from "@/stores/incident-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const VoiceRecorder = dynamic(() => import("@/components/voice/VoiceRecorder").then(m => m.VoiceRecorder), { ssr: false });

export const DEMO_SCENARIOS = [
  {
    icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
    title: "Elderly Welfare Check",
    description: "Neighbor hasn't been seen, loud noise heard.",
    capabilities: ["Vulnerability", "Context", "Escalation"],
    text: "My 82-year-old neighbor Mrs. Higgins hasn't been seen since Tuesday. Her mail is piling up. I knocked but no answer, and I heard a loud thud from inside her apartment last night."
  },
  {
    icon: <UserMinus className="w-5 h-5 text-amber-500" />,
    title: "Missing Child",
    description: "6-year-old boy lost in the local park.",
    capabilities: ["Entities", "Time Critical", "Description"],
    text: "A 6-year-old boy named Leo is missing in Centennial Park. He was last seen 15 minutes ago near the playground wearing a red jacket and blue jeans."
  },
  {
    icon: <ShieldAlert className="w-5 h-5 text-purple-500" />,
    title: "Domestic Violence",
    description: "Screaming and glass breaking heard next door.",
    capabilities: ["Threat Level", "Location", "Violence"],
    text: "I can hear a woman screaming and glass breaking in the apartment next to mine (Unit 4B). A man is shouting aggressively. Please send someone quickly."
  },
  {
    icon: <Flame className="w-5 h-5 text-orange-500" />,
    title: "Fire",
    description: "Thick smoke from an abandoned warehouse.",
    capabilities: ["Hazards", "Scale", "Verification"],
    text: "There is thick black smoke billowing out of the abandoned warehouse on 4th street. I can't see flames yet but it smells strongly of burning plastic."
  },
  {
    icon: <Waves className="w-5 h-5 text-blue-500" />,
    title: "Flood",
    description: "River overflowed, cars trapped on Main St.",
    capabilities: ["Multi-Entity", "Environment", "Rescue"],
    text: "The river has completely overflowed. Main street is flooded and there are two cars trapped with people on the roof. The water is rising fast."
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-amber-700" />,
    title: "Landslide",
    description: "Mud and rocks blocking the mountain pass.",
    capabilities: ["Geography", "Blockage", "Potential Harm"],
    text: "Massive landslide just occurred on Route 9 mountain pass. The road is completely blocked by mud and trees. Several cars might be trapped underneath."
  },
  {
    icon: <Car className="w-5 h-5 text-slate-500" />,
    title: "Road Accident",
    description: "Multi-vehicle collision on the highway.",
    capabilities: ["Casualties", "Logistics", "Direction"],
    text: "Major collision on Highway 101 Southbound near exit 4. Three cars involved, one is flipped over. There are definitely injuries, people are bleeding."
  },
  {
    icon: <Droplet className="w-5 h-5 text-emerald-500" />,
    title: "Gas Leak",
    description: "Strong smell of sulfur near the school.",
    capabilities: ["Invisible Hazard", "Proximity Risk"],
    text: "There is an overwhelming smell of gas or sulfur near the elementary school on Pine st. You can hear a loud hissing sound coming from the ground."
  },
  {
    icon: <Activity className="w-5 h-5 text-blue-400" />,
    title: "Medical Collapse",
    description: "Person collapsed, breathing heavily.",
    capabilities: ["Medical", "Vulnerability", "Emergency"],
    text: "A man just collapsed outside the grocery store on Main St. He is breathing heavily but not responding to us. We need help immediately."
  },
  {
    icon: <Skull className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
    title: "Suicide Concern",
    description: "Individual sitting on the edge of the bridge.",
    capabilities: ["Mental Health", "De-escalation"],
    text: "There's a young man sitting on the wrong side of the Golden Gate bridge. He's crying and won't talk to anyone. He looks like he's going to jump."
  }
];

export function IncidentInput() {
  const [text, setText] = useState("");
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const { submitAnalysis, loadingPhase } = useAnalysisStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isAnalyzing = loadingPhase !== 'idle' && loadingPhase !== 'complete';
  const router = useRouter();
  const addIncident = useIncidentStore(state => state.addIncident);
  const setActiveIncident = useIncidentStore(state => state.setActiveIncident);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const processSubmission = useCallback((submissionText: string) => {
    const newId = crypto.randomUUID();
    const newIncident = {
      id: newId,
      incidentNumber: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'NEW' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: inputMode === 'voice' ? 'Voice Report' : 'Text Report',
      reporterType: 'Civilian',
      riskLevel: null,
      title: 'Analyzing Incident...',
      summary: submissionText.substring(0, 60) + '...',
    };
    
    addIncident(newIncident);
    setActiveIncident(newId);
    submitAnalysis(submissionText);
    router.push(`/incidents/${newId}`);
  }, [inputMode, addIncident, setActiveIncident, submitAnalysis, router]);

  const handleSampleClick = (sampleText: string) => {
    setText(sampleText);
    if (!isAnalyzing) {
      processSubmission(sampleText);
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || isAnalyzing) return;
    processSubmission(text.trim());
  };

  const [autoDemoLoading, setAutoDemoLoading] = useState(false);

  useEffect(() => {
    const handleAutoDemo = () => {
      if (isAnalyzing || autoDemoLoading) return;
      
      setAutoDemoLoading(true);
      setText("Loading Medical Emergency Scenario...");
      
      setTimeout(() => {
        const scenario = DEMO_SCENARIOS[8].text; // Medical Collapse
        setText(scenario);
        setTimeout(() => {
          processSubmission(scenario);
          setAutoDemoLoading(false);
        }, 800);
      }, 1000);
    };
    window.addEventListener("start-auto-demo", handleAutoDemo);
    return () => window.removeEventListener("start-auto-demo", handleAutoDemo);
  }, [isAnalyzing, autoDemoLoading, processSubmission]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[1400px] mx-auto space-y-8" 
      id="demo"
    >


      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setInputMode('text')}
            aria-label="Switch to Text Reporting"
            aria-pressed={inputMode === 'text'}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              inputMode === 'text' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Type Report
          </button>
          <button
            onClick={() => setInputMode('voice')}
            aria-label="Switch to Voice Intelligence"
            aria-pressed={inputMode === 'voice'}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              inputMode === 'voice' 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <HeartPulse className={`w-4 h-4 ${inputMode === 'voice' ? 'animate-pulse' : ''}`} />
            Voice Intelligence
          </button>
        </div>
      </div>

      {inputMode === 'text' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_SCENARIOS.map((scenario, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                onClick={() => handleSampleClick(scenario.text)}
                className="flex items-start gap-4 p-5 text-left premium-card rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-premium-hover transition-all duration-300 group hover:-translate-y-1 bg-white/60 dark:bg-slate-900/60"
              >
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform shrink-0">
                  {scenario.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{scenario.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">{scenario.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-slate-400 mr-1">
                      <Cpu className="w-3 h-3" />
                      Detects
                    </div>
                    {scenario.capabilities.map((cap, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="glass-panel p-6 rounded-3xl transition-all duration-300 focus-within:shadow-premium-hover focus-within:border-blue-200 dark:focus-within:border-blue-900/50 space-y-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-indigo-500/5 group-focus-within:to-purple-500/5 transition-colors duration-500 pointer-events-none" />
            
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. My 82-year-old neighbor Mrs. Higgins hasn't been seen since Tuesday..."
              className="min-h-[160px] text-lg resize-none border-0 focus-visible:ring-0 px-0 bg-transparent relative z-10 placeholder:text-slate-400 font-medium"
              aria-label="Incident Description"
            />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/60 relative z-10 gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium px-2">
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">Ctrl</span> + <span className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">Enter</span> to analyze
              </div>
              
              <Button 
                onClick={handleSubmit} 
                disabled={!text.trim() || isAnalyzing}
                aria-label="Submit Report and Analyze"
                className="w-full sm:w-auto rounded-full px-8 py-5 shadow-sm group/btn bg-blue-600 hover:bg-blue-700 text-white transition-all"
              >
                {isAnalyzing ? "Analyzing..." : "Submit Report & Analyze"}
                <Send className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <VoiceRecorder />
      )}
    </motion.div>
  );
}
