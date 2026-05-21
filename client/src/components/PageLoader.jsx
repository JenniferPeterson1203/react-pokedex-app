/*
  ⚡ PageLoader

  Reusable loading screen shown while
  the app is waiting for data or routes.
*/
function PageLoader({ message = "Loading Pokédex..." }) {
  return (
    <div className="page-loader">
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

export default PageLoader;