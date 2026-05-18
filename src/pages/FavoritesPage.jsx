import { useState } from "react";

import PokemonCard from "../components/PokemonCard";
import PokemonStatsPanel from "../components/PokemonStatsPanel";
import EvolutionChain from "../components/EvolutionChain";
import PokemonLore from "../components/PokemonLore";
import AppLayout from "../components/AppLayout";
import usePokemon from "../hooks/usePokemon";
import useFavorites from "../hooks/useFavorites";

/*
  ❤️ FavoritesPage

  Shows only Pokémon the user saved as favorites.
*/
function FavoritesPage() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { pokemons } = usePokemon();
  const { favoriteIds, toggleFavorite } = useFavorites();

  /*
    🧠 Only keep Pokémon whose IDs are inside favoriteIds.
  */
  const favoritePokemon = pokemons.filter((pokemon) =>
    favoriteIds.includes(pokemon.id)
  );

  /*
    ✨ Select Pokémon and trigger scan animation.
  */
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

        <PokemonLore
          selectedPokemon={selectedPokemon}
        />
      </>
    }
  >
    <div className="favorites-page">

      <h1>Favorite Pokémon</h1>

      {favoritePokemon.length === 0 ? (

        <p className="empty-favorites">
          No favorites saved yet.
          Go back and tap a heart to add some.
        </p>

      ) : (

        <>
          <PokemonStatsPanel
            selectedPokemon={selectedPokemon}
            isScanning={isScanning}
          />

          <div className="pokedex-grid">

            {favoritePokemon.map((pokemon) => (

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
        </>

      )}

    </div>
  </AppLayout>
);
}

export default FavoritesPage;