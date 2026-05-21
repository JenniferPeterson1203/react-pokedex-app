const db = require("../db/dbConfig");

/*
  🧑‍🤝‍🧑 Create team

  Creates a new team for the logged-in user.
*/
const createTeam = async (
  userId,
  teamName
) => {
  const result = await db.query(
    `
    INSERT INTO teams
    (user_id, team_name)
    VALUES ($1, $2)
    RETURNING *
    `,
    [userId, teamName]
  );

  return result.rows[0];
};

/*
  📥 Get teams for one user

  Only returns teams owned by the logged-in user.
*/
const getUserTeams = async (userId) => {
  const result = await db.query(
    `
    SELECT *
    FROM teams
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

/*
  ❌ Delete team

  Deletes only a team owned by the logged-in user.
*/
const deleteTeam = async (
  teamId,
  userId
) => {
  const result = await db.query(
    `
    DELETE FROM teams
    WHERE id = $1
    AND user_id = $2
    RETURNING *
    `,
    [teamId, userId]
  );

  return result.rows[0];
};

/*
  🧬 Add Pokémon to team

  Adds a Pokémon to a saved team.
*/
const addPokemonToTeam = async (
  teamId,
  pokemon
) => {
  const result = await db.query(
    `
    INSERT INTO team_pokemon
    (team_id, pokemon_id, pokemon_name)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [
      teamId,
      pokemon.pokemon_id,
      pokemon.pokemon_name,
    ]
  );

  return result.rows[0];
};

module.exports = {
  createTeam,
  getUserTeams,
  deleteTeam,
  addPokemonToTeam,
};