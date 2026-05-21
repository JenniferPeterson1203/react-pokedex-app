import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import AppLayout from "../components/AppLayout";
import PokemonCompareCard from "../components/PokemonCompareCard";
import PokemonSearchSelect from "../components/PokemonSearchSelect";
import PageState from "../components/PageState";
import getBattlePrediction from "../utils/battlePrediction";
import usePokemon from "../hooks/usePokemon";

/*
  ComparePage

  Compare two Pokémon side-by-side.
*/

function ComparePage() {

  const { darkMode, setDarkMode } =
  useTheme();

  const [pokemonOne, setPokemonOne] =
    useState("");

  const [pokemonTwo, setPokemonTwo] =
    useState("");

  const {
  pokemons,
  isLoading,
  errorMessage,
} = usePokemon();

  // selected Pokémon objects
  const selectedPokemonOne =
    pokemons.find(
      (pokemon) =>
        pokemon.name === pokemonOne
    );

  const selectedPokemonTwo =
    pokemons.find(
      (pokemon) =>
        pokemon.name === pokemonTwo
    );

return (
  <AppLayout
    darkMode={darkMode}
    setDarkMode={setDarkMode}
    rightSidebar={null}
  >
    <PageState
  isLoading={isLoading}
  errorMessage={errorMessage}
  loadingMessage="Loading battle comparison system..."
>

  {/* existing compare page content */}


    <div className="compare-page">
      <h1>Compare Pokémon</h1>

      {/* selectors */}
      <div className="compare-selectors">
        <PokemonSearchSelect
          label="Choose Pokémon 1"
          pokemons={pokemons}
          selectedName={pokemonOne}
          setSelectedName={setPokemonOne}
        />

        <PokemonSearchSelect
          label="Choose Pokémon 2"
          pokemons={pokemons}
          selectedName={pokemonTwo}
          setSelectedName={setPokemonTwo}
        />
      </div>

      {/* battle prediction */}
      <div className="battle-readout">
        <h2>Battle Readout</h2>

        <p>
          {getBattlePrediction(
            selectedPokemonOne,
            selectedPokemonTwo
          )}
        </p>
      </div>

      {/* comparison cards */}
      <div className="compare-grid">
        <PokemonCompareCard
          pokemon={selectedPokemonOne}
          opponent={selectedPokemonTwo}
        />

        <div className="vs-badge">VS</div>

        <PokemonCompareCard
          pokemon={selectedPokemonTwo}
          opponent={selectedPokemonOne}
        />
      </div>
    </div>
    </PageState>
  </AppLayout>
);
}

export default ComparePage;