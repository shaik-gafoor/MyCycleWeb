// In-memory data storage
// In a production app, this would be replaced with a database

let cycles = [
  {
    id: "1",
    imageUrl: "https://example.com/cycle1.jpg",
    title: "Mountain Bike Pro",
    description: "High-performance mountain bike for all terrains",
    cost: 1500,
  },
  {
    id: "2",
    imageUrl: "https://example.com/cycle2.jpg",
    title: "City Cruiser",
    description: "Comfortable bike for city commuting",
    cost: 800,
  },
];

module.exports = {
  cycles,
  getAllCycles: () => cycles,
  getCycleById: (id) => cycles.find((cycle) => cycle.id === id),
  addCycle: (cycle) => {
    cycles.push(cycle);
    return cycle;
  },
  updateCycle: (id, updatedData) => {
    const index = cycles.findIndex((cycle) => cycle.id === id);
    if (index !== -1) {
      cycles[index] = { ...cycles[index], ...updatedData };
      return cycles[index];
    }
    return null;
  },
  deleteCycle: (id) => {
    const index = cycles.findIndex((cycle) => cycle.id === id);
    if (index !== -1) {
      cycles.splice(index, 1);
      return true;
    }
    return false;
  },
};
