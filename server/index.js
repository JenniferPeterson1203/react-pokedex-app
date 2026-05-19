const db = require("./db/dbConfig");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

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