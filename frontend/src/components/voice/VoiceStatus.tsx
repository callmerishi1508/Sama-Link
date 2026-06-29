import { SpeechStatus } from '@/lib/voice/speechRecognition';
import { Mic, MicOff, Loader2, AlertCircle, VolumeX, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceStatusProps {
  status: SpeechStatus;
}

export function VoiceStatus({ status }: VoiceStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'ready':
        return { icon: <Mic className="w-4 h-4" />, text: 'Ready', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800' };
      case 'listening':
        return { icon: <Mic className="w-4 h-4 animate-pulse" />, text: 'Listening', color: 'text-rose-500 bg-rose-100 dark:bg-rose-900/30' };
      case 'paused':
        return { icon: <MicOff className="w-4 h-4" />, text: 'Paused', color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30' };
      case 'processing':
        return { icon: <Loader2 className="w-4 h-4 animate-spin" />, text: 'Processing', color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' };
      case 'completing':
        return { icon: <Loader2 className="w-4 h-4 animate-spin" />, text: 'Listening Complete', color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' };
      case 'transcribing':
        return { icon: <Loader2 className="w-4 h-4 animate-spin" />, text: 'Transcribing Speech...', color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' };
      case 'understanding':
        return { icon: <Loader2 className="w-4 h-4 animate-spin" />, text: 'Understanding Context...', color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' };
      case 'ready_for_analysis':
        return { icon: <Mic className="w-4 h-4" />, text: 'Ready for Analysis ✓', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' };
      case 'permission_requested':
        return { icon: <ShieldAlert className="w-4 h-4" />, text: 'Requesting Permission', color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' };
      case 'permission_denied':
        return { icon: <VolumeX className="w-4 h-4" />, text: 'Permission Denied', color: 'text-red-500 bg-red-100 dark:bg-red-900/30' };
      case 'blocked':
        return { icon: <AlertCircle className="w-4 h-4" />, text: 'Blocked', color: 'text-red-500 bg-red-100 dark:bg-red-900/30' };
      case 'unsupported':
        return { icon: <AlertCircle className="w-4 h-4" />, text: 'Unsupported', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800' };
      case 'offline':
        return { icon: <VolumeX className="w-4 h-4" />, text: 'Offline', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800' };
      case 'error':
        return { icon: <AlertCircle className="w-4 h-4" />, text: 'Error', color: 'text-red-500 bg-red-100 dark:bg-red-900/30' };
      default:
        return { icon: <Mic className="w-4 h-4" />, text: 'Ready', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800' };
    }
  };

  const config = getStatusConfig();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${config.color} transition-colors duration-300`}
        aria-live="polite"
      >
        {config.icon}
        {config.text}
      </motion.div>
    </AnimatePresence>
  );
}
