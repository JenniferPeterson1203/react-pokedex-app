function PokemonStatsPanel({ selectedPokemon }) {
  if (!selectedPokemon) {
    return (
      <div className="pokemon-stats-panel">
        <p>Select a Pokémon</p>
      </div>
    );
  }

  return (
    <div className="pokemon-stats-panel">
        <div className="stats-container">

  {selectedPokemon.stats.map((stat) => (

    <div
      className="stat-row"
      key={stat.stat.name}
    >

      {/* 📛 Stat name */}
      <div className="stat-header">

        <span className="stat-name">
          {stat.stat.name}
        </span>

        {/* 🔢 Base stat value */}
        <span className="stat-value">
          {stat.base_stat}
        </span>

      </div>

      {/* 📈 Neon progress bar */}
      <div className="stat-bar-bg">

        <div
          className="stat-bar-fill"

          /*
            🧠 Dynamic width based on stat value

            Example:
            HP = 80
            width becomes 80%
          */
          style={{
            width: `${stat.base_stat}%`,
          }}
        ></div>

      </div>

    </div>

  ))}

</div>
        
    </div>
  );
}

export default PokemonStatsPanel;



