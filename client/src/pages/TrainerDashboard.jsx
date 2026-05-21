import { Navigate } from "react-router-dom";

import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/auth/AuthContext";

/*
  🧑‍💻 TrainerDashboard

  Protected trainer area for authenticated users.

  Future features:
  - saved teams
  - trainer stats
  - battle history
  - saved notes
  - achievement badges
*/
function TrainerDashboard() {

  /*
    🌙 Theme context
  */
  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  /*
    🔐 Auth context
  */
  const { user } = useAuth();

  /*
    🚫 Protect dashboard route

    Guests should not access
    trainer-only pages.
  */
  if (!user) {

    return (
      <Navigate to="/login" />
    );
  }

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={null}
    >

<div className="trainer-dashboard">

  {/* 🧑‍💻 Dashboard header */}
  <div className="dashboard-hero">

    <h1>
      Trainer Dashboard
    </h1>

    <p>
      Welcome back,
      {" "}
      {user.username}
    </p>

  </div>

  {/* 📊 Dashboard grid */}
  <div className="dashboard-grid">

    {/* ❤️ Favorite Pokémon */}
    <div className="dashboard-card">

      <h2>
        Favorite Pokémon
      </h2>

      <p>
        Track and manage your
        saved favorites.
      </p>

    </div>

    {/* 🛡️ Teams */}
    <div className="dashboard-card">

      <h2>
        Teams
      </h2>

      <p>
        Build strategic Pokémon teams
        and analyze type balance.
      </p>

    </div>

    {/* ⚔️ Battle Analytics */}
    <div className="dashboard-card">

      <h2>
        Battle Analytics
      </h2>

      <p>
        Future battle insights and
        combat tracking tools.
      </p>

    </div>

    {/* 🏆 Achievements */}
    <div className="dashboard-card">

      <h2>
        Trainer Achievements
      </h2>

      <p>
        Earn badges and unlock
        advanced trainer milestones.
      </p>

    </div>

  </div>

</div>

    </AppLayout>
  );
}

export default TrainerDashboard;