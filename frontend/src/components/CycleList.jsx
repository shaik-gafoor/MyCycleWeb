import React from "react";
import { useCycles } from "../hooks/useCycles";
import CycleCard from "./CycleCard";
import "./CycleList.css";

function CycleList() {
  const { cycles, loading, error } = useCycles();

  if (loading) {
    return (
      <div className="cycle-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading cycles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cycle-list-container">
        <div className="error-message">
          <h3>Failed to load cycles</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cycles.length === 0) {
    return (
      <div className="cycle-list-container">
        <div className="empty-state">
          <h3>No cycles available</h3>
          <p>Check back later for new cycles!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cycle-list">
      {cycles.map((cycle) => (
        <CycleCard key={cycle.id} cycle={cycle} />
      ))}
    </div>
  );
}

export default CycleList;
