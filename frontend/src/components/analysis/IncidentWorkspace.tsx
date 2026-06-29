import { motion } from "framer-motion";
import { useAnalysisStore } from "@/stores/analysis-store";
import { useUIStore } from "@/stores/ui-store";
import { IntelligenceSummary } from "./IntelligenceSummary";
import { RiskBreakdown } from "./RiskBreakdown";
import { RiskGauge } from "./RiskGauge";
import { IntelligenceMap } from "@/components/map/IntelligenceMap";
import { DecisionCard } from "./DecisionCard";
import { OperationalResponsePlan } from "@/components/resources/OperationalResponsePlan";
import { ResourceAvailabilityCard } from "@/components/resources/ResourceAvailabilityCard";
import { NearbyResourcesCard } from "@/components/resources/NearbyResourcesCard";
import { OperationsSummary } from "@/components/resources/OperationsSummary";
import { StakeholderAcknowledgement } from "@/components/resources/StakeholderAcknowledgement";
import { DispatchConfidence } from "@/components/resources/DispatchConfidence";
import { OperationalDependencyGraph } from "@/components/resources/OperationalDependencyGraph";
import { OperationalAlerts } from "@/components/resources/OperationalAlerts";
import { CommunicationOrchestrator } from "@/components/communications/CommunicationOrchestrator";
import { HumanDecisionCenter } from "@/components/decision/HumanDecisionCenter";
import { IncidentTimeline } from "./IncidentTimeline";
import { ReplayTimeline } from "@/components/demo/ReplayTimeline";
import { RevealStage } from "@/components/demo/RevealStage";
import { SpotlightContainer } from "@/components/demo/SpotlightContainer";
import { ExecutiveBriefing } from "./ExecutiveBriefing";
import { VoiceIntelligenceCard } from "@/components/voice/VoiceIntelligenceCard";
import { IncidentClosed } from "./IncidentClosed";
import { Button } from "@/components/ui/button";
import { Copy, Check, Clock, RefreshCcw, ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDemoOrchestrator } from "@/hooks/useDemoOrchestrator";
import { useIncidentStore } from "@/stores/incident-store";
import { generateDeterministicAnalysis } from "@/lib/deterministic-analysis";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
};

const PipelineConnector = () => {
  return (
    <motion.div variants={itemVariants} className="flex justify-center py-6">
      <div className="w-px h-16 bg-gradient-to-b from-indigo-500/50 to-transparent relative">
        <motion.div 
          animate={{ y: [0, 64, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 text-indigo-500 drop-shadow-md"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.div>
  );
};

interface IncidentWorkspaceProps {
  incidentId?: string;
}

export function IncidentWorkspace({ incidentId }: IncidentWorkspaceProps = {}) {
  const analysisResponse = useAnalysisStore(state => state.response);
  const resetAnalysis = useAnalysisStore(state => state.reset);
  
  const storeActiveIncidentId = useIncidentStore(state => state.activeIncidentId);
  const activeId = incidentId || storeActiveIncidentId;
  const incidents = useIncidentStore(state => state.incidents);
  const activeIncident = activeId ? incidents[activeId] : null;
  
  let response = analysisResponse;
  if (!response && activeIncident) {
    try {
      response = generateDeterministicAnalysis(activeIncident);
    } catch (e) {
      console.error("Error generating deterministic analysis", e);
    }
  }
  
  const { demoMode, resetPresentation } = useUIStore();
  const [copied, setCopied] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useDemoOrchestrator();

  useEffect(() => {
    if (response && dashboardRef.current && !demoMode) {
      dashboardRef.current.focus();
    }
  }, [response, demoMode]);

  if (!response) return null;

  const { understanding, risk, decision, processing_time_ms, provider, fallback_used } = response;

  const copySummary = () => {
    const text = `Incident Intelligence Report:\nPriority: ${decision.priority} | Risk: ${risk.risk_level}\nSummary: ${understanding.summary}\nRecommendation: ${decision.recommended_action.replace(/_/g, ' ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    resetAnalysis();
    resetPresentation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: demoMode ? 0 : 0.3, delayChildren: 0.1 }
    }
  };

  return (
    <SpotlightContainer>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`w-full mx-auto pb-48 pt-8 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-in-out ${demoMode ? 'max-w-screen-2xl text-[1.05rem] space-y-6' : 'max-w-[1800px] space-y-6'}`}
        ref={dashboardRef}
        tabIndex={-1}
      >
        {/* Header Actions */}
        <motion.div variants={itemVariants} className={`flex flex-col sm:flex-row items-center justify-between gap-4 mb-16 pb-6 ${demoMode ? 'hidden' : 'border-b border-slate-200/50 dark:border-slate-800/50'}`}>
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>
              Processed in {Math.round(processing_time_ms)}ms by {provider} {fallback_used ? '(Fallback)' : ''}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={copySummary} className="gap-2 rounded-full border-slate-200/50 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors backdrop-blur-md">
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy Brief"}
            </Button>
            <Button variant="secondary" size="sm" onClick={handleReset} className="gap-2 rounded-full bg-slate-100/80 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 backdrop-blur-md">
              <RefreshCcw className="w-4 h-4" />
              New Analysis
            </Button>
          </div>
        </motion.div>

        {/* Intelligence Pipeline Orchestration */}
        <div className="space-y-4">
          
          {demoMode && (
            <>
              <RevealStage stageIndex={0}>
                <ReplayTimeline />
              </RevealStage>
              <RevealStage stageIndex={1}>
                <PipelineConnector />
              </RevealStage>
            </>
          )}

          <RevealStage stageIndex={demoMode ? 1 : 0}>
            <OperationalAlerts />
            <IntelligenceSummary understanding={understanding} />
          </RevealStage>
          
          {response.voiceMetadata && (
            <RevealStage stageIndex={demoMode ? 1 : 0}>
              <div className="mt-6">
                <VoiceIntelligenceCard metadata={response.voiceMetadata} />
              </div>
            </RevealStage>
          )}

          <RevealStage stageIndex={demoMode ? 2 : 0}>
            <PipelineConnector />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 2 : 0}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <motion.div variants={itemVariants} className="lg:col-span-8">
                <RiskBreakdown risk={risk} />
              </motion.div>
              <motion.div variants={itemVariants} className="lg:col-span-4 flex items-start justify-center">
                <RiskGauge score={risk.risk_score} level={risk.risk_level} />
              </motion.div>
            </div>
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 3 : 0}>
            <PipelineConnector />
          </RevealStage>
          
          {/* Tactical Assessment & Planning */}
          <RevealStage stageIndex={demoMode ? 3 : 0}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ResourceAvailabilityCard />
              <NearbyResourcesCard />
            </div>
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 3 : 0}>
            <OperationalResponsePlan decision={decision} risk={risk} />
            <div className="mt-6">
              <StakeholderAcknowledgement />
            </div>
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 4 : 0}>
            <PipelineConnector />
          </RevealStage>

          {/* Communications Hub */}
          <RevealStage stageIndex={demoMode ? 4 : 0}>
            <CommunicationOrchestrator />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 5 : 0}>
            <PipelineConnector />
          </RevealStage>

          {/* Recommended Response */}
          <RevealStage stageIndex={demoMode ? 5 : 0}>
            <DecisionCard decision={decision} />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 6 : 0}>
            <PipelineConnector />
          </RevealStage>
          
          {/* Human Decision Center */}
          <RevealStage stageIndex={demoMode ? 6 : 0}>
            <HumanDecisionCenter />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 7 : 0}>
            <PipelineConnector />
          </RevealStage>
          
          <RevealStage stageIndex={demoMode ? 7 : 0}>
            <IntelligenceMap 
              understanding={understanding}
              risk={risk}
              decision={decision}
            />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 8 : 0}>
            <PipelineConnector />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 8 : 0}>
            <OperationsSummary />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <DispatchConfidence />
              <OperationalDependencyGraph />
            </div>
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 9 : 0}>
            <PipelineConnector />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 9 : 0}>
            <IncidentTimeline />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 10 : 0}>
            <PipelineConnector />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 10 : 0}>
            <ExecutiveBriefing decision={decision} risk={risk} understanding={understanding} />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 11 : 0}>
            <PipelineConnector />
          </RevealStage>

          <RevealStage stageIndex={demoMode ? 11 : 0}>
            <IncidentClosed />
          </RevealStage>
        </div>
      </motion.div>
    </SpotlightContainer>
  );
}
