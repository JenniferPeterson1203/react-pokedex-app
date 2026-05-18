import { useEffect, useState } from "react";

/*
  🌍 Pokémon lore component

  Displays:
  - habitat
  - generation
  - Pokédex flavor text
*/

function PokemonLore({ selectedPokemon }) {

  // stores species data
  const [speciesData, setSpeciesData] = useState(null);

  useEffect(() => {

    if (!selectedPokemon) return;

    /*
      🧠 Fetch species endpoint

      The species endpoint contains:
      - flavor text
      - habitat
      - generation
      - lore info
    */
    const fetchSpeciesData = async () => {

      try {

        const response = await fetch(
          selectedPokemon.species.url
        );

        const data = await response.json();

        setSpeciesData(data);

      } catch (error) {

        console.log(
          "Lore fetch failed:",
          error
        );
      }
    };

    fetchSpeciesData();

  }, [selectedPokemon]);

  if (!selectedPokemon || !speciesData) {
    return (
      <div className="pokemon-lore">
        <h3>Pokédex Lore</h3>
        <p>Select a Pokémon</p>
      </div>
    );
  }

  /*
    🧠 Find English flavor text entry
  */
  const englishFlavorText =
    speciesData.flavor_text_entries.find(
      (entry) =>
        entry.language.name === "en"
    );

  return (

    <div className="pokemon-lore">

      <h3>Pokédex Lore</h3>

      {/* habitat */}
      <div className="lore-item">

        <span className="lore-label">
          Habitat:
        </span>

        <span className="lore-value">
          {
            speciesData.habitat
              ? speciesData.habitat.name
              : "Unknown"
          }
        </span>

      </div>

      {/* generation */}
      <div className="lore-item">

        <span className="lore-label">
          Generation:
        </span>

        <span className="lore-value">
          {speciesData.generation.name}
        </span>

      </div>

      {/* flavor text */}
      <div className="flavor-text">

        "
        {
          englishFlavorText
            ? englishFlavorText.flavor_text
                .replace(/\f/g, " ")
            : "No Pokédex entry available."
        }
        "

      </div>

    </div>
  );
}

export default PokemonLore;