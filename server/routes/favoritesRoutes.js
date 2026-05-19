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
} = require(
  "../controllers/favoritesController"
);

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

module.exports = favorites;