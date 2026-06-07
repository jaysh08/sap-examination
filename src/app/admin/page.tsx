"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Plus, Search, Edit, Trash2, Upload, Download, BookOpen, Users, BarChart3 } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"questions" | "analytics" | "users">("questions");

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage questions, users, and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" /> Import CSV</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          <Button className="gap-2"><Plus className="h-4 w-4" /> Add Question</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"><BookOpen className="h-6 w-6 text-blue-600" /></div>
          <div><p className="text-2xl font-bold">320</p><p className="text-sm text-muted-foreground">Total Questions</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><Users className="h-6 w-6 text-green-600" /></div>
          <div><p className="text-2xl font-bold">1,247</p><p className="text-sm text-muted-foreground">Active Users</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"><BarChart3 className="h-6 w-6 text-yellow-600" /></div>
          <div><p className="text-2xl font-bold">68%</p><p className="text-sm text-muted-foreground">Avg Score</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"><Users className="h-6 w-6 text-purple-600" /></div>
          <div><p className="text-2xl font-bold">45</p><p className="text-sm text-muted-foreground">Flagged Q&apos;s</p></div>
        </CardContent></Card>
      </div>

      <div className="flex gap-2 mb-6">
        <Button variant={activeTab === "questions" ? "secondary" : "ghost"} onClick={() => setActiveTab("questions")}>Questions</Button>
        <Button variant={activeTab === "analytics" ? "secondary" : "ghost"} onClick={() => setActiveTab("analytics")}>Analytics</Button>
        <Button variant={activeTab === "users" ? "secondary" : "ghost"} onClick={() => setActiveTab("users")}>Users</Button>
      </div>

      {activeTab === "questions" && (
        <>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search questions..." className="pl-10" /></div>
          </div>
          <Card>
            <CardContent className="p-0 divide-y">
              {[
                { text: "What is the primary purpose of Foundation Objects in SAP SuccessFactors Employee Central?", topic: "EC Basics", difficulty: "medium" },
                { text: "Which of the following are valid question types in certification exams?", topic: "EC Basics", difficulty: "easy" },
              ].map((q, i) => (
                <div key={i} className="p-4 flex items-start gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{q.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{q.topic}</Badge>
                      <Badge variant={q.difficulty === "easy" ? "success" : q.difficulty === "medium" ? "warning" : "destructive"}>{q.difficulty}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "analytics" && (
        <Card>
          <CardHeader><CardTitle>Most Missed Questions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { text: "What is the purpose of MDF in EC?", attempts: 234, correctRate: 23 },
                { text: "How to configure effective dating?", attempts: 189, correctRate: 31 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div><p className="text-sm font-medium">{item.text}</p><p className="text-xs text-muted-foreground">{item.attempts} attempts</p></div>
                  <Badge variant="destructive">{item.correctRate}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "users" && (
        <Card>
          <CardContent className="p-0 divide-y">
            {[
              { name: "John Doe", email: "john@example.com", level: 5, xp: 450 },
              { name: "Jane Smith", email: "jane@example.com", level: 3, xp: 280 },
            ].map((user, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{user.name.charAt(0)}</div>
                  <div><p className="font-medium">{user.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">Level {user.level}</Badge>
                  <span className="text-sm text-muted-foreground">{user.xp} XP</span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
