import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import PokemonStatsPanel from "../components/PokemonStatsPanel";
import EvolutionChain from "../components/EvolutionChain";
import PokemonLore from "../components/PokemonLore";
import AppLayout from "../components/AppLayout";

import useFavorites from "../hooks/useFavorites";
import usePokemon from "../hooks/usePokemon";
import getBattleStyle from "../utils/getBattleStyle";
import getTrainingProfile from "../utils/getTrainingProfile";
import getThreatAnalysis from "../utils/getThreatAnalysis";

function HomePage() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { darkMode, setDarkMode } =
  useTheme();
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

  const { favoriteIds, toggleFavorite, isLoadingFavorite, } = useFavorites();

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  const threatAnalysis =
  getThreatAnalysis(selectedPokemon);

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={
        <>
          <EvolutionChain
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={handleSelectPokemon}
            pokemons={pokemons}
          />

          <PokemonLore selectedPokemon={selectedPokemon} />
        </>
      }
    >
<div className="pokedex-device open-pokedex-device">


{/* POKEDEX LEFT PANEL */}
  <div className="open-pokedex-shell">
    
    <section className="pokedex-left-panel">
      <div className="featured-scan-display">
  {selectedPokemon ? (
    <>
      <p className="scan-label">
        Target Locked
      </p>

      <img
        className="featured-scan-image"
        src={selectedPokemon.sprites.front_default}
        alt={selectedPokemon.name}
      />

      <h2>
        #{selectedPokemon.id} {selectedPokemon.name}
      </h2>

      <div className="featured-type-row">
        {selectedPokemon.types.map((type) => (
          <span
  className={`type-badge type-${type.type.name}`}
  key={type.type.name}
>
  {type.type.name}
</span>
        ))}
      </div>
    </>
  ) : (
    <>
      <p className="scan-label">
        Awaiting Target
      </p>

      <div className="empty-scan-circle">
        ?
      </div>

      <h2>
        Select a Pokémon
      </h2>
    </>
  )}
</div>
      
      <div className="pokedex-screen">
        <div className="dashboard-layout">
          <PokemonStatsPanel
            selectedPokemon={selectedPokemon}
            isScanning={isScanning}
          />

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
                  isLoadingFavorite={isLoadingFavorite}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* POKEDEX RIGHT PANEL */}

{/* SCAN STATUS */}
    <section className="pokedex-right-panel">
<div className="right-panel-screen">
  <h2>Pokédex Analyzer</h2>

  <div className="scan-status">
  <span className="scan-dot"></span>
  <p>
    {selectedPokemon
      ? `Scanning ${selectedPokemon.name}`
      : "Awaiting Pokémon scan"}
  </p>
</div>

<p className="analyzer-section-label">
  Core Scan
</p>

{/* SELECTED POKEMON */}
  <div className="mini-data-card">
    <span>Selected</span>
    <strong>
      {selectedPokemon ? selectedPokemon.name : "None"}
    </strong>
  </div>

{/* BATTLE STYLE */}
    <div className="mini-data-card">
  <span>Battle Style</span>
  <strong>
    {getBattleStyle(selectedPokemon)}
  </strong>
</div>

{/* TRAINING PROFILE */}
<div className="mini-data-card">
  <span>Training Profile</span>

  <strong>
    {getTrainingProfile(selectedPokemon)}
  </strong>
</div>

{/* PRIMARY TYPE */}
  <div className="mini-data-card">
    <span>Primary Type</span>
    <strong>
      {selectedPokemon
        ? selectedPokemon.types[0].type.name
        : "Waiting"}
    </strong>
  </div>


<p className="analyzer-section-label">
  Threat Scanner
</p>

{/* THREAT ANALYZERS */}
  <div className="mini-data-card">
  <span>Weak Against</span>

  <strong>
    {threatAnalysis.weakAgainst}
  </strong>
</div>

<div className="mini-data-card">
  <span>Resistant To</span>

  <strong>
    {threatAnalysis.resistantTo}
  </strong>
</div>

{/* BASE XP */}
  <div className="mini-data-card">
    <span>Base XP</span>
    <strong>
      {selectedPokemon
        ? selectedPokemon.base_experience
        : "0"}
    </strong>
  </div>

<p className="analyzer-section-label">
  System Data
</p>
{/* FAVORITES SAVED */}
  <div className="mini-data-card">
    <span>Favorites Saved</span>
    <strong>{favoriteIds.length}</strong>
  </div>


</div>


    </section>
  </div>

<div className="pokedex-controls hardware-controls">
  <div className="control-lights">
    <span className="control-light cyan"></span>
    <span className="control-light pink"></span>
    <span className="control-light violet"></span>
  </div>

  <div className="control-search-panel">
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  </div>

  <div className="control-pagination-panel">
    <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pokemons={filteredPokemon}
      itemsPerPage={itemsPerPage}
    />
  </div>
</div>
</div>
    </AppLayout>
  );
}

export default HomePage;