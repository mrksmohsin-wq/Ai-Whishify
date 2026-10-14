/**
 * Procedural Audio Synthesizer for AI Wishify
 * Generates ambient background melodies and celebratory sound effects
 * using standard Web Audio API. 100% reliable, zero external MP3 dependencies!
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentLoopTimer: number | null = null;
  private activeOscillators: OscillatorNode[] = [];

  constructor() {
    // AudioContext will be initialized on user interaction to comply with browser autoplay policy
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMusic();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public stopMusic() {
    if (this.currentLoopTimer) {
      window.clearTimeout(this.currentLoopTimer);
      this.currentLoopTimer = null;
    }
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // already stopped
      }
    });
    this.activeOscillators = [];
  }

  // Play a single tone with envelope
  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.15) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Smooth attack and release envelope
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
      this.activeOscillators.push(osc);
    } catch (e) {
      // Audio node failure fallback
    }
  }

  // Note frequency helper (C4 is ~261.63Hz)
  private note(noteName: string): number {
    const notes: Record<string, number> = {
      C4: 261.63, 'C#4': 277.18, D4: 293.66, 'D#4': 311.13, E4: 329.63, F4: 349.23, 'F#4': 369.99, G4: 392.00, 'G#4': 415.30, A4: 440.00, 'A#4': 466.16, B4: 493.88,
      C5: 523.25, 'C#5': 554.37, D5: 587.33, 'D#5': 622.25, E5: 659.25, F5: 698.46, 'F#5': 739.99, G5: 783.99, 'G#5': 830.61, A5: 880.00, 'A#5': 932.33, B5: 987.77,
      C6: 1046.50
    };
    return notes[noteName] || 440;
  }

  // Play "Happy Birthday to you"
  public playBirthdaySong(loop: boolean = true) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    this.stopMusic();

    const now = this.ctx.currentTime + 0.1;
    const tempo = 0.38; // seconds per beat

    const melody: [string, number][] = [
      ['C4', 0.75], ['C4', 0.25], ['D4', 1.0], ['C4', 1.0], ['F4', 1.0], ['E4', 2.0],
      ['C4', 0.75], ['C4', 0.25], ['D4', 1.0], ['C4', 1.0], ['G4', 1.0], ['F4', 2.0],
      ['C4', 0.75], ['C4', 0.25], ['C5', 1.0], ['A4', 1.0], ['F4', 1.0], ['E4', 1.0], ['D4', 2.0],
      ['A#4', 0.75], ['A#4', 0.25], ['A4', 1.0], ['F4', 1.0], ['G4', 1.0], ['F4', 2.5],
    ];

    let t = now;
    melody.forEach(([n, dur]) => {
      this.playTone(this.note(n), t, dur * tempo * 0.9, 'triangle', 0.18);
      // add warm bell harmonic
      this.playTone(this.note(n) * 2, t, dur * tempo * 0.4, 'sine', 0.05);
      t += dur * tempo;
    });

    const totalDuration = (t - now) * 1000;
    if (loop) {
      this.currentLoopTimer = window.setTimeout(() => {
        if (!this.isMuted) {
          this.playBirthdaySong(true);
        }
      }, totalDuration + 2000);
    }
  }

  // Ambient gentle celebration chords (for Anniversary, Mothers Day, Gratitude, Wedding)
  public playAcousticLove(loop: boolean = true) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    this.stopMusic();

    const now = this.ctx.currentTime + 0.1;
    const chords: string[][] = [
      ['C4', 'E4', 'G4', 'C5'], // C maj
      ['A4', 'C5', 'E5', 'G5'], // Am7
      ['F4', 'A4', 'C5', 'E5'], // Fmaj7
      ['G4', 'B4', 'D5', 'G5'], // G
    ];

    let t = now;
    chords.forEach((chord) => {
      chord.forEach((n, idx) => {
        this.playTone(this.note(n), t + idx * 0.25, 1.8, 'sine', 0.12);
      });
      t += 2.0;
    });

    const totalDuration = (t - now) * 1000;
    if (loop) {
      this.currentLoopTimer = window.setTimeout(() => {
        if (!this.isMuted) {
          this.playAcousticLove(true);
        }
      }, totalDuration + 1000);
    }
  }

  // Celebratory brass / cheerful fanfare
  public playFanfare() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime + 0.05;
    const notes = [
      ['C4', 0.15], ['E4', 0.15], ['G4', 0.15], ['C5', 0.4],
      ['G4', 0.2], ['C5', 0.6]
    ];
    let t = now;
    notes.forEach(([n, dur]) => {
      this.playTone(this.note(n as string), t, dur as number, 'triangle', 0.22);
      t += (dur as number) + 0.05;
    });
  }

  // Sound Effect: Candle blow out whoosh / puff
  public playBlowSound() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // white noise
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.45);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {
      // fallback
    }
  }

  // Sound Effect: Confetti pop & sparkle
  public playConfettiPop() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Fast high pop
    this.playTone(980, now, 0.08, 'triangle', 0.25);
    this.playTone(1320, now + 0.05, 0.12, 'sine', 0.2);
    this.playTone(1760, now + 0.1, 0.2, 'sine', 0.15);
  }

  // Sound Effect: Gift box magical open
  public playGiftRevealChime() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const arpeggio = ['C5', 'E5', 'G5', 'B5', 'C6'];
    arpeggio.forEach((n, idx) => {
      this.playTone(this.note(n), now + idx * 0.09, 0.6, 'sine', 0.2);
    });
  }

  // Dispatch generic music track
  public playTrack(trackName: string) {
    switch (trackName) {
      case 'birthday_melody':
        this.playBirthdaySong(true);
        break;
      case 'acoustic_love':
      case 'warm_ambient':
      case 'oriental_lute':
        this.playAcousticLove(true);
        break;
      case 'celebration_brass':
      case 'cheerful_pop':
        this.playFanfare();
        break;
      case 'none':
      default:
        this.stopMusic();
        break;
    }
  }
}

export const sound = new AudioSynthesizer();
