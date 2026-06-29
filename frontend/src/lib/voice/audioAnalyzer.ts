export class AudioAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private dataArray: Uint8Array | null = null;
  private isInitialized = false;

  public async initialize(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        return false;
      }

      this.audioContext = new AudioContextClass();
      this.analyser = this.audioContext.createAnalyser();
      
      // Standard settings for voice frequency
      this.analyser.fftSize = 256;
      this.analyser.minDecibels = -90;
      this.analyser.maxDecibels = -10;
      this.analyser.smoothingTimeConstant = 0.6;
      
      this.microphone = this.audioContext.createMediaStreamSource(this.stream);
      this.microphone.connect(this.analyser);
      
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.warn('AudioAnalyzer failed to initialize:', error);
      this.destroy();
      return false;
    }
  }

  public getVolume(): number {
    if (!this.isInitialized || !this.analyser || !this.dataArray) {
      return 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.analyser.getByteFrequencyData(this.dataArray as any);
    
    let sum = 0;
    // We only care about human voice frequencies, roughly the lower half of the bins
    const binsToCheck = Math.floor(this.dataArray.length / 2);
    
    for (let i = 0; i < binsToCheck; i++) {
      sum += this.dataArray[i];
    }
    
    const average = sum / binsToCheck;
    
    // Normalize to 0-1
    return Math.min(Math.max(average / 128, 0), 1);
  }

  public destroy() {
    this.isInitialized = false;

    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }

    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }

    if (this.audioContext) {
      if (this.audioContext.state !== 'closed') {
        this.audioContext.close().catch(() => {});
      }
      this.audioContext = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
      this.stream = null;
    }
    
    this.dataArray = null;
  }
}

export const audioAnalyzer = new AudioAnalyzer();
