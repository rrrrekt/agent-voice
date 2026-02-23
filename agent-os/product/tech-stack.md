# Tech Stack — agent-voice

## Framework & Runtime
- **Language:** TypeScript 5 (strict mode: `strict`, `noUncheckedIndexedAccess`)
- **Runtime:** Node.js 22 (LTS)
- **Package Manager:** npm

## HTTP
- **Framework:** Express 5
- **Middleware:** `helmet` (security headers), `cors`, `pino-http` (request logging)

## AI / TTS
- **SDK:** `@google/genai` — Official Google Generative AI SDK (NOT `@google-cloud/text-to-speech`)
- **Model:** `gemini-2.5-flash-preview-tts`
- **Audio format out of Gemini:** Raw PCM (24 kHz, 16-bit signed little-endian, mono)

## Audio Processing
- **PCM → MP3:** Raw `ffmpeg` child process (stdin/stdout pipe)
  - Input: `s16le` 24000 Hz mono PCM
  - Output: MP3 stream
  - No Node.js wrapper library — direct child_process spawn

## Validation & Config
- **Env validation:** Zod — fail-fast on startup if required vars missing
- **Request validation:** Zod schemas on route handlers

## Logging
- **Logger:** Pino (`pino` + `pino-http`) — structured JSON in prod, pretty-print in dev

## Infrastructure
- **Containerisation:** Docker (single-stage, Node 22 slim + ffmpeg)
- **State:** Stateless — no database, no persistent storage
- **Port:** `3400` (default, configurable via `PORT`)

## Developer Experience
- **Dev server:** `npx tsx src/index.ts` (or `npm run dev`)
- **Build:** `tsc` → `dist/`
- **Start:** `node dist/index.js`

## Agent-OS Integration
- **Agent constitution:** `AGENTS.md`
- **Task list:** `tasks.md`
- **Product docs:** `agent-os/product/` (mission, roadmap, tech-stack)
