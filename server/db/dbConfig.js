const { Pool } = require("pg");

require("dotenv").config();

/*
  PostgreSQL connection pool

  This lets our Express server talk to the database.
*/
const db = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;