import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import PokemonPage from "./pages/PokemonPage";
import ComparePage from "./pages/ComparePage"

/*
  🌐 Main App Router

  Handles all application routes.
*/

function App() {

  return (

    <Routes>

      {/* 🏠 Main dashboard */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* ❤️ Favorites page */}
      <Route
        path="/favorites"
        element={<FavoritesPage />}
      />

      {/* 🔍 Individual Pokémon page */}
      <Route
        path="/pokemon/:name"
        element={<PokemonPage />}
      />

      {/* Compare Pokemon Page */}
      <Route
      path="/compare"
      element={<ComparePage />}
      />

    </Routes>
  );
}

export default App;