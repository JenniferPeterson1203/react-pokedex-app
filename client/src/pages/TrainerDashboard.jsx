import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

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
  const [teamName, setTeamName] = useState("");

  const { darkMode, setDarkMode } = useTheme();

  const { user } = useAuth();

  const {
    teams,
    isLoadingTeams,
    teamError,
    handleCreateTeam,
    handleDeleteTeam,
    handleRemovePokemon,
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

          <p>Welcome back, {user.username}</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Teams</h2>

            <p>Build strategic Pokémon teams and analyze type balance.</p>

            <form className="team-form" onSubmit={handleTeamSubmit}>
              <input
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />

              <button className="auth-btn" type="submit">
                Create Team
              </button>
            </form>

            {isLoadingTeams && <p>Loading teams...</p>}

            {teamError && <p className="auth-error">{teamError}</p>}

            <div className="team-list">
              {teams.map((team) => {
                /*
                  🛡️ Safety fallback

                  Newly created teams may not have
                  a pokemon array until teams reload
                  from the backend.
                */
                const teamPokemon = team.pokemon || [];

                return (
                  <div className="team-row" key={team.id}>
                    <div className="team-info">
                      <strong className="team-name">{team.team_name}</strong>

                      <p className="team-count">
                        {teamPokemon.length}/6 Pokémon
                      </p>

                      <div className="team-party-slots">
                        {Array.from({ length: 6 }).map((_, index) => {
                          const pokemon = teamPokemon[index];

                          return (
                            <span
                              key={index}
                              className={
                                pokemon
                                  ? "team-party-ball filled"
                                  : "team-party-ball empty"
                              }
                              title={
                                pokemon ? pokemon.pokemon_name : "Empty slot"
                              }
                            >
                              <span className="pokeball-center"></span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="team-actions">
                      <Link
                        className="auth-btn team-view-btn"
                        to={`/teams/${team.id}`}
                      >
                        View Team
                      </Link>

                      <button
                        className="auth-btn team-delete-btn"
                        onClick={() => handleDeleteTeam(team.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="dashboard-card construction-card">
            <div className="construction-header">
              <span className="construction-badge">IN DEVELOPMENT</span>

              <h2>Battle Analytics</h2>
            </div>

            <p className="construction-description">
              Advanced combat intelligence systems are currently under
              construction.
            </p>

            <ul className="construction-list">
              <li>⚔️ Damage tracking</li>
              <li>📊 Win/loss statistics</li>
              <li>🔥 Critical hit analysis</li>
              <li>🧬 Type matchup reports</li>
            </ul>

            <div className="construction-progress">
              <div
                className="construction-progress-fill"
                style={{ width: "45%" }}
              />
            </div>

            <p className="construction-status">System Progress: 45%</p>
          </div>

          <div className="dashboard-card construction-card">
            <div className="construction-header">
              <span className="construction-badge">COMING SOON</span>

              <h2>Trainer Achievements</h2>
            </div>

            <p className="construction-description">
              Unlock advanced trainer milestones and progression rewards.
            </p>

            <ul className="construction-list">
              <li>🏆 Gym badge system</li>
              <li>🌟 Rare trainer titles</li>
              <li>⚡ Ranked battle rewards</li>
              <li>🎖️ Seasonal progression</li>
            </ul>

            <div className="construction-progress">
              <div
                className="construction-progress-fill"
                style={{ width: "20%" }}
              />
            </div>

            <p className="construction-status">System Progress: 20%</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default TrainerDashboard;
