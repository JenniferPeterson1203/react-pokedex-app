/*
  🧠 Generates a training difficulty label
  based on a Pokémon's base experience.

  This transforms raw API numbers
  into a more readable Pokédex insight.
*/
const getTrainingProfile = (pokemon) => {

  /*
    If no Pokémon is selected yet,
    show placeholder text.
  */
  if (!pokemon) {
    return "Awaiting Scan";
  }

  /*
    Base experience is provided
    directly by PokéAPI.
  */
  const baseXP =
    pokemon.base_experience || 0;

  /*
    Lower XP Pokémon are generally
    easier to train early on.
  */
  if (baseXP < 100) {
    return "Easy to Train";
  }

  /*
    Mid-range XP curve.
  */
  if (baseXP < 200) {
    return "Standard Growth";
  }

  /*
    Higher XP Pokémon usually
    require more investment.
  */
  return "Advanced Training";
};

export default getTrainingProfile;