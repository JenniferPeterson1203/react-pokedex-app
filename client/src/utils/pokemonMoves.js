/*
  🎯 Starter Pokémon move system

  Version 1:
  - moves are chosen based on Pokémon type
  - later we can add power, accuracy, effects, etc.
*/

const movesByType = {
  electric: [
    "Thunder Shock",
    "Spark",
    "Thunderbolt",
  ],

  fire: [
    "Ember",
    "Flame Burst",
    "Flamethrower",
  ],

  water: [
    "Water Gun",
    "Bubble",
    "Aqua Jet",
  ],

  grass: [
    "Vine Whip",
    "Razor Leaf",
    "Seed Bomb",
  ],

  normal: [
    "Tackle",
    "Quick Attack",
    "Body Slam",
  ],

  flying: [
    "Gust",
    "Wing Attack",
    "Air Slash",
  ],

  psychic: [
    "Confusion",
    "Psybeam",
    "Psychic",
  ],

  rock: [
    "Rock Throw",
    "Smack Down",
    "Rock Slide",
  ],
};

/*
  🧬 Get a Pokémon's first type
*/
const getPrimaryType = (pokemon) => {
  return pokemon.types[0].type.name;
};

/*
  🎲 Pick a random move
*/
export const getRandomMove = (pokemon) => {
  const primaryType =
    getPrimaryType(pokemon);

  const movePool =
    movesByType[primaryType] ||
    movesByType.normal;

  const randomIndex =
    Math.floor(
      Math.random() * movePool.length
    );

  return movePool[randomIndex];
};

export const getMoveType = (move) => {
  const moveTypes = {
    ThunderShock: "electric",
    Spark: "electric",
    Thunderbolt: "electric",

    Ember: "fire",
    FlameBurst: "fire",
    Flamethrower: "fire",

    WaterGun: "water",
    Bubble: "water",
    AquaJet: "water",

    VineWhip: "grass",
    RazorLeaf: "grass",
    SeedBomb: "grass",
  };

  const cleanedMove =
    move.replace(/\s/g, "");

  return moveTypes[cleanedMove] || "normal";
};