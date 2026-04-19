import { Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService implements OnDestroy {
  private readonly FADE_DURATION = 4;
  private audio = new Audio('piano_music.m4a');

  isPlaying = signal(false);
  hasEntered = false;

  constructor() {
    this.audio.preload = 'auto';
    this.audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.audio.addEventListener('ended', this.onEnded);
    this.audio.load();
  }

  play(): Promise<void> {
    this.hasEntered = true;
    this.audio.volume = 1;
    return this.audio.play().then(() => this.isPlaying.set(true));
  }

  pause(): void {
    this.audio.pause();
    this.isPlaying.set(false);
  }

  toggle(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.audio.load();
      this.play().catch(() => {});
    }
  }

  private onTimeUpdate = (): void => {
    const remaining = this.audio.duration - this.audio.currentTime;
    if (remaining > 0 && remaining <= this.FADE_DURATION) {
      this.audio.volume = Math.max(0, remaining / this.FADE_DURATION);
    }
  };

  private onEnded = (): void => {
    this.audio.volume = 1;
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {});
  };

  ngOnDestroy(): void {
    this.audio.removeEventListener('timeupdate', this.onTimeUpdate);
    this.audio.removeEventListener('ended', this.onEnded);
    this.audio.pause();
  }
}
