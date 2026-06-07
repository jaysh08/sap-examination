import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case "easy": return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
    case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
    case "hard": return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
    default: return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300";
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateXP(level: number): { current: number; required: number } {
  const xpPerLevel = 100;
  return { current: (level - 1) * xpPerLevel, required: level * xpPerLevel };
}