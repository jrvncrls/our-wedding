import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  position?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  goToGallery(): void {
    this.router.navigate(['/our-gallery']);
  }

  readonly images: GalleryImage[] = [
    {
      src: 'gallery-landscapes-optimized/KANE8791.webp',
      alt: 'Jervin and Jarmaine — engagement shoot',
    },
    {
      src: 'gallery-landscapes-optimized/KANE8931.webp',
      alt: 'Jervin and Jarmaine — engagement shoot',
    },
    {
      src: 'gallery-landscapes-optimized/KANE9170.webp',
      alt: 'Jervin and Jarmaine — engagement shoot',
    },
    {
      src: 'gallery-landscapes-optimized/KANE9523.webp',
      alt: 'Jervin and Jarmaine — engagement shoot',
      position: 'top',
    },
    {
      src: 'gallery-landscapes-optimized/KANE9638.webp',
      alt: 'Jervin and Jarmaine — engagement shoot',
    },
  ];

  currentIndex = signal(0);
  autoPlayActive = signal(true);
  private autoPlayId?: ReturnType<typeof setInterval>;

  activeImage = computed(() => this.images[this.currentIndex()]);
  isFirst = computed(() => this.currentIndex() === 0);
  isLast = computed(() => this.currentIndex() === this.images.length - 1);

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  prev(): void {
    this.stopAutoPlay();
    this.currentIndex.update((i) => (i - 1 + this.images.length) % this.images.length);
  }

  next(): void {
    this.stopAutoPlay();
    this.currentIndex.update((i) => (i + 1) % this.images.length);
  }

  private touchStartX = 0;

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const delta = this.touchStartX - event.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) return;
    delta > 0 ? this.next() : this.prev();
  }

  goTo(index: number): void {
    this.stopAutoPlay();
    this.currentIndex.set(index);
  }

  private startAutoPlay(): void {
    this.autoPlayId = setInterval(() => {
      this.currentIndex.update((i) => (i + 1) % this.images.length);
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayId !== undefined) {
      clearInterval(this.autoPlayId);
      this.autoPlayId = undefined;
    }
  }
}
