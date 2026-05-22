/*
  PokemonCompareCard

  Displays one Pokémon inside the compare view.
*/

function PokemonCompareCard({
  pokemon,
  opponent,
  isWinner,
  isLoser,
}) {

  if (!pokemon) {
    return (
      <div className="compare-card empty-compare">
        <p>Select a Pokémon</p>
      </div>
    );
  }

  /*
  🎨 Uses the Pokémon's first type
  to theme the compare card.
*/
const primaryType =
  pokemon.types[0].type.name;

  return (
  <div
 className={`
  compare-card
  compare-card-active
  type-${primaryType}
  ${isWinner ? "battle-card-winner" : ""}
  ${isLoser ? "battle-card-loser" : ""}
`}
    >

      {/* Pokémon image */}
      <img
        className="compare-image"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      {/* name */}
      <h2>{pokemon.name}</h2>

      {/* types */}
      <div className="type-badges">

        {pokemon.types.map((type) => (

          <span
            key={type.type.name}
            className="type-badge"
          >
            {type.type.name}
          </span>

        ))}

      </div>

      {/* stats */}
      <div className="compare-stats">
  {pokemon.stats.map((stat) => {
    const opponentStat = opponent?.stats.find(
      (item) => item.stat.name === stat.stat.name
    );

    const isWinner =
      opponentStat && stat.base_stat > opponentStat.base_stat;

    
    return (
      <div
        className={
          isWinner
            ? "compare-stat-row winning-stat"
            : "compare-stat-row"
        }
        key={stat.stat.name}
      >
        <span>{stat.stat.name}</span>
        <strong>{stat.base_stat}</strong>
      </div>
    );
  })}
</div>

    </div>
  );
}

export default PokemonCompareCard;