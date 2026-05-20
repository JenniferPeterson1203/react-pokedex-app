import { useEffect, useState } from "react";

import API_URL from "../api/api";

import { loadToken } from "../utils/authStorage";

import {
  loadGuestFavorites,
  saveGuestFavorites,
} from "../utils/favoriteStorage";

/*
  ❤️ useFavorites Hook

  Supports:
  - guest favorites (localStorage)
  - authenticated favorites (backend API + JWT)

  Guest users:
  favorites save locally.

  Logged-in users:
  favorites sync with protected backend routes.
*/
function useFavorites() {

  /*
    👤 Detect authenticated session

    If token exists:
    user is authenticated.
  */
  const token = loadToken();

  /*
    ❤️ Favorite IDs state

    Starts with guest favorites.

    If authenticated:
    backend favorites will replace these.
  */
  const [favoriteIds, setFavoriteIds] =
    useState(loadGuestFavorites);

  /*
    ⏳ Loading state

    Helps track async favorite actions.
  */
  const [isLoadingFavorite, setIsLoadingFavorite] =
    useState(false);

  /*
    📥 Load backend favorites
    when authenticated user exists.
  */
  useEffect(() => {

    /*
      Guest users skip backend fetch.
    */
    if (!token) {
      return;
    }

    const fetchFavorites = async () => {

      try {

        const response = await fetch(
          `${API_URL}/api/favorites`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        /*
          Backend returns:
          [{ pokemon_id: 25 }]

          Frontend needs:
          [25]
        */
        const ids = data.map(
          (favorite) =>
            favorite.pokemon_id
        );

        setFavoriteIds(ids);

      } catch (error) {

        console.error(
          "Failed to fetch favorites",
          error
        );
      }
    };

    fetchFavorites();

  }, [token]);

  /*
    ❤️ Toggle favorite

    Handles BOTH:
    - guest favorites
    - authenticated favorites
  */
  const toggleFavorite = async (pokemon) => {

    const pokemonId = pokemon.id;

    setIsLoadingFavorite(true);

    /*
      🔐 AUTHENTICATED USER FLOW
    */
    if (token) {

      /*
        ❌ Remove favorite
      */
      if (
        favoriteIds.includes(pokemonId)
      ) {

        try {

          await fetch(
            `${API_URL}/api/favorites/${pokemonId}`,
            {
              method: "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          setFavoriteIds(
            (prevFavorites) =>
              prevFavorites.filter(
                (id) =>
                  id !== pokemonId
              )
          );

        } catch (error) {

          console.error(
            "Failed to remove favorite",
            error
          );
        }

        setIsLoadingFavorite(false);

        return;
      }

      /*
        ❤️ Add favorite
      */
      try {

        await fetch(
          `${API_URL}/api/favorites`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              pokemon_id: pokemon.id,
              pokemon_name: pokemon.name,
            }),
          }
        );

        setFavoriteIds(
          (prevFavorites) => [
            ...prevFavorites,
            pokemonId,
          ]
        );

      } catch (error) {

        console.error(
          "Failed to add favorite",
          error
        );
      }

      setIsLoadingFavorite(false);

      return;
    }

    /*
      👤 GUEST USER FLOW

      Uses localStorage only.
    */

    /*
      ❌ Remove guest favorite
    */
    if (favoriteIds.includes(pokemonId)) {

      setFavoriteIds((prevFavorites) => {

        const updatedFavorites =
          prevFavorites.filter(
            (id) => id !== pokemonId
          );

        saveGuestFavorites(
          updatedFavorites
        );

        return updatedFavorites;
      });

      setIsLoadingFavorite(false);

      return;
    }

    /*
      ❤️ Add guest favorite
    */
    setFavoriteIds((prevFavorites) => {

      const updatedFavorites = [
        ...prevFavorites,
        pokemonId,
      ];

      saveGuestFavorites(
        updatedFavorites
      );

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