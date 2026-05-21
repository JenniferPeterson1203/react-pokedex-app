import TypeEffectiveness from "./TypeEffectiveness";
import MoveInsights from "../components/MoveInsights";
import { addPokemonToTeam }
  from "../api/teamsApi";
import useTeams
  from "../hooks/useTeams";


/*
  🔍 PokemonDetailProfile

  This is the full Pokémon profile used on the dedicated
  /pokemon/:name page.

  The home page is a quick scan.
  This page gives a fuller Pokédex report.
*/
function PokemonDetailProfile({ pokemon }) {
  const {
  teams,
} = useTeams();

  if (!pokemon) {
    return (
      <div className="pokemon-detail-profile">
        <p>Loading Pokémon profile...</p>
      </div>
    );
  }

  const officialArtwork =
    pokemon.sprites.other["official-artwork"].front_default;


    /*
  🧬 Add Pokémon to selected team
*/
const handleAddToTeam =
  async (teamId) => {

  try {

    const response =
      await addPokemonToTeam(
        teamId,
        pokemon
      );

    /*
      🛡️ Backend validation errors

      Example:
      - duplicate Pokémon
      - more than 6 Pokémon
    */
    if (response.error) {

      alert(response.error);

      return;
    }

    /*
      ✅ Successful add
    */
    alert(
      `${pokemon.name} added to team`
    );

  } catch (error) {

    console.error(
      "Failed to add Pokémon to team",
      error
    );
  }
};

  return (
    <div className="pokemon-detail-profile">
      {/* 🦸 Hero area */}
      <div className="detail-hero">
        <img
          className="detail-artwork"
          src={officialArtwork || pokemon.sprites.front_default}
          alt={pokemon.name}
        />

        <div className="detail-hero-text">
          <p className="detail-id">#{pokemon.id}</p>

          <h1>{pokemon.name}</h1>

          <div className="type-badges">
            {pokemon.types.map((type) => (
              <span className="type-badge" key={type.type.name}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 📋 Profile details */}
      <div className="detail-grid">
        <div className="detail-card sprite-detail-card">
          <h3>Profile</h3>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base XP: {pokemon.base_experience}</p>
        </div>

        <div className="detail-card sprite-detail-card">
          <h3>Abilities</h3>

          <div className="ability-badges">
            {pokemon.abilities.map((ability) => (
              <span className="ability-badge" key={ability.ability.name}>
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-card sprite-detail-card">

  <h3>
    Team Builder
  </h3>

  {teams.length === 0 ? (

    <p>
      Create a team first in your dashboard.
    </p>

  ) : (

    <div className="team-builder-list">

      {teams.map((team) => (

        <button
          key={team.id}
          className="auth-btn"
          onClick={() =>
            handleAddToTeam(team.id)
          }
        >
          Add to {team.team_name}
        </button>

      ))}

    </div>

  )}

</div>

        <div className="detail-card sprite-detail-card">
          <h3>Sprites</h3>

          <div className="sprite-gallery">
            <img
              src={pokemon.sprites.front_default}
              alt={`${pokemon.name} front`}
            />

            <img
              src={pokemon.sprites.front_shiny}
              alt={`${pokemon.name} shiny`}
            />

            <img
              src={pokemon.sprites.back_default}
              alt={`${pokemon.name} back`}
            />
          </div>
        </div>

        <div className="detail-card sprite-detail-card">
          <h3>Battle Analyzer</h3>

          <TypeEffectiveness selectedPokemon={pokemon} />
        </div>
      </div>
          <MoveInsights pokemon={pokemon} />
    </div>
  );
}

export default PokemonDetailProfile;