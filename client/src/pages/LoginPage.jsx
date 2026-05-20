import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeContext";
import API_URL from "../api/api";

/*
  🔐 LoginPage

  Placeholder auth page for Phase 5.

  Right now this does NOT connect to the backend yet.
  It prepares the UI flow for future authentication.
*/
function LoginPage() {
  const { darkMode, setDarkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

/*
  🔐 Demo Login

  Uses the real backend login route with a demo account.
  This lets recruiters test authenticated features
  without creating a new account.
*/
const handleDemoLogin = async () => {
  setIsLoggingIn(true);
  setErrorMessage("");

  try {
    const response = await fetch(
      `${API_URL}/api/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: "demo@example.com",
          password: "password123",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(
        data.error || "Demo login failed"
      );

      setIsLoggingIn(false);

      return;
    }

    login(data.user, data.token);

    navigate("/");
  } catch (error) {
    setErrorMessage(
      "Unable to connect to the server"
    );

    setIsLoggingIn(false);
  }
};

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={null}
    >
      <div className="auth-page">
        <div className="auth-card">
          <h1>Trainer Login</h1>

          <p>
            Continue as a guest to explore the full Pokédex,
            or use demo login to preview future account features.
          </p>

<button
  className="auth-btn auth-primary"
  onClick={handleDemoLogin}
  disabled={isLoggingIn}
>
  {isLoggingIn ? "Logging in..." : "Demo Login"}
</button>

          {errorMessage && (
  <p className="auth-error">
    {errorMessage}
  </p>
)}

<div className="auth-links">

  <Link
    className="auth-link"
    to="/"
  >
    Continue as Guest
  </Link>

  <Link
    className="auth-link"
    to="/signup"
  >
    Create Account
  </Link>

</div>
        </div>
      </div>
    </AppLayout>
  );
}

export default LoginPage;