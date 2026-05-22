/*
  📊 Count Pokémon types in a team
*/
export const calculateTeamTypes =
  (pokemonDataArray) => {

    const typeCounts = {};

    pokemonDataArray.forEach(
      (pokemon) => {

        pokemon.types.forEach(
          (typeObj) => {

            const typeName =
              typeObj.type.name;

            if (!typeCounts[typeName]) {
              typeCounts[typeName] = 0;
            }

            typeCounts[typeName] += 1;
          }
        );
      }
    );

    return typeCounts;
};