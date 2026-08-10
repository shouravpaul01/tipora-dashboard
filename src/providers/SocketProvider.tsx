"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "@/lib/socket";

interface SocketContextType {
  socket: ReturnType<typeof getSocket>;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

interface SocketProviderProps {
  children: ReactNode;
  token?: string | null;
}

export function SocketProvider({
  children,
  token,
}: SocketProviderProps) {
  useEffect(() => {
    if (!token) {
      disconnectSocket();
      return;
    }

    connectSocket(token);

    return () => {
      disconnectSocket();
    };
  }, [token]);

  return (
    <SocketContext.Provider
      value={{
        socket: getSocket(),
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);