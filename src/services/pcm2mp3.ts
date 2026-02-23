import { spawn } from 'child_process';

/**
 * Convert raw PCM buffer to MP3 using ffmpeg.
 * Input: s16le, 24000 Hz, mono
 * Output: MP3 buffer
 */
export function pcmToMp3(pcmBuffer: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-f', 's16le',      // input format: signed 16-bit little-endian PCM
      '-ar', '24000',     // sample rate: 24 kHz
      '-ac', '1',         // channels: mono
      '-i', 'pipe:0',     // read from stdin
      '-f', 'mp3',        // output format: MP3
      'pipe:1',           // write to stdout
    ], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const chunks: Buffer[] = [];
    const errChunks: Buffer[] = [];

    ffmpeg.stdout.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    ffmpeg.stderr.on('data', (chunk: Buffer) => {
      errChunks.push(chunk);
    });

    ffmpeg.on('error', (err) => {
      reject(new Error(`ffmpeg spawn error: ${err.message}`));
    });

    ffmpeg.on('close', (code) => {
      if (code !== 0) {
        const errMsg = Buffer.concat(errChunks).toString('utf8');
        reject(new Error(`ffmpeg exited with code ${code}: ${errMsg}`));
        return;
      }
      resolve(Buffer.concat(chunks));
    });

    ffmpeg.stdin.write(pcmBuffer);
    ffmpeg.stdin.end();
  });
}
