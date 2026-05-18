import { useEffect, useState } from "react";
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

  const { favoriteIds, toggleFavorite } = useFavorites();

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
      <div className="pokedex-device">
        <div className="header">
          <h1>Jennifer's Pokédex</h1>
        </div>

        <div className="pokedex-shell">
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
                    />
                  ))}
                </div>
              </div>
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
        </div>
      </div>
    </AppLayout>
  );
}

export default HomePage;