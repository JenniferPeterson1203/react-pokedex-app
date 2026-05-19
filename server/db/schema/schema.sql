/*
  ❤️ Favorites table

  Stores favorite Pokémon.
*/

CREATE TABLE favorites (

  id SERIAL PRIMARY KEY,

  pokemon_name TEXT NOT NULL,

  pokemon_id INTEGER NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);