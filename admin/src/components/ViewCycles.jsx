import React from "react";
import { Eye } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const ViewCycles = ({ cycles, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        View Existing Cycles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cycles.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Eye className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500 text-lg">No cycles found.</p>
          </div>
        ) : (
          cycles.map((cycle) => (
            <div
              key={cycle.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={cycle.imageUrl}
                alt={cycle.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {cycle.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {cycle.description}
                </p>
                <div className="text-xl font-bold text-green-600">
                  ₹{cycle.cost}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewCycles;
