export type SpeechStatus = 
  | 'ready' 
  | 'listening' 
  | 'paused' 
  | 'processing'
  | 'completing'
  | 'transcribing'
  | 'understanding'
  | 'ready_for_analysis'
  | 'permission_requested'
  | 'permission_denied' 
  | 'blocked'
  | 'unsupported' 
  | 'error'
  | 'offline';

export interface SpeechCallbacks {
  onResult: (interim: string, final: string) => void;
  onStatusChange: (status: SpeechStatus) => void;
  onError: (error: string) => void;
  onConfidence: (confidence: number) => void;
}

export class SpeechService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;
  private isSupported: boolean = false;
  private callbacks: SpeechCallbacks | null = null;
  private activeLanguage: string = 'en-US';
  private manualPause: boolean = false;
  
  constructor() {
    this.checkSupport();
  }

  private checkSupport() {
    if (typeof window === 'undefined') return;
    
    // @ts-expect-error Web Speech API is not fully typed
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.isSupported = true;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
    } else {
      this.isSupported = false;
    }
  }

  public initialize(callbacks: SpeechCallbacks, language: string = 'en-US'): SpeechStatus {
    this.callbacks = callbacks;
    this.activeLanguage = language;
    
    if (!this.isSupported || !this.recognition) {
      return 'unsupported';
    }

    if (!navigator.onLine) {
      return 'offline';
    }

    this.recognition.lang = this.activeLanguage;
    this.setupListeners();
    return 'ready';
  }

  private setupListeners() {
    if (!this.recognition) return;

    this.recognition.onstart = () => {
      this.manualPause = false;
      this.callbacks?.onStatusChange('listening');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onresult = (event: any) => {
      if (this.manualPause) return; // Ignore results if paused manually

      let interimTranscript = '';
      let finalTranscript = '';
      let latestConfidence = 0;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
          latestConfidence = event.results[i][0].confidence;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      this.callbacks?.onResult(interimTranscript, finalTranscript);
      if (latestConfidence > 0) {
        this.callbacks?.onConfidence(latestConfidence);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onerror = (event: any) => {
      let status: SpeechStatus = 'error';
      
      switch (event.error) {
        case 'not-allowed':
          status = 'permission_denied';
          break;
        case 'service-not-allowed':
          status = 'blocked';
          break;
        case 'network':
          status = 'offline';
          break;
        case 'aborted':
          // Can happen on pause/stop, ignore if manual
          if (this.manualPause) return;
          break;
        default:
          break;
      }
      
      this.callbacks?.onError(event.error);
      this.callbacks?.onStatusChange(status);
    };

    this.recognition.onend = () => {
      if (!this.manualPause) {
        // Automatically restart if it drops and we didn't pause/stop
        try {
          this.recognition.start();
        } catch {
          this.callbacks?.onStatusChange('ready');
        }
      } else {
        this.callbacks?.onStatusChange('paused');
      }
    };
  }

  public async requestPermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Immediately stop it, we just wanted permission
      return true;
    } catch {
      return false;
    }
  }

  public start() {
    if (!this.isSupported || !this.recognition) return;
    this.manualPause = false;
    try {
      this.recognition.start();
    } catch {
      // Already started
    }
  }

  public pause() {
    if (!this.isSupported || !this.recognition) return;
    this.manualPause = true;
    this.recognition.stop();
  }

  public resume() {
    this.start();
  }

  public stop() {
    if (!this.isSupported || !this.recognition) return;
    this.manualPause = true;
    this.recognition.stop();
    this.callbacks?.onStatusChange('ready');
  }

  public destroy() {
    this.stop();
    this.callbacks = null;
    if (this.recognition) {
      this.recognition.onstart = null;
      this.recognition.onresult = null;
      this.recognition.onerror = null;
      this.recognition.onend = null;
    }
  }

  public getSupportedBrowsers() {
    return [
      { name: 'Chrome', supported: true },
      { name: 'Edge', supported: true },
      { name: 'Brave', supported: true },
      { name: 'Opera', supported: true },
      { name: 'Safari', supported: false }, // Webkit Speech recognition is partial but we label it false for SAMA LINK stability unless confident
      { name: 'Firefox', supported: false }
    ];
  }
}

export const speechService = new SpeechService();
