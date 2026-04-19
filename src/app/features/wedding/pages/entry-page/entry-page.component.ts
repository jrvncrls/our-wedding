import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-entry-page',
  standalone: true,
  imports: [],
  templateUrl: './entry-page.component.html',
  styleUrl: './entry-page.component.scss',
})
export class EntryPageComponent {
  private router = inject(Router);
  private audioService = inject(AudioService);

  isLeaving = signal(false);

  enter(): void {
    this.audioService.play().catch(() => {});
    this.isLeaving.set(true);
    setTimeout(() => this.router.navigate(['/wedding']), 800);
  }
}
