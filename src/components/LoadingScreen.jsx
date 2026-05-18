/*
  ✨ LoadingScreen component

  Reusable loading UI for the Pokédex.
  This makes waiting for API data feel intentional
  instead of showing plain loading text.
*/

function LoadingScreen({
  message = "Scanning Pokédex Database...",
}) {
  return (
    <div className="loading-screen">
      <div className="loading-orb"></div>

      <p>{message}</p>

      <div className="loading-bars">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default LoadingScreen;