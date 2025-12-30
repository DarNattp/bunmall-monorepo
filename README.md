# BunMall Monorepo

A modern microservices e-commerce application built with **Bun**, **ElysiaJS**, **Next.js**, and **PostgreSQL**.

## 🏗 Project Structure

All source code is located in the `src/` directory.

- **`src/web`**: Next.js Frontend application.
- **`src/auth`**: Authentication Service (ElysiaJS).
- **`src/product`**: Product Service (ElysiaJS).
- **`src/order`**: Order Service (ElysiaJS).
- **`packages/shared`**: Shared TypeScript types and Zod schemas.

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose
- [Bun](https://bun.sh/) (optional, for local dev without Docker)

### Running with Docker (Recommended)

To start all services and the database:

```bash
docker-compose up --build
```

Access the services:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Auth Service**: [http://localhost:3001](http://localhost:3001)
- **Product Service**: [http://localhost:3002](http://localhost:3002)
- **Order Service**: [http://localhost:3003](http://localhost:3003)

### Environment Variables

See `.env.example` for the list of required environment variables. For local development with Docker, these are pre-configured in `docker-compose.yml`.

## 📦 CI/CD

This repository is configured with GitHub Actions to automatically build and push Docker images to the **GitHub Container Registry (GHCR)**.

- **Workflow**: `.github/workflows/build.yaml`
- **Registry**: `ghcr.io`
- **Image Naming**: `ghcr.io/<owner>/<repo>/<service>:<sha>`

### API Versioning

The application uses versioned API routes proxying through the frontend middleware:
- `/api/v1/auth/*` -> Auth Service
- `/api/v1/products/*` -> Product Service
- `/api/v1/orders/*` -> Order Service

## 🛠 Development

To run migrations manually (if running locally):

```bash
cd src/<service>
bun run db:push
```
