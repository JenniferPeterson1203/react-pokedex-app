/*
  🔐 Auth Storage Utilities

  Stores temporary demo auth data in localStorage.

  Later, real authentication will use:
  - JWT tokens
  - backend login routes
  - secure session handling
*/

const DEMO_USER_KEY = "demo_user";

/*
  📥 Load demo user from localStorage
*/
export const loadDemoUser = () => {
  try {
    const savedUser =
      localStorage.getItem(DEMO_USER_KEY);

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error(
      "Failed to load demo user",
      error
    );

    return null;
  }
};

/*
  💾 Save demo user to localStorage
*/
export const saveDemoUser = (userData) => {
  try {
    localStorage.setItem(
      DEMO_USER_KEY,
      JSON.stringify(userData)
    );
  } catch (error) {
    console.error(
      "Failed to save demo user",
      error
    );
  }
};

/*
  🧹 Remove demo user from localStorage
*/
export const clearDemoUser = () => {
  localStorage.removeItem(DEMO_USER_KEY);
};