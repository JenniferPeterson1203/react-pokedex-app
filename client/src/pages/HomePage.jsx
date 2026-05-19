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
  <div className="header">
    <h1>Jennifer's Pokédex</h1>
  </div>

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
        <h2>Analyzer Panel</h2>

        <div className="mini-data-card">
          <span>Favorites</span>
          <strong>{favoriteIds.length}</strong>
        </div>

        <div className="mini-data-card">
          <span>Selected</span>
          <strong>
            {selectedPokemon ? selectedPokemon.name : "None"}
          </strong>
        </div>

        <div className="mini-data-card">
          <span>Total Results</span>
          <strong>{filteredPokemon.length}</strong>
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