import { useVoiceStore, EMERGENCY_KEYWORDS } from "@/stores/voice-store";
import { Send, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function TranscriptEditor({ onAnalyze }: { onAnalyze: () => void }) {
  const { 
    finalTranscript, 
    interimTranscript, 
    editFinalTranscript, 
    undoTranscript, 
    clearTranscript,
    transcriptHistory
  } = useVoiceStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const editableRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isEditing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditText(finalTranscript);
    }
  }, [finalTranscript, isEditing]);

  const highlightKeywords = (text: string) => {
    if (!text) return null;
    
    // Create a regex to match keywords case-insensitively with word boundaries
    // Sort by length descending to match longest phrases first (e.g. "not breathing" before "breathing")
    const sortedKeywords = [...EMERGENCY_KEYWORDS].sort((a, b) => b.length - a.length);
    const pattern = `\\b(${sortedKeywords.join('|')})\\b`;
    const regex = new RegExp(pattern, 'gi');
    
    const parts = text.split(regex);
    return parts.map((part, i) => {
      if (EMERGENCY_KEYWORDS.some(kw => kw.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={i} className="px-1.5 py-0.5 mx-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 font-medium tracking-wide">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editText !== finalTranscript) {
      editFinalTranscript(editText);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div 
        className="min-h-[160px] w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-xl md:text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-200 cursor-text focus-within:ring-2 focus-within:ring-indigo-500 outline-none transition-all"
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <textarea
            ref={editableRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="w-full h-full min-h-[140px] bg-transparent resize-none outline-none"
            placeholder="Start speaking..."
          />
        ) : (
          <div>
            {finalTranscript ? highlightKeywords(finalTranscript) : (
              !interimTranscript && <span className="text-slate-400 italic">Listening...</span>
            )}
            {interimTranscript && (
              <span className="text-slate-400"> {interimTranscript}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={undoTranscript}
            disabled={transcriptHistory.length === 0}
            className="text-slate-600 dark:text-slate-300"
            title="Undo last sentence"
          >
            <Undo2 className="w-4 h-4 mr-2" />
            Undo
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearTranscript}
            disabled={!finalTranscript && !interimTranscript}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <Button 
          onClick={onAnalyze}
          disabled={!finalTranscript.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 font-bold tracking-wide shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          Analyze Transcript
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
