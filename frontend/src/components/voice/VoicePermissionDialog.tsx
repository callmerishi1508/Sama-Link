import { ShieldAlert, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SpeechStatus } from "@/lib/voice/speechRecognition";

interface VoicePermissionDialogProps {
  status: SpeechStatus;
  onRequestPermission: () => void;
  onCancel: () => void;
}

export function VoicePermissionDialog({ status, onRequestPermission, onCancel }: VoicePermissionDialogProps) {
  if (status !== 'permission_requested' && status !== 'permission_denied' && status !== 'blocked') return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm rounded-3xl"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {status === 'permission_requested' ? 'Microphone Access' : 'Permission Required'}
        </h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          {status === 'permission_requested' 
            ? 'SAMA LINK requires microphone access to process your voice report. Audio is processed directly in your browser and is never saved or uploaded.'
            : 'Microphone access was denied or blocked. Please enable it in your browser settings to use Voice Intelligence.'}
        </p>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          
          {status === 'permission_requested' && (
            <button 
              onClick={onRequestPermission}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Allow
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
