FROM oven/bun:1 as base
WORKDIR /app

# Copy root dependencies files
COPY package.json bun.lock ./

# Copy shared packages
COPY packages ./packages

# Copy service code
COPY services/product ./services/product

# Install dependencies
RUN bun install --frozen-lockfile

WORKDIR /app/services/product

# Start the application
CMD ["bun", "run", "src/index.ts"]
