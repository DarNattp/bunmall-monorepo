FROM oven/bun:1 AS base
WORKDIR /app

# Copy root dependencies files
COPY package.json bun.lock ./

# Copy shared packages
COPY packages ./packages

# Copy service code
COPY services/auth ./services/auth

# Install dependencies for the monorepo
# This installs dependencies for all workspaces, which ensures shared packages are linked correctly
# Remove "frontend" from workspaces as it is not needed for backend services and causes errors if missing
RUN sed -i '/"frontend"/d' package.json
RUN bun install

WORKDIR /app/services/auth

# Start the application
CMD ["bun", "run", "src/index.ts"]
