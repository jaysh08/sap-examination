"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Trophy, Zap, Star, Lock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const achievements = [
  { name: "First Steps", description: "Complete your first quiz", icon: Star, earned: true, xp: 50 },
  { name: "Week Warrior", description: "Maintain a 7-day streak", icon: Trophy, earned: true, xp: 100 },
  { name: "Topic Master", description: "Score 100% on any topic", icon: Star, earned: false, xp: 150 },
  { name: "Speed Demon", description: "Complete 10 questions in under 2 minutes", icon: Zap, earned: false, xp: 75 },
];

export default function AchievementsPage() {
  const earned = achievements.filter(a => a.earned).length;
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Achievements</h1>
        <p className="text-muted-foreground">Track your progress and unlock rewards</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="font-bold text-xl">{earned} of {achievements.length} Achieved</h2>
                <p className="text-sm text-muted-foreground">Keep going to unlock more rewards!</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4">200 XP Earned</Badge>
          </div>
          <Progress value={(earned / achievements.length) * 100} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <Card key={index} className={cn(achievement.earned ? "border-yellow-200 dark:border-yellow-800" : "opacity-60")}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("h-16 w-16 rounded-full flex items-center justify-center", achievement.earned ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-secondary")}>
                {achievement.earned ? <achievement.icon className="h-8 w-8 text-yellow-600" /> : <Lock className="h-8 w-8 text-muted-foreground" />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-1">+{achievement.xp} XP</p>
              </div>
              {achievement.earned && <CheckCircle className="h-6 w-6 text-green-500" />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
