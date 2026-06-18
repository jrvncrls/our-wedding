import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

export interface GalleryPhoto {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.scss',
})
export class GalleryPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('tile') private tileRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly googleDriveUrl = 'https://drive.google.com/drive/u/4/folders/19_i4j1yS0wcuFUupkw1_a38c2aw4-lPk';

  readonly photos: GalleryPhoto[] = [
    { src: 'gallery-pictures/KANE7790.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/KANE8327.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/KANE8457.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/KANE8548.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/KANE8593.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/KANE8791.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/KANE9174.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/KANE9520.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/__KANE7936.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/__KANE8079.webp', alt: 'Jervin and Jarmaine' },
    { src: 'gallery-pictures/__KANE8859.webp', alt: 'Jervin and Jarmaine' },
  ];

  selectedIndex = signal<number | null>(null);
  activePhoto = computed(() => {
    const index = this.selectedIndex();
    return index === null ? null : this.photos[index];
  });

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

  openLightbox(index: number): void {
    this.selectedIndex.set(index);
  }

  closeLightbox(): void {
    this.selectedIndex.set(null);
  }

  prevPhoto(): void {
    this.selectedIndex.update((i) =>
      i === null ? null : (i - 1 + this.photos.length) % this.photos.length,
    );
  }

  nextPhoto(): void {
    this.selectedIndex.update((i) => (i === null ? null : (i + 1) % this.photos.length));
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.selectedIndex() === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prevPhoto();
    if (event.key === 'ArrowRight') this.nextPhoto();
  }
}
