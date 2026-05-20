const db = require("../db/dbConfig");

/*
  👤 Create a new user

  This function inserts a new user into the database.

  Security note:
  The password should already be hashed before this function runs.
  That means this query only saves password_digest, never the plain password.
*/
const createUser = async (user) => {
  const {
    username,
    email,
    password_digest,
  } = user;

  const result = await db.query(
    `
    INSERT INTO users
    (username, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at
    `,
    [
      username,
      email,
      password_digest,
    ]
  );

  return result.rows[0];
};

/*
  🔎 Find user by email

  This is used during login.

  We need the password_digest here so bcrypt can compare:
  entered password vs stored hashed password.
*/
const getUserByEmail = async (email) => {
  const result = await db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};