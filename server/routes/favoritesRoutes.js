const express = require("express");

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
  getFavorites
);

/*
  ❤️ POST favorite
*/
favorites.post(
  "/",
  addFavorite
);

/*
  ❌ DELETE favorite
*/
favorites.delete(
  "/:pokemon_id",
  removeFavorite
);

module.exports = favorites;