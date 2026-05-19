import { useEffect, useState } from "react";
import API_URL from "../api/api";

/*
  ❤️ useFavorites Hook

  This hook connects favorites to the backend database,
  while still returning favoriteIds and toggleFavorite
  so the rest of the app can keep working.
*/
function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState([]);

    /*
    ⏳ Tracks when a favorite
    request is in progress.
  */
  const [isLoadingFavorite, setIsLoadingFavorite] =
    useState(false);

  /*
    📥 Fetch saved favorites from PostgreSQL
    when the app first loads.
  */
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/favorites`
        );

        const data = await response.json();

        /*
          Backend sends:
          [{ pokemon_id: 25 }, { pokemon_id: 4 }]

          Frontend needs:
          [25, 4]
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
    ❤️ Toggle favorite

    Receives the full Pokémon object so we can save:
    - pokemon.id
    - pokemon.name
  */
const toggleFavorite = async (pokemon) => {
  const pokemonId = pokemon.id;

  /*
    ⏳ Start loading before either
    add or delete request.
  */
  setIsLoadingFavorite(true);

  /*
    ❌ If already favorited,
    remove from database.
  */
  if (favoriteIds.includes(pokemonId)) {
    try {
      await fetch(
        `${API_URL}/api/favorites/${pokemonId}`,
        {
          method: "DELETE",
        }
      );

      setFavoriteIds((prevFavorites) =>
        prevFavorites.filter(
          (id) => id !== pokemonId
        )
      );
    } catch (error) {
      console.error(
        "Failed to remove favorite",
        error
      );
    } finally {
      /*
        ✅ Always stop loading,
        whether request worked or failed.
      */
      setIsLoadingFavorite(false);
    }

    return;
  }

  /*
    ❤️ If not favorited,
    add to database.
  */
  try {
    await fetch(`${API_URL}/api/favorites`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pokemon_id: pokemon.id,
        pokemon_name: pokemon.name,
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
  } finally {
    /*
      ✅ Always stop loading,
      whether request worked or failed.
    */
    setIsLoadingFavorite(false);
  }
};

return {
  favoriteIds,
  toggleFavorite,
  isLoadingFavorite,
};
}

export default useFavorites;