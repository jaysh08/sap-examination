"use client";
import { useAuth } from "@/context/AuthContext";
import { StatCard } from "@/components/dashboard/StatCard";
import { TopicProgressCard } from "@/components/dashboard/TopicProgressCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";

import { mockTopics, mockProgress, mockStats } from "@/data/mockData";
import { Target, Trophy, Clock, TrendingUp, Flame, Zap, BookOpen, Brain, RefreshCw } from "lucide-react";
import Link from "next/link";
import { calculateAccuracy, calculateXP } from "@/lib/utils";

function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return <div className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${sizes[size]}`} />;
}

export default function DashboardPage() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const xpProgress = profile ? calculateXP(profile.level) : { current: 0, required: 100 };
  const xpToNext = xpProgress.required - (profile?.xp || 0) % xpProgress.required;
  const progressPercent = profile ? ((profile.xp % xpProgress.required) / xpProgress.required) * 100 : 0;

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.username || "Learner"}! 👋</h1>
        <p className="text-muted-foreground">Ready to continue your certification prep?</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Questions Attempted" value={mockStats.questionsAttempted} icon={Target} color="text-blue-600" />
        <StatCard title="Overall Accuracy" value={`${mockStats.accuracy}%`} icon={TrendingUp} color="text-green-600" trend={{ value: 5, isPositive: true }} />
        <StatCard title="Current Streak" value={`${mockStats.currentStreak} days`} icon={Flame} color="text-orange-600" />
        <StatCard title="Total XP" value={profile?.xp || 0} icon={Zap} color="text-yellow-600" />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-xl">Level {profile?.level || 1}</h2>
                <p className="text-sm text-muted-foreground">{xpToNext} XP to next level</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4">{profile?.xp || 0} XP</Badge>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{xpProgress.current} XP</span>
            <span>{xpProgress.required} XP</span>
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
          <div className="grid gap-4 md:grid-cols-2">
            {mockTopics.slice(0, 6).map((topic, index) => (
              <TopicProgressCard key={topic.id} topic={topic} progress={mockProgress[index]} variant={index < 2 ? "weak" : index < 4 ? "strong" : "neutral"} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Completed 10 questions", time: "2 hours ago", icon: Target },
                  { action: "Achieved 'First Steps' badge", time: "Yesterday", icon: Trophy },
                  { action: "Practiced Position Management", time: "2 days ago", icon: BookOpen },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Brain className="h-4 w-4" /> AI Recommendations</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <p className="text-sm font-medium">Focus on Workflows</p>
                  <p className="text-xs text-muted-foreground mt-1">Your accuracy dropped to 60% in this topic</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <p className="text-sm font-medium">You&apos;re strong in MDF!</p>
                  <p className="text-xs text-muted-foreground mt-1">85% accuracy - keep it up!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}