import { useEffect } from 'react';
import { useReplayStore } from '@/stores/replay-store';

interface Props {
  totalEvents: number;
}

export function ReplayEngine({ totalEvents }: Props) {
  const { 
    isPlaying, 
    currentEventIndex, 
    playbackSpeed, 
    setTotalEvents, 
    setCurrentEventIndex, 
    setIsPlaying 
  } = useReplayStore();

  useEffect(() => {
    setTotalEvents(totalEvents);
  }, [totalEvents, setTotalEvents]);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentEventIndex >= totalEvents - 1) {
      setIsPlaying(false);
      return;
    }

    const baseDelay = 1500; // 1.5 seconds per event at 1x speed
    const delay = baseDelay / playbackSpeed;

    const timer = setTimeout(() => {
      setCurrentEventIndex(currentEventIndex + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentEventIndex, totalEvents, playbackSpeed, setCurrentEventIndex, setIsPlaying]);

  // ReplayEngine has no UI. It acts strictly as an invisible orchestrator.
  return null;
}
