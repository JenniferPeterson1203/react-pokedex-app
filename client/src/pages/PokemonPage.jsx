import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useParams } from "react-router-dom";
import PokemonDetailProfile from "../components/PokemonDetailProfile";
import LoadingScreen from "../components/LoadingScreen";
import AppLayout from "../components/AppLayout";
// import PokemonStatsPanel from "../components/PokemonStatsPanel";
import EvolutionChain from "../components/EvolutionChain";
import PokemonLore from "../components/PokemonLore";

import usePokemon from "../hooks/usePokemon";

/*
  🔍 PokemonPage

  This page shows details for one Pokémon
  based on the name in the URL.
*/
function PokemonPage() {
  const { darkMode, setDarkMode } =
  useTheme();
  const [isScanning, setIsScanning] = useState(false);

  // 🧠 Gets the Pokémon name from the URL
  const { name } = useParams();

  // 🧠 Reuse our Pokémon data hook
  const { pokemons } = usePokemon();

  /*
    🔎 Find the Pokémon that matches the URL name.

    Example:
    /pokemon/pikachu
    name = "pikachu"
  */
  const selectedPokemon = pokemons.find(
    (pokemon) => pokemon.name === name
  );

  /*
    ✨ Used by evolution chain clicks
    so clicking an evolution still updates the detail page screen.
  */
  const handleSelectPokemon = (pokemon) => {
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
    }, 600);

    /*
      This changes the displayed Pokémon on the page,
      but it does not change the URL yet.
      We can improve that later.
    */
    window.history.pushState(
      null,
      "",
      `/pokemon/${pokemon.name}`
    );
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
      <div className="pokemon-page">
        <h1>Pokémon Details</h1>

        {selectedPokemon ? (
      <PokemonDetailProfile pokemon={selectedPokemon} />
        ) : (
            <LoadingScreen message="Scanning Pokémon Details..." />
        )}
      </div>
    </AppLayout>
  );
}

export default PokemonPage;