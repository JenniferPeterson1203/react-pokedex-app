import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useParams,useNavigate } from "react-router-dom";
import PokemonDetailProfile from "../components/PokemonDetailProfile";
import AppLayout from "../components/AppLayout";
import PageState from "../components/PageState";
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
  const navigate = useNavigate();

  // 🧠 Reuse our Pokémon data hook
  const { pokemons, isLoading,errorMessage } = usePokemon();

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
    navigate(
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
      <PageState
  isLoading={isLoading}
  errorMessage={errorMessage}
  loadingMessage="
    Scanning Pokémon details...
  "
>
      
      <div className="pokemon-page">
        <h1>Pokémon Details</h1>

    {selectedPokemon && (
    <PokemonDetailProfile
      pokemon={selectedPokemon}
    />
  )}
      </div>
      </PageState>
    </AppLayout>
  );
}

export default PokemonPage;