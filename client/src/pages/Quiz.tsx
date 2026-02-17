import { useQuiz } from "@/hooks/use-content";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, RefreshCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Quiz() {
  const { data: questions, isLoading } = useQuiz();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <div className="p-8 text-center text-xl">No quiz questions available right now.</div>;
  }

  const currentQuestion = questions[currentQuestionIdx];
  const options = currentQuestion.options as string[]; // Cast jsonb to array

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-12 rounded-3xl border border-border shadow-xl"
        >
          <div className="inline-flex p-6 bg-yellow-100 rounded-full mb-8">
            <Trophy className="h-16 w-16 text-yellow-600" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">Quiz Completed!</h2>
          <p className="text-2xl text-muted-foreground mb-8">
            You scored <span className="font-bold text-primary">{score}</span> out of <span className="font-bold text-foreground">{questions.length}</span>
          </p>
          
          <Button onClick={restartQuiz} size="lg" className="h-14 px-8 text-lg rounded-xl gap-2">
            <RefreshCcw className="h-5 w-5" /> Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader 
        title="Digital Safety Quiz" 
        description="Test your knowledge on passwords, phishing, and online safety."
        emoji="🛡️"
      />

      <div className="mb-6 flex justify-between items-center text-sm font-medium text-muted-foreground">
        <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden mb-8">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-lg p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-8 leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuestion.correctAnswer;
            const isWrong = isSelected && !isCorrect;
            
            // Determine class based on state
            let buttonClass = "w-full text-left p-6 rounded-xl border-2 text-lg font-medium transition-all duration-200 flex items-center justify-between group ";
            
            if (selectedAnswer === null) {
              buttonClass += "bg-background border-border hover:border-primary hover:bg-primary/5 hover:shadow-md";
            } else if (isCorrect) {
              buttonClass += "bg-green-50 border-green-500 text-green-900";
            } else if (isWrong) {
              buttonClass += "bg-red-50 border-red-500 text-red-900";
            } else {
              buttonClass += "bg-background border-border opacity-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                <span>{option}</span>
                {selectedAnswer !== null && isCorrect && <CheckCircle className="h-6 w-6 text-green-600" />}
                {selectedAnswer !== null && isWrong && <XCircle className="h-6 w-6 text-red-600" />}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-muted/50 rounded-xl border border-border"
          >
            <p className="font-bold text-foreground mb-2 flex items-center gap-2">
              {selectedAnswer === currentQuestion.correctAnswer ? "Correct! 🎉" : "Not quite right..."}
            </p>
            <p className="text-lg text-muted-foreground">{currentQuestion.explanation}</p>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={nextQuestion} size="lg" className="px-8 rounded-xl text-lg h-12">
                {currentQuestionIdx === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
