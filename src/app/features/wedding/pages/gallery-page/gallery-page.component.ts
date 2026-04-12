import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.scss',
})
export class GalleryPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('tile') private tileRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly googleDriveUrl = 'YOUR_GOOGLE_DRIVE_URL';
  readonly tiles = Array.from({ length: 36 });

  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('gallery-page__tile--visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );

    this.tileRefs.forEach((ref) => this.observer.observe(ref.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  openDrive(): void {
    window.open(this.googleDriveUrl, '_blank', 'noopener,noreferrer');
  }
}
