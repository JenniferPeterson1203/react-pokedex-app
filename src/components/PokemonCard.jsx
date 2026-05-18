/*
  🧠 This component displays ONE Pokémon card.

  Props are data passed from App.jsx
*/

function PokemonCard({  pokemon,
  setSelectedPokemon,
  favoriteIds,
  toggleFavorite,}) { //data (props) coming in from App.jsx

// ❤️ Check if this Pokémon is already favorited
const isFavorite = favoriteIds.includes(pokemon.id);

  return (

    // 🎴 Individual Pokémon card
    <div
      className="pokemon-card"

      // 🖱️ Open modal when card is clicked
      onClick={() => setSelectedPokemon(pokemon)}
    >
        <button
  className={isFavorite ? "favorite-btn active" : "favorite-btn"}
  onClick={(e) => {
    // 🛑 Stops the card click from also opening/selecting the Pokémon
    e.stopPropagation();

    // ❤️ Add or remove this Pokémon from favorites
    toggleFavorite(pokemon.id);
  }}
>
  {isFavorite ? "❤️" : "♡"}
</button>

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