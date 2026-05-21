import PageLoader from "./PageLoader";

/*
  🧩 PageState

  Reusable wrapper for pages that need:
  - loading screen
  - error screen
  - normal page content

  This prevents repeating the same
  loading/error logic on every page.
*/
function PageState({
  isLoading,
  errorMessage,
  loadingMessage = "Loading Pokédex...",
  children,
}) {
  if (isLoading) {
    return (
      <PageLoader message={loadingMessage} />
    );
  }

  if (errorMessage) {
    return (
      <PageLoader message={errorMessage} />
    );
  }

  return children;
}

export default PageState;