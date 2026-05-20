import { createContext, useContext, useState } from "react";
import {
  loadDemoUser,
  saveDemoUser,
  clearDemoUser,
} from "../../utils/authStorage";


/*
  🔐 Authentication Context

  Controls global authentication state
  across the application.

  Current Features:
  - guest/demo authentication
  - persistent auth state
  - shared auth context
  - logout handling

  Future Features:
  - JWT authentication
  - protected routes
  - trainer dashboards
  - backend session validation
*/

const AuthContext = createContext();

/*
  🌐 Auth Provider

  Wraps the application and shares:
  - authenticated user
  - login/logout functions
  - future auth utilities
*/
function AuthProvider({ children }) {

  /*
    👤 Current authenticated user

    Starts by loading persisted
    demo auth state from localStorage.
  */
  const [user, setUser] =
    useState(loadDemoUser);

  /*
    🔓 Login handler

    Right now:
    - saves demo user locally

    Later:
    - will validate backend auth
    - store JWT tokens
    - sync user session
  */
  const login = (userData) => {
    saveDemoUser(userData);

    setUser(userData);
  };

  /*
    🚪 Logout handler

    Clears persisted auth state
    and returns app to guest mode.
  */
  const logout = () => {
    clearDemoUser();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
  🪝 Custom auth hook

  Makes authentication state
  accessible throughout the app.
*/

const useAuth = () => {
  return useContext(AuthContext);
};

export {
  AuthProvider,
  useAuth,
};