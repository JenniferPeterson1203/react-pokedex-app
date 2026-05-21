import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import PokemonStatsPanel from "../components/PokemonStatsPanel";
import EvolutionChain from "../components/EvolutionChain";
import PokemonLore from "../components/PokemonLore";
import AppLayout from "../components/AppLayout";
import PageState from "../components/PageState";

import useFavorites from "../hooks/useFavorites";
import usePokemon from "../hooks/usePokemon";

import getBattleStyle from "../utils/getBattleStyle";
import getTrainingProfile from "../utils/getTrainingProfile";
import getThreatAnalysis from "../utils/getThreatAnalysis";

/*
  🏠 HomePage

  Main Pokédex dashboard.

  Features:
  - Pokémon search
  - Pokémon scanner
  - favorites
  - analyzer panel
  - pagination
  - evolution chain
  - lore panel
*/
function HomePage() {

  /*
    🎯 Currently selected Pokémon
  */
  const [selectedPokemon, setSelectedPokemon] =
    useState(null);

  /*
    🌙 Global theme state
  */
  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  /*
    📡 Scanner animation state
  */
  const [isScanning, setIsScanning] =
    useState(false);

  /*
    🧠 Pokémon data hook

    Handles:
    - API fetching
    - pagination
    - searching
    - loading states
    - error states
  */
  const {
    pokemons,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    filteredPokemon,
    currentPokemon,
    isLoading,
    errorMessage,
  } = usePokemon();

  /*
    ❤️ Favorites hook

    Supports:
    - guest favorites
    - authenticated favorites
    - backend persistence
  */
  const {
    favoriteIds,
    toggleFavorite,
    isLoadingFavorite,
  } = useFavorites();

  /*
    🧭 Navigation hook
  */
  const navigate = useNavigate();

  /*
    🎯 Handle Pokémon selection

    Updates selected Pokémon
    and triggers scan animation.
  */
  const handleSelectPokemon = (
    pokemon
  ) => {

    setSelectedPokemon(pokemon);

    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  /*
    ⚔️ Threat analysis utility

    Calculates:
    - weaknesses
    - resistances
  */
  const threatAnalysis =
    getThreatAnalysis(selectedPokemon);

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}

      /*
        🧬 Right sidebar content
      */
      rightSidebar={
        <>
          <EvolutionChain
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={
              handleSelectPokemon
            }
            pokemons={pokemons}
          />

          <PokemonLore
            selectedPokemon={
              selectedPokemon
            }
          />
        </>
      }
    >

{/* 🌐 Shared page loading + error states

    Handles:
    - loading screens
    - API failures
    - slow internet connections

    This prevents blank white screens
    during slower network requests.
*/}
<PageState
  isLoading={isLoading}
  errorMessage={errorMessage}
  loadingMessage="
    Scanning Pokémon database...
  "
>

<div className="pokedex-device open-pokedex-device">

  <div className="open-pokedex-shell">

{/* 📱 LEFT PANEL */}
<section className="pokedex-left-panel">

{/* 🎯 Featured scan target

    Selected Pokémon becomes:
    - interactive
    - keyboard accessible
    - clickable to detail page
*/}
{selectedPokemon ? (

  <div
    className="
      featured-scan-display
      clickable-scan-display
    "

    role="button"

    tabIndex="0"

    aria-label={`
      Open details for
      ${selectedPokemon.name}
    `}

    /*
      🖱️ Open detail page
    */
    onClick={() =>
      navigate(
        `/pokemon/${selectedPokemon.name}`
      )
    }

    /*
      ⌨️ Keyboard accessibility
    */
    onKeyDown={(e) => {

      if (
        e.key === "Enter" ||
        e.key === " "
      ) {

        navigate(
          `/pokemon/${selectedPokemon.name}`
        );
      }
    }}
  >

    <p className="scan-label">
      Target Locked
    </p>

    <img
      className="featured-scan-image"
      src={
        selectedPokemon.sprites
          .front_default
      }
      alt={selectedPokemon.name}
    />

    <h2>
      #{selectedPokemon.id}
      {" "}
      {selectedPokemon.name}
    </h2>

    <div className="featured-type-row">

      {selectedPokemon.types.map(
        (type) => (

          <span
            key={type.type.name}

            className={`
              type-badge
              type-${type.type.name}
            `}
          >
            {type.type.name}
          </span>
        )
      )}

    </div>

  </div>

) : (

  /*
    📡 Empty scanner state
  */
  <div className="featured-scan-display">

    <p className="scan-label">
      Awaiting Target
    </p>

    <div className="empty-scan-circle">
      ?
    </div>

    <h2>
      Select a Pokémon
    </h2>

  </div>
)}

{/* 🖥️ Main Pokédex screen */}
<div className="pokedex-screen">

  <div className="dashboard-layout">

    <PokemonStatsPanel
      selectedPokemon={
        selectedPokemon
      }
      isScanning={isScanning}
    />

{/* 🔎 Search controls */}
<div className="control-search-panel">

  <SearchBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
  />

</div>

{/* 📦 Pokémon grid */}
<div className="pokedex-screen-frame">

  <div className="pokedex-grid">

    {currentPokemon.map(
      (pokemon) => (

        <PokemonCard
          key={pokemon.id}

          pokemon={pokemon}

          setSelectedPokemon={
            handleSelectPokemon
          }

          favoriteIds={favoriteIds}

          toggleFavorite={
            toggleFavorite
          }

          selectedPokemon={
            selectedPokemon
          }

          isLoadingFavorite={
            isLoadingFavorite
          }
        />
      )
    )}

  </div>

</div>

  </div>

</div>

</section>

{/* 📱 RIGHT ANALYZER PANEL */}
<section className="pokedex-right-panel">

<div className="right-panel-screen">

  <h2>
    Pokédex Analyzer
  </h2>

{/* 📡 Scan status */}
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

{/* 🎯 Selected Pokémon */}
<div className="mini-data-card">

  <span>Selected</span>

  <strong>
    {selectedPokemon
      ? selectedPokemon.name
      : "None"}
  </strong>

</div>

{/* ⚔️ Battle style */}
<div className="mini-data-card">

  <span>Battle Style</span>

  <strong>
    {getBattleStyle(
      selectedPokemon
    )}
  </strong>

</div>

{/* 🧠 Training profile */}
<div className="mini-data-card">

  <span>
    Training Profile
  </span>

  <strong>
    {getTrainingProfile(
      selectedPokemon
    )}
  </strong>

</div>

{/* 🧬 Primary type */}
<div className="mini-data-card">

  <span>Primary Type</span>

  <strong>
    {selectedPokemon
      ? selectedPokemon.types[0]
          .type.name
      : "Waiting"}
  </strong>

</div>

<p className="analyzer-section-label">
  Threat Scanner
</p>

{/* ⚠️ Weaknesses */}
<div className="mini-data-card">

  <span>Weak Against</span>

  <strong>
    {threatAnalysis.weakAgainst}
  </strong>

</div>

{/* 🛡️ Resistances */}
<div className="mini-data-card">

  <span>Resistant To</span>

  <strong>
    {threatAnalysis.resistantTo}
  </strong>

</div>

{/* ⭐ Base XP */}
<div className="mini-data-card">

  <span>Base XP</span>

  <strong>
    {selectedPokemon
      ? selectedPokemon
          .base_experience
      : "0"}
  </strong>

</div>

<p className="analyzer-section-label">
  System Data
</p>

{/* ❤️ Favorites count */}
<div className="mini-data-card">

  <span>
    Favorites Saved
  </span>

  <strong>
    {favoriteIds.length}
  </strong>

</div>

</div>

</section>

  </div>

{/* 🎛️ Hardware controls */}
<div className="pokedex-controls hardware-controls">

  <div className="control-lights">

    <span className="control-light cyan"></span>

    <span className="control-light pink"></span>

    <span className="control-light violet"></span>

  </div>

{/* 📄 Pagination */}
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

</PageState>

    </AppLayout>
  );
}

export default HomePage;