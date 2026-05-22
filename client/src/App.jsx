import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import PokemonPage from "./pages/PokemonPage";
import ComparePage from "./pages/ComparePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TrainerDashboard from "./pages/TrainerDashboard";
import TeamDetailPage from "./pages/TeamDetailPage";

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

      {/* LOGIN PAGE */}
      <Route
      path="/login"
      element={<LoginPage />}
      />
      
            {/* Singup Page */}
            <Route
            path="/signup"
            element={<SignupPage />}
            />

{/* Trainer */}
<Route
  path="/dashboard"
  element={<TrainerDashboard />}
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

      {/* Team Detail Page */}
      <Route
  path="/teams/:teamId"
  element={<TeamDetailPage />}
/>

    </Routes>
  );
}

export default App;