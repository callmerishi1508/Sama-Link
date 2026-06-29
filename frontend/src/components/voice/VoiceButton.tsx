import { Mic, Square, Play } from "lucide-react";
import { useVoiceStore } from "@/stores/voice-store";
import { speechService } from "@/lib/voice/speechRecognition";
import { motion } from "framer-motion";

export function VoiceButton() {
  const { status } = useVoiceStore();
  const isActive = status === 'listening' || status === 'processing';
  const isPaused = status === 'paused';

  const handleClick = () => {
    if (status === 'ready' || status === 'paused' || status === 'error') {
      speechService.start();
    } else if (status === 'listening') {
      speechService.pause();
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechService.stop();
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 transition-colors ${
          isActive 
            ? 'bg-rose-500 border-rose-200 dark:border-rose-900/50 text-white shadow-rose-500/30' 
            : isPaused 
              ? 'bg-amber-500 border-amber-200 dark:border-amber-900/50 text-white shadow-amber-500/30'
              : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300'
        }`}
      >
        {isActive ? (
          <Mic className="w-6 h-6 animate-pulse" />
        ) : isPaused ? (
          <Play className="w-6 h-6 ml-1" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </motion.button>
      
      {(isActive || isPaused) && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleStop}
          className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg hover:bg-slate-800 dark:hover:bg-slate-200"
          title="Stop Recording"
        >
          <Square className="w-4 h-4 fill-current" />
        </motion.button>
      )}
    </div>
  );
}
