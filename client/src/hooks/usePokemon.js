import { useEffect, useState } from "react";

/*
  🧠 Custom hook for Pokémon data

  This hook handles:
  - fetching Pokémon
  - loading state
  - error state
  - search filtering
  - pagination math
  - resetting page when search changes
*/
function usePokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /*
    ⏳ Tracks whether Pokémon data
    is still loading from PokéAPI.
  */
  const [isLoading, setIsLoading] = useState(true);

  /*
    🚨 Stores a friendly error message
    if the API request fails.
  */
  const [errorMessage, setErrorMessage] = useState("");

  const itemsPerPage = 15;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }

        const data = await response.json();

        /*
          PokéAPI first gives us basic Pokémon URLs.

          Promise.all lets us fetch the full details
          for all 151 Pokémon before updating state.
        */
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);

            if (!response.ok) {
              throw new Error(
                `Failed to fetch ${pokemon.name}`
              );
            }

            const pokemonData = await response.json();

            return pokemonData;
          })
        );

        setPokemons(detailedPokemon);
      } catch (error) {
        console.error(
          "Pokémon fetch error",
          error
        );

        setErrorMessage(
          "Unable to load Pokémon right now. Please try again."
        );
      } finally {
        /*
          ✅ Always stop loading:
          - success
          - failure
        */
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  /*
    When search changes, reset user
    back to the first page of results.
  */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredPokemon = pokemons.filter((pokemon) => {
    if (searchTerm === "") return true;

    return (
      pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm)
    );
  });

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentPokemon =
    filteredPokemon.slice(firstIndex, lastIndex);

  return {
    pokemons,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    filteredPokemon,
    currentPokemon,
    isLoading,
    errorMessage,
  };
}

export default usePokemon;