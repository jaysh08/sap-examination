"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { mockTopics, mockQuestions } from "@/data/mockData";
import { BookOpen, ArrowLeft, Target, Trophy, Clock, CheckCircle } from "lucide-react";
import { calculateAccuracy } from "@/lib/utils";

export default function TopicDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const topic = mockTopics.find(t => t.slug === slug);
  const topicQuestions = mockQuestions.filter(q => q.topic_id === topic?.id);
  
  // Mock progress data
  const attemptedCount = Math.floor(topicQuestions.length * 0.6);
  const correctCount = Math.floor(attemptedCount * 0.72);
  const accuracy = attemptedCount > 0 ? calculateAccuracy(correctCount, attemptedCount) : 0;

  if (!topic) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
            <p className="text-muted-foreground mb-6">The topic you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/topics">
              <Button className="gap-2"><ArrowLeft className="h-4 w-4" />Back to Topics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-6">
        <Link href="/topics" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />Back to Topics
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{topic.name}</h1>
            <p className="text-muted-foreground">{topic.description}</p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-1">
            {topicQuestions.length} Questions
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{attemptedCount}</p>
              <p className="text-sm text-muted-foreground">Questions Attempted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{accuracy}%</p>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Target className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{topicQuestions.length - attemptedCount}</p>
              <p className="text-sm text-muted-foreground">Questions Remaining</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{accuracy}%</span>
            </div>
            <Progress value={accuracy} className="h-3" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{correctCount} correct</span>
              <span>{attemptedCount - correctCount} incorrect</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link href={`/quiz?mode=practice&topic=${topic.id}`} className="flex-1">
          <Button className="w-full gap-2" size="lg">
            <BookOpen className="h-5 w-5" />Start Practice
          </Button>
        </Link>
        <Link href={`/quiz?mode=timed&topic=${topic.id}`} className="flex-1">
          <Button variant="outline" className="w-full gap-2" size="lg">
            <Clock className="h-5 w-5" />Timed Quiz
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sample Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topicQuestions.slice(0, 5).map((question, index) => (
            <div key={question.id} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-2">{question.question_text}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyClass(question.difficulty)}>{question.difficulty}</Badge>
                    <span className="text-xs text-muted-foreground">{question.question_type}</span>
                  </div>
                </div>
                {attemptedCount > index && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
          ))}
          {topicQuestions.length > 5 && (
            <p className="text-center text-muted-foreground text-sm">
              And {topicQuestions.length - 5} more questions...
            </p>
          )}
        </CardContent>
      </Card>
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