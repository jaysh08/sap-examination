"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import type { Profile } from "@/types";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check - in real app, use Supabase
    const storedProfile = localStorage.getItem("sap_profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Demo implementation - in real app, use Supabase
    const mockProfile: Profile = {
      id: "demo-user",
      username: email.split("@")[0],
      avatar_url: null,
      xp: 150,
      level: 2,
      streak_days: 3,
      last_practice_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    setProfile(mockProfile);
    localStorage.setItem("sap_profile", JSON.stringify(mockProfile));
  };

  const signUp = async (email: string, password: string, username: string) => {
    const mockProfile: Profile = {
      id: "new-user",
      username,
      avatar_url: null,
      xp: 0,
      level: 1,
      streak_days: 0,
      last_practice_date: null,
      created_at: new Date().toISOString(),
    };
    setProfile(mockProfile);
    localStorage.setItem("sap_profile", JSON.stringify(mockProfile));
  };

  const signOut = async () => {
    setProfile(null);
    localStorage.removeItem("sap_profile");
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
}