/*
  🧠 SearchBar component

  This component controls the search input.
  The state itself still lives in App.jsx.
*/

function SearchBar({ searchTerm, setSearchTerm }) {
  return (

    // 🔎 Search input field
    <input
      className="search-bar"
      type="text"
      placeholder="Search Pokémon by name or number..."

      // 📦 Current value from state
      value={searchTerm}

      /*
        🧠 Update state every time user types.

        e.target.value =
        whatever the user typed into the input
      */
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;