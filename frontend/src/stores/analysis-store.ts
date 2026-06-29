import { create } from 'zustand';
import { AnalysisResponse, AnalysisRequest } from '@/types/analysis';
import { analyzeIncident } from '@/lib/api';
import { useUIStore } from './ui-store';

type LoadingPhase = 'idle' | 'reading' | 'understanding' | 'identifying' | 'assessing' | 'planning' | 'oversight' | 'complete';

interface AnalysisState {
  request: AnalysisRequest | null;
  response: AnalysisResponse | null;
  loadingPhase: LoadingPhase;
  error: string | null;
  provider: string | null;
  fallbackUsed: boolean;
  
  // Actions
  setRequestText: (text: string) => void;
  submitAnalysis: (text: string, voiceMetadata?: AnalysisResponse['voiceMetadata']) => Promise<void>;
  reset: () => void;
}



export const useAnalysisStore = create<AnalysisState>((set) => ({
  request: null,
  response: null,
  loadingPhase: 'idle',
  error: null,
  provider: null,
  fallbackUsed: false,

  setRequestText: (text) => set({ request: { incident_text: text, language: 'en' } }),

  submitAnalysis: async (text: string, voiceMetadata?: AnalysisResponse['voiceMetadata']) => {
    // Prevent double submission
    if (useAnalysisStore.getState().loadingPhase !== 'idle' && useAnalysisStore.getState().loadingPhase !== 'complete') {
      return;
    }

    set({
      request: { incident_text: text, language: 'en' },
      response: null,
      error: null,
      loadingPhase: 'reading',
      provider: null,
      fallbackUsed: false,
    });

    const isDemo = useUIStore.getState().demoMode;
    const requestStartTime = Date.now();

    try {
      const response = await analyzeIncident({ incident_text: text, language: 'en' });
      
      const elapsed = Date.now() - requestStartTime;
      const minDemoTime = 6000; // 6 seconds minimum for AI Thinking storytelling
      
      if (isDemo && elapsed < minDemoTime) {
        await new Promise(resolve => setTimeout(resolve, minDemoTime - elapsed));
      }
      
      if (voiceMetadata) {
        response.voiceMetadata = voiceMetadata;
      }
      
      set({
        response,
        loadingPhase: 'complete',
        provider: response.provider,
        fallbackUsed: response.fallback_used,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to contact the Intelligence Engine.';
      set({
        error: errorMessage,
        loadingPhase: 'idle',
      });
    }
  },

  reset: () => set({
    request: null,
    response: null,
    loadingPhase: 'idle',
    error: null,
    provider: null,
    fallbackUsed: false,
  })
}));
