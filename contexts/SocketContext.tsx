"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface SocketContextType {
  connected: boolean;
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(true);
    return () => {
      setConnected(false);
    };
  }, []);

  const emit = (event: string, data: any) => {
    console.log("Socket emit:", event, data);
  };

  const on = (event: string, callback: (data: any) => void) => {
    console.log("Socket listener:", event);
  };

  return (
    <SocketContext.Provider value={{ connected, emit, on }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
}
