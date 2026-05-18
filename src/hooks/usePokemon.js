import { useEffect, useState } from "react";

/*
  🧠 Custom hook for Pokémon data

  This hook handles:
  - fetching Pokémon
  - search filtering
  - pagination math
  - resetting page when search changes
*/
function usePokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
      }

      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const pokemonData = await response.json();

          return pokemonData;
        })
      );

      setPokemons(detailedPokemon);
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredPokemon = pokemons.filter((pokemon) => {
    if (searchTerm === "") return true;

    return (
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm)
    );
  });

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentPokemon = filteredPokemon.slice(firstIndex, lastIndex);

  return {
    pokemons,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    filteredPokemon,
    currentPokemon,
  };
}

export default usePokemon;