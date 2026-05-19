import { useEffect, useState } from "react";

/*
  ❤️ useFavorites Hook

  This hook now connects to the backend database,
  but it still returns favoriteIds and toggleFavorite
  so the rest of the app does not break.
*/
function useFavorites() {
  /*
    Stores only Pokémon IDs because the rest of the app
    already checks favorites using pokemon.id.
  */
  const [favoriteIds, setFavoriteIds] = useState([]);

  /*
    Fetch saved favorites from the backend
    when the app first loads.
  */
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/favorites"
        );

        const data = await response.json();

        /*
          Backend sends objects like:
          { id, pokemon_name, pokemon_id }

          Frontend needs:
          [25, 4, 7]
        */
        const ids = data.map(
          (favorite) => favorite.pokemon_id
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
  }, []);

  /*
    Add or remove a favorite.

    For now, this adds favorites to the database.
    We will add DELETE/remove support next.
  */
  const toggleFavorite = async (pokemonId) => {
    /*
      If already favorited, remove it from the UI for now.

      NOTE:
      Database delete route is not built yet,
      so this only updates frontend state temporarily.
      We will fix that next.
    */
    if (favoriteIds.includes(pokemonId)) {
      setFavoriteIds((prevFavorites) =>
        prevFavorites.filter((id) => id !== pokemonId)
      );

      return;
    }

    try {
      /*
        Find the Pokémon object from the page is harder here
        because this hook only receives pokemonId.

        So for now we save:
        pokemon_id = pokemonId
        pokemon_name = temporary text

        Better fix next:
        update toggleFavorite to receive the whole pokemon object.
      */
      await fetch("http://localhost:3001/api/favorites", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          pokemon_id: pokemonId,
          pokemon_name: `pokemon-${pokemonId}`,
        }),
      });

      setFavoriteIds((prevFavorites) => [
        ...prevFavorites,
        pokemonId,
      ]);
    } catch (error) {
      console.error(
        "Failed to add favorite",
        error
      );
    }
  };

  return {
    favoriteIds,
    toggleFavorite,
  };
}

export default useFavorites;