import { Link, NavLink } from "react-router-dom";

import TypingTitle from "./TypingTitle";
import pokeball from "../assets/pokeball.png";

/*
  🧱 AppLayout component

  This creates the shared layout used across pages:
  - top Pokéball bar
  - left sidebar navigation
  - main content area
  - optional right sidebar
*/
function AppLayout({
  children,
  rightSidebar,
  darkMode,
  setDarkMode,
}) {
  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* 🔴🟡🟢 Shared top bar */}
      <div className="pokedex-top">
        <div className="lights">
          <span className="light red"></span>
          <span className="light yellow"></span>
          <span className="light green"></span>
        </div>

    <div className="top-controls">

  <Link to="/" aria-label="Go to home page">
    <img
      src={pokeball}
      alt="Pokéball"
      className="pokeball-logo"
    />
  </Link>

  {/* 🌙 Theme toggle */}
  <button
    className="top-theme-btn"
    onClick={() => setDarkMode(!darkMode)}
    aria-label="Toggle light and dark mode"
  >
    {darkMode ? "☀️" : "🌙"}
  </button>

</div>
      </div>

      <div className="app-layout">

        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <TypingTitle />

          <nav className="sidebar-nav" aria-label="Main navigation">
            <NavLink to="/" className="sidebar-nav-link">
              Home
            </NavLink>

            <NavLink to="/favorites" className="sidebar-nav-link">
              Favorites
            </NavLink>

            <NavLink to="/compare" className="sidebar-nav-link">
            Compare
            </NavLink>
          </nav>  
        </aside>

        {/* MAIN PAGE CONTENT */}
        <main className="main-content">
          {children}
        </main>

{/* RIGHT SIDEBAR */}
{rightSidebar && (
  <aside className="right-sidebar">
    {rightSidebar}
  </aside>
)}

      </div>
    </div>
  );
}

export default AppLayout;