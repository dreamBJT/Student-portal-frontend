"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from '../services/auth.service';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore authentication state from localStorage on app start
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend and get user info
      authService.validateToken(token)
        .then((response) => {
          setUser({
            id: response.user.id,
            email: response.user.studentId || '',
            name: response.user.name,
            role: response.user.role
          });
        })
        .catch((error) => {
          console.error('Token validation failed:', error);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser({
        id: response.user.id,
        email: response.user.studentId || email, // Use studentId if available, fallback to email
        name: response.user.name,
        role: response.user.role
      });
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await authService.register(email, password, name);
      setUser({
        id: response.user.id,
        email: response.user.studentId || email, // Use studentId if available, fallback to email
        name: response.user.name,
        role: response.user.role
      });
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
