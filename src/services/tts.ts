import { GoogleGenAI } from '@google/genai';
import { env } from '../env.js';

const ai = new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });

/** Map OpenAI voice names to Gemini voice names */
const VOICE_MAP: Record<string, string> = {
  alloy: 'Kore',
  echo: 'Charon',
  fable: 'Puck',
  onyx: 'Orus',
  nova: 'Aoede',
  shimmer: 'Zephyr',
};

/**
 * Resolve a voice name: if it's an OpenAI alias, map it; otherwise use as-is.
 * Falls back to ALFRED_VOICE env var, then 'Kore'.
 */
function resolveVoice(voice?: string): string {
  if (!voice) return env.ALFRED_VOICE;
  const lower = voice.toLowerCase();
  return VOICE_MAP[lower] ?? voice;
}

/**
 * Call Gemini TTS and return raw PCM buffer.
 * Output format: 24000 Hz, 16-bit signed little-endian, mono.
 */
export async function generateSpeechPcm(inputText: string, voice?: string): Promise<Buffer> {
  const voiceName = resolveVoice(voice);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: [{ parts: [{ text: `Generate audio for the following text. Do not output anything else:\n\n${inputText}` }] }],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  });

  const candidate = response.candidates?.[0];
  if (!candidate) {
    throw new Error('Gemini TTS: no candidates returned');
  }

  const part = candidate.content?.parts?.[0];
  if (!part) {
    throw new Error('Gemini TTS: no parts in candidate');
  }

  const inlineData = part.inlineData;
  if (!inlineData?.data) {
    throw new Error('Gemini TTS: no inlineData in response part');
  }

  return Buffer.from(inlineData.data, 'base64');
}
