"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Clock, Target, BookOpen, ChevronRight, Trophy, BarChart3, History } from "lucide-react";

const mockExams = [
  { name: "Quick Practice", description: "10 questions, 15 minutes", question_count: 10, time_limit: 15, difficulty: "easy" },
  { name: "Standard Exam", description: "40 questions, 60 minutes", question_count: 40, time_limit: 60, difficulty: "medium" },
  { name: "Full Simulation", description: "80 questions, 120 minutes", question_count: 80, time_limit: 120, difficulty: "hard" },
];

export default function MockExamPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mock Exams</h1>
        <p className="text-muted-foreground">Simulate real exam conditions with timed tests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Trophy className="h-6 w-6 text-primary" /></div>
          <div><p className="text-2xl font-bold">5</p><p className="text-sm text-muted-foreground">Exams Completed</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><BarChart3 className="h-6 w-6 text-green-600" /></div>
          <div><p className="text-2xl font-bold">72%</p><p className="text-sm text-muted-foreground">Average Score</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"><History className="h-6 w-6 text-yellow-600" /></div>
          <div><p className="text-2xl font-bold">2h 45m</p><p className="text-sm text-muted-foreground">Total Time Spent</p></div>
        </CardContent></Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {mockExams.map((exam, index) => (
          <Card key={index} className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{exam.name}</CardTitle>
                <Badge variant={exam.difficulty === "easy" ? "success" : exam.difficulty === "medium" ? "warning" : "destructive"}>{exam.difficulty}</Badge>
              </div>
              <CardDescription>{exam.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><Target className="h-4 w-4 text-muted-foreground" /><span>{exam.question_count} Questions</span></div>
                <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>{exam.time_limit} Minutes</span></div>
                <div className="flex items-center gap-2 text-sm"><BookOpen className="h-4 w-4 text-muted-foreground" /><span>All Topics</span></div>
                <div className="pt-4">
                  <div className="flex items-center justify-between text-sm mb-2"><span className="text-muted-foreground">Last Score</span><span className="font-medium">68%</span></div>
                  <Progress value={68} className="h-2" />
                </div>
                <Link href={`/quiz?mode=exam&examId=${index + 1}`} className="inline-flex items-center justify-center w-full mt-4 h-10 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Start Exam <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
