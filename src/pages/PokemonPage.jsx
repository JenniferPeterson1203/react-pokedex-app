import { useState } from "react";
import AppLayout from "../components/AppLayout";

function PokemonPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={null}
    >
      <div className="pokemon-page">
        <h1>Pokemon Page</h1>
      </div>
    </AppLayout>
  );
}

export default PokemonPage;