import { Topic, ProgressTracking, DashboardStats } from "@/types";

export const mockTopics: Topic[] = [
  { id: 1, name: "Employee Central Basics", slug: "ec-basics", description: "Core concepts of EC", icon: "book", question_count: 25, created_at: "" },
  { id: 2, name: "Foundation Objects", slug: "foundation-objects", description: "Understanding FO", icon: "cube", question_count: 30, created_at: "" },
  { id: 3, name: "MDF Framework", slug: "mdf-framework", description: "Managed Data Framework", icon: "grid", question_count: 35, created_at: "" },
  { id: 4, name: "Effective Dating", slug: "effective-dating", description: "Time-dependent data", icon: "calendar", question_count: 25, created_at: "" },
  { id: 5, name: "Role-Based Permissions", slug: "rbp", description: "RBP configuration", icon: "shield", question_count: 25, created_at: "" },
  { id: 6, name: "Position Management", slug: "position-mgmt", description: "Position-based hierarchy", icon: "users", question_count: 20, created_at: "" },
];

export const mockProgress: ProgressTracking[] = [
  { id: 1, user_id: "", topic_id: 1, questions_attempted: 20, correct_answers: 14, accuracy: 70, updated_at: "" },
  { id: 2, user_id: "", topic_id: 2, questions_attempted: 25, correct_answers: 18, accuracy: 72, updated_at: "" },
  { id: 3, user_id: "", topic_id: 3, questions_attempted: 30, correct_answers: 24, accuracy: 80, updated_at: "" },
  { id: 4, user_id: "", topic_id: 4, questions_attempted: 15, correct_answers: 9, accuracy: 60, updated_at: "" },
  { id: 5, user_id: "", topic_id: 5, questions_attempted: 22, correct_answers: 17, accuracy: 77, updated_at: "" },
  { id: 6, user_id: "", topic_id: 6, questions_attempted: 18, correct_answers: 11, accuracy: 61, updated_at: "" },
];

export const mockStats: DashboardStats = {
  totalQuestions: 320,
  questionsAttempted: 156,
  correctAnswers: 112,
  accuracy: 72,
  totalTimeSpent: 450,
  currentStreak: 7,
  longestStreak: 14,
  level: 3,
  xp: 280,
  xpToNextLevel: 20,
};

export const mockQuestions = [
  {
    id: 1,
    topic_id: 1,
    question_text: "What is the primary purpose of Foundation Objects in SAP SuccessFactors Employee Central?",
    question_type: "single" as const,
    options: [
      { text: "To store time-dependent employee data", isCorrect: false },
      { text: "To provide a configurable data structure for business objects", isCorrect: true },
      { text: "To manage user authentication", isCorrect: false },
      { text: "To generate reports", isCorrect: false },
    ],
    explanation: "Foundation Objects (FO) provide a configurable data structure that allows organizations to define custom business objects with specific fields and relationships.",
    why_others_wrong: [
      { option: "Time-dependent data", reason: "That's handled by Effective Dating, not FO directly" },
      { option: "User authentication", reason: "That's managed by Role-Based Permissions (RBP)" },
    ],
    difficulty: "medium" as const,
    tags: ["foundation-objects", "core-concepts"],
    tips_traps: "Don't confuse Foundation Objects with Generic Objects - FO are the building blocks for core EC functionality.",
    erp_vs_sf: "In SAP ERP HCM, similar functionality was achieved through Infotypes and PA/PD modules.",
    is_active: true,
    created_at: "",
  },
  {
    id: 2,
    topic_id: 1,
    question_text: "Which of the following are valid question types in SAP SuccessFactors Employee Central certification exams? (Select all that apply)",
    question_type: "multi" as const,
    options: [
      { text: "Single choice", isCorrect: true },
      { text: "Multiple choice", isCorrect: true },
      { text: "True/False", isCorrect: true },
      { text: "Fill in the blank", isCorrect: false },
    ],
    explanation: "The certification exams typically include single choice, multiple choice, and true/false questions.",
    difficulty: "easy" as const,
    tags: ["exam-format", "question-types"],
    is_active: true,
    created_at: "",
  },
];