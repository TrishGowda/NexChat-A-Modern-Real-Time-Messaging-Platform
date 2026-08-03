import { createContext, useEffect, useState, useCallback } from "react";
import socket from "../socket/socket";
import { useAuth } from "../hooks/useAuth";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const currentUsername = user?.username;

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({}); // { [username]: true }

  useEffect(() => {
    if (!currentUsername) {
      setOnlineUsers([]);
      setTypingUsers({});
      return;
    }

    const handleOnlineUsers = (list) => setOnlineUsers(list);

    const handleTyping = ({ from }) => {
      setTypingUsers((prev) => ({ ...prev, [from]: true }));
    };

    const handleStopTyping = ({ from }) => {
      setTypingUsers((prev) => {
        if (!prev[from]) return prev;
        const next = { ...prev };
        delete next[from];
        return next;
      });
    };

    socket.on("online-users", handleOnlineUsers);
    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.off("online-users", handleOnlineUsers);
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
    };
  }, [currentUsername]);

  const emitTyping = useCallback((to) => {
    if (!to || !socket.connected) return;
    socket.emit("typing", { to });
  }, []);

  const emitStopTyping = useCallback((to) => {
    if (!to || !socket.connected) return;
    socket.emit("stop-typing", { to });
  }, []);

  const joinChat = useCallback((partner) => {
    if (!partner || !socket.connected) return;
    socket.emit("join-chat", { partner });
  }, []);

  const leaveChat = useCallback((partner) => {
    if (!partner || !socket.connected) return;
    socket.emit("leave-chat", { partner });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        typingUsers,
        emitTyping,
        emitStopTyping,
        joinChat,
        leaveChat,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}