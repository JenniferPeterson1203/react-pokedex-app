import {
  createContext,
  useContext,
  useState,
} from "react";

/*
  🌙 Theme Context

  Provides global dark/light mode state
  across the entire app.
*/

// create context
const ThemeContext =
  createContext();

/*
  🌎 Theme Provider
*/
export function ThemeProvider({
  children,
}) {

  // shared theme state
  const [darkMode, setDarkMode] =
    useState(false);

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}

/*
  🧠 Custom hook for easy access
*/
export function useTheme() {
  return useContext(
    ThemeContext
  );
}