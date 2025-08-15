import React from "react";
import "./CycleCard.css";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

function CycleCard({ cycle }) {
  const navigate = useNavigate();
  return (
    <div className="cycle-card">
      <div className="cycle-card-image-container">
        <img src={cycle.image} alt={cycle.name} className="cycle-card-image" />
      </div>
      <div className="cycle-card-content">
        <h3 className="cycle-card-title">{cycle.name}</h3>
        <p className="cycle-card-price">${cycle.price}</p>
        <div className="cycle-card-actions">
          <button
            className="cycle-card-btn btn-primary"
            onClick={() => navigate(`/cycle/${cycle.id}`)}
          >
            <FaEye /> View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default CycleCard;
