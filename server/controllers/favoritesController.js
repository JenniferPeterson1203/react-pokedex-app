const {
  getAllFavorites,
  createFavorite,
} = require(
  "../queries/favoritesQueries"
);

/*
  📥 GET all favorites

  This controller:
  1. receives the request
  2. calls the query function
  3. sends data back as JSON
*/
const getFavorites = async (
  req,
  res
) => {

  try {

    // fetch favorites from database
    const favorites =
      await getAllFavorites();

    // send favorites to frontend
    res.status(200).json(
      favorites
    );

  } catch (error) {

    // server/database error
    res.status(500).json({
      error:
        "Failed to fetch favorites",
    });
  }
};

/*
  ❤️ CREATE favorite

  This controller:
  1. gets data from frontend
  2. sends it to database query
  3. returns newly created favorite
*/
const addFavorite = async (
  req,
  res
) => {

  try {

    // create favorite in database
    const newFavorite =
      await createFavorite(
        req.body
      );

    // send created favorite
    res.status(201).json(
      newFavorite
    );

  } catch (error) {

    res.status(500).json({
      error:
        "Failed to create favorite",
    });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
};