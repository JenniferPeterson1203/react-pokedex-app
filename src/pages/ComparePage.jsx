import { useState } from "react";

import AppLayout from "../components/AppLayout";
import PokemonCompareCard from "../components/PokemonCompareCard";
import PokemonSearchSelect from "../components/PokemonSearchSelect";
import usePokemon from "../hooks/usePokemon";

/*
  ComparePage

  Compare two Pokémon side-by-side.
*/

function ComparePage() {

  const [darkMode, setDarkMode] = useState(false);

  const [pokemonOne, setPokemonOne] =
    useState("");

  const [pokemonTwo, setPokemonTwo] =
    useState("");

  const { pokemons } = usePokemon();

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

      <div className="compare-page">

        <h1>Compare Pokémon</h1>

        {/* selectors */}
        <div className="compare-selectors">

{/* Pokémon 1 */}
<PokemonSearchSelect
  label="Choose Pokémon 1"
  pokemons={pokemons}
  selectedName={pokemonOne}
  setSelectedName={setPokemonOne}
/>

{/* Pokémon 2 */}
<PokemonSearchSelect
  label="Choose Pokémon 2"
  pokemons={pokemons}
  selectedName={pokemonTwo}
  setSelectedName={setPokemonTwo}
/>

        </div>

        {/* comparison cards */}
        <div className="compare-grid">

          <PokemonCompareCard
            pokemon={selectedPokemonOne}
          />

          <PokemonCompareCard
            pokemon={selectedPokemonTwo}
          />

        </div>

      </div>

    </AppLayout>
  );
}

export default ComparePage;