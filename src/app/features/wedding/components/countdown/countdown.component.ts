import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { GuestService } from '../../services/guest.service';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  private guestService = inject(GuestService);
  isAdmin = this.guestService.isAdmin;

  private readonly weddingDate = new Date('2026-12-22T14:00:00');
  private intervalId?: ReturnType<typeof setInterval>;

  time = signal<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  wedded = signal(false);

  ngOnInit(): void {
    this.tick();
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  private tick(): void {
    const diff = Date.now() - this.weddingDate.getTime();
    const elapsed = diff >= 0;

    this.wedded.set(elapsed);

    const ms = Math.abs(diff);
    const days = Math.floor(ms / 86_400_000);
    const hours = Math.floor((ms % 86_400_000) / 3_600_000);
    const minutes = Math.floor((ms % 3_600_000) / 60_000);
    const seconds = Math.floor((ms % 60_000) / 1000);

    this.time.set({ days, hours, minutes, seconds });
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
