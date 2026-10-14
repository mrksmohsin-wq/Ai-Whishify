/**
 * Microphone Blow Detector using Web Audio Analyser
 * Detects breath/blow frequency energy threshold.
 */

export class MicBlowDetector {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private isListening: boolean = false;
  private animFrameId: number | null = null;
  private onBlowDetected: () => void;

  constructor(onBlowDetected: () => void) {
    this.onBlowDetected = onBlowDetected;
  }

  public async startListening(): Promise<boolean> {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
      }

      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx();
      
      const source = this.audioCtx.createMediaStreamSource(this.micStream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.2;
      source.connect(this.analyser);

      this.isListening = true;
      this.detectLoop();
      return true;
    } catch (err) {
      console.warn('Microphone permission denied or not supported, using tap fallback:', err);
      return false;
    }
  }

  private detectLoop = () => {
    if (!this.isListening || !this.analyser) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    // Blowing produces high energy in the low-to-mid frequency range (approx 50Hz to 600Hz)
    let lowEnergySum = 0;
    const lowBinsCount = Math.min(25, bufferLength);
    for (let i = 0; i < lowBinsCount; i++) {
      lowEnergySum += dataArray[i];
    }
    const averageLowEnergy = lowEnergySum / lowBinsCount;

    // Threshold check for blowing air into mic
    if (averageLowEnergy > 95) {
      this.onBlowDetected();
      this.stopListening();
      return;
    }

    this.animFrameId = requestAnimationFrame(this.detectLoop);
  };

  public stopListening() {
    this.isListening = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      this.micStream = null;
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      try {
        this.audioCtx.close();
      } catch (e) {
        // ignore
      }
      this.audioCtx = null;
    }
  }
}
