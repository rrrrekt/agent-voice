import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { generateSpeechPcm } from '../services/tts.js';
import { pcmToMp3 } from '../services/pcm2mp3.js';
import type { Logger } from 'pino';

const router = Router();

const SpeechRequestSchema = z.object({
  model: z.string().optional(),
  input: z.string().min(1, 'input text is required'),
  voice: z.string().optional(),
});

router.post('/v1/audio/speech', async (req: Request, res: Response) => {
  const log = (req as Request & { log: Logger }).log;

  const parsed = SpeechRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: 'Bad Request',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { input, voice } = parsed.data;

  try {
    log?.info({ voice, inputLength: input.length }, 'TTS request received');

    const pcmBuffer = await generateSpeechPcm(input, voice);
    log?.info({ pcmBytes: pcmBuffer.byteLength }, 'PCM generated');

    const mp3Buffer = await pcmToMp3(pcmBuffer);
    log?.info({ mp3Bytes: mp3Buffer.byteLength }, 'MP3 conversion complete');

    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Length', String(mp3Buffer.byteLength));
    res.send(mp3Buffer);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log?.error({ err: message }, 'TTS error');
    res.status(500).json({ error: 'TTS generation failed', message });
  }
});

export default router;
