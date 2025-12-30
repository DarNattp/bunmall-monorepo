#!/bin/bash
# Install dependencies if not already
bun install

# Run postgres (ensure it's up)
docker-compose up -d postgres

# Run all services and frontend
# We use a simple trap to kill all background processes on exit
trap 'kill 0' SIGINT

echo "Starting services..."
cd services/auth && bun run dev &
cd services/product && bun run dev &
cd services/order && bun run dev &
cd frontend && bun run dev &

wait
