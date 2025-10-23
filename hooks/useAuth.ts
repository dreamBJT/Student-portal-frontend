"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log("Login attempt:", email);
  };

  const logout = async () => {
    setUser(null);
  };

  const register = async (email: string, password: string, name: string) => {
    console.log("Register attempt:", email);
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
  };
}
