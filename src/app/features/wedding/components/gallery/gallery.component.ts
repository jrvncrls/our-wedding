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
      src: 'gallery-landscapes/KANE8791.jpg',
      alt: 'Jervin and Jarmaine — engagement shoot',
    },
    {
      src: 'gallery-landscapes/KANE8931.jpg',
      alt: 'Jervin and Jarmaine — engagement shoot',
    },
    {
      src: 'gallery-landscapes/KANE9170.jpg',
      alt: 'Jervin and Jarmaine — engagement shoot',
    },
    {
      src: 'gallery-landscapes/KANE9523.jpg',
      alt: 'Jervin and Jarmaine — engagement shoot',
      position: 'top',
    },
    {
      src: 'gallery-landscapes/KANE9638.jpg',
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
