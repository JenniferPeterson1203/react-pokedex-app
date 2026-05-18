/*
  🧠 This component displays ONE Pokémon card.

  Props are data passed from App.jsx
*/

function PokemonCard({   pokemon,
  setSelectedPokemon,
  favoriteIds,
  toggleFavorite,
  selectedPokemon,}) { //data (props) coming in from App.jsx

// ❤️ Check if this Pokémon is already favorited
const isFavorite = favoriteIds.includes(pokemon.id);
// ✨ Checks if this card is the selected Pokémon
const isSelected = selectedPokemon?.id === pokemon.id;

  return (

<div
  className={isSelected ? "pokemon-card selected-card" : "pokemon-card"}
  tabIndex="0"
  role="button"
  aria-label={`Select ${pokemon.name}`}
  onClick={() => setSelectedPokemon(pokemon)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      setSelectedPokemon(pokemon);
    }
  }}
>
<button
  className={isFavorite ? "favorite-btn active" : "favorite-btn"}
  aria-label={
    isFavorite
      ? `Remove ${pokemon.name} from favorites`
      : `Add ${pokemon.name} to favorites`
  }
  onClick={(e) => {
    e.stopPropagation();
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