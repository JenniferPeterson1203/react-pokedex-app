/*
  💾 Favorite Storage Utilities

  This file controls how favorites are stored.

  Right now:
  - guest users use localStorage

  Later:
  - logged-in users will use PostgreSQL/API storage

  Keeping this logic separated makes the app easier
  to scale when authentication is added.
*/

/*
  🔑 localStorage key

  Using a constant prevents typos
  across multiple functions.
*/
const FAVORITES_KEY = "guest_favorites";

/*
  📥 Load guest favorites from localStorage
*/
export const loadGuestFavorites = () => {
  try {
    const savedFavorites =
      localStorage.getItem(FAVORITES_KEY);

    /*
      If nothing exists yet,
      return empty array.
    */
    if (!savedFavorites) {
      return [];
    }

    return JSON.parse(savedFavorites);

  } catch (error) {

    console.error(
      "Failed to load guest favorites",
      error
    );

    return [];
  }
};

/*
  💾 Save guest favorites to localStorage
*/
export const saveGuestFavorites = (
  favoriteIds
) => {
  try {

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favoriteIds)
    );

  } catch (error) {

    console.error(
      "Failed to save guest favorites",
      error
    );
  }
};