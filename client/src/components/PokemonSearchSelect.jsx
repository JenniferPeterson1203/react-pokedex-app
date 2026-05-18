import { useState } from "react";

/*
  🔎 PokemonSearchSelect

  Lets the user type a Pokémon name
  and choose from matching results.
*/
function PokemonSearchSelect({
  label,
  pokemons,
  selectedName,
  setSelectedName,
}) {
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const matchingPokemon = pokemons
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="pokemon-search-select">
      <label>{label}</label>
<div className="search-input-wrapper">

  <input
    type="text"
    value={searchText}
    placeholder="Type Pokémon name..."
    onFocus={() => setShowSuggestions(true)}
    onChange={(e) => {
      setSearchText(e.target.value);
      setShowSuggestions(true);
    }}
  />

  {/* ❌ Clear search button */}
  {searchText && (
    <button
      type="button"
      className="clear-search-btn"
      aria-label="Clear Pokémon search"
      onClick={() => {
        setSearchText("");
        setSelectedName("");
        setShowSuggestions(false);
      }}
    >
      ✕
    </button>
  )}

</div>

      {searchText && showSuggestions && (
        <div className="search-suggestions">
          {matchingPokemon.map((pokemon) => (
            <button
              key={pokemon.id}
              type="button"
              onClick={() => {
                setSelectedName(pokemon.name);
                setSearchText(pokemon.name);

                // 🧹 Hide suggestions after choosing a Pokémon
                setShowSuggestions(false);
              }}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />

              <span>{pokemon.name}</span>
            </button>
          ))}
        </div>
      )}

      {selectedName && (
        <p className="selected-search-name">
          Selected: {selectedName}
        </p>
      )}
    </div>
  );
}

export default PokemonSearchSelect;