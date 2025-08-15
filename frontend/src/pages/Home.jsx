import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import CycleCard from "../components/CycleCard";
import Footer from "../components/Footer";
import { useCycles } from "../hooks/useCycles";
import homecycle from "../assets/homecycle.webp";

function Home() {
  const navigate = useNavigate();
  const { cycles, loading, error } = useCycles();

  const handleViewCycles = () => {
    navigate("/cycles");
  };

  return (
    <div className="home">
      <section className="hero-cycle">
        <img src={homecycle} alt="Home Cycle" className="hero-cycle-img" />
        <div className="hero-content">
          <h1 className="hero-title">CYCLESPORT</h1>
          <p className="hero-description">
            Bringing your cycling dreams to your doorstep — fast, fresh, and
            fun! Discover a world of amazing cycles at your fingertips. Your
            ride, our mission.
          </p>
          <button className="hero-button" onClick={handleViewCycles}>
            View Cycles
          </button>
        </div>
      </section>

      <div className="cycle-list">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading cycles...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>Failed to load cycles: {error}</p>
          </div>
        ) : cycles.length > 0 ? (
          cycles
            .slice(0, 8)
            .map((cycle) => <CycleCard key={cycle.id} cycle={cycle} />)
        ) : (
          <div className="empty-state">
            <p>No cycles available at the moment.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
