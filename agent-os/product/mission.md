# Product Mission — agent-voice

## Pitch
`agent-voice` is Alfred's local voice service — a Node.js/TypeScript Express server that wraps the Google Gemini TTS API and exposes an OpenAI-compatible `POST /v1/audio/speech` endpoint. This allows OpenClaw (and any OpenAI-compatible TTS consumer) to use Google Gemini TTS without requiring native provider support.

## Users

### Primary Customers
- **Alfred (OpenClaw agent):** Needs a high-quality, locally-controlled TTS service that integrates seamlessly via the OpenAI-compatible API surface
- **OpenClaw operators:** Anyone running OpenClaw who wants Gemini TTS without waiting for native support
- **OpenAI TTS consumers:** Any system that speaks the OpenAI `POST /v1/audio/speech` API can drop in this service as a replacement

### User Personas

**Alfred the AI Assistant**
- **Role:** Conversational AI agent running in OpenClaw
- **Context:** Needs to synthesize speech for replies in real-time
- **Pain Points:** OpenClaw has no native Gemini TTS support; Microsoft Edge TTS lacks persona customisation
- **Goals:** Use a warm, consistent persona voice (`Kore` by default) with low latency

**The Operator (Sunfeld / rrrrekt)**
- **Role:** Developer configuring Alfred's voice
- **Context:** Wants control over which Gemini voice Alfred uses without redeploying
- **Pain Points:** Hard-coded voices require code changes to experiment
- **Goals:** Set `ALFRED_VOICE=Kore` in `.env` and be done; override per-request if needed

## Core Value Proposition
Drop-in OpenAI TTS replacement backed by Google Gemini. One env var, one endpoint, real Gemini voices.

## Alfred's Persona Voice
- **Default voice:** `Kore` (warm, clear, professional)
- **Configurable via:** `ALFRED_VOICE` environment variable
- **Voice mapping:** OpenAI voice names (alloy, echo, fable, onyx, nova, shimmer) are mapped to Gemini equivalents
- **30 Gemini voices available** — audition script included

## Architecture (One-liner)
```
OpenClaw TTS request → POST /v1/audio/speech → Gemini API (PCM) → ffmpeg (MP3) → audio stream
```
