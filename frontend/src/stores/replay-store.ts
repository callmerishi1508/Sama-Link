import { create } from 'zustand';

interface ReplayStore {
  isPlaying: boolean;
  currentEventIndex: number;
  totalEvents: number;
  playbackSpeed: number;
  
  setIsPlaying: (playing: boolean) => void;
  setCurrentEventIndex: (index: number) => void;
  setTotalEvents: (total: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  resetReplay: () => void;
}

export const useReplayStore = create<ReplayStore>((set) => ({
  isPlaying: false,
  currentEventIndex: -1,
  totalEvents: 0,
  playbackSpeed: 1, // 1x, 2x, 5x, etc.
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentEventIndex: (index) => set({ currentEventIndex: index }),
  setTotalEvents: (total) => set({ totalEvents: total }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  resetReplay: () => set({ isPlaying: false, currentEventIndex: -1 })
}));
