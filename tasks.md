# Tasks — agent-voice

- [x] **1.0.0**: Project scaffold — package.json, tsconfig.json, src/ structure, .gitignore update
- [x] **1.1.0**: package.json — add @google/genai, express, pino, zod, cors, helmet; dev deps tsx/typescript/types
- [x] **1.2.0**: tsconfig.json — strict TypeScript config (NodeNext modules, strict, noUncheckedIndexedAccess)
- [x] **1.3.0**: src/env.ts — Zod env validation (GOOGLE_API_KEY, PORT, ALFRED_VOICE)
- [x] **2.0.0**: Express app — src/app.ts with middleware (helmet, cors, pino-http), GET /health
- [x] **3.0.0**: Gemini TTS service — src/services/tts.ts — calls @google/genai generateContent with AUDIO modality
- [x] **3.1.0**: PCM to MP3 conversion — use ffmpeg child process to convert raw PCM (24kHz s16le mono) to MP3
- [x] **4.0.0**: POST /v1/audio/speech route — OpenAI-compatible, accepts {model,input,voice}, returns MP3 stream
- [x] **5.0.0**: Wire up src/index.ts entry point — start server, graceful shutdown
- [x] **6.0.0**: Docker — Dockerfile (Node 22 slim, ffmpeg installed), .dockerignore
- [x] **7.0.0**: Test the endpoint end-to-end with curl
- [x] **8.0.0**: Commit + push all work to rrrrekt/agent-voice main
