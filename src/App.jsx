import { useEffect, useState } from "react";

function App() {
  // Stores Pokémon list
  const [pokemons, setPokemons] = useState([]);
  // Stores clicked Pokémon details
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  // 🌙 Tracks dark mode
  const [darkMode, setDarkMode] = useState(false);
  //  Current page the user is on
const [currentPage, setCurrentPage] = useState(1);

// How many Pokémon per page
const itemsPerPage = 12;


  // Runs once when the component loads
  useEffect(() => {
    // async function inside useEffect (this is best practice)
    const fetchPokemon = async () => {
     
       

        // fecth call to the API for only 151 pokemons (there seems to be a count of 1350 pokemons)
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        // if request fails (like 404/500)
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }

const data = await response.json();

/*
  🧠 data.results contains:
  [
    { name, url },
    { name, url }
  ]
*/

/*
  ⚡ Promise.all lets us fetch MANY Pokémon
  at the same time instead of one-by-one
*/
const detailedPokemon = await Promise.all(
  data.results.map(async (pokemon) => {

    // 🌐 fetch EACH Pokémon's details
    const response = await fetch(pokemon.url);

    // 📦 convert response to JSON
    const pokemonData = await response.json();

    // 💾 return full Pokémon object
    return pokemonData;
  })
);

/*
  💾 Save FULL Pokémon data into state
*/
setPokemons(detailedPokemon)       
      };

    fetchPokemon();
  }, []); // empty array => this dependency makes it where it run only once on page load



/*
  Pagination math:

  We calculate which Pokémon to show
  based on the current page.
*/

// index of last Pokémon on page
const lastIndex = currentPage * itemsPerPage;

// index of first Pokémon on page
const firstIndex = lastIndex - itemsPerPage;

// slice out only Pokémon for current page
const currentPokemon = pokemons
  .filter((pokemon) => {
    // 🔎 keep your search filter working
    if (searchTerm === "") return true;

    return (
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm)
    );
  })
  .slice(firstIndex, lastIndex);

// RENDER to the PAGE
  return (
  <div className={darkMode ? "app dark" : "app"}>
<div className="header">
  <h1>NYC Pokédex</h1>

  <input
  className="search-bar"
  type="text"
  placeholder="Search Pokémon by name or number..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

  <button
    className="theme-btn"
    onClick={() => setDarkMode(!darkMode)}
  >
    {darkMode ? "☀️" : "🌙"}
  </button>
</div>

    {/* Pokemon detail modal */} 
    {/* here we are using && to say only show the modal if a pokemon was selected */}
    {selectedPokemon && (
      <div className="modal-overlay">
        <div className="pokemon-modal">

          {/* CLOSE BUTTON */}
          <button className="close-btn"
            onClick={()=> setSelectedPokemon(null)}
            >
            X

          </button>
          {/*  POKEMON IMAGE*/}
          <img
          src={selectedPokemon.sprites.front_default}
          alt={selectedPokemon.name}
          />
          {/* POKEMON NAME */}
          <h2>
            {selectedPokemon.name}
          </h2>
          {/* PoKemon height */}
          <p>
            <strong>Height: </strong>
              {selectedPokemon.height}
          </p>
          {/* Pokemon Weight */}
            <p>
            <strong>Weight: </strong>
              {selectedPokemon.weight}
          </p>
          {/* POKEMON TYPEs*/}
          <p>
            <strong>Type: </strong>
            {selectedPokemon.types.map((type)=> type.type.name).join(", ")}
          </p>
        </div>
      </div>
    )}

    {/* Pokédex grid container */}
    <div className="pokedex-shell">
      <div className="pokedex-screen">
        <div className="pokedex-grid">

{/* Rendering ONLY the Pokémon for the current page */}
{currentPokemon.map((pokemon, index) => (
 // Each Pokémon card
<div className="pokemon-card" key={index}
        // When clicked, store this Pokémon in state
    // so the modal can display its details
        onClick={() => setSelectedPokemon(pokemon)} //"give me the url property from this Pokémon object"
        >
           {/* 🖼 Pokémon image from API data */}
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
          <p className="pokemon-name">{pokemon.name}</p>
        </div>
      ))}
      </div>

    </div>
    </div>
  </div>
  );
}

export default App;