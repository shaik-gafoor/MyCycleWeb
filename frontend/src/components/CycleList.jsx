import React from "react";
import CycleCard from "./CycleCard";
import "./CycleList.css";

function CycleList({ cycles }) {
  return (
    <div className="cycle-list">
      {cycles.map((cycle) => (
        <CycleCard key={cycle.id} cycle={cycle} />
      ))}
    </div>
  );
}

export default CycleList;
