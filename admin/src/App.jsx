import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useCycles } from "./hooks/useCycles";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ViewCycles from "./components/ViewCycles";
import CreateCycle from "./components/CreateCycle";
import ManageCycles from "./components/ManageCycles";
import LoginPage from "./components/LoginPage";
import "./App.css";

// Dashboard Component (main app content)
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cycles, loading, createCycle, updateCycle, deleteCycle } =
    useCycles();

  const renderContent = () => {
    switch (activeTab) {
      case "view":
        return <ViewCycles cycles={cycles} loading={loading} />;
      case "create":
        return <CreateCycle onSubmit={createCycle} loading={loading} />;
      case "manage":
        return (
          <ManageCycles
            cycles={cycles}
            loading={loading}
            onUpdate={updateCycle}
            onDelete={deleteCycle}
          />
        );
      default:
        return <ViewCycles cycles={cycles} loading={loading} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 flex-col md:flex-row">
      {/* Mobile header with sidebar toggle */}
      <div className="md:hidden flex items-center justify-between bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <button
          className="text-gray-700 focus:outline-none"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label="Open sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="font-bold text-lg text-gray-800">MyCycle Admin</span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 md:static md:translate-x-0 md:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ maxHeight: "100vh" }}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelect={() => setSidebarOpen(false)}
        />
      </div>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden backdrop-blur-sm bg-black/10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        <Header activeTab={activeTab} cycleCount={cycles.length} />
        <main className="flex-1 overflow-auto p-2 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// App Content Component (handles authentication state)
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage />;
};

// Main App Component (provides authentication context)
function App() {
  return (
    <AuthProvider>
      <AppContent />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10B981",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
