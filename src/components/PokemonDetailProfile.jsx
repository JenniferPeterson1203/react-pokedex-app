import TypeEffectiveness from "./TypeEffectiveness";

/*
  🔍 PokemonDetailProfile

  This is the full Pokémon profile used on the dedicated
  /pokemon/:name page.

  The home page is a quick scan.
  This page gives a fuller Pokédex report.
*/
function PokemonDetailProfile({ pokemon }) {
  if (!pokemon) {
    return (
      <div className="pokemon-detail-profile">
        <p>Loading Pokémon profile...</p>
      </div>
    );
  }

  const officialArtwork =
    pokemon.sprites.other["official-artwork"].front_default;

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
    </div>
  );
}

export default PokemonDetailProfile;