import React from "react";
import { Eye, Settings, Plus } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "view", icon: Eye, label: "View Cycles" },
    { id: "manage", icon: Settings, label: "Update/Delete" },
    { id: "create", icon: Plus, label: "Create New" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">MyCycle Admin</h1>
        <p className="text-sm text-gray-600">Dashboard</p>
      </div>

      <nav className="mt-6">
        {navItems.map(({ id, icon: IconComponent, label }) => {
          const Icon = IconComponent;
          return (
            <button
              key={id}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                activeTab === id
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
