#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Starting agent-voice (Gemini TTS)..."
docker compose up -d --build
echo "✅ agent-voice running on http://localhost:3400"
echo "🔍 Logs:"
docker compose logs -f
