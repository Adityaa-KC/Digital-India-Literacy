import { PageHeader } from "@/components/PageHeader";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCcw, PlayCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const practiceSentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Digital literacy helps us connect with the world.",
  "Always keep your passwords strong and secret.",
  "The internet is a vast library of information.",
  "Practice makes perfect when learning to type.",
  "India is growing rapidly in the digital space.",
];

export default function TypingPractice() {
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [completed, setCompleted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentSentence = practiceSentences[sentenceIdx];

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    
    // Start timer on first keystroke
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    setInput(val);

    // Check completion
    if (val === currentSentence) {
      const timeTaken = (Date.now() - (startTime || Date.now())) / 1000 / 60; // in minutes
      const words = val.split(" ").length;
      setWpm(Math.round(words / timeTaken));
      setCompleted(true);
    }
  };

  const nextSentence = () => {
    setInput("");
    setStartTime(null);
    setCompleted(false);
    setSentenceIdx((prev) => (prev + 1) % practiceSentences.length);
    textareaRef.current?.focus();
  };

  // Calculate accuracy visualization
  const renderSentence = () => {
    return currentSentence.split("").map((char, idx) => {
      let colorClass = "text-muted-foreground";
      if (idx < input.length) {
        colorClass = input[idx] === char ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100";
      }
      return (
        <span key={idx} className={`${colorClass} transition-colors duration-100 rounded-sm`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader 
        title="Typing Practice" 
        description="Improve your keyboard skills with simple exercises."
        emoji="⌨️"
      />

      <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden">
        {/* Header Bar */}
        <div className="bg-muted/50 p-6 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Lesson {sentenceIdx + 1}</span>
          </div>
          {completed && (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" /> Great Job! {wpm} WPM
            </motion.div>
          )}
        </div>

        <div className="p-8 md:p-12">
          {/* Target Text */}
          <div className="mb-8 text-2xl md:text-4xl font-display font-medium leading-relaxed tracking-wide select-none">
            {renderSentence()}
          </div>

          {/* Input Area */}
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            placeholder="Start typing here..."
            className="text-xl md:text-2xl p-6 min-h-[150px] rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none font-sans"
            disabled={completed}
          />

          <div className="mt-8 flex justify-between items-center">
            <Button variant="ghost" onClick={nextSentence} className="text-muted-foreground">
              <RefreshCcw className="mr-2 h-4 w-4" /> Reset / Skip
            </Button>
            
            {completed && (
              <Button onClick={nextSentence} size="lg" className="rounded-full px-8 h-12 text-lg">
                Next Lesson <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <h3 className="font-bold text-orange-800 mb-2">Tip 1</h3>
          <p className="text-orange-700">Sit up straight and keep your feet flat on the floor.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2">Tip 2</h3>
          <p className="text-blue-700">Place your fingers on the "Home Row" keys (ASDF and JKL;).</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
          <h3 className="font-bold text-purple-800 mb-2">Tip 3</h3>
          <p className="text-purple-700">Focus on accuracy first. Speed will come naturally with practice.</p>
        </div>
      </div>
    </div>
  );
}
