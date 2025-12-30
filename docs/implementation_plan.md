# Bun Mall - Microservices E-commerce App

## Goal Description
Create a microservices-based e-commerce application ("Bun Mall") to learn TypeScript and Bun.
The app will consist of:
- **Frontend**: Next.js (Headless UI / Tailwind)
- **Backend Services**:
    - `auth`: User management
    - `product`: Product catalog
    - `order`: Order processing
- **Database**: PostgreSQL (Each service connecting to its schema or shared instance)
- **Runtime**: Bun

## User Review Required
- **Framework Choice**: I plan to use **ElysiaJS** or **Hono** for the Bun backend services as they are optimized for Bun, unless you prefer a raw Bun HTTP server.
- **Database**: `docker-compose.yml` currently has one Postgres instance. We will use separate schemas or databases for each service within that instance.

## Proposed Changes

### Infrastructure
#### [MODIFY] [docker-compose.yml](file:///Users/darvel/git/darnattp/bunmall-monorepo/docker-compose.yml)
- Add definitions for `auth`, `product`, and `order` services so they can be started with Docker (optional) OR just ensure the DB is ready and we run services locally with Bun.
- *Recommendation*: Run DB in Docker, run services locally with `bun run dev` for easier learning/debugging.

### Services (`/services/*`)
#### [MODIFY] Source Code
- Ensure each service has a basic HTTP server running (using Hono/Elysia).
- Connect to PostgreSQL using Drizzle ORM (already seen in file structure).
- Implement basic endpoints:
    - `auth`: `/login`, `/register`
    - `product`: `/products` (GET, POST)
    - `order`: `/orders` (POST)

### Frontend (`/frontend`)
#### [MODIFY] Next.js App
- Fetch data from local backend services.
- Display products and allow "login".

## Verification Plan

### Automated Tests
- Run `bun test` in each service directory (if tests exist).

### Manual Verification
1.  Start Postgres: `docker-compose up -d postgres`
2.  Start Services: `bun run dev` in each service folder (or use a script).
3.  Start Frontend: `npm run dev` in frontend.
4.  Open `http://localhost:3000` and verify:
    - Products are listed.
    - Login works.
