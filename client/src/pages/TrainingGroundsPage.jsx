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
          <span className="construction-badge">IN DEVELOPMENT</span>

          <h1>Training Grounds</h1>

          <p>
            Future trainer progression systems are currently being developed.
          </p>

          <div className="training-meta">
            <span>Version: Pre-Alpha</span>
            <span>Status: Active Development</span>
          </div>

          <div className="training-progress">
            <div className="training-progress-fill"></div>
          </div>

          <p className="training-progress-text">Development Progress: 35%</p>
        </section>

        <section className="training-grid">
          <div className="training-card">
            <h2>⚡ Team Training</h2>
            <p>Practice-focused systems for saved Pokémon teams.</p>
          </div>

          <div className="training-card">
            <h2>🌿 Wild Encounters</h2>
            <p>Future training encounters are being planned.</p>
          </div>

          <div className="training-card">
            <h2>🏆 Trainer Progression</h2>
            <p>Milestones and growth systems are on the roadmap.</p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export default TrainingGroundsPage;
