FROM oven/bun:1 AS base
WORKDIR /app

# Copy root dependencies files
COPY package.json bun.lock ./

# Copy shared packages
COPY packages ./packages

# Copy frontend code
COPY frontend ./frontend

# Install dependencies
RUN bun install

WORKDIR /app/frontend

# Build the Next.js application
# Ensuring NEXT_TELEMETRY_DISABLED is set
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# Start the application
EXPOSE 3000
CMD ["bun", "run", "start"]
