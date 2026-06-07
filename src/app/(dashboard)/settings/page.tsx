"use client";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { User, Moon, Sun, Bell, Shield, Trash2, LogOut } from "lucide-react";

export default function SettingsPage() {
  const { profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container px-4 py-8 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Profile</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-lg">{profile?.username || "User"}</p>
              <p className="text-sm text-muted-foreground">Level {profile?.level || 1}</p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input defaultValue={profile?.username || ""} placeholder="Enter username" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">{theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />} Appearance</CardTitle>
          <CardDescription>Customize how the app looks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2">
              {theme === "dark" ? <><Sun className="h-4 w-4" /> Light</> : <><Moon className="h-4 w-4" /> Dark</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Daily Reminder</p>
            <Badge variant="success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Streak Alerts</p>
            <Badge variant="success">Enabled</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Security</CardTitle>
          <CardDescription>Keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">Change Password</Button>
          <Button variant="outline" className="w-full justify-start">Enable Two-Factor Authentication</Button>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button variant="outline" className="w-full gap-2 text-red-600 hover:text-red-600 hover:border-red-300" onClick={signOut}>
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </div>
    </div>
  );
}
