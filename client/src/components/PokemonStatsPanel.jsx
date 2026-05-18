import { Link } from "react-router-dom";
import TypeEffectiveness from "./TypeEffectiveness";


function PokemonStatsPanel({ selectedPokemon, isScanning }) {
  if (!selectedPokemon) {
    return (
      <div className="pokemon-stats-panel">
        <p>Select a Pokémon</p>
      </div>
    );
  }

  return (
    <div className={isScanning ? "pokemon-stats-panel scanning" : "pokemon-stats-panel"}>
{/* 🖼️ Main Pokémon image */}

<Link
  to={`/pokemon/${selectedPokemon.name}`}
  aria-label={`View details for ${selectedPokemon.name}`}
>
<img
  className="stats-image"
  src={selectedPokemon.sprites.front_default}
  alt={selectedPokemon.name}
/>

</Link>

{/* ✨ Extra sprite previews */}
<div className="sprite-gallery">
  <img
    src={selectedPokemon.sprites.front_default}
    alt={`${selectedPokemon.name} front`}
  />

  <img
    src={selectedPokemon.sprites.front_shiny}
    alt={`${selectedPokemon.name} shiny`}
  />

  <img
    src={selectedPokemon.sprites.back_default}
    alt={`${selectedPokemon.name} back`}
  />
</div>

      {/* Pokémon name */}
      <h2>{selectedPokemon.name}</h2>

      {/* Pokédex number */}
      <p>#{selectedPokemon.id}</p>

      {/* Pokémon type badges */}
      <div className="type-badges">
        {selectedPokemon.types.map((type) => (
          <span className="type-badge" key={type.type.name}>
            {type.type.name}
          </span>
        ))}
      </div>

      <p>Height: {selectedPokemon.height}</p>
      <p>Weight: {selectedPokemon.weight}</p>

      {/* Pokémon abilities */}
      <div className="ability-section">
        <h3>Abilities</h3>

        <div className="ability-badges">
          {selectedPokemon.abilities.map((ability) => (
            <span
              className="ability-badge"
              key={ability.ability.name}
            >
              {ability.ability.name}
            </span>
          ))}
        </div>
      </div>

      {/* Pokémon base stats */}
      <div className="stats-container">
        {selectedPokemon.stats.map((stat) => (
          <div className="stat-row" key={stat.stat.name}>
            <div className="stat-header">
              <span className="stat-name">{stat.stat.name}</span>
              <span className="stat-value">{stat.base_stat}</span>
            </div>

            <div className="stat-bar-bg">
              <div
                className="stat-bar-fill"
                style={{ width: `${stat.base_stat}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <TypeEffectiveness
  selectedPokemon={selectedPokemon}
/>
    </div>
    
  );
}

export default PokemonStatsPanel;