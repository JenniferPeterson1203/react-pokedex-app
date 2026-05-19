const db = require("../db/dbConfig");

/*
  📥 Get all favorites
*/
const getAllFavorites = async () => {
  const result =
    await db.query(
      "SELECT * FROM favorites ORDER BY id ASC"
    );

  return result.rows;
};

/*
  ❤️ Create favorite
*/
const createFavorite = async (
  favorite
) => {

  const {
    pokemon_name,
    pokemon_id,
  } = favorite;

  const result =
    await db.query(
      `
      INSERT INTO favorites
      (pokemon_name, pokemon_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [pokemon_name, pokemon_id]
    );

  return result.rows[0];
};

module.exports = {
  getAllFavorites,
  createFavorite,
};