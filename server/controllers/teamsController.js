const {
  createTeam,
  deleteTeam,
  addPokemonToTeam,
  getUserTeamsWithPokemon,
} = require("../queries/teamsQueries");

/*
  📥 GET user teams

  Returns all teams belonging
  to the authenticated user.
*/
const getTeams = async (
  req,
  res
) => {

  try {

    /*
      👤 User comes from verified JWT
    */
    const userId =
      req.user.id;

    const teams =
      await getUserTeamsWithPokemon(userId);

    res.status(200).json(
      teams
    );

  } catch (error) {

    console.error(
      "Get teams error",
      error
    );

    res.status(500).json({
      error:
        "Failed to fetch teams",
    });
  }
};

/*
  🧑‍🤝‍🧑 CREATE team

  Creates a team owned by
  the authenticated user.
*/
const createNewTeam = async (
  req,
  res
) => {

  try {

    const userId =
      req.user.id;

    const {
      team_name,
    } = req.body;

    /*
      🛡️ Validate team name
    */
    if (!team_name) {

      return res.status(400).json({
        error:
          "team_name is required",
      });
    }

    const newTeam =
      await createTeam(
        userId,
        team_name
      );

    res.status(201).json(
      newTeam
    );

  } catch (error) {

    console.error(
      "Create team error",
      error
    );

    res.status(500).json({
      error:
        "Failed to create team",
    });
  }
};

/*
  ❌ DELETE team

  Removes a team owned by
  the authenticated user.
*/
const removeTeam = async (
  req,
  res
) => {

  try {

    const userId =
      req.user.id;

    const {
      teamId,
    } = req.params;

    const deletedTeam =
      await deleteTeam(
        teamId,
        userId
      );

    res.status(200).json(
      deletedTeam
    );

  } catch (error) {

    console.error(
      "Delete team error",
      error
    );

    res.status(500).json({
      error:
        "Failed to delete team",
    });
  }
};

/*
  🧬 ADD Pokémon to team
*/
const addPokemon = async (
  req,
  res
) => {

  try {

    const {
      teamId,
    } = req.params;

    const {
      pokemon_id,
      pokemon_name,
    } = req.body;

    /*
      🛡️ Validate Pokémon data
    */
    if (
      !pokemon_id ||
      !pokemon_name
    ) {

      return res.status(400).json({
        error:
          "pokemon_id and pokemon_name are required",
      });
    }

    const newPokemon =
      await addPokemonToTeam(
        teamId,
        {
          pokemon_id,
          pokemon_name,
        }
      );

    res.status(201).json(
      newPokemon
    );

} catch (error) {

  console.error(
    "Add Pokémon error",
    error
  );

  res.status(400).json({
    error: error.message,
  });
}
};

module.exports = {
  getTeams,
  createNewTeam,
  removeTeam,
  addPokemon,
};