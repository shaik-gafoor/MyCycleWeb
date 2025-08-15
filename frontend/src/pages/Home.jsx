import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import CycleCard from "../components/CycleCard";
import Footer from "../components/Footer";
import cyclesData from "../cyclesData";
import homecycle from "../assets/homecycle.webp";

function Home() {
  const navigate = useNavigate();

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
        {cyclesData.map((cycle) => (
          <CycleCard key={cycle.id} cycle={cycle} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
