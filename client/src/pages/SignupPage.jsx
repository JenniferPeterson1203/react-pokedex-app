import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeContext";
import API_URL from "../api/api";

/*
  📝 SignupPage

  Allows a user to create a real account.

  Security flow:
  - frontend sends username, email, password
  - backend hashes password with bcrypt
  - database stores password_digest, not plain password
*/
function SignupPage() {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  /*
    Form state

    Each input is controlled by React state.
  */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
    UI feedback state

    Helps the user understand whether signup
    worked or failed.
  */
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  /*
    📝 Handle signup

    Sends form data to backend signup route.
  */
  const handleSignup = async (e) => {
    e.preventDefault();

    setIsSigningUp(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      /*
        If backend returns an error,
        show it in the UI.
      */
      if (!response.ok) {
        setErrorMessage(
          data.error || "Signup failed"
        );

        setIsSigningUp(false);

        return;
      }

      /*
        After account creation,
        send user to login page.
      */
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        "Unable to connect to the server"
      );

      setIsSigningUp(false);
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
          <h1>Create Trainer Account</h1>

          <p>
            Create an account to prepare for saved teams,
            protected favorites, and future trainer dashboard
            features.
          </p>

          <form
            className="auth-form"
            onSubmit={handleSignup}
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

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
              disabled={isSigningUp}
            >
              {isSigningUp
                ? "Creating account..."
                : "Create Account"}
            </button>
          </form>

          <Link
            className="auth-link"
            to="/login"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

export default SignupPage;