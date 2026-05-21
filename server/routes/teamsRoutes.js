const express = require("express");

const verifyToken =
  require("../middleware/verifyToken");

const {
  getTeams,
  createNewTeam,
  removeTeam,
  addPokemon,
} = require(
  "../controllers/teamsController"
);

/*
  🧑‍🤝‍🧑 Teams router

  Handles authenticated team routes.
*/
const teams =
  express.Router();

/*
  📥 GET all user teams
*/
teams.get(
  "/",
  verifyToken,
  getTeams
);

/*
  🧑‍🤝‍🧑 CREATE new team
*/
teams.post(
  "/",
  verifyToken,
  createNewTeam
);

/*
  ❌ DELETE team
*/
teams.delete(
  "/:teamId",
  verifyToken,
  removeTeam
);

/*
  🧬 ADD Pokémon to team
*/
teams.post(
  "/:teamId/pokemon",
  verifyToken,
  addPokemon
);

module.exports = teams;