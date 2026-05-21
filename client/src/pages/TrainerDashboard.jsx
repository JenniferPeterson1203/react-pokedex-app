import { useState } from "react";
import { Navigate } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth/AuthContext";
import useTeams from "../hooks/useTeams";

/*
  🧑‍💻 TrainerDashboard

  Protected trainer area for authenticated users.

  Current features:
  - create teams
  - view saved teams
  - preview first 3 Pokémon in each team
  - delete teams

  Future features:
  - full team detail page
  - saved notes
  - battle analytics
  - achievement badges
*/
function TrainerDashboard() {
  const [teamName, setTeamName] =
    useState("");

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const { user } = useAuth();

  const {
    teams,
    isLoadingTeams,
    teamError,
    handleCreateTeam,
    handleDeleteTeam,
  } = useTeams();

  if (!user) {
    return <Navigate to="/login" />;
  }

  /*
    🧑‍🤝‍🧑 Submit new team

    Creates a team using the name
    entered by the user.
  */
  const handleTeamSubmit = (e) => {
    e.preventDefault();

    if (!teamName.trim()) {
      return;
    }

    handleCreateTeam(teamName);

    setTeamName("");
  };

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={null}
    >
      <div className="trainer-dashboard">
        <div className="dashboard-hero">
          <h1>Trainer Dashboard</h1>

          <p>
            Welcome back, {user.username}
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Favorite Pokémon</h2>

            <p>
              Track and manage your saved favorites.
            </p>
          </div>

          <div className="dashboard-card">
            <h2>Teams</h2>

            <p>
              Build strategic Pokémon teams and
              analyze type balance.
            </p>

            <form
              className="team-form"
              onSubmit={handleTeamSubmit}
            >
              <input
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) =>
                  setTeamName(e.target.value)
                }
              />

              <button
                className="auth-btn"
                type="submit"
              >
                Create Team
              </button>
            </form>

            {isLoadingTeams && (
              <p>Loading teams...</p>
            )}

            {teamError && (
              <p className="auth-error">
                {teamError}
              </p>
            )}

            <div className="team-list">
              {teams.map((team) => {
                /*
                  🛡️ Safety fallback

                  Newly created teams may not have
                  a pokemon array until teams reload
                  from the backend.
                */
                const teamPokemon =
                  team.pokemon || [];

                return (
                  <div
                    className="team-row"
                    key={team.id}
                  >
                    <div className="team-info">
                      <strong className="team-name">
                        {team.team_name}
                      </strong>

                      <p className="team-count">
                        {teamPokemon.length}/6 Pokémon
                      </p>

                      {teamPokemon.length > 0 ? (
                        <div className="team-pokemon-list">
                          {teamPokemon
                            .slice(0, 3)
                            .map((pokemon) => (
                              <span
                                className="team-pokemon-pill"
                                key={pokemon.id}
                              >
                                {pokemon.pokemon_name}
                              </span>
                            ))}

                          {teamPokemon.length > 3 && (
                            <span className="team-more-pill">
                              +{teamPokemon.length - 3} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="team-empty">
                          No Pokémon added yet.
                        </p>
                      )}
                    </div>

                    <button
                      className="auth-btn team-delete-btn"
                      onClick={() =>
                        handleDeleteTeam(team.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Battle Analytics</h2>

            <p>
              Future battle insights and combat
              tracking tools.
            </p>
          </div>

          <div className="dashboard-card">
            <h2>Trainer Achievements</h2>

            <p>
              Earn badges and unlock advanced
              trainer milestones.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default TrainerDashboard;