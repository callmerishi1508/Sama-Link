import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceStore } from "@/stores/voice-store";
import { useAnalysisStore } from "@/stores/analysis-store";
import { speechService } from "@/lib/voice/speechRecognition";
import { VoiceStatus } from "./VoiceStatus";
import { VoiceLanguageSelector } from "./VoiceLanguageSelector";
import { VoiceButton } from "./VoiceButton";
import { VoiceWaveform } from "./VoiceWaveform";
import { TranscriptEditor } from "./TranscriptEditor";
import { VoicePermissionDialog } from "./VoicePermissionDialog";
import { BrowserCompatibilityCard } from "./BrowserCompatibilityCard";
import { VoiceDemoPlayer } from "./VoiceDemoPlayer";

export function VoiceRecorder() {
  const { 
    status, 
    setStatus, 
    language, 
    isVoiceActive, 
    setIsVoiceActive,
    setInterimTranscript, 
    appendFinalTranscript,
    setConfidence,
    finalTranscript,
    recordingDurationMs,
    detectedKeywords,
    confidence,
    startTimer,
    stopTimer
  } = useVoiceStore();

  const { submitAnalysis } = useAnalysisStore();

  useEffect(() => {
    // Initialize speech service
    const initialStatus = speechService.initialize({
      onStatusChange: (newStatus) => {
        setStatus(newStatus);
        if (newStatus === 'listening') startTimer();
        else if (newStatus === 'paused' || newStatus === 'ready') stopTimer();
      },
      onResult: (interim, final) => {
        setInterimTranscript(interim);
        if (final) appendFinalTranscript(final);
      },
      onConfidence: (conf) => {
        setConfidence(conf);
      },
      onError: (err) => {
        console.warn("Speech API Error:", err);
      }
    }, language);

    setStatus(initialStatus);

    return () => {
      speechService.destroy();
      stopTimer();
    };
  }, [language, setStatus, startTimer, stopTimer, setInterimTranscript, appendFinalTranscript, setConfidence]);

  const handleAnalyze = useCallback(async () => {
    if (!finalTranscript.trim()) return;
    
    // Stop recording
    speechService.stop();
    setIsVoiceActive(false);

    // Run completion sequence
    setStatus('completing');
    await new Promise(r => setTimeout(r, 600));
    
    setStatus('transcribing');
    await new Promise(r => setTimeout(r, 800));
    
    setStatus('understanding');
    await new Promise(r => setTimeout(r, 800));
    
    setStatus('ready_for_analysis');
    await new Promise(r => setTimeout(r, 500));
    
    // Pass metadata to analysis store with timestamp
    setStatus('ready');
    submitAnalysis(finalTranscript, {
      durationMs: recordingDurationMs,
      language,
      confidence,
      keywords: detectedKeywords,
      processed: true,
      timestamp: Date.now()
    });
  }, [finalTranscript, recordingDurationMs, language, confidence, detectedKeywords, submitAnalysis, setIsVoiceActive, setStatus]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key.toLowerCase() === 'v') {
        e.preventDefault();
        setIsVoiceActive(true);
        if (status === 'ready' || status === 'paused') {
          speechService.start();
        }
      } else if (e.key === ' ' && isVoiceActive) {
        e.preventDefault();
        if (status === 'listening') speechService.pause();
        else if (status === 'paused') speechService.resume();
      } else if (e.key === 'Escape' && isVoiceActive) {
        e.preventDefault();
        speechService.stop();
        setIsVoiceActive(false);
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && isVoiceActive) {
        e.preventDefault();
        handleAnalyze();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, isVoiceActive, setIsVoiceActive, handleAnalyze]);

  const requestPermission = async () => {
    const granted = await speechService.requestPermission();
    if (granted) {
      setStatus('ready');
      speechService.start();
    } else {
      setStatus('permission_denied');
    }
  };

  if (status === 'unsupported') {
    return <BrowserCompatibilityCard />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 relative">
      <VoicePermissionDialog 
        status={status} 
        onRequestPermission={requestPermission} 
        onCancel={() => setStatus('ready')}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <VoiceStatus status={status} />
          <VoiceLanguageSelector />
        </div>
        <VoiceDemoPlayer onComplete={handleAnalyze} />
      </div>

      <motion.div 
        layout
        className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800/60 shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center gap-8 py-4">
          <VoiceWaveform />
          <VoiceButton />
        </div>
        
        <AnimatePresence>
          {(finalTranscript || status === 'listening' || status === 'paused') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full mt-8"
            >
              <TranscriptEditor onAnalyze={handleAnalyze} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className="flex items-center justify-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">V</kbd> <span>Start</span></div>
        <div className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Space</kbd> <span>Pause</span></div>
        <div className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Esc</kbd> <span>Stop</span></div>
        <div className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Ctrl+Enter</kbd> <span>Analyze</span></div>
      </div>
    </div>
  );
}
