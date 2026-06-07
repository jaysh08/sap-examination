"use client";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Clock, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./Button";

interface QuizTimerProps {
  initialMinutes: number;
  onTimeUp?: () => void;
  onTick?: (remaining: number) => void;
  autoStart?: boolean;
}

export function QuizTimer({
  initialMinutes,
  onTimeUp,
  onTick,
  autoStart = false,
}: QuizTimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  const formatTime = useCallback((totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleReset = useCallback(() => {
    setSeconds(initialMinutes * 60);
    setIsRunning(false);
    setIsPaused(false);
  }, [initialMinutes]);

  const handlePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newValue = prev - 1;
          onTick?.(newValue);
          
          if (newValue <= 0) {
            setIsRunning(false);
            onTimeUp?.();
            return 0;
          }
          return newValue;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, seconds, onTimeUp, onTick]);

  const isLowTime = seconds <= 60;
  const isCriticalTime = seconds <= 30;
  const progress = (seconds / (initialMinutes * 60)) * 100;

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors",
          isCriticalTime
            ? "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
            : isLowTime
            ? "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400"
            : "bg-secondary border-border"
        )}
      >
        <Clock className={cn("h-4 w-4", isRunning && !isPaused && "animate-pulse")} />
        <span
          className={cn(
            "font-mono font-bold text-lg tabular-nums",
            isCriticalTime && "animate-pulse"
          )}
        >
          {formatTime(seconds)}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {!isRunning ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRunning(true)}
            className="h-8 w-8"
          >
            <Play className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePause}
            className="h-8 w-8"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000",
            isCriticalTime
              ? "bg-red-500"
              : isLowTime
              ? "bg-yellow-500"
              : "bg-primary"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}