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

  Rules:
  - max 6 Pokémon per team
  - no duplicate Pokémon
*/
const addPokemonToTeam = async (
  teamId,
  pokemon
) => {

  /*
    🔎 Check current team size
  */
  const existingPokemon =
    await db.query(
      `
      SELECT *
      FROM team_pokemon
      WHERE team_id = $1
      `,
      [teamId]
    );

  /*
    🛡️ Limit team size to 6
  */
  if (
    existingPokemon.rows.length >= 6
  ) {

throw new Error(
  `Your team already has 6 Pokémon. Remove one before adding ${pokemon.pokemon_name}.`
);
  }

  /*
    🔎 Check for duplicates
  */
  const duplicatePokemon =
    existingPokemon.rows.find(
      (teamPokemon) =>
        teamPokemon.pokemon_id ===
        pokemon.pokemon_id
    );

  /*
    🛡️ Prevent duplicates
  */
  if (duplicatePokemon) {

 throw new Error(
  `${pokemon.pokemon_name} is already on this team.`
);
  }

  /*
    ✅ Add Pokémon to team
  */
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

/*
  ❌ Remove Pokémon from team

  Deletes one Pokémon entry
  from the team_pokemon table.
*/
const removePokemonFromTeam = async (
  pokemonEntryId
) => {
  const result = await db.query(
    `
    DELETE FROM team_pokemon
    WHERE id = $1
    RETURNING *
    `,
    [pokemonEntryId]
  );

  return result.rows[0];
};

/*
  📥 Get teams with Pokémon

  Returns each team plus the Pokémon
  saved inside that team.
*/
const getUserTeamsWithPokemon = async (userId) => {
  const result = await db.query(
    `
    SELECT
      teams.id,
      teams.team_name,
      teams.created_at,

      COALESCE(
        json_agg(
          json_build_object(
            'id', team_pokemon.id,
            'pokemon_id', team_pokemon.pokemon_id,
            'pokemon_name', team_pokemon.pokemon_name
          )
        ) FILTER (WHERE team_pokemon.id IS NOT NULL),
        '[]'
      ) AS pokemon
    FROM teams
    LEFT JOIN team_pokemon
      ON teams.id = team_pokemon.team_id
    WHERE teams.user_id = $1
    GROUP BY teams.id
    ORDER BY teams.created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

module.exports = {
  createTeam,
  getUserTeams,
  getUserTeamsWithPokemon,
  deleteTeam,
  addPokemonToTeam,
  removePokemonFromTeam,
};