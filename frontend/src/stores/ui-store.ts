import { create } from 'zustand';

interface UIState {
  demoMode: boolean;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  setDemoMode: (enabled: boolean) => void;
  toggleDemoMode: () => void;
  
  // Sidebar State
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;
  
  // Judge Mode Presentation State
  replayStep: number;
  revealStage: number;
  isPaused: boolean;
  autoDemoActive: boolean;
  
  setReplayStep: (step: number) => void;
  setRevealStage: (stage: number) => void;
  markStageComplete: (stageIndex: number) => void;
  setIsPaused: (paused: boolean) => void;
  setAutoDemoActive: (active: boolean) => void;
  resetPresentation: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  demoMode: false,
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  setDemoMode: (enabled) => set({ demoMode: enabled }),
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),
  
  sidebarExpanded: true,
  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
  toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
  
  replayStep: 0,
  revealStage: 0,
  isPaused: false,
  autoDemoActive: false,
  
  setReplayStep: (step) => set({ replayStep: step }),
  setRevealStage: (stage) => set({ revealStage: stage }),
  markStageComplete: (stageIndex) => set((state) => {
    if (state.revealStage === stageIndex) {
      return { revealStage: stageIndex + 1 };
    }
    return state;
  }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setAutoDemoActive: (active) => set({ autoDemoActive: active }),
  resetPresentation: () => set({ replayStep: 0, revealStage: 0, isPaused: false, autoDemoActive: false }),
}));
