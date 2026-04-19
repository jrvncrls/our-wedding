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

  isPlaying = signal(false);

  ngAfterViewInit(): void {
    // Attempt autoplay — browsers may block; gracefully stays paused if so
    this.audioRef.nativeElement
      .play()
      .then(() => this.isPlaying.set(true))
      .catch(() => {
        /* autoplay blocked — user must press play */
      });
  }

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
        .catch(() => {
          /* audio load error */
        });
    }
  }

  onEnded(): void {
    // `loop` attribute handles replay; guard for edge cases
    this.isPlaying.set(false);
  }

  ngOnDestroy(): void {
    const audio = this.audioRef?.nativeElement;
    if (audio) {
      audio.pause();
      audio.src = '';
    }
  }
}
