import { create } from 'zustand';
import { SpeechStatus } from '@/lib/voice/speechRecognition';

export const EMERGENCY_KEYWORDS = [
  'fire', 'help', 'collapse', 'not breathing', 'unconscious', 
  'gas leak', 'heart attack', 'elderly', 'child', 'trapped', 'bleeding'
];

interface VoiceState {
  // Transcripts
  interimTranscript: string;
  finalTranscript: string;
  transcriptHistory: string[];
  
  // Status & Metadata
  status: SpeechStatus;
  language: string;
  confidence: number;
  detectedKeywords: string[];
  isVoiceActive: boolean;
  recordingStartTime: number | null;
  recordingDurationMs: number;

  // Actions
  setStatus: (status: SpeechStatus) => void;
  setLanguage: (lang: string) => void;
  appendFinalTranscript: (text: string) => void;
  setInterimTranscript: (text: string) => void;
  setConfidence: (conf: number) => void;
  setIsVoiceActive: (active: boolean) => void;
  
  // Editing
  editFinalTranscript: (text: string) => void;
  undoTranscript: () => void;
  clearTranscript: () => void;
  
  // Utilities
  detectKeywords: (text: string) => void;
  startTimer: () => void;
  stopTimer: () => void;
  reset: () => void;
}

export const useVoiceStore = create<VoiceState>((set, get) => ({
  interimTranscript: '',
  finalTranscript: '',
  transcriptHistory: [],
  
  status: 'ready',
  language: 'en-US',
  confidence: 0,
  detectedKeywords: [],
  isVoiceActive: false,
  recordingStartTime: null,
  recordingDurationMs: 0,

  setStatus: (status) => set({ status }),
  setLanguage: (language) => set({ language }),
  
  setIsVoiceActive: (active) => set({ isVoiceActive: active }),

  appendFinalTranscript: (text) => set((state) => {
    const trimmed = text.trim();
    if (!trimmed) return state;
    
    const newTranscript = state.finalTranscript 
      ? `${state.finalTranscript} ${trimmed}` 
      : trimmed;
    
    // Save history snapshot (max 10)
    const newHistory = [...state.transcriptHistory, state.finalTranscript].slice(-10);
    
    get().detectKeywords(newTranscript);

    return {
      finalTranscript: newTranscript,
      transcriptHistory: newHistory,
      interimTranscript: '' // clear interim when final is appended
    };
  }),

  setInterimTranscript: (text) => set((state) => {
    // Only detect keywords in combined text for UX highlighting
    const combined = state.finalTranscript + ' ' + text;
    get().detectKeywords(combined);
    return { interimTranscript: text };
  }),

  setConfidence: (confidence) => set({ confidence }),

  editFinalTranscript: (text) => set((state) => {
    const newHistory = [...state.transcriptHistory, state.finalTranscript].slice(-10);
    get().detectKeywords(text);
    return {
      finalTranscript: text,
      transcriptHistory: newHistory,
      interimTranscript: ''
    };
  }),

  undoTranscript: () => set((state) => {
    if (state.transcriptHistory.length === 0) return state;
    const history = [...state.transcriptHistory];
    const previous = history.pop() || '';
    get().detectKeywords(previous);
    return {
      finalTranscript: previous,
      transcriptHistory: history,
      interimTranscript: ''
    };
  }),

  clearTranscript: () => set({
    finalTranscript: '',
    interimTranscript: '',
    transcriptHistory: [],
    detectedKeywords: [],
    confidence: 0,
    recordingDurationMs: 0
  }),

  detectKeywords: (text) => {
    const lowerText = text.toLowerCase();
    const found = EMERGENCY_KEYWORDS.filter(kw => {
      const regex = new RegExp(`\\b${kw.toLowerCase()}\\b`, 'i');
      return regex.test(lowerText);
    });
    set({ detectedKeywords: found });
  },

  startTimer: () => set({ recordingStartTime: Date.now(), recordingDurationMs: 0 }),
  
  stopTimer: () => set((state) => ({ 
    recordingDurationMs: state.recordingStartTime ? Date.now() - state.recordingStartTime : 0,
    recordingStartTime: null 
  })),

  reset: () => set({
    interimTranscript: '',
    finalTranscript: '',
    transcriptHistory: [],
    status: 'ready',
    confidence: 0,
    detectedKeywords: [],
    recordingStartTime: null,
    recordingDurationMs: 0
  })
}));
