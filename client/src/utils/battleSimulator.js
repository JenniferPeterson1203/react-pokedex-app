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

/*
  🧬 Simple type advantage chart

  This is Version 1, not the full Pokémon chart yet.
*/
const typeAdvantages = {
  fire: ["grass", "bug", "ice"],
  water: ["fire", "rock", "ground"],
  grass: ["water", "rock", "ground"],
  electric: ["water", "flying"],
  ground: ["fire", "electric", "rock"],
  rock: ["fire", "flying", "bug", "ice"],
  psychic: ["fighting", "poison"],
  fighting: ["normal", "rock", "ice"],
  ice: ["grass", "ground", "flying"],
  flying: ["grass", "fighting", "bug"],
};

const getStatValue = (pokemon, statName) => {
  const stat = pokemon.stats.find((item) => item.stat.name === statName);

  return stat ? stat.base_stat : 0;
};

const calculateBattleScore = (pokemon) => {
  const hp = getStatValue(pokemon, "hp");
  const attack = getStatValue(pokemon, "attack");
  const defense = getStatValue(pokemon, "defense");
  const speed = getStatValue(pokemon, "speed");

  return hp + attack + defense + speed;
};

/*
  🧬 Get Pokémon type names

  Example:
  charizard → ["fire", "flying"]
*/
const getPokemonTypes = (pokemon) => {
  return pokemon.types.map((typeObj) => typeObj.type.name);
};

/*
  ⚡ Calculate type advantage bonus

  If attacker has a type advantage
  over defender, attacker gets bonus points.
*/
const calculateTypeBonus = (attacker, defender) => {
  const attackerTypes = getPokemonTypes(attacker);

  const defenderTypes = getPokemonTypes(defender);

  let bonus = 0;

  attackerTypes.forEach((attackerType) => {
    const strongAgainst = typeAdvantages[attackerType] || [];

    defenderTypes.forEach((defenderType) => {
      if (strongAgainst.includes(defenderType)) {
        bonus += 25;
      }
    });
  });

  return bonus;
};

const simulateBattle = (pokemonOne, pokemonTwo) => {
  if (!pokemonOne || !pokemonTwo) {
    return null;
  }

  const baseScoreOne = calculateBattleScore(pokemonOne);

  const baseScoreTwo = calculateBattleScore(pokemonTwo);

  const typeBonusOne = calculateTypeBonus(pokemonOne, pokemonTwo);

  const typeBonusTwo = calculateTypeBonus(pokemonTwo, pokemonOne);

  const scoreOne = baseScoreOne + typeBonusOne;

  const scoreTwo = baseScoreTwo + typeBonusTwo;

  /*
  📜 Battle log

  Creates a mini story describing
  the battle outcome.
*/
  const battleLog = [];

  battleLog.push(`⚔️ ${pokemonOne.name} enters the arena.`);

  battleLog.push(`⚔️ ${pokemonTwo.name} enters the arena.`);

  /*
  🔥 Type advantage messages
*/
  if (typeBonusOne > 0) {
    battleLog.push(`🔥 ${pokemonOne.name} gains a type advantage bonus.`);
  }

  if (typeBonusTwo > 0) {
    battleLog.push(`🔥 ${pokemonTwo.name} gains a type advantage bonus.`);
  }

  if (scoreOne > scoreTwo) {
    return {
      winner: pokemonOne,
      loser: pokemonTwo,

      scoreOne,
      scoreTwo,

      typeBonusOne,
      typeBonusTwo,

      battleLog,

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
      typeBonusOne,
      typeBonusTwo,
      battleLog,
    };
  }

  return {
    winner: null,
    loser: null,
    scoreOne,
    scoreTwo,
    message: "This battle is too close to call.",
    typeBonusOne,
    typeBonusTwo,
    battleLog,
  };
};

export default simulateBattle;
