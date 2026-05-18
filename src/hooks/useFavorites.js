import { useEffect, useState } from "react";

/*
  ❤️ Custom hook for favorite Pokémon

  This keeps favorite logic out of App.jsx.
  App.jsx can use the hook instead of managing
  localStorage directly.
*/
function useFavorites() {
  // Stores favorite Pokémon IDs
  const [favoriteIds, setFavoriteIds] = useState([]);

  /*
    Load saved favorites from localStorage
    when the app first opens.
  */
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoritePokemonIds");

    if (savedFavorites) {
      setFavoriteIds(JSON.parse(savedFavorites));
    }
  }, []);

  /*
    Save favorites whenever favoriteIds changes.
  */
  useEffect(() => {
    localStorage.setItem(
      "favoritePokemonIds",
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds]);

  /*
    Add or remove a Pokémon from favorites.
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