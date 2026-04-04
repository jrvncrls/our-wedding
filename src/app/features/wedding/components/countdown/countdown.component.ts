import { Component, OnInit, OnDestroy, signal } from '@angular/core';

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
  private readonly targetDate = new Date('2026-12-22T00:00:00');
  private intervalId?: ReturnType<typeof setInterval>;

  countdown = signal<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    const diff = this.targetDate.getTime() - Date.now();

    if (diff <= 0) {
      this.countdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);

    this.countdown.set({ days, hours, minutes, seconds });
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
