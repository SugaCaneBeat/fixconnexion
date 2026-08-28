#!/bin/bash
# Fixconnexion dev launcher
# macOS, bash 3.2+, ASCII only (no UTF-8 in echo/var expansion)
set -e

cd "$(dirname "$0")"

BASE_PORT=5173
MAX_PORT=6000

# Find a free port starting at BASE_PORT
find_free_port() {
  local p=$BASE_PORT
  while [ $p -le $MAX_PORT ]; do
    if ! lsof -i ":$p" -sTCP:LISTEN -n -P >/dev/null 2>&1; then
      echo "$p"
      return 0
    fi
    p=$((p + 1))
  done
  echo "$BASE_PORT"
}

PORT=$(find_free_port)
LOGFILE="$(pwd)/.dev.log"
PIDFILE="$(pwd)/.dev.pid"

cleanup() {
  if [ -f "$PIDFILE" ]; then
    local pid
    pid=$(cat "$PIDFILE")
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
    fi
    rm -f "$PIDFILE"
  fi
}
trap cleanup EXIT INT TERM

echo "================================="
echo "  Fixconnexion dev server"
echo "================================="
echo "Port detected: $PORT"
echo "Log file: $LOGFILE"

# Install deps if missing
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies (pnpm)..."
  pnpm install
fi

echo "Starting Vite..."
nohup pnpm dev --port "$PORT" --strictPort > "$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"

# Wait for server ready
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if curl -s -o /dev/null "http://localhost:$PORT"; then
    break
  fi
  sleep 1
done

URL="http://localhost:$PORT"
echo "Server up: $URL"
open "$URL" || true

echo "Tailing logs (Ctrl-C to stop)..."
tail -n 50 -f "$LOGFILE"
