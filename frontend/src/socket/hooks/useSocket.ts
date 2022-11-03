import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = () => {
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const conectarSocket = useCallback((token: string) => {
    const socketTemp = io(import.meta.env.VITE_API_URL || "", {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token,
      },
    });

    setSocket(socketTemp);
  }, []);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(!!socket && !!socket.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    conectarSocket,
    desconectarSocket,
    socket,
    online,
  };
};
