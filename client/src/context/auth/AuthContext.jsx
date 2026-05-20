import { createContext, useContext, useState } from "react";

/*
  🔐 Authentication Context

  Right now:
  - supports guest mode only

  Later:
  - will support JWT login
  - authenticated users
  - protected routes
  - persistent sessions
*/

const AuthContext = createContext();

/*
  🌐 Auth Provider

  Wraps the app and provides:
  - current user
  - auth state
  - login/logout functions
*/
function AuthProvider({ children }) {

  /*
    👤 Current authenticated user

    null = guest mode
  */
  const [user, setUser] = useState(null);

  /*
    🔓 Login placeholder

    Later this will:
    - validate JWT
    - store token
    - fetch user data
  */
  const login = (userData) => {
    setUser(userData);
  };

  /*
    🚪 Logout placeholder
  */
  const logout = () => {
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

  Makes auth state easier to access
  throughout the app.
*/
const useAuth = () => {
  return useContext(AuthContext);
};

export {
  AuthProvider,
  useAuth,
};