import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Mock JWT token generator (for testing/demo only)
function generateMockJWT(userId) {
  // In production, this would come from your auth server
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ sub: userId, iat: Date.now() / 1000 }));
  const signature = btoa("mock-signature");
  return `${header}.${payload}.${signature}`;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("auth-token");
    return savedToken || null;
  });

  const [userId, setUserId] = useState(() => {
    const savedUserId = localStorage.getItem("user-id");
    return savedUserId || null;
  });

  // Mock login: generates a token and userId
  const login = (id = "user-" + Date.now()) => {
    const newToken = generateMockJWT(id);
    setToken(newToken);
    setUserId(id);
    localStorage.setItem("auth-token", newToken);
    localStorage.setItem("user-id", id);
  };

  // Logout: clears token and userId
  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-id");
  };

  const isAuthenticated = !!token && !!userId;

  const value = {
    token,
    userId,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }
  return context;
}
