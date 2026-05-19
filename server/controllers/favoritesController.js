const {
  getAllFavorites,
  createFavorite,
  deleteFavorite
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

     /*🛡️ Backend validation
     
    Prevent invalid or incomplete data
    from reaching the database.
  */
  const {
    pokemon_id,
    pokemon_name,
  } = req.body;

  /*
    Ensure required fields exist.
  */
  if (
    !pokemon_id ||
    !pokemon_name
  ) {

    return res.status(400).json({
      error:
        "pokemon_id and pokemon_name are required",
    });
  }

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

/*
  ❌ DELETE favorite

  Removes a favorite
  from the database.
*/
const removeFavorite =
  async (req, res) => {

  try {

    const {
      pokemon_id,
    } = req.params;

    const deletedFavorite =
      await deleteFavorite(
        pokemon_id
      );

    res.status(200).json(
      deletedFavorite
    );

  } catch (error) {

    res.status(500).json({
      error:
        "Failed to delete favorite",
    });
  }
};


module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};