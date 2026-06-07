"use client";
import { useAuth } from "@/context/AuthContext";
import { StatCard } from "@/components/dashboard/StatCard";
import { TopicProgressCard } from "@/components/dashboard/TopicProgressCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { mockTopics } from "@/data/mockData";
import { Target, Trophy, Flame, Zap, BookOpen, Brain, RefreshCw, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return <div className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${sizes[size]}`} />;
}

export default function DashboardPage() {
  const { profile, loading } = useAuth();
  const [localStats, setLocalStats] = useState({ attempted: 0, correct: 0, streak: 0 });

  useEffect(() => {
    const attempted = parseInt(localStorage.getItem("totalQuestionsAttempted") || "0");
    const correct = parseInt(localStorage.getItem("correctAnswers") || "0");
    const streak = parseInt(localStorage.getItem("streakCount") || "0");
    setLocalStats({ attempted, correct, streak });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const totalAttempted = localStats.attempted;
  const accuracy = totalAttempted > 0 ? Math.round((localStats.correct / totalAttempted) * 100) : 0;
  const currentStreak = localStats.streak;
  const currentXP = profile?.xp || parseInt(localStorage.getItem("xp") || "0");
  const currentLevel = profile?.level || parseInt(localStorage.getItem("level") || "1");
  const xpForLevel = currentLevel * 100;
  const xpProgress = currentXP % xpForLevel;
  const xpToNext = xpForLevel - xpProgress;
  const progressPercent = (xpProgress / xpForLevel) * 100;

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.username || "Learner"}! 👋</h1>
        <p className="text-muted-foreground">Ready to continue your certification prep?</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Questions Attempted" value={totalAttempted} icon={Target} color="text-blue-600" />
        <StatCard title="Overall Accuracy" value={`${accuracy}%`} icon={Trophy} color="text-green-600" trend={accuracy >= 70 ? { value: accuracy, isPositive: true } : undefined} />
        <StatCard title="Current Streak" value={`${currentStreak} days`} icon={Flame} color="text-orange-600" />
        <StatCard title="Total XP" value={currentXP} icon={Zap} color="text-yellow-600" />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-xl">Level {currentLevel}</h2>
                <p className="text-sm text-muted-foreground">{xpToNext} XP to next level</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4">{currentXP} XP</Badge>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{xpProgress} XP</span>
            <span>{xpForLevel} XP</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { href: "/quiz?mode=practice", icon: Target, title: "Practice Mode", desc: "One question at a time", color: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-600" },
          { href: "/mock-exam", icon: BookOpen, title: "Mock Exam", desc: "Timed full tests", color: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-600" },
          { href: "/quiz?mode=weak", icon: Brain, title: "Weak Areas", desc: "Focus on difficult topics", color: "bg-orange-100 dark:bg-orange-900/30", textColor: "text-orange-600" },
          { href: "/quiz?mode=random", icon: RefreshCw, title: "Random Quiz", desc: "Mix of all topics", color: "bg-purple-100 dark:bg-purple-900/30", textColor: "text-purple-600" },
        ].map((item, index) => (
          <Link key={index} href={item.href}>
            <Card className="hover:shadow-md transition-all hover:border-primary cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className={`h-12 w-12 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className={`h-6 w-6 ${item.textColor}`} />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Topic Progress</h2>
            <Link href="/topics"><Button variant="ghost" size="sm">View All</Button></Link>
          </div>
          {totalAttempted > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockTopics.slice(0, 6).map((topic, index) => {
                const attemptedForTopic = index === 0 ? Math.floor(totalAttempted * 0.3) : index === 1 ? Math.floor(totalAttempted * 0.25) : index === 2 ? Math.floor(totalAttempted * 0.2) : index === 3 ? Math.floor(totalAttempted * 0.15) : Math.floor(totalAttempted * 0.1);
                return (
                  <TopicProgressCard
                    key={topic.id}
                    topic={topic}
                    progress={{ id: 0, user_id: "", topic_id: topic.id, questions_attempted: attemptedForTopic, correct_answers: 0, accuracy: 0, updated_at: "" }}
                    variant="neutral"
                  />
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No Progress Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Start your first quiz to track your progress!</p>
                <Link href="/quiz?mode=practice"><Button>Start Practice</Button></Link>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Tips</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-sm font-medium">Study Strategy</p>
                  <p className="text-xs text-muted-foreground mt-1">Focus on one topic at a time for better retention</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <p className="text-sm font-medium">Goal Setting</p>
                  <p className="text-xs text-muted-foreground mt-1">Aim for 70%+ accuracy before moving to new topics</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <p className="text-sm font-medium">Keep Your Streak</p>
                  <p className="text-xs text-muted-foreground mt-1">Practice daily to maintain your streak!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Getting Started</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Browse topics in <Link href="/topics" className="text-primary hover:underline">Topics</Link></li>
                <li>2. Start a <Link href="/quiz?mode=practice" className="text-primary hover:underline">Practice Quiz</Link></li>
                <li>3. Track your progress here</li>
                <li>4. Take <Link href="/mock-exam" className="text-primary hover:underline">Mock Exams</Link> when ready</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
