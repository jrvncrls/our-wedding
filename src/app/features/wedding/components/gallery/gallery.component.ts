import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
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

  // Replace these paths with actual wedding photos in public/assets/gallery/
  readonly images: GalleryImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=1920',
      alt: 'Jervin and Jarmaine — engagement shoot',
    },
    {
      src: 'https://images.unsplash.com/photo-1558929992-f57215da003e?auto=format&fit=crop&w=1920',
      alt: 'Couple at the beach',
    },
    {
      src: 'https://images.unsplash.com/photo-1558929992-f57215da003e?auto=format&fit=crop&w=1920',
      alt: 'Engagement photo',
    },
    {
      src: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=1920',
      alt: 'Couple at sunset',
    },
    {
      src: 'https://images.unsplash.com/photo-1558929992-f57215da003e?auto=format&fit=crop&w=1920',
      alt: 'Pre-wedding shoot',
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
