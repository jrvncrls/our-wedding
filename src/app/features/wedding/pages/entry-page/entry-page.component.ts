import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { GuestService } from '../../services/guest.service';

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
  private guestService = inject(GuestService);

  isLeaving = signal(false);

  get canEnter(): boolean {
    return this.guestService.guest() !== null;
  }

  enter(): void {
    if (!this.canEnter) return;
    this.audioService.play().catch(() => {});
    this.isLeaving.set(true);
    setTimeout(() => this.router.navigate(['/wedding']), 800);
  }
}
