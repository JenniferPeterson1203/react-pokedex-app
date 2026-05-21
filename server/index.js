/*
  🌱 Load environment variables from .env

  This makes sensitive values available through:
  process.env

  Examples:
  - process.env.PORT
  - process.env.DATABASE_URL
  - process.env.JWT_SECRET
*/
require("dotenv").config();

/*
  🗄️ Database connection

  Allows the backend to communicate
  with PostgreSQL.
*/
const db = require("./db/dbConfig");

/*
  🚀 Express framework

  Express helps us:
  - create routes
  - handle requests
  - send responses
  - build APIs
*/
const express = require("express");

/*
  🌐 CORS middleware

  Allows the frontend and backend
  to communicate across different ports.

  Example:
  React frontend:
  localhost:5173

  Express backend:
  localhost:3001
*/
const cors = require("cors");

/*
  🔐 Authentication controller

  Handles:
  - signup
  - login
  - future JWT auth
*/
const authController =
  require("./controllers/authController");

/*
  ❤️ Favorites routes

  Handles Pokémon favorite operations.
*/
const favoritesRoutes =
  require("./routes/favoritesRoutes");

  // Teams routes
  const teamsRoutes =
  require("./routes/teamsRoutes");


/*
  🚀 Express server setup
*/
const app = express();

/*
  Middleware
  cors allows the React frontend to talk to this backend.
  express.json lets the server read JSON request bodies.
*/
app.use(cors());
app.use(express.json());
app.use(
  "/api/favorites",
  favoritesRoutes
);
app.use(
  "/api/teams",
  teamsRoutes
);
app.use("/api/auth", authController);

/*
  ✅ Health check route

  This lets us confirm the backend is running.
*/
app.get("/api/health", (req, res) => {
  res.json({
    message: "server is connected",
    status: "success",
  });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    res.json({
      message: "Database connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

/*
  PORT

  Use the PORT from .env if available,
  otherwise use 3001.
*/
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});