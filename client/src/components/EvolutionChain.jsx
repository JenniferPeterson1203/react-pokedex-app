import { useEffect, useState } from "react";

function EvolutionChain({ selectedPokemon, setSelectedPokemon, pokemons }) {
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    if (!selectedPokemon) {
      setEvolutions([]);
      return;
    }

    const fetchEvolutionChain = async () => {
      try {
        const speciesResponse = await fetch(selectedPokemon.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const chain = [];
        let current = evolutionData.chain;

        while (current) {
          chain.push(current.species.name);
          current = current.evolves_to[0];
        }

        setEvolutions(chain);
      } catch (error) {
        console.log("Evolution fetch failed:", error);
      }
    };

    fetchEvolutionChain();
  }, [selectedPokemon]);

  if (!selectedPokemon) {
    return (
      <div className="evolution-section">
        <h3>Evolution Chain</h3>
        <p>Select a Pokémon to view evolutions</p>
      </div>
    );
  }

  return (
    <div className="evolution-section">
      <h3>Evolution Chain</h3>

      <div className="evolution-chain">
        {evolutions.map((name) => {
          const evolutionPokemon = pokemons.find(
            (pokemon) => pokemon.name === name
          );

          const isCurrentPokemon = selectedPokemon.name === name;

          return (
            <button
              key={name}
              className={
                isCurrentPokemon
                  ? "evolution-item active-evolution"
                  : "evolution-item"
              }
              onClick={() => {
                if (evolutionPokemon) {
                  setSelectedPokemon(evolutionPokemon);
                }
              }}
            >
              <img
                src={
                  evolutionPokemon
                    ? evolutionPokemon.sprites.front_default
                    : `https://img.pokemondb.net/sprites/home/normal/${name}.png`
                }
                alt={name}
              />

              <p>{name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default EvolutionChain;