#!/usr/bin/env bash
# Sets up a local copy. Makes no network calls.
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v bun >/dev/null 2>&1; then
  echo "Bun is required. Install it from https://bun.sh, then run ./setup.sh again."
  exit 1
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example. Fill in only the values you need."
else
  echo ".env already exists. Leaving it alone."
fi

mkdir -p outputs

echo "Running the validators..."
bun test

echo
echo "Ready. Next steps:"
echo "  1. Read a run in examples/."
echo "  2. Replace the files in foundation/ with your company's (see docs/adapting.md)."
echo "  3. Run bun test again."
