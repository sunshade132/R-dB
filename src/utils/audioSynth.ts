/**
 * Warm Rhodes-style Web Audio API chord progression synthesizer
 * Plays 4-bar chord voicings at the track's authentic BPM without external audio dependencies.
 */

class ChordSynthEngine {
  private ctx: AudioContext | null = null;
  private timerIds: number[] = [];
  private activeTrackId: string | null = null;
  private onFinishCallback: (() => void) | null = null;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public stop(): void {
    for (const id of this.timerIds) {
      window.clearTimeout(id);
    }
    this.timerIds = [];
    this.activeTrackId = null;
    if (this.onFinishCallback) {
      this.onFinishCallback = null;
    }
  }

  public getActiveTrackId(): string | null {
    return this.activeTrackId;
  }

  private playWarmChord(ctx: AudioContext, frequencies: number[], durationSec: number): void {
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1650, now);
    filter.frequency.exponentialRampToValueAtTime(720, now + durationSec);

    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.18 / Math.max(1, frequencies.length * 0.65), now + 0.04);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();

      osc.type = 'sine';
      subOsc.type = 'triangle';

      // Slight detune for warm analog electric-piano chorus feel
      osc.frequency.setValueAtTime(freq, now);
      subOsc.frequency.setValueAtTime(freq * (idx === 0 ? 0.5 : 1), now);
      subOsc.detune.setValueAtTime(idx % 2 === 0 ? 4 : -4, now);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.28, now);

      osc.connect(filter);
      subOsc.connect(subGain);
      subGain.connect(filter);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + durationSec + 0.05);
      subOsc.stop(now + durationSec + 0.05);
    });
  }

  public playProgression(
    trackId: string,
    voicings: number[][],
    bpm: number,
    onChordStep?: (stepIndex: number) => void,
    onComplete?: () => void
  ): void {
    this.stop();
    const ctx = this.ensureContext();
    this.activeTrackId = trackId;
    this.onFinishCallback = onComplete || null;

    // Each chord holds for 2 beats (half bar at given BPM) for crisp presentation preview
    const beatMs = (60 / Math.max(55, Math.min(145, bpm))) * 1000;
    const chordDurationMs = beatMs * 2;
    const chordDurationSec = chordDurationMs / 1000;

    voicings.forEach((chord, index) => {
      const tid = window.setTimeout(() => {
        if (this.activeTrackId !== trackId) return;
        this.playWarmChord(ctx, chord, chordDurationSec * 0.96);
        onChordStep?.(index);
      }, index * chordDurationMs);
      this.timerIds.push(tid);
    });

    const endTid = window.setTimeout(() => {
      if (this.activeTrackId === trackId) {
        this.activeTrackId = null;
        onComplete?.();
      }
    }, voicings.length * chordDurationMs + 120);
    this.timerIds.push(endTid);
  }
}

export const chordSynth = new ChordSynthEngine();
