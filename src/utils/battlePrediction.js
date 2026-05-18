/*
  ⚔️ Generates a lightweight battle analysis
  between two Pokémon.
*/
const getBattlePrediction = (selectedPokemonOne, selectedPokemonTwo) => {
  if (!selectedPokemonOne || !selectedPokemonTwo) {
    return "Select two Pokémon to analyze the matchup.";
  }

  const getStat = (pokemon, statName) => {
    return (
      pokemon.stats.find((stat) => stat.stat.name === statName)?.base_stat || 0
    );
  };

  const speedOne = getStat(selectedPokemonOne, "speed");
  const speedTwo = getStat(selectedPokemonTwo, "speed");

  const attackOne = getStat(selectedPokemonOne, "attack");
  const attackTwo = getStat(selectedPokemonTwo, "attack");

  const fasterPokemon =
    speedOne > speedTwo ? selectedPokemonOne.name : selectedPokemonTwo.name;

  const strongerPokemon =
    attackOne > attackTwo ? selectedPokemonOne.name : selectedPokemonTwo.name;

  return `${fasterPokemon} has higher speed, while ${strongerPokemon} has stronger attack power.`;
};

export default getBattlePrediction;