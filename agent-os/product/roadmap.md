# Product Roadmap — agent-voice

1. [x] **Project scaffold** — `package.json`, `tsconfig.json`, `src/` folder structure, `.gitignore` update

2. [x] **Health endpoint** — `GET /health` → `{ status: "ok", service: "agent-voice" }`

3. [x] **Core TTS endpoint** — `POST /v1/audio/speech` — accepts `{model, input, voice}`, calls Gemini TTS, converts PCM→MP3, returns `audio/mpeg` binary stream

4. [x] **Voice config** — `ALFRED_VOICE` env var (default: `Kore`), map OpenAI voice names to Gemini equivalents:
   - alloy → Kore
   - echo → Charon
   - fable → Puck
   - onyx → Orus
   - nova → Aoede
   - shimmer → Zephyr

5. [ ] **OpenClaw integration** — Patch `openclaw.json` to use `agent-voice` as the TTS provider at `http://localhost:3400`

6. [ ] **Docker build + systemd service** — `Dockerfile` with Node 22 slim + ffmpeg; systemd unit for auto-start on boot

7. [ ] **Voice audition script** — CLI tool (`src/scripts/audition.ts`) to test all 30 Gemini voices and save MP3 samples

> Notes
> - Items 1–4 are the MVP core; complete before integration/deployment
> - Item 5 (OpenClaw integration) requires agent-voice to be running and tested first
> - Item 7 (audition script) is a developer tool, not required for production
