import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import PokemonStatsPanel from "./components/PokemonStatsPanel";
import EvolutionChain from "./components/EvolutionChain";
import useFavorites from "./hooks/useFavorites";
import usePokemon from "./hooks/usePokemon";
import PokemonLore from "./components/PokemonLore";

function App() {
  
// Stores clicked Pokémon details
const [selectedPokemon, setSelectedPokemon] = useState(null);

// 🌙 Tracks dark mode
const [darkMode, setDarkMode] = useState(false);


// ✨ Controls scan animation when a Pokémon is selected
const [isScanning, setIsScanning] = useState(false);

 const {
  pokemons,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  filteredPokemon,
  currentPokemon,
} = usePokemon(); 

// FAVORITES
const { favoriteIds, toggleFavorite } = useFavorites();

/*
  ✨ Handles selecting a Pokémon

  This updates the selected Pokémon and briefly
  turns on the scan animation.
*/
const handleSelectPokemon = (pokemon) => {
  setSelectedPokemon(pokemon);
  setIsScanning(true);

  setTimeout(() => {
    setIsScanning(false);
  }, 600);
};


// RENDER to the PAGE
return (
  <div className={darkMode ? "app dark" : "app"}>

    
  {/* 🔴🟡🟢 Pokédex indicator lights
  These mimic a real handheld device */}

<div className="pokedex-top">
  <div className="lights">
    <span className="light red"></span>
    <span className="light yellow"></span>
    <span className="light green"></span>
  </div>

  <h2 className="device-title">Jennifer's Pokédex</h2>
</div>


<div className="app-layout">
  
  {/* LEFT SIDEBAR */}
  <aside className="sidebar">
    <h2>Jennifer's Pokédex</h2>


    {/* optional future nav items */}
{/* ❤️ Favorite Pokémon section */}
<div className="favorites-sidebar">

  <h3>Favorite Pokémon</h3>

  {favoriteIds.length === 0 ? (

    <p className="empty-favorites">
      No favorites yet
    </p>

  ) : (

    filteredPokemon
      .filter((pokemon) =>
        favoriteIds.includes(pokemon.id)
      )
      .map((pokemon) => (

        <div
          key={pokemon.id}
          className="favorite-sidebar-card"

          /*
            🧠 Clicking sidebar Pokémon
            updates main stats screen
          */
          onClick={() =>
            handleSelectPokemon(pokemon)
          }
        >

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <span>{pokemon.name}</span>

        </div>

      ))

  )}

</div>

{/* 📊 Dashboard quick stats */}
<div className="dashboard-widgets">
  <h3>Dashboard</h3>

  <div className="widget-card">
    <span>Total Pokémon</span>
    <strong>{filteredPokemon.length}</strong>
  </div>

  <div className="widget-card">
    <span>Favorites</span>
    <strong>{favoriteIds.length}</strong>
  </div>

  <div className="widget-card">
    <span>Selected</span>
    <strong>
      {selectedPokemon ? selectedPokemon.name : "None"}
    </strong>
  </div>
</div>

  </aside>

  {/* RIGHT MAIN AREA */}
  <main className="main-content">


{/* 🕹️ Pokédex device shell */}
<div className="pokedex-device">
<div className="header">
  <h1>Jennifer's Pokédex</h1>

{/* DARK & LIGHT MODE BUTTON */}
  <button
    className="theme-btn"
    onClick={() => setDarkMode(!darkMode)}
    >
    {darkMode ? "☀️" : "🌙"}
  </button>
</div>



    {/* Pokédex grid container */}
    <div className="pokedex-shell">
      
  {/* 🖥️ Pokédex SCREEN
  This simulates the display area of a handheld device */}
  <div className="pokedex-screen">
     {/*  Main dashboard layout
   Left = Pokémon grid
   Right = Pokémon details panel */}

<div className="dashboard-layout">

  {/* 🖥️ MAIN POKÉDEX DISPLAY */}
<PokemonStatsPanel
  selectedPokemon={selectedPokemon}
  isScanning={isScanning}
/>



  {/* 🎴 Pokémon Grid */}
  <div className="pokedex-screen-frame">

    <div className="pokedex-grid">
      {currentPokemon.map((pokemon) => (
   <PokemonCard
  key={pokemon.id}
  pokemon={pokemon}
  setSelectedPokemon={handleSelectPokemon}
  favoriteIds={favoriteIds}
  toggleFavorite={toggleFavorite}
  selectedPokemon={selectedPokemon}
/>
      ))}
    </div>

  </div>

</div>



{/* 🎮 Pokédex Controls Panel */}
<div className="pokedex-controls">
  <SearchBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    />
{/* Pagination controls component */}
  <Pagination
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    pokemons={filteredPokemon}
    itemsPerPage={itemsPerPage}
    />

</div>

  </div>
    </div>
    </div>
    </main>
        {/* RIGHT SIDEBAR */}
    <aside className="right-sidebar">

      <EvolutionChain
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={handleSelectPokemon}
        pokemons={pokemons}
      />
      
      <PokemonLore
      selectedPokemon={selectedPokemon}
      />

    </aside>
    </div>
  </div>
  );
}

export default App;