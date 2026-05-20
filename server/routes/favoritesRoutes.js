const express = require("express");

const verifyToken =
  require("../middleware/verifyToken");

/*
  Router

  Creates modular API routes.
*/
const favorites =
  express.Router();

/*
  Import controller functions
*/
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoritesController");

/*
  📥 GET favorites
*/
favorites.get(
  "/",
  verifyToken,
  getFavorites
);

/*
  ❤️ POST favorite
*/
favorites.post(
  "/",
  verifyToken,
  addFavorite
);

/*
  ❌ DELETE favorite
*/
favorites.delete(
  "/:pokemon_id",
  verifyToken,
  removeFavorite
);

module.exports = favorites;