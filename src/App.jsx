import { useEffect, useState } from "react";

function App() {
  // Stores Pokémon list
  const [pokemons, setPokemons] = useState([]);
  // Stores clicked Pokémon details
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  // 🌙 Tracks dark mode
  const [darkMode, setDarkMode] = useState(false);


  // Runs once when the component loads
  useEffect(() => {
    // async function inside useEffect (this is best practice)
    const fetchPokemon = async () => {
     
       

        // fecth call to the API for only 151 pokemons (there seems to be a count of 1350 pokemons)
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10"
        );

        // if request fails (like 404/500)
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }

        // convert the response to JSON and save it to a variable called data
        const data = await response.json();

        // save Pokémon list into state
        setPokemons(data.results);       
      }
    ;

    fetchPokemon();
  }, []); // empty array => this dependency makes it where it run only once on page load




  // Fetch call for details of ONE Pokémon
const fetchPokemonDetails = async (url) => {
  try {
    // fetch specific Pokémon data
    const response = await fetch(url);

    // convert to JSON
    const data = await response.json();

    // save detailed Pokémon data
    setSelectedPokemon(data);

    console.log(data); // this is helpful for learning/debugging
  } catch (error) {
    console.log("Error fetching Pokémon details:", error);
  }
};

  return (
  <div className={darkMode ? "app dark" : "app"}>
<div className="header">
  <h1>NYC Pokédex</h1>

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
      {/* USE MAP TO LIST THE POKEMONS from the array we are storing the pokemons in */}
      {pokemons.map((pokemon, index) => (
        <div className="pokemon-card" key={index}
        // here is where react is saying "Take THIS Pokémon's url and pass it into the fetchPokemonDetails function"
        //this is where we are doing the actual function call and passing the url argument
        onClick={() => fetchPokemonDetails(pokemon.url)} //"give me the url property from this Pokémon object"
        >
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