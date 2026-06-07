"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Topic, ProgressTracking } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { cn, calculateAccuracy } from "@/lib/utils";
import { BookOpen, TrendingUp, TrendingDown } from "lucide-react";

interface TopicProgressCardProps {
  topic: Topic;
  progress?: ProgressTracking;
  variant?: "weak" | "strong" | "neutral";
}

export function TopicProgressCard({ topic, progress, variant = "neutral" }: TopicProgressCardProps) {
  const accuracy = progress ? calculateAccuracy(progress.correct_answers, progress.questions_attempted) : 0;
  const variantStyles = {
    weak: "border-orange-200 dark:border-orange-800",
    strong: "border-green-200 dark:border-green-800",
    neutral: "border-input",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Link href={`/topics/${topic.slug}`}>
        <Card className={cn("hover:shadow-md transition-all hover:scale-[1.02]", variantStyles[variant])}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {topic.name}
              </CardTitle>
              {variant !== "neutral" && (
                <Badge variant={variant === "weak" ? "warning" : "success"}>
                  {variant === "weak" ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                  {variant === "weak" ? "Needs Work" : "Strong"}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{progress?.questions_attempted || 0} attempted</span>
                <span>{topic.question_count} total</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}