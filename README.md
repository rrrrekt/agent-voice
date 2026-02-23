# agent-voice

Alfred's voice configuration — TTS preferences, persona per language, and voice notes.

## Current Config

| Setting | Value |
|---------|-------|
| Provider | Edge TTS (Microsoft Neural) |
| Default voice | `nl-NL-ColetteNeural` |
| Language | Dutch (`nl-NL`) |
| Output format | `audio-24khz-96kbitrate-mono-mp3` |
| Auto TTS | `always` |

## Voice Options (Dutch)

| Voice | ID | Karakter |
|-------|----|---------|
| **Colette** ✅ | `nl-NL-ColetteNeural` | Warm, duidelijk, vriendelijk — **standaard** |
| Maarten | `nl-NL-MaartenNeural` | Zakelijk, mannelijk |
| Fenna | `nl-NL-FennaNeural` | Neutraal, professioneel, radio-achtig |

## Language Switching

For English replies, override per-message with:
```
[[tts:provider=edge voice=en-US-MichelleNeural]]
```

## OpenClaw Config Path

`/home/sunai/.openclaw/openclaw.json` → `messages.tts`

```json
{
  "messages": {
    "tts": {
      "auto": "always",
      "provider": "edge",
      "edge": {
        "enabled": true,
        "voice": "nl-NL-ColetteNeural",
        "lang": "nl-NL",
        "outputFormat": "audio-24khz-96kbitrate-mono-mp3"
      }
    }
  }
}
```
