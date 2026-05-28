import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeContext";

function TrainingGroundsPage() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={null}
    >
      <div className="training-page">
        <section className="training-hero">
          <span className="construction-badge">
            IN DEVELOPMENT
          </span>

          <h1>Training Grounds</h1>

          <p>
            A future trainer feature for team-based practice
            battles and progression.
          </p>
        </section>

        <section className="training-grid">
          <div className="training-card">
            <h2>Team Practice</h2>
            <p>
              Train saved teams through guided battle sessions.
            </p>
          </div>

          <div className="training-card">
            <h2>Progression System</h2>
            <p>
              Future trainer growth and milestone tracking.
            </p>
          </div>

          <div className="training-card">
            <h2>Battle Prep</h2>
            <p>
              Prepare teams for advanced battle experiences.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export default TrainingGroundsPage;