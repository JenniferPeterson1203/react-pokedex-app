import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import PokemonStatsPanel from "./components/PokemonStatsPanel";

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
const itemsPerPage = 15;


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
  Save FULL Pokémon data into state
*/
setPokemons(detailedPokemon)       
      };

    fetchPokemon();
  }, []); // empty array => this dependency makes it where it run only once on page load


/*
  🧠 Reset pagination when search changes

  Example:
  User searches "pikachu"

  We automatically move them back
  to page 1 of filtered results.
*/
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

/*
  Pagination math:

  We calculate which Pokémon to show
  based on the current page.
*/

// index of last Pokémon on page
const lastIndex = currentPage * itemsPerPage;

// index of first Pokémon on page
const firstIndex = lastIndex - itemsPerPage;

/*
  🔎 Filter Pokémon based on search input
*/
const filteredPokemon = pokemons.filter((pokemon) => {

  // show all Pokémon if search is empty
  if (searchTerm === "") return true;

  return (
    pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    pokemon.id
      .toString()
      .includes(searchTerm)
  );
});


/*
  🧠 Only show Pokémon for current page
*/
const currentPokemon = filteredPokemon.slice(
  firstIndex,
  lastIndex
);

// RENDER to the PAGE
return (
  <div className={darkMode ? "app dark" : "app"}>

    
  {/* 🔴🟡🟢 Pokédex indicator lights
  These mimic a real handheld device */}

<div className="pokedex-top">
  <div className="lights">
    <span className="light red"></span>
    <span className="light yellow"></span>
    <span className="light green"></span>
  </div>

  <h2 className="device-title">Jennifer's Pokédex</h2>
</div>


<div className="app-layout">
  
  {/* LEFT SIDEBAR */}
  <aside className="sidebar">
    <h2>Jennifer's Pokédex</h2>

    <p className="sidebar-subtext">
      NYC Neon Interface
    </p>

    {/* optional future nav items */}
    <div className="sidebar-links">
      <p>All Pokémon</p>
      <p>Favorites</p>
    </div>
  </aside>

  {/* RIGHT MAIN AREA */}
  <main className="main-content">


{/* 🕹️ Pokédex device shell */}
<div className="pokedex-device">
<div className="header">
  <h1>Jennifer's Pokédex</h1>

{/* DARK & LIGHT MODE BUTTON */}
  <button
    className="theme-btn"
    onClick={() => setDarkMode(!darkMode)}
    >
    {darkMode ? "☀️" : "🌙"}
  </button>
</div>



    {/* Pokédex grid container */}
    <div className="pokedex-shell">
      
  {/* 🖥️ Pokédex SCREEN
  This simulates the display area of a handheld device */}
  <div className="pokedex-screen">
     {/*  Main dashboard layout
   Left = Pokémon grid
   Right = Pokémon details panel */}

<div className="dashboard-layout">

  {/* 🖥️ MAIN POKÉDEX DISPLAY */}
<PokemonStatsPanel selectedPokemon={selectedPokemon} />

  {/* 🎴 Pokémon Grid */}
  <div className="pokedex-screen-frame">

    <div className="pokedex-grid">
      {currentPokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
      ))}
    </div>

  </div>

</div>



{/* 🎮 Pokédex Controls Panel */}
<div className="pokedex-controls">
  <SearchBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    />
{/* Pagination controls component */}
  <Pagination
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    pokemons={filteredPokemon}
    itemsPerPage={itemsPerPage}
    />

</div>

  </div>
    </div>
    </div>
    </main>
    </div>
  </div>
  );
}

export default App;