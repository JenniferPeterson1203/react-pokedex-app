/*
  🛡️ Generates a simple threat analysis
  based on a Pokémon's primary type.

  This turns type data from PokéAPI into
  a readable battle insight.
*/
const getThreatAnalysis = (pokemon) => {
  /*
    If no Pokémon is selected,
    show placeholder data.
  */
  if (!pokemon) {
    return {
      weakAgainst: "Awaiting Scan",
      resistantTo: "Awaiting Scan",
    };
  }

  /*
    For now, we use the first type only.
    Later, we can expand this to handle dual types.
  */
  const primaryType =
    pokemon.types[0].type.name;

  /*
    Simple type matchup map.

    Key = Pokémon type
    Value = common weaknesses/resistances
  */
  const typeMatchups = {
    fire: {
      weakAgainst: "Water, Rock, Ground",
      resistantTo: "Grass, Ice, Bug, Steel",
    },

    water: {
      weakAgainst: "Electric, Grass",
      resistantTo: "Fire, Water, Ice, Steel",
    },

    grass: {
      weakAgainst: "Fire, Ice, Poison, Flying, Bug",
      resistantTo: "Water, Electric, Grass, Ground",
    },

    electric: {
      weakAgainst: "Ground",
      resistantTo: "Electric, Flying, Steel",
    },

    normal: {
      weakAgainst: "Fighting",
      resistantTo: "Ghost immunity",
    },

    psychic: {
      weakAgainst: "Bug, Ghost, Dark",
      resistantTo: "Fighting, Psychic",
    },

    fighting: {
      weakAgainst: "Flying, Psychic, Fairy",
      resistantTo: "Bug, Rock, Dark",
    },

    poison: {
      weakAgainst: "Ground, Psychic",
      resistantTo: "Grass, Fighting, Poison, Bug, Fairy",
    },

    ground: {
      weakAgainst: "Water, Grass, Ice",
      resistantTo: "Poison, Rock, Electric immunity",
    },

    flying: {
      weakAgainst: "Electric, Ice, Rock",
      resistantTo: "Grass, Fighting, Bug, Ground immunity",
    },

    bug: {
      weakAgainst: "Fire, Flying, Rock",
      resistantTo: "Grass, Fighting, Ground",
    },

    rock: {
      weakAgainst: "Water, Grass, Fighting, Ground, Steel",
      resistantTo: "Normal, Fire, Poison, Flying",
    },

    ghost: {
      weakAgainst: "Ghost, Dark",
      resistantTo: "Poison, Bug, Normal/Fighting immunity",
    },

    dragon: {
      weakAgainst: "Ice, Dragon, Fairy",
      resistantTo: "Fire, Water, Electric, Grass",
    },

    dark: {
      weakAgainst: "Fighting, Bug, Fairy",
      resistantTo: "Ghost, Dark, Psychic immunity",
    },

    steel: {
      weakAgainst: "Fire, Fighting, Ground",
      resistantTo: "Normal, Grass, Ice, Flying, Psychic, Bug, Rock, Dragon, Steel, Fairy",
    },

    fairy: {
      weakAgainst: "Poison, Steel",
      resistantTo: "Fighting, Bug, Dark, Dragon immunity",
    },

    ice: {
      weakAgainst: "Fire, Fighting, Rock, Steel",
      resistantTo: "Ice",
    },
  };

  /*
    If type exists in our map, return its matchup.
    Otherwise show a fallback.
  */
  return (
    typeMatchups[primaryType] || {
      weakAgainst: "Unknown",
      resistantTo: "Unknown",
    }
  );
};

export default getThreatAnalysis;