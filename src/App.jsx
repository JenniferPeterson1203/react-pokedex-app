import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import PokemonStatsPanel from "./components/PokemonStatsPanel";
import EvolutionChain from "./components/EvolutionChain";
import useFavorites from "./hooks/useFavorites";
import usePokemon from "./hooks/usePokemon";

function App() {
  
  // Stores clicked Pokémon details
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // 🌙 Tracks dark mode
  const [darkMode, setDarkMode] = useState(false);
  //  Current page the user is on

 const {
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

    <p className="sidebar-subtext">
      NYC Neon Interface
    </p>

    {/* optional future nav items */}
    <div className="sidebar-links">
      <p>All Pokémon</p>
      <p>Favorites</p>
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
<PokemonStatsPanel selectedPokemon={selectedPokemon} />

<EvolutionChain
  selectedPokemon={selectedPokemon}
/>

  {/* 🎴 Pokémon Grid */}
  <div className="pokedex-screen-frame">

    <div className="pokedex-grid">
      {currentPokemon.map((pokemon) => (
   <PokemonCard
  key={pokemon.id}
  pokemon={pokemon}
  setSelectedPokemon={setSelectedPokemon}
  favoriteIds={favoriteIds}
  toggleFavorite={toggleFavorite}
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
    </div>
  </div>
  );
}

export default App;