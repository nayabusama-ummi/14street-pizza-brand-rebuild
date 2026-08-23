/**
 * Procedural Web Audio API Sound Generator for 14th Street Pizza
 * Generates crisp, pleasant UI sounds and ambient hearth fire crackle without any external audio files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private hearthGain: GainNode | null = null;
  private hearthPlaying = false;
  private hearthInterval: number | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /**
   * Subtle click / tap sound for responsive button feedback (Emil Kowalski feedback principle)
   */
  playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext blocked or not supported
    }
  }

  playClick() {
    this.playPop();
  }

  /**
   * Pleasant harmonic chord when adding an item to the cart
   */
  playAddToCart() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.09, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.25);
      });
    } catch {
      // AudioContext blocked or not supported
    }
  }

  playOrderFired() {
    this.playAddToCart();
  }

  /**
   * Celebratory fanfare when an order is successfully placed
   */
  playSuccessFanfare() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chord = [440, 554.37, 659.25, 880]; // A major triumphant chord

      chord.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + 0.6);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
      });
    } catch {
      // AudioContext blocked or not supported
    }
  }

  /**
   * Ambient 550°F Hearth Fire & Stone Oven crackle simulation
   */
  toggleHearthAmbience(enable?: boolean): boolean {
    try {
      this.initCtx();
      if (!this.ctx) return false;

      const shouldPlay = enable !== undefined ? enable : !this.hearthPlaying;

      if (!shouldPlay) {
        if (this.hearthInterval) {
          window.clearInterval(this.hearthInterval);
          this.hearthInterval = null;
        }
        if (this.hearthGain) {
          this.hearthGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
          setTimeout(() => {
            this.hearthGain?.disconnect();
            this.hearthGain = null;
          }, 600);
        }
        this.hearthPlaying = false;
        return false;
      }

      if (this.hearthPlaying) return true;

      // Create warm low rumble
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Brown noise simulation
        lastOut = output[i];
        output[i] *= 1.8;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.hearthGain = this.ctx.createGain();
      this.hearthGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.hearthGain.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + 1.2);

      whiteNoise.connect(filter);
      filter.connect(this.hearthGain);
      this.hearthGain.connect(this.ctx.destination);

      whiteNoise.start();
      this.hearthPlaying = true;

      // Random micro crackle pops
      this.hearthInterval = window.setInterval(() => {
        if (!this.ctx || !this.hearthPlaying) return;
        if (Math.random() > 0.4) {
          const osc = this.ctx.createOscillator();
          const popGain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(300 + Math.random() * 800, this.ctx.currentTime);
          popGain.gain.setValueAtTime(0.015 + Math.random() * 0.02, this.ctx.currentTime);
          popGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

          osc.connect(popGain);
          popGain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.03);
        }
      }, 180);

      return true;
    } catch {
      return false;
    }
  }

  isHearthPlaying(): boolean {
    return this.hearthPlaying;
  }
}

export const sound = new SoundEngine();
