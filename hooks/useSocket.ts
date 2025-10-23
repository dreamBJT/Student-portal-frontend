"use client";

import { useState, useEffect } from "react";

export function useSocket() {
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

  return {
    connected,
    emit,
    on,
  };
}
