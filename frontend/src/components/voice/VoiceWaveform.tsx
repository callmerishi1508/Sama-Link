import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useVoiceStore } from "@/stores/voice-store";
import { audioAnalyzer } from "@/lib/voice/audioAnalyzer";

export function VoiceWaveform() {
  const { status, interimTranscript } = useVoiceStore();
  const [bars, setBars] = useState<number[]>(Array(24).fill(20));
  const fallbackRef = useRef<boolean>(false);

  useEffect(() => {
    let animationFrameId: number;
    let fallbackInterval: NodeJS.Timeout;
    let isComponentMounted = true;

    const startVisualizer = async () => {
      if (status === 'listening') {
        const success = await audioAnalyzer.initialize();
        if (!success && isComponentMounted) {
          fallbackRef.current = true;
        }

        if (success && isComponentMounted) {
          fallbackRef.current = false;
          const renderLoop = () => {
            if (status !== 'listening' || !isComponentMounted) return;
            
            const volume = audioAnalyzer.getVolume(); // 0 to 1
            const baseHeight = 15;
            const dynamicRange = 70;
            
            setBars(prev => prev.map((_, i) => {
              // Create a slight wave effect based on index to make it look organic
              const factor = Math.sin(Date.now() / 200 + i) * 0.1 + 0.9;
              return baseHeight + (volume * dynamicRange * factor);
            }));
            
            animationFrameId = requestAnimationFrame(renderLoop);
          };
          renderLoop();
        } else if (fallbackRef.current && isComponentMounted) {
          // Fallback simulation
          fallbackInterval = setInterval(() => {
            const isSpeaking = interimTranscript.trim().length > 0;
            setBars(prev => prev.map(() => {
              if (isSpeaking) {
                return 20 + Math.random() * 60;
              } else {
                return 10 + Math.random() * 15;
              }
            }));
          }, 100);
        }
      } else if (status === 'processing' || status === 'transcribing' || status === 'understanding') {
        // Steady pulsing wave during loading phases
        let step = 0;
        fallbackInterval = setInterval(() => {
          step += 0.2;
          setBars(prev => prev.map((_, i) => {
            return 20 + Math.sin(step + i * 0.5) * 20;
          }));
        }, 50);
      } else {
        // Idle / paused
        setBars(prev => {
          if (prev.some(v => v > 10)) {
            return Array(24).fill(10);
          }
          return prev;
        });
      }
    };

    startVisualizer();

    return () => {
      isComponentMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (fallbackInterval) clearInterval(fallbackInterval);
      if (status !== 'listening') {
        audioAnalyzer.destroy();
      }
    };
  }, [status, interimTranscript]);

  // Global cleanup when waveform completely unmounts
  useEffect(() => {
    return () => {
      audioAnalyzer.destroy();
    };
  }, []);

  const isActive = status === 'listening' || status === 'processing' || status === 'transcribing' || status === 'understanding';

  return (
    <div className={`flex items-center justify-center gap-[3px] h-24 w-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
      {bars.map((height, i) => (
        <motion.div
          key={i}
          animate={{ height: `${height}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`w-1.5 rounded-full ${status !== 'listening' ? 'bg-indigo-500' : 'bg-rose-500'}`}
          style={{ minHeight: '10%' }}
        />
      ))}
    </div>
  );
}
