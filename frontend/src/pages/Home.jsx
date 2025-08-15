import React, { useState } from "react";
import "./Home.css";
import CycleCard from "../components/CycleCard";
import cyclesData from "../cyclesData";
import homecycle from "../assets/homecycle.webp";

function Home() {
  const [cycles, setCycles] = useState(cyclesData);
  const [form, setForm] = useState({ name: "", price: "", image: null });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return;
    let imageUrl;
    if (typeof form.image === "string") {
      imageUrl = form.image;
    } else {
      imageUrl = URL.createObjectURL(form.image);
    }
    setCycles([
      ...cycles,
      {
        id: cycles.length + 1,
        name: form.name,
        price: form.price,
        image: imageUrl,
      },
    ]);
    setForm({ name: "", price: "", image: null });
    setPreview(null);
  };

  return (
    <div className="home">
      <section className="hero-cycle">
        <img src={homecycle} alt="Home Cycle" className="hero-cycle-img" />
        <div className="hero-content">
          <h1 className="hero-title">CYCLESPOT</h1>
          <p className="hero-description">
            Bringing your cycling dreams to your doorstep — fast, fresh, and
            fun! Discover a world of amazing cycles at your fingertips. Your
            ride, our mission.
          </p>
          <button className="hero-button">View Cycles</button>
        </div>
      </section>

      <div className="cycle-list">
        {cycles.map((cycle) => (
          <CycleCard
            key={cycle.id}
            cycle={cycle}
            onRemove={(id) => setCycles(cycles.filter((c) => c.id !== id))}
          />
        ))}
      </div>

      <form className="add-cycle-form" onSubmit={handleSubmit}>
        <h2>Add Cycle</h2>
        <input
          type="text"
          name="name"
          placeholder="Cycle Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100px", margin: "0 auto" }}
          />
        )}
        <button type="submit">Add Cycle</button>
      </form>

      <footer className="footer">
        <div className="footer-content">
          <h3>Gafoor Cycle Shop</h3>
          <p>Penamaluru, Vijayawada</p>
          <p>Phone: 9876543210</p>
          <p>Email: gafoor@cycles.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
