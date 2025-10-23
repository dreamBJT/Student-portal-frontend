import { io } from "socket.io-client";
import { env } from "@/config/env";

export const socket = io(env.socketUrl, {
  autoConnect: false,
});

export function connectSocket() {
  if (!socket.connected) {
    socket.connect();
  }
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}
