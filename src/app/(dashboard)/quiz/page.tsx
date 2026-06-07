"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockQuestions } from "@/data/mockData";
import { ChevronLeft, ChevronRight, Bookmark, CheckCircle, XCircle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { cn, shuffleArray } from "@/lib/utils";
import type { Question } from "@/types";

function QuizContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "practice";
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray([...mockQuestions]));
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleAnswer = (selectedOptions: number[]) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedOptions }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
    else setIsComplete(true);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const toggleBookmark = (questionId: number) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(questionId) ? next.delete(questionId) : next.add(questionId);
      return next;
    });
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((q) => {
      const selected = answers[q.id] || [];
      const correctIndices = q.options.map((opt, idx) => (opt.isCorrect ? idx : -1)).filter((idx) => idx !== -1);
      if (JSON.stringify(selected.sort()) === JSON.stringify(correctIndices.sort())) correct++;
    });
    return { correct, total: questions.length, accuracy: Math.round((correct / questions.length) * 100) };
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsComplete(false);
    setQuestions(shuffleArray(questions));
  };

  if (isComplete) {
    const results = calculateResults();
    return (
      <div className="container px-4 py-8 mx-auto max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className={cn("w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6", results.accuracy >= 70 ? "bg-green-100 dark:bg-green-900/30" : results.accuracy >= 50 ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-red-100 dark:bg-red-900/30")}>
              {results.accuracy >= 70 ? <CheckCircle className="h-10 w-10 text-green-600" /> : <XCircle className="h-10 w-10 text-red-600" />}
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-8">You scored {results.correct} out of {results.total}</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-secondary"><p className="text-2xl font-bold">{results.correct}</p><p className="text-sm text-muted-foreground">Correct</p></div>
              <div className="p-4 rounded-lg bg-secondary"><p className="text-2xl font-bold">{results.total - results.correct}</p><p className="text-sm text-muted-foreground">Incorrect</p></div>
              <div className="p-4 rounded-lg bg-secondary"><p className="text-2xl font-bold">{results.accuracy}%</p><p className="text-sm text-muted-foreground">Accuracy</p></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard"><Button variant="outline" className="gap-2"><Home className="h-4 w-4" />Dashboard</Button></Link>
              <Button onClick={handleRestart} className="gap-2"><RotateCcw className="h-4 w-4" />Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard"><Button variant="ghost" size="icon"><Home className="h-5 w-5" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold capitalize">{mode} Mode</h1>
            <p className="text-sm text-muted-foreground">Question {currentIndex + 1} of {questions.length}</p>
          </div>
        </div>
        {bookmarks.size > 0 && <Badge variant="secondary" className="gap-1"><Bookmark className="h-3 w-3" />{bookmarks.size} bookmarked</Badge>}
      </div>
      <Progress value={progress} className="mb-8" />
      {currentQuestion && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Question {currentIndex + 1} of {questions.length}</Badge>
                <Badge className={getDifficultyClass(currentQuestion.difficulty)}>{currentQuestion.difficulty}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleBookmark(currentQuestion.id)} className={cn(bookmarks.has(currentQuestion.id) && "text-primary")}>
                <Bookmark className={cn("h-4 w-4", bookmarks.has(currentQuestion.id) && "fill-current")} />
              </Button>
            </div>
            <CardTitle className="text-lg leading-relaxed">{currentQuestion.question_text}</CardTitle>
            {currentQuestion.question_type === "multi" && <p className="text-sm text-muted-foreground">Select all that apply</p>}
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = (answers[currentQuestion.id] || []).includes(index);
              const isAnswered = !!answers[currentQuestion.id];
              return (
                <button key={index} onClick={() => !isAnswered && handleAnswer(currentQuestion.question_type === "single" || currentQuestion.question_type === "truefalse" ? [index] : (isSelected ? (answers[currentQuestion.id] || []).filter(i => i !== index) : [...(answers[currentQuestion.id] || []), index]))} disabled={isAnswered} className={cn("w-full p-4 text-left rounded-lg border-2 transition-all", !isAnswered ? (isSelected ? "border-primary bg-primary/10" : "border-input hover:border-primary/50 hover:bg-accent") : option.isCorrect ? "border-green-500 bg-green-100 dark:bg-green-900/30" : isSelected ? "border-red-500 bg-red-100 dark:bg-red-900/30" : "border-input opacity-50")}>
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-6 w-6 items-center justify-center rounded-full border-2 text-sm font-medium", isSelected ? "border-primary bg-primary text-primary-foreground" : "border-input")}>{String.fromCharCode(65 + index)}</div>
                    <span className="flex-1">{option.text}</span>
                    {isAnswered && (option.isCorrect ? <CheckCircle className="h-5 w-5 text-green-500" /> : isSelected && <XCircle className="h-5 w-5 text-red-500" />)}
                  </div>
                </button>
              );
            })}
            {answers[currentQuestion.id] && (
              <div className={cn("p-4 rounded-lg mt-4", answers[currentQuestion.id].some(i => currentQuestion.options[i]?.isCorrect) ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30")}>
                <p className="font-medium mb-2">{answers[currentQuestion.id].some(i => currentQuestion.options[i]?.isCorrect) ? "Correct!" : "Incorrect"}</p>
                <p className="text-sm">{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0} className="gap-2"><ChevronLeft className="h-4 w-4" />Previous</Button>
        <Button onClick={handleNext} className="gap-2">{currentIndex === questions.length - 1 ? "Finish Quiz" : "Next"}<ChevronRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

function getDifficultyClass(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case "easy": return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
    case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
    case "hard": return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
    default: return "text-gray-600 bg-gray-100";
  }
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" /></div>}>
      <QuizContent />
    </Suspense>
  );
}
