import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useVoiceStore } from "@/stores/voice-store";

const DEMO_SCENARIO = "My elderly neighbor hasn't answered the door for two days. The lights have been on all night and newspapers are piling up outside.";

export function VoiceDemoPlayer({ onComplete }: { onComplete: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setStatus, appendFinalTranscript, setInterimTranscript, clearTranscript, setIsVoiceActive } = useVoiceStore();

  const playDemo = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setIsVoiceActive(true);
    clearTranscript();
    setStatus('listening');

    const sentences = DEMO_SCENARIO.match(/[^.!?]+[.!?]+/g) || [DEMO_SCENARIO];
    
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      
      // Simulate interim words appearing
      const words = sentence.split(' ');
      let currentInterim = '';
      
      for (const word of words) {
        currentInterim += word + ' ';
        setInterimTranscript(currentInterim);
        await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 150));
      }
      
      // Simulate thinking pause at end of sentence
      await new Promise(resolve => setTimeout(resolve, 600));
      appendFinalTranscript(sentence);
    }
    
    setStatus('ready');
    setIsPlaying(false);
    onComplete();
  };

  return (
    <Button 
      variant="outline" 
      onClick={playDemo}
      disabled={isPlaying}
      className="gap-2 border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
    >
      <PlayCircle className="w-4 h-4" />
      {isPlaying ? "Simulating Voice..." : "Try Voice Demo"}
    </Button>
  );
}
