import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeContext";

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

  /*
    Demo login lets us test authenticated UI
    before real backend auth exists.
  */
const handleDemoLogin = () => {
  login({
    username: "Demo Trainer",
    mode: "demo",
  });

  /*
    🚀 Return user to homepage
    after demo login.
  */
  navigate("/");
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
          >
            Demo Login
          </button>

          <Link
            className="auth-link"
            to="/"
          >
            Continue as Guest
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

export default LoginPage;