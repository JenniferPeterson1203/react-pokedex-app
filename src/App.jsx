import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import PokemonPage from "./pages/PokemonPage";

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

    </Routes>
  );
}

export default App;