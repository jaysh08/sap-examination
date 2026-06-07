export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  xp: number;
  level: number;
  streak_days: number;
  last_practice_date: string | null;
  created_at: string;
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  question_count: number;
  created_at: string;
}

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  topic_id: number;
  question_text: string;
  question_type: "single" | "multi" | "truefalse" | "scenario";
  options: Option[];
  explanation: string;
  why_others_wrong?: { option: string; reason: string }[];
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  tips_traps?: string;
  erp_vs_sf?: string;
  certification_goal?: string;
  is_active: boolean;
  created_at: string;
}

export interface Attempt {
  id: number;
  user_id: string;
  question_id: number;
  selected_options: number[];
  is_correct: boolean;
  time_spent: number;
  attempted_at: string;
}

export interface ProgressTracking {
  id: number;
  user_id: string;
  topic_id: number;
  questions_attempted: number;
  correct_answers: number;
  accuracy: number;
  updated_at: string;
}

export interface DashboardStats {
  totalQuestions: number;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
  totalTimeSpent: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
}