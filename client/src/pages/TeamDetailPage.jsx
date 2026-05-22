import { Link, Navigate, useParams } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import PageState from "../components/PageState";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth/AuthContext";
import useTeams from "../hooks/useTeams";
import useTeamPokemonData from "../hooks/useTeamPokemonData";
import { calculateTeamTypes } from "../utils/teamAnalytics";

/*
  🧑‍🤝‍🧑 TeamDetailPage

  Shows one saved team in full detail.
*/
function TeamDetailPage() {
  const { teamId } = useParams();

  const { darkMode, setDarkMode } = useTheme();

  const { user } = useAuth();

  const { teams, isLoadingTeams, teamError, handleRemovePokemon } = useTeams();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const selectedTeam = teams.find((team) => team.id === Number(teamId));

  const teamPokemon = selectedTeam?.pokemon || [];

  const { pokemonData, isLoadingTeamData } = useTeamPokemonData(teamPokemon);

  const teamTypes = calculateTeamTypes(pokemonData);

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={null}
    >
      <PageState
        isLoading={isLoadingTeams}
        errorMessage={teamError}
        loadingMessage="Loading team roster..."
      >
        <div className="team-detail-page">
          <Link className="auth-link" to="/dashboard">
            ← Back to Dashboard
          </Link>

          {!selectedTeam ? (
            <div className="dashboard-card">
              <h1>Team not found</h1>

              <p>
                This team may have been deleted or does not belong to this
                account.
              </p>
            </div>
          ) : (
            <>
              <div className="dashboard-hero">
                <div className="dashboard-card team-analytics-card">
                  <h2>Team Type Analytics</h2>

                  {isLoadingTeamData ? (
                    <p>Analyzing team types...</p>
                  ) : Object.keys(teamTypes).length === 0 ? (
                    <p>Add Pokémon to this team to see type analytics.</p>
                  ) : (
                    <div className="team-type-list">
                      {Object.entries(teamTypes).map(([type, count]) => (
                        <span className={`type-badge type-${type}`} key={type}>
                          {type}: {count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h1>{selectedTeam.team_name}</h1>

                <p>{teamPokemon.length}/6 Pokémon saved</p>
              </div>

              <div className="team-detail-grid">
                {teamPokemon.length === 0 ? (
                  <div className="dashboard-card">
                    <h2>No Pokémon yet</h2>

                    <p>Visit a Pokémon detail page and add one to this team.</p>
                  </div>
                ) : (
                  teamPokemon.map((pokemon) => {
                    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id}.png`;

                    return (
                      <div
                        className="dashboard-card team-detail-card"
                        key={pokemon.id}
                      >
                        <img
                          className="team-detail-sprite"
                          src={spriteUrl}
                          alt={pokemon.pokemon_name}
                        />

                        <h2>{pokemon.pokemon_name}</h2>

                        <div className="team-detail-actions">
                          <Link
                            className="auth-btn"
                            to={`/pokemon/${pokemon.pokemon_name}`}
                          >
                            View Pokémon
                          </Link>

                          <button
                            className="auth-btn team-delete-btn"
                            onClick={() =>
                              handleRemovePokemon(selectedTeam.id, pokemon.id)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </PageState>
    </AppLayout>
  );
}

export default TeamDetailPage;
