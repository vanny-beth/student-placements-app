// Save tokens
export const setTokens = (access, refresh) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
};

// Get tokens
export const getAccessToken = () => localStorage.getItem("access");
export const getRefreshToken = () => localStorage.getItem("refresh");

// Clear tokens (on logout)
export const clearTokens = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};

// Save user info
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Helper for checking login state
export const isLoggedIn = () => !!getAccessToken();
