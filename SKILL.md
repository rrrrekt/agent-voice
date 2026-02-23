# agent-voice Standard Deployment

This skill provides a Dockerized, production-ready standard for deploying Gemini TTS (OpenAI-compatible) as a voice service for AI agents.

## Deployment Standard

### 1. Prerequisites
- Docker & Docker Compose
- Google Gemini API Key (`gemini-2.5-flash-preview-tts` access)

### 2. Configuration (`.env`)
Create a `.env` file in the service root:

```bash
GOOGLE_API_KEY=AIzaSy...           # Your Gemini API Key
PORT=3400                          # Service Port (Default: 3400)
ALFRED_VOICE=Kore                  # Default Voice (Kore, Charon, Puck, Orus, Aoede, Zephyr)
LOG_LEVEL=info                     # Logging level (pino)
```

### 3. Run Service
```bash
docker compose up -d --build
```

### 4. Integration with OpenClaw (or any OpenAI Client)

This service exposes an OpenAI-compatible `/v1/audio/speech` endpoint.

**OpenClaw Config:**
```json
"messages": {
  "tts": {
    "provider": "openai",
    "openai": {
      "apiKey": "dummy",
      "model": "tts-1",
      "voice": "alloy"
    }
  }
},
"env": {
  "vars": {
    "OPENAI_TTS_BASE_URL": "http://127.0.0.1:3400"
  }
}
```

**Voice Mapping (OpenAI -> Gemini):**
- `alloy` -> `Kore` (Firm, male)
- `echo` -> `Charon` (Deep, male)
- `fable` -> `Puck` (High, female)
- `onyx` -> `Orus` (Low, male)
- `nova` -> `Aoede` (Soft, female)
- `shimmer` -> `Zephyr` (Bright, female)

## Healthcheck
`GET http://localhost:3400/health` -> `{"status":"ok","service":"agent-voice"}`
