/*
  👤 Users table

  Stores account information for authenticated users.

  Security note:
  Passwords should NEVER be stored as plain text.
  password_digest stores the bcrypt-hashed password.
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

  Stores favorite Pokémon for authenticated users.

  user_id connects each favorite
  to the user who saved it.
*/
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,

  user_id INTEGER REFERENCES users(id)
    ON DELETE CASCADE,

  pokemon_name TEXT NOT NULL,

  pokemon_id INTEGER NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, pokemon_id)
);

/*
  🧑‍🤝‍🧑 Teams table

  Stores Pokémon teams created by users.
*/
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,

  user_id INTEGER REFERENCES users(id)
    ON DELETE CASCADE,

  team_name TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);

/*
  🧬 Team Pokémon table

  Stores Pokémon that belong to a team.

  One team can have many Pokémon.
*/
CREATE TABLE team_pokemon (
  id SERIAL PRIMARY KEY,

  team_id INTEGER REFERENCES teams(id)
    ON DELETE CASCADE,

  pokemon_id INTEGER NOT NULL,

  pokemon_name TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);