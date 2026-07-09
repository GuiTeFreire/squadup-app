import React, { createContext, useContext, useState } from "react";

import { CURRENT_USER } from "../mocks/users";
import type { ExperienceLevel, MyProfile, Sport } from "../types";

interface ProfileData {
  favoriteSports: Sport[];
  level: ExperienceLevel;
  location: string;
  photoUrl?: string;
}

interface AuthContextValue {
  user: MyProfile | null;
  isAuthenticated: boolean;
  pendingName: string;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  completeProfile: (data: ProfileData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MyProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingName, setPendingName] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const login = (_email: string, _password: string) => {
    setUser(CURRENT_USER);
    setIsAuthenticated(true);
  };

  const register = (name: string, email: string, _password: string) => {
    setPendingName(name);
    setPendingEmail(email);
  };

  const completeProfile = (data: ProfileData) => {
    const newUser: MyProfile = {
      id: `user-${Date.now()}`,
      name: pendingName,
      email: pendingEmail,
      role: "user",
      age: 25,
      location: data.location,
      favoriteSports: data.favoriteSports,
      level: data.level,
      photoUrl: data.photoUrl,
      averageRating: 0,
      matchesPlayed: 0,
      isVerified: false,
    };
    setUser(newUser);
    setPendingName("");
    setPendingEmail("");
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setPendingName("");
    setPendingEmail("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, pendingName, login, register, completeProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
