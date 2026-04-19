import { AfterViewInit, Component, ElementRef, ViewChild, input } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss',
})
export class GreetingComponent implements AfterViewInit {
  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  name = input('Undin');

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;
    video.play().catch(() => { /* blocked — video stays paused */ });
  }

  scrollToRsvp(): void {
    const el = document.getElementById('rsvp');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
