// src/context/authContext.jsx
import { createContext, useContext, useState } from "react";
import { getUser, getAccessToken, clearTokens, setUser } from "../utils/tokenStorage";

const AuthContext = createContext();

// AuthProvider wraps the app and provides auth state + helper functions
export const AuthProvider = ({ children }) => {
  // User object from localStorage
  const [user, setUserState] = useState(getUser());

  // Logout function: clear tokens and user
  const logout = () => {
    clearTokens();
    setUserState(null);
  };

  // Derived boolean: true if user is logged in
  const isAuthenticated = !!user;

  // Optional: update user object in state and localStorage
  const updateUser = (newUser) => {
    setUser(newUser);        // save to localStorage
    setUserState(newUser);   // update context state
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access in components
export const useAuth = () => useContext(AuthContext);
