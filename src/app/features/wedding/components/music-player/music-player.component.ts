import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss',
})
export class MusicPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;

  readonly audioSrc = 'piano_music.m4a';

  readonly waveBars = Array.from({ length: 30 });

  private readonly FADE_DURATION = 4;

  isPlaying = signal(false);

  ngAfterViewInit(): void {
    const audio = this.audioRef.nativeElement;
    audio.addEventListener('timeupdate', this.onTimeUpdate);
    audio.addEventListener('ended', this.onEnded);
    audio
      .play()
      .then(() => this.isPlaying.set(true))
      .catch(() => {});
  }

  private onTimeUpdate = (): void => {
    const audio = this.audioRef.nativeElement;
    const remaining = audio.duration - audio.currentTime;
    if (remaining <= this.FADE_DURATION) {
      audio.volume = Math.max(0, remaining / this.FADE_DURATION);
    }
  };

  private onEnded = (): void => {
    const audio = this.audioRef.nativeElement;
    audio.volume = 1;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  togglePlay(): void {
    const audio = this.audioRef.nativeElement;
    if (this.isPlaying()) {
      audio.pause();
      this.isPlaying.set(false);
    } else {
      audio.load();
      audio
        .play()
        .then(() => this.isPlaying.set(true))
        .catch(() => {});
    }
  }

  ngOnDestroy(): void {
    const audio = this.audioRef?.nativeElement;
    if (audio) {
      audio.removeEventListener('timeupdate', this.onTimeUpdate);
      audio.removeEventListener('ended', this.onEnded);
      audio.pause();
      audio.src = '';
    }
  }
}
