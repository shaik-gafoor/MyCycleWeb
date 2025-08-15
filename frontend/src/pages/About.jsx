import React from "react";
import Footer from "../components/Footer";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about-content">
        <h2>About CycleSport</h2>
        <p>This is a demo cycle shop website built with React and Vite.</p>
        <p>
          We are passionate about providing high-quality cycles for all your
          cycling needs. From mountain bikes to road bikes, we have something
          for everyone.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
