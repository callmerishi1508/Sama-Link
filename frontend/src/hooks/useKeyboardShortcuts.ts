import { useEffect } from "react";
import { useUIStore } from "@/stores/ui-store";
import { useAnalysisStore } from "@/stores/analysis-store";

export function useKeyboardShortcuts() {
  const { demoMode, revealStage, setRevealStage, isPaused, setIsPaused, resetPresentation, toggleSidebar, isMobile, sidebarExpanded, setSidebarExpanded } = useUIStore();
  const { reset: resetAnalysis, loadingPhase } = useAnalysisStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        // Except for Ctrl+Enter which is handled directly in IncidentInput
        return;
      }

      // Global toggles (not dependent on demoMode)
      if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      if (e.key === "Escape") {
        if (isMobile && sidebarExpanded) {
          e.preventDefault();
          setSidebarExpanded(false);
          return;
        }
        
        if (demoMode) {
          e.preventDefault();
          resetPresentation();
          resetAnalysis();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (!demoMode) return;

      switch (e.key) {
        case " ":
          // Pause/Resume sequential reveal
          e.preventDefault();
          if (loadingPhase === 'complete') {
            setIsPaused(!isPaused);
          }
          break;
        case "ArrowRight":
          // Manually step forward
          if (loadingPhase === 'complete') {
            setRevealStage(revealStage + 1);
          }
          break;
        case "ArrowLeft":
          // Manually step backward
          if (loadingPhase === 'complete' && revealStage > 0) {
            setRevealStage(revealStage - 1);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [demoMode, revealStage, setRevealStage, isPaused, setIsPaused, resetPresentation, resetAnalysis, loadingPhase, toggleSidebar, isMobile, sidebarExpanded, setSidebarExpanded]);
}
