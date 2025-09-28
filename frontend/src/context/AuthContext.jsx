// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, saveTokens, clearTokens } from "../utils/tokenStorage";
import axiosInstance from "../utils/axiosInstance";

// Create context
const AuthContext = createContext();

// Hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // { email, role, ... }
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper: normalize backend response into { email, role }
  const normalizeUser = (data) => {
    const { email, is_admin, is_partner, is_trainee } = data;
    let role = "trainee"; // default
    if (is_admin) role = "admin";
    else if (is_partner) role = "partner";
    return { email, role, ...data };
  };

  // Load user on mount if token exists
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      axiosInstance
        .get("/users/me/")
        .then((res) => {
          setUser(normalizeUser(res.data));
        })
        .catch(() => {
          clearTokens();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await axiosInstance.post("/auth/login/", { email, password });
    const { access, refresh, user: userData } = res.data;

    // Save tokens + user info
    saveTokens(access, refresh, userData);
    setUser(normalizeUser(userData));

    return userData;
  };

  // Logout function
  const logout = () => {
    clearTokens();
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};