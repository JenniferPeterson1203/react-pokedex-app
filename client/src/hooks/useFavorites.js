import { useState } from "react";

import {
  loadGuestFavorites,
  saveGuestFavorites,
} from "../utils/favoriteStorage";

/*
  ❤️ useFavorites Hook

  Guest Mode Version:
  - Favorites are saved locally with localStorage.
  - This keeps the app usable without requiring login.
  - Later, logged-in users will save favorites through the backend API.
*/
function useFavorites() {
  /*
    Starts by loading guest favorites
    from localStorage.
  */
  const [favoriteIds, setFavoriteIds] =
    useState(loadGuestFavorites);

  /*
    Tracks when a favorite request/action
    is happening.

    Right now this is local, but we keep it
    because later backend requests will need it.
  */
  const [isLoadingFavorite, setIsLoadingFavorite] =
    useState(false);

  /*
    ❤️ Toggle favorite

    Receives the full Pokémon object so this hook
    can later save both pokemon.id and pokemon.name
    when authenticated backend favorites are added.
  */
  const toggleFavorite = (pokemon) => {
    const pokemonId = pokemon.id;

    setIsLoadingFavorite(true);

    /*
      If already favorited,
      remove it from guest favorites.
    */
    if (favoriteIds.includes(pokemonId)) {
      setFavoriteIds((prevFavorites) => {
        const updatedFavorites =
          prevFavorites.filter(
            (id) => id !== pokemonId
          );

        saveGuestFavorites(updatedFavorites);

        return updatedFavorites;
      });

      setIsLoadingFavorite(false);

      return;
    }

    /*
      If not favorited,
      add it to guest favorites.
    */
    setFavoriteIds((prevFavorites) => {
      const updatedFavorites = [
        ...prevFavorites,
        pokemonId,
      ];

      saveGuestFavorites(updatedFavorites);

      return updatedFavorites;
    });

    setIsLoadingFavorite(false);
  };

  return {
    favoriteIds,
    toggleFavorite,
    isLoadingFavorite,
  };
}

export default useFavorites;