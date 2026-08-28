#!/bin/bash
# Fixconnexion - dev launcher (frontend + backend)
# macOS, bash 3.2+, ASCII only
set -e

cd "$(dirname "$0")"

BASE_PORT=5173
API_PORT=3001
MAX_PORT=6000

find_free_port() {
  local p=$1
  while [ $p -le $MAX_PORT ]; do
    if ! lsof -i ":$p" -sTCP:LISTEN -n -P >/dev/null 2>&1; then
      echo "$p"
      return 0
    fi
    p=$((p + 1))
  done
  echo "$1"
}

PORT=$(find_free_port $BASE_PORT)
API_PORT=$(find_free_port $API_PORT)

LOGFILE="$(pwd)/.dev.log"
PIDFILE="$(pwd)/.dev.pid"
API_LOGFILE="$(pwd)/.api.log"
API_PIDFILE="$(pwd)/.api.pid"

cleanup() {
  for pf in "$PIDFILE" "$API_PIDFILE"; do
    if [ -f "$pf" ]; then
      local pid
      pid=$(cat "$pf")
      if kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null || true
      fi
      rm -f "$pf"
    fi
  done
}
trap cleanup EXIT INT TERM

echo "================================="
echo "  Fixconnexion full stack dev"
echo "================================="
echo "Frontend port: $PORT"
echo "API port     : $API_PORT"
echo "Log files    : .dev.log / .api.log"

# Install deps if missing
if [ ! -d "node_modules" ]; then
  echo "Installing frontend deps..."
  pnpm install
fi
if [ ! -d "server/node_modules" ]; then
  echo "Installing backend deps..."
  (cd server && pnpm install)
fi

# Copy .env if missing
if [ ! -f "server/.env" ] && [ -f "server/.env.example" ]; then
  cp server/.env.example server/.env
  echo "Created server/.env from .env.example (edit with your SMTP credentials)"
fi

# Start API
echo "Starting API on port $API_PORT..."
(cd server && nohup pnpm dev > "../$API_LOGFILE" 2>&1 & echo $! > "../$API_PIDFILE")

# Wait for API ready
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if curl -s -o /dev/null "http://localhost:$API_PORT/api/health"; then
    echo "API ready"
    break
  fi
  sleep 1
done

# Start frontend
echo "Starting Vite on port $PORT..."
nohup pnpm dev --port "$PORT" --strictPort > "$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"

for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if curl -s -o /dev/null "http://localhost:$PORT"; then
    break
  fi
  sleep 1
done

URL="http://localhost:$PORT"
echo ""
echo "Frontend : $URL"
echo "API      : http://localhost:$API_PORT/api"
echo "Admin    : $URL/#/admin/login"
echo ""
echo "Default credentials: admin / changeme (see server/.env)"
echo ""
echo "Tailing logs (Ctrl-C to stop)..."
tail -n 30 -f "$LOGFILE" "$API_LOGFILE"
