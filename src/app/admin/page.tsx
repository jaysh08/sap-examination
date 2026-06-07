"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Plus, Search, Edit, Trash2, Upload, Download, BookOpen, Users, BarChart3, AlertTriangle, RotateCcw, Lock } from "lucide-react";
import { mockTopics } from "@/data/mockData";

export default function AdminPage() {
  const { profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"questions" | "analytics" | "users">("questions");
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin status from profile or localStorage
    const adminFromProfile = profile?.username?.toLowerCase().includes("admin");
    const adminFromStorage = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminFromProfile || adminFromStorage);
  }, [profile]);

  const handleResetAllUsers = async () => {
    setIsResetting(true);
    try {
      const response = await fetch("/api/admin/reset-all", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        alert("All user progress has been reset successfully!");
      } else {
        alert("Failed to reset progress: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + (error as Error).message);
    } finally {
      setIsResetting(false);
      setShowResetModal(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Admin access required message
  if (!isAdmin) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-md">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Admin Access Required</h2>
            <p className="text-muted-foreground mb-6">
              The admin panel is only accessible to administrators. Please contact your system administrator if you need access.
            </p>
            <div className="p-4 rounded-lg bg-secondary text-left mb-4">
              <p className="text-sm font-medium mb-2">To enable admin mode for testing:</p>
              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Go to Settings page</li>
                <li>Click "Developer Options"</li>
                <li>Enable "Admin Mode"</li>
                <li>Refresh this page</li>
              </ol>
            </div>
            <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <div><p className="text-2xl font-bold">{mockTopics.reduce((sum, t) => sum + t.question_count, 0)}</p><p className="text-sm text-muted-foreground">Total Questions</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><Users className="h-6 w-6 text-green-600" /></div>
          <div><p className="text-2xl font-bold">-</p><p className="text-sm text-muted-foreground">Active Users</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"><BarChart3 className="h-6 w-6 text-yellow-600" /></div>
          <div><p className="text-2xl font-bold">-</p><p className="text-sm text-muted-foreground">Avg Score</p></div>
        </CardContent></Card>
        <Card className="border-red-200 dark:border-red-900">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <RotateCcw className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">Reset</p>
              <Button variant="destructive" size="sm" onClick={() => setShowResetModal(true)} className="mt-1">
                Reset All Users
              </Button>
            </div>
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
              {mockTopics.slice(0, 4).flatMap(topic => 
                Array.from({ length: Math.min(topic.question_count, 1) }, (_, i) => ({
                  text: `Sample question for ${topic.name}`,
                  topic: topic.name,
                  difficulty: ["easy", "medium", "hard"][i % 3]
                }))
              ).map((q, i) => (
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
          <CardHeader><CardTitle>Question Analytics</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Analytics data will appear here once users start taking quizzes.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "users" && (
        <Card>
          <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              User list will appear here once Supabase is configured.
            </p>
          </CardContent>
        </Card>
      )}

      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" /> Confirm Reset All Users
              </CardTitle>
              <CardDescription>This action will reset ALL users&apos; progress across the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">This will reset:</p>
                <ul className="text-xs text-red-700 dark:text-red-300 space-y-1">
                  <li>• All user XP and levels</li>
                  <li>• All quiz attempts and history</li>
                  <li>• All bookmarks and notes</li>
                  <li>• All progress tracking data</li>
                  <li>• All earned achievements</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Questions and topics will NOT be affected.</strong>
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowResetModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1" 
                  onClick={handleResetAllUsers}
                  disabled={isResetting}
                >
                  {isResetting ? "Resetting..." : "Reset All Users"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
