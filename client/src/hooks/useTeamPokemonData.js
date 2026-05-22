import { useEffect, useState } from "react";

/*
  🧬 useTeamPokemonData

  Fetches full Pokémon details for
  Pokémon saved inside a team.

  The database stores:
  - pokemon_id
  - pokemon_name

  PokéAPI gives us:
  - types
  - sprites
  - stats
*/
function useTeamPokemonData(teamPokemon) {
  const [pokemonData, setPokemonData] =
    useState([]);

  const [isLoadingTeamData, setIsLoadingTeamData] =
    useState(false);

  useEffect(() => {
    const fetchTeamPokemonData = async () => {
      if (!teamPokemon || teamPokemon.length === 0) {
        setPokemonData([]);
        return;
      }

      try {
        setIsLoadingTeamData(true);

        const detailedPokemon =
          await Promise.all(
            teamPokemon.map(async (pokemon) => {
              const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_id}`
              );

              return await response.json();
            })
          );

        setPokemonData(detailedPokemon);
      } catch (error) {
        console.error(
          "Failed to fetch team Pokémon data",
          error
        );
      } finally {
        setIsLoadingTeamData(false);
      }
    };

    fetchTeamPokemonData();
  }, [teamPokemon]);

  return {
    pokemonData,
    isLoadingTeamData,
  };
}

export default useTeamPokemonData;