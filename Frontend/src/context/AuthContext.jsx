import { createContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import socket from "../socket/socket";
import userImages from "../utils/userImages";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");

        setUser({
          username: res.data.username,
          image: userImages[res.data.username.toLowerCase()],
        });

        if (!socket.connected) {
          socket.connect();
        }
      } catch (err) {
        console.log("Session expired or invalid:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      setUser({
        username: res.data.username,
        image: userImages[res.data.username.toLowerCase()],
      });

      if (!socket.connected) {
        socket.connect();
      }

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.error || "Login failed. Please try again.";

      return {
        success: false,
        error: message,
      };
    }
  }, []);

  const signup = useCallback(async (username, password) => {
    try {
      const res = await api.post("/auth/register", {
        username,
        password,
      });

      return {
        success: true,
        message: res.data.message,
      };
    } catch (err) {
      const message =
        err.response?.data?.error || "Signup failed. Please try again.";

      return {
        success: false,
        error: message,
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    if (socket.connected) {
      socket.disconnect();
    }

    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}