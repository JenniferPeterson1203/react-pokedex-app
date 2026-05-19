/*
  🧠 Generates a battle style label
  based on a Pokémon's strongest stats.

  This helps us interpret raw API stats
  instead of only displaying numbers.
*/
const getBattleStyle = (pokemon) => {
  if (!pokemon) {
    return "Awaiting Scan";
  }

  /*
    Helper function:
    finds a specific stat value by name.
  */
  const getStat = (statName) => {
    return (
      pokemon.stats.find(
        (stat) => stat.stat.name === statName
      )?.base_stat || 0
    );
  };

  const speed = getStat("speed");
  const attack = getStat("attack");
  const defense = getStat("defense");

  if (speed >= 90) {
    return "Speed Striker";
  }

  if (attack >= 90) {
    return "Power Attacker";
  }

  if (defense >= 90) {
    return "Defensive Tank";
  }

  return "Balanced Fighter";
};

export default getBattleStyle;