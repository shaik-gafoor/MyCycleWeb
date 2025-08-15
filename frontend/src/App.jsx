import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";
import CycleList from "./components/CycleList";
import CycleDetail from "./pages/CycleDetail";
import cycles from "./cyclesData";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cycles" element={<CycleList cycles={cycles} />} />
            <Route path="/cycle/:id" element={<CycleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
