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
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <Header activeTab={activeTab} cycleCount={cycles.length} />

        <main className="flex-1 overflow-auto">{renderContent()}</main>
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
