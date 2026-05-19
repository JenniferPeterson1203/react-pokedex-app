# Jennifer's Pokédex Backend

Express + PostgreSQL backend for Jennifer's Pokédex.

## Run Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:
`http://localhost:3001`

## Database

Local PostgreSQL database:

`react_pokedex_app`

Current local port:

`5433`

## Environment Variables

Create a .env file:

```bash
PORT=3001
DATABASE_URL=postgres://localhost:5433/react_pokedex_app
```
## Routes
Health Check
`GET /api/health`
Database Test
`GET /api/db-test`
Favorites
`GET /api/favorites`
`POST /api/favorites`
`DELETE /api/favorites/:pokemon_id`
## Architecture
```bash
routes      → defines API endpoints
controllers → handles request/response logic
queries     → talks directly to PostgreSQL
db          → database connection and schema
```

Then test:

```bash
cd server
npm run dev
```

Check:

`http://localhost:3001/api/health`
`http://localhost:3001/api/db-test`
`http://localhost:3001/api/favorites`

