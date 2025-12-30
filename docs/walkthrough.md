# Bun Mall - Walkthrough

## Prerequisites
- **Bun**: Ensure Bun is installed (`curl -fsSL https://bun.sh/install | bash`).
- **Docker**: Ensure Docker and Docker Compose are running.

## Running the Project
I have created a helper script to run everything (Database + All Services + Frontend) with a single command.

1.  **Run the script:**
    ```bash
    ./run-all.sh
    ```
    *This script handles installing dependencies, starting Postgres, creating databases, and launching all microservices and the frontend in parallel.*

## Verification
Once the script is running, you can access the application:

### Frontend
- Open [http://localhost:3000](http://localhost:3000).
- You should see the "Discover Unique Items" page.
- Login at [http://localhost:3000/login](http://localhost:3000/login).

### Backend Services (Direct Access)
- **Auth Service**: `http://localhost:3001`
- **Product Service**: `http://localhost:3002/products`
- **Order Service**: `http://localhost:3003/orders`

## Architecture
- **Frontend**: Next.js 14
- **Backend**: Bun + ElysiaJS
- **Database**: PostgreSQL (Docker)
- **ORM**: Drizzle

## Development Notes
- The `init-scripts/01-create-dbs.sql` ensures `auth_db`, `product_db`, and `order_db` are created in Postgres.
- `drizzle-kit push` has been run to set up the schema.
- API Rewrites in Next.js route `/api/*` to the respective backend services.
