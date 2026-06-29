import { useEffect } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { useAnalysisStore } from '@/stores/analysis-store';

export function useDemoOrchestrator() {
  const { demoMode, revealStage, setRevealStage } = useUIStore();
  const { loadingPhase } = useAnalysisStore();

  useEffect(() => {
    if (!demoMode || loadingPhase !== 'complete') return;

    if (revealStage < 12) {
      const timer = setTimeout(() => {
        setRevealStage(revealStage + 1);
      }, 1300); // 1.3s per reveal to keep the whole process 18-22s
      
      return () => clearTimeout(timer);
    }
  }, [demoMode, loadingPhase, revealStage, setRevealStage]);
}
