import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit, OnDestroy {
  // Replace these paths with actual wedding photos in public/assets/gallery/
  readonly images: GalleryImage[] = [
    { src: 'assets/gallery/photo-1.jpg', alt: 'Jervin and Jarmaine — engagement shoot', caption: 'The moment we knew' },
    { src: 'assets/gallery/photo-2.jpg', alt: 'Couple at the beach', caption: 'Our first getaway' },
    { src: 'assets/gallery/photo-3.jpg', alt: 'Engagement photo', caption: 'He asked, she said yes' },
    { src: 'assets/gallery/photo-4.jpg', alt: 'Couple at sunset', caption: 'Golden hour, golden hearts' },
    { src: 'assets/gallery/photo-5.jpg', alt: 'Pre-wedding shoot', caption: 'Forever starts here' },
  ];

  currentIndex = signal(0);
  autoPlayActive = signal(true);
  private autoPlayId?: ReturnType<typeof setInterval>;

  activeImage = computed(() => this.images[this.currentIndex()]);
  isFirst = computed(() => this.currentIndex() === 0);
  isLast  = computed(() => this.currentIndex() === this.images.length - 1);

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
