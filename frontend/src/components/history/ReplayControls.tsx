import React from 'react';
import { useReplayStore } from '@/stores/replay-store';
import { Play, Pause, FastForward, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReplayControls() {
  const { 
    isPlaying, 
    currentEventIndex, 
    totalEvents, 
    playbackSpeed, 
    setIsPlaying, 
    setPlaybackSpeed, 
    resetReplay 
  } = useReplayStore();

  const handlePlayPause = () => {
    if (currentEventIndex >= totalEvents - 1) {
      resetReplay();
      // small delay to let react state reset before playing again
      setTimeout(() => setIsPlaying(true), 10);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedToggle = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(2);
    else if (playbackSpeed === 2) setPlaybackSpeed(5);
    else setPlaybackSpeed(1);
  };

  const isFinished = currentEventIndex >= totalEvents - 1 && totalEvents > 0;
  const progress = totalEvents > 0 ? ((currentEventIndex + 1) / totalEvents) * 100 : 0;

  return (
    <div className="bg-slate-900 rounded-full px-4 py-2 flex items-center gap-4 shadow-xl border border-slate-700">
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-8 h-8 rounded-full text-slate-300 hover:text-white hover:bg-slate-800"
        onClick={handlePlayPause}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : (isFinished ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />)}
      </Button>

      <div className="w-32 sm:w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${Math.max(0, progress)}%` }}
        />
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 px-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 font-mono text-xs"
        onClick={handleSpeedToggle}
      >
        {playbackSpeed}x <FastForward className="w-3 h-3 ml-1" />
      </Button>
    </div>
  );
}
