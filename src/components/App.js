import React, { useState, useEffect } from "react";
import PlantForm from "./PlantForm";
import Search from "./Search";
import PlantList from "./PlantList";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(addedPlant => setPlants([...plants, addedPlant]));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleSoldOut = (id) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updatedPlants);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🌿 Plantsy Admin</h1>
      <PlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} onToggleSoldOut={toggleSoldOut} />
    </div>
  );
}

export default App;
