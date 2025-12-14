# Drizzle Auth API

Express + TypeScript auth API using Drizzle ORM, Postgres, and HTTP-only session cookies (no JWT). Sessions are stored in the database with UUID tokens and sent as `session_token` cookies.

## Stack

- Express 5 + TypeScript
- Drizzle ORM + Postgres
- Sessions via HTTP-only cookies (UUID tokens stored in `sessions` table)
- Input validation, bcrypt password hashing, dotenv, CORS, cookie-parser

## API routes (JSON)

- POST `/auth/register` — body: `{ email, username, password }`
- POST `/auth/login` — body: `{ email, password }` — sets `session_token` cookie
- POST `/auth/logout` — clears cookie and deletes session
- GET `/profile/me` — requires session, returns current user
- PUT `/profile/me` — body: `{ email?, username?, password? }` (validated)
- DELETE `/profile/me` — deletes user and clears session

## Project layout

- Server entry: [src/index.ts](src/index.ts)
- Auth flows: [src/controllers/auth.controller.ts](src/controllers/auth.controller.ts), [src/routes/auth.routes.ts](src/routes/auth.routes.ts)
- Sessions & users: [src/services/sessionService.ts](src/services/sessionService.ts), [src/services/userService.ts](src/services/userService.ts)
- DB client & schema: [src/db/client.ts](src/db/client.ts), [src/db/schema.ts](src/db/schema.ts)
- Validation: [src/middleware/validate.ts](src/middleware/validate.ts), [src/helpers/rules.ts](src/helpers/rules.ts)
- Auth guard: [src/middleware/auth.ts](src/middleware/auth.ts)

## Setup

1. Install deps

```bash
npm install
```

2. Create `.env`

```
DATABASE_URL=postgres://user:pass@host:5432/db
PORT=3000
NODE_ENV=development
```

3. Run migrations (Drizzle)

```bash
npm run generate
npm run migrate
```

4. Start dev server

```bash
npm run dev
```

Server listens on `PORT` (default 3000) and expects requests from `http://localhost:5173` per CORS config.

## Sessions vs JWT

- Uses database-backed sessions with UUID tokens; tokens are stored server-side and sent as HTTP-only cookies.
- No JWTs are issued; revocation is immediate by deleting a session row.

## Tests / next steps

- Add request/response examples and automated tests.
- Add rate limiting and production-ready CORS origins.
