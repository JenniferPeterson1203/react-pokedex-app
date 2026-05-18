import { useEffect, useState } from "react";

/*
  🧠 EvolutionChain component

  Fetches and displays
  Pokémon evolution data.
*/

function EvolutionChain({ selectedPokemon }) {

  // 🌱 Stores evolution chain data
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {

    // stop if no Pokémon selected
    if (!selectedPokemon) return;

    /*
      🧠 Fetch evolution chain
      from multiple API endpoints
    */
    const fetchEvolutionChain = async () => {

      try {

        // 1️⃣ fetch species data
        const speciesResponse = await fetch(
          selectedPokemon.species.url
        );

        const speciesData =
          await speciesResponse.json();

        // 2️⃣ fetch evolution chain data
        const evolutionResponse = await fetch(
          speciesData.evolution_chain.url
        );

        const evolutionData =
          await evolutionResponse.json();

        /*
          🧠 Evolution chain structure
          is deeply nested.

          We manually walk through it.
        */

        const chain = [];

        let current =
          evolutionData.chain;

        while (current) {

          chain.push(
            current.species.name
          );

          current =
            current.evolves_to[0];
        }

        // Save evolution names
        setEvolutions(chain);

      } catch (error) {

        console.log(
          "Evolution fetch failed",
          error
        );
      }
    };

    fetchEvolutionChain();

  }, [selectedPokemon]);

  return (

    <div className="evolution-section">

      <h3>Evolution Chain</h3>

      <div className="evolution-chain">

        {evolutions.map((name) => (

          <div
            className="evolution-item"
            key={name}
          >

            {/* evolution image */}
            <img
              src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
              alt={name}
            />

            <p>{name}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default EvolutionChain;