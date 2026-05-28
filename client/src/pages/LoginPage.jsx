import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import AppLayout from "../components/AppLayout";
import PageState from "../components/PageState";
import { useTheme } from "../context/ThemeContext";
import { DEMO_USER } from "../constants/demoUser";
import API_URL from "../api/api";

/*
  🔐 LoginPage

  Allows users to:
  - login with their own account
  - use demo login
  - continue as guest
*/
function LoginPage() {
  const { darkMode, setDarkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const submitLogin = async (credentials) => {
    setIsLoggingIn(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Login failed");
        setIsLoggingIn(false);
        return;
      }

      login(data.user, data.token);

      navigate("/");
    } catch (error) {
      setErrorMessage("Unable to connect to the server");
      setIsLoggingIn(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    submitLogin({
      email,
      password,
    });
  };

  const handleDemoLogin = () => {
    submitLogin(DEMO_USER);
  };

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={null}
    >
      <PageState
        isLoading={isLoggingIn}
        errorMessage=""
        loadingMessage="Connecting to trainer network..."
      >
        <div className="auth-page">
          <div className="auth-card">
            <h1>Trainer Login</h1>

            <p>
              Log in to access trainer features, saved teams,
              protected favorites, and future dashboard tools.
            </p>

            <form
              className="auth-form"
              onSubmit={handleLogin}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              {errorMessage && (
                <p className="auth-error">
                  {errorMessage}
                </p>
              )}

              <button
                className="auth-btn auth-primary"
                type="submit"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </form>

            <button
              className="auth-btn"
              onClick={handleDemoLogin}
              disabled={isLoggingIn}
            >
              Demo Login
            </button>

            <div className="auth-links">
              <Link className="auth-link" to="/">
                Continue as Guest
              </Link>

              <Link className="auth-link" to="/signup">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </PageState>
    </AppLayout>
  );
}

export default LoginPage;