/*
PokemonModal component

  This component displays detailed
  information about the selected Pokémon.
*/

function PokemonModal({
  selectedPokemon,
  setSelectedPokemon,
}) {

  /*
    If no Pokémon is selected,
    render nothing.
  */
  if (!selectedPokemon) return null;

  return (

    // Dark background overlay
    <div className="modal-overlay">

      {/* Modal content box */}
      <div className="pokemon-modal">

        {/* Close modal button */}
        <button
          className="close-btn"

          //  Clear selected Pokémon
          onClick={() => setSelectedPokemon(null)}
        >
          ❌
        </button>

        {/* Pokémon image */}
        <img
          src={selectedPokemon.sprites.front_default}
          alt={selectedPokemon.name}
        />

        {/* Pokémon name */}
        <h2>
          {selectedPokemon.name}
        </h2>

        {/* Pokémon height */}
        <p>
          <strong>Height:</strong>{" "}
          {selectedPokemon.height}
        </p>

        {/* Pokémon weight */}
        <p>
          <strong>Weight:</strong>{" "}
          {selectedPokemon.weight}
        </p>

        {/* Pokémon types */}
        <p>
          <strong>Type:</strong>{" "}
          {selectedPokemon.types
            .map((type) => type.type.name)
            .join(", ")}
        </p>

      </div>
    </div>
  );
}

export default PokemonModal;