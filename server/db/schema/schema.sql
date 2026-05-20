/*
  👤 Users table

  Stores account information for authenticated users.

  Security note:
  Passwords should NEVER be stored as plain text.
  password_digest will store the hashed password from bcrypt.
*/
CREATE TABLE users (
  id SERIAL PRIMARY KEY,

  username TEXT NOT NULL UNIQUE,

  email TEXT NOT NULL UNIQUE,

  password_digest TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);

/*
  ❤️ Favorites table

  Stores favorite Pokémon.
*/

CREATE TABLE favorites (

  id SERIAL PRIMARY KEY,

  pokemon_name TEXT NOT NULL,

  pokemon_id INTEGER NOT NULL UNIQUE,

  created_at TIMESTAMP DEFAULT NOW()
);