import { useEffect, useState } from "react";

/*
  ❤️ Custom hook for favorite Pokémon

  This keeps favorite logic out of App.jsx.
  It also saves favorites to localStorage so they
  stay after refreshing the page.
*/
function useFavorites() {
  /*
    🧠 Load saved favorites immediately when state is created.

    This prevents the app from starting with []
    and accidentally overwriting localStorage.
  */
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const savedFavorites = localStorage.getItem("favoritePokemonIds");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  /*
    💾 Save favorites whenever favoriteIds changes.
  */
  useEffect(() => {
    localStorage.setItem(
      "favoritePokemonIds",
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds]);

  /*
    ❤️ Add or remove a Pokémon from favorites.
  */
  const toggleFavorite = (pokemonId) => {
    setFavoriteIds((prevFavorites) => {
      if (prevFavorites.includes(pokemonId)) {
        return prevFavorites.filter((id) => id !== pokemonId);
      }

      return [...prevFavorites, pokemonId];
    });
  };

  return {
    favoriteIds,
    toggleFavorite,
  };
}

export default useFavorites;