import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Header = ({ activeTab, cycleCount }) => {
  const { logout } = useAuth();

  const getTitle = () => {
    switch (activeTab) {
      case "view":
        return "View Existing Cycles";
      case "manage":
        return "Manage Cycles";
      case "create":
        return "Create New Cycle";
      default:
        return "Dashboard";
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{getTitle()}</h2>
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Total Cycles: {cycleCount}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
