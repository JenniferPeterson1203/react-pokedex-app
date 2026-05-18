/*
  🧠 This component displays ONE Pokémon card.

  Props are data passed from App.jsx
*/

function PokemonCard({ pokemon, setSelectedPokemon }) { //data (props) coming in from App.jsx
  return (

    // 🎴 Individual Pokémon card
    <div
      className="pokemon-card"

      // 🖱️ Open modal when card is clicked
      onClick={() => setSelectedPokemon(pokemon)}
    >

      {/* 🖼 Pokémon image */}
      <img
        className="pokemon-image"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      {/* 🔢 Pokédex number */}
      <p className="pokemon-number">
        #{pokemon.id}
      </p>

      {/* 📛 Pokémon name */}
      <p className="pokemon-name">
        {pokemon.name}
      </p>

    </div>
  );
}

export default PokemonCard;