import { Component, inject } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss',
})
export class MusicPlayerComponent {
  private audioService = inject(AudioService);

  readonly waveBars = Array.from({ length: 30 });

  get isPlaying() {
    return this.audioService.isPlaying;
  }

  togglePlay(): void {
    this.audioService.toggle();
  }
}
