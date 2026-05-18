import { useEffect, useState } from "react";

/*
  ⚔️ TypeEffectiveness component

  Displays:
  - weaknesses
  - resistances

  based on Pokémon typing.
*/

function TypeEffectiveness({ selectedPokemon }) {

  // weaknesses array
  const [weaknesses, setWeaknesses] = useState([]);

  // resistances array
  const [resistances, setResistances] = useState([]);

  useEffect(() => {

    if (!selectedPokemon) return;

    /*
      🧠 Fetch type data
      for EACH Pokémon type
    */
    const fetchTypeData = async () => {

      try {

        const weaknessSet = new Set();
        const resistanceSet = new Set();

        /*
          Example:
          Pikachu types:
          electric
        */
        for (const typeInfo of selectedPokemon.types) {

          // fetch type endpoint
          const response = await fetch(
            typeInfo.type.url
          );

          const data = await response.json();

          /*
            ⚠️ Double damage from
            = weaknesses
          */
          data.damage_relations.double_damage_from
            .forEach((type) => {
              weaknessSet.add(type.name);
            });

          /*
            🛡 Half damage from
            = resistances
          */
          data.damage_relations.half_damage_from
            .forEach((type) => {
              resistanceSet.add(type.name);
            });
        }

        // convert Sets into arrays
        setWeaknesses([...weaknessSet]);
        setResistances([...resistanceSet]);

      } catch (error) {

        console.log(
          "Type effectiveness fetch failed:",
          error
        );
      }
    };

    fetchTypeData();

  }, [selectedPokemon]);

  if (!selectedPokemon) return null;

  return (

    <div className="type-effectiveness">

      {/* weaknesses */}
      <div className="effectiveness-section">

        <h3>Weak Against</h3>

        <div className="effectiveness-badges">

          {weaknesses.map((type) => (

            <span
              key={type}
              className="weakness-badge"
            >
              {type}
            </span>

          ))}

        </div>

      </div>

      {/* resistances */}
      <div className="effectiveness-section">

        <h3>Resists</h3>

        <div className="effectiveness-badges">

          {resistances.map((type) => (

            <span
              key={type}
              className="resistance-badge"
            >
              {type}
            </span>

          ))}

        </div>

      </div>

    </div>
  );
}

export default TypeEffectiveness;