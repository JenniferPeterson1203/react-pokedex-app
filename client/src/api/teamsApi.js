import API_URL from "./api";

import getAuthHeaders
  from "./authHeaders";

/*
  📥 Fetch user teams
*/
export const fetchTeams =
  async () => {

  const response = await fetch(
    `${API_URL}/api/teams`,
    {
      headers:
        getAuthHeaders(),
    }
  );

  return response.json();
};

/*
  🧑‍🤝‍🧑 Create team
*/
export const createTeam =
  async (teamName) => {

  const response = await fetch(
    `${API_URL}/api/teams`,
    {
      method: "POST",

      headers:
        getAuthHeaders(),

      body: JSON.stringify({
        team_name: teamName,
      }),
    }
  );

  return response.json();
};

/*
  ❌ Delete team
*/
export const deleteTeam =
  async (teamId) => {

  const response = await fetch(
    `${API_URL}/api/teams/${teamId}`,
    {
      method: "DELETE",

      headers:
        getAuthHeaders(),
    }
  );

  return response.json();
};

/*
  🧬 Add Pokémon to team
*/
export const addPokemonToTeam =
  async (
    teamId,
    pokemon
  ) => {

  const response = await fetch(
    `${API_URL}/api/teams/${teamId}/pokemon`,
    {
      method: "POST",

      headers:
        getAuthHeaders(),

      body: JSON.stringify({
        pokemon_id: pokemon.id,
        pokemon_name: pokemon.name,
      }),
    }
  );

  return response.json();
};