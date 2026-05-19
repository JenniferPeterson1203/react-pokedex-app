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


  <div className="open-pokedex-shell">
    <section className="pokedex-left-panel">
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

    <section className="pokedex-right-panel">
<div className="right-panel-screen">
  <h2>Pokédex Analyzer</h2>

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

{/* PRIMARY TYPE */}
  <div className="mini-data-card">
    <span>Primary Type</span>
    <strong>
      {selectedPokemon
        ? selectedPokemon.types[0].type.name
        : "Waiting"}
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

{/* FAVORITES SAVED */}
  <div className="mini-data-card">
    <span>Favorites Saved</span>
    <strong>{favoriteIds.length}</strong>
  </div>


</div>


    </section>
  </div>

  <div className="pokedex-controls">
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />

    <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pokemons={filteredPokemon}
      itemsPerPage={itemsPerPage}
    />
  </div>
</div>
    </AppLayout>
  );
}

export default HomePage;