import { useEffect, useState } from "react";

import {
  fetchTeams,
  createTeam,
  deleteTeam,
  removePokemonFromTeam,
} from "../api/teamsApi";

/*
  🧑‍🤝‍🧑 useTeams Hook

  Handles team state on the frontend.

  This hook keeps team logic reusable so pages/components
  do not need to directly manage API calls.
*/
function useTeams() {
  const [teams, setTeams] =
    useState([]);

  const [isLoadingTeams, setIsLoadingTeams] =
    useState(false);

  const [teamError, setTeamError] =
    useState("");

  /*
    📥 Load saved teams from backend.

    Protected route:
    requires a valid JWT token.
  */
  const loadTeams = async () => {
    try {
      setIsLoadingTeams(true);
      setTeamError("");

      const data = await fetchTeams();

      /*
        🛡️ Safety check

        Teams should always be an array.
        If backend sends { error: "Invalid token" },
        we keep React from crashing.
      */
      if (!Array.isArray(data)) {
        setTeams([]);

        setTeamError(
          data.error || "Unable to load teams right now."
        );

        return;
      }

      setTeams(data);
    } catch (error) {
      setTeams([]);

      setTeamError(
        "Unable to load teams right now."
      );
    } finally {
      setIsLoadingTeams(false);
    }
  };

  /*
    🧑‍🤝‍🧑 Create a new team.
  */
  const handleCreateTeam = async (teamName) => {
    try {
      setTeamError("");

      const newTeam =
        await createTeam(teamName);

      /*
        🛡️ Safety check

        If the backend returns an error object,
        do not add it to the teams array.
      */
      if (newTeam.error) {
        setTeamError(newTeam.error);

        return;
      }

      setTeams((prevTeams) => [
        newTeam,
        ...prevTeams,
      ]);
    } catch (error) {
      setTeamError(
        "Unable to create team right now."
      );
    }
  };

  /*
    ❌ Delete a team.
  */
  const handleDeleteTeam = async (teamId) => {
    try {
      setTeamError("");

      const deletedTeam =
        await deleteTeam(teamId);

      if (deletedTeam.error) {
        setTeamError(deletedTeam.error);

        return;
      }

      setTeams((prevTeams) =>
        prevTeams.filter(
          (team) => team.id !== teamId
        )
      );
    } catch (error) {
      setTeamError(
        "Unable to delete team right now."
      );
    }
  };

  /*
  ❌ Remove Pokémon from a team.
*/
const handleRemovePokemon = async (
  teamId,
  pokemonEntryId
) => {
  try {
    setTeamError("");

    const deletedPokemon =
      await removePokemonFromTeam(
        teamId,
        pokemonEntryId
      );

    if (deletedPokemon.error) {
      setTeamError(deletedPokemon.error);
      return;
    }

    await loadTeams();
  } catch (error) {
    setTeamError(
      "Unable to remove Pokémon right now."
    );
  }
};


  useEffect(() => {
    loadTeams();
  }, []);

  return {
    teams,
    isLoadingTeams,
    teamError,
    handleCreateTeam,
    handleDeleteTeam,
    loadTeams,
    handleRemovePokemon,
  };
}

export default useTeams;