FROM oven/bun:1 AS base
WORKDIR /app

# Copy root dependencies files
COPY package.json bun.lock ./

# Copy shared packages
COPY packages ./packages

# Copy service code
COPY src/auth ./src/auth

# Install dependencies for the monorepo
# This installs dependencies for all workspaces, which ensures shared packages are linked correctly
# Set workspace to only this service to avoid missing dir errors
RUN sed -i 's|"src/\*"|"src/auth"|g' package.json
RUN bun install

WORKDIR /app/src/auth

# Start the application
CMD ["bun", "run", "src/index.ts"]
