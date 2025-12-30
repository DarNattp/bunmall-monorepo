FROM oven/bun:1 AS base
WORKDIR /app

# Copy root dependencies files
COPY package.json bun.lock ./

# Copy shared packages
COPY packages ./packages

# Copy service code
COPY src/order ./src/order

# Install dependencies
RUN sed -i 's|"src/\*"|"src/order"|g' package.json
RUN bun install

WORKDIR /app/src/order

# Start the application
CMD ["bun", "run", "src/index.ts"]
