import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Get credentials from environment variables
const VALID_CREDENTIALS = {
  phone: import.meta.env.VITE_ADMIN_PHONE,
  password: import.meta.env.VITE_ADMIN_PASSWORD,
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const loginTime = localStorage.getItem("admin_login_time");

    if (token && loginTime) {
      // Check if token is not expired (24 hours)
      const now = Date.now();
      const loginTimestamp = parseInt(loginTime);
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - loginTimestamp < twentyFourHours) {
        setIsAuthenticated(true);
      } else {
        // Token expired, clear storage
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_login_time");
      }
    }

    setLoading(false);
  }, []);

  const login = async (phone, password) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validate credentials
    if (
      phone === VALID_CREDENTIALS.phone &&
      password === VALID_CREDENTIALS.password
    ) {
      // Generate a simple token (in production, this would come from backend)
      const token = btoa(`${phone}:${Date.now()}`);
      const loginTime = Date.now().toString();

      // Store in localStorage
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_login_time", loginTime);

      setIsAuthenticated(true);
      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid phone number or password",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_login_time");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
