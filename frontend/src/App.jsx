import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";
import CycleList from "./components/CycleList";
import CycleDetail from "./pages/CycleDetail";
import cycles from "./cyclesData";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [registeredUser, setRegisteredUser] = useState(() => {
    const user = localStorage.getItem("registeredUser");
    return user ? JSON.parse(user) : null;
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
  }, [isAuthenticated, registeredUser]);

  const handleSignUp = (user) => {
    setRegisteredUser(user);
  };

  const handleLogin = (loginUser) => {
    if (
      registeredUser &&
      loginUser.email === registeredUser.email &&
      loginUser.password === registeredUser.password
    ) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowUserMenu(false);
    navigate("/login");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <div className="app-container">
      {isAuthenticated && (
        <Header
          user={registeredUser}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
          onLogout={handleLogout}
        />
      )}
      <div className="main-content">
        <Routes>
          <Route
            path="/login"
            element={
              registeredUser ? (
                <Login onLogin={handleLogin} registeredUser={registeredUser} />
              ) : (
                <SignUp onSignUp={handleSignUp} />
              )
            }
          />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cycles"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CycleList cycles={cycles} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cycle/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CycleDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
