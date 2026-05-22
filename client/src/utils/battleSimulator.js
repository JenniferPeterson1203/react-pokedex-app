/*
  ⚔️ Battle Simulator

  Calculates a simple battle result
  based on key Pokémon stats.

  Version 1 uses:
  - HP
  - Attack
  - Defense
  - Speed
*/
const getStatValue = (pokemon, statName) => {
  const stat = pokemon.stats.find(
    (item) => item.stat.name === statName
  );

  return stat ? stat.base_stat : 0;
};

const calculateBattleScore = (pokemon) => {
  const hp = getStatValue(pokemon, "hp");
  const attack = getStatValue(pokemon, "attack");
  const defense = getStatValue(pokemon, "defense");
  const speed = getStatValue(pokemon, "speed");

  return hp + attack + defense + speed;
};

const simulateBattle = (pokemonOne, pokemonTwo) => {
  if (!pokemonOne || !pokemonTwo) {
    return null;
  }

  const scoreOne = calculateBattleScore(pokemonOne);
  const scoreTwo = calculateBattleScore(pokemonTwo);

  if (scoreOne > scoreTwo) {
    return {
      winner: pokemonOne,
      loser: pokemonTwo,
      scoreOne,
      scoreTwo,
      message: `${pokemonOne.name} wins based on stronger overall battle stats.`,
    };
  }

  if (scoreTwo > scoreOne) {
    return {
      winner: pokemonTwo,
      loser: pokemonOne,
      scoreOne,
      scoreTwo,
      message: `${pokemonTwo.name} wins based on stronger overall battle stats.`,
    };
  }

  return {
    winner: null,
    loser: null,
    scoreOne,
    scoreTwo,
    message: "This battle is too close to call.",
  };
};

export default simulateBattle;