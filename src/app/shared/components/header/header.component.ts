import { Component, HostListener, OnInit, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  mobileMenuOpen = signal(false);
  weddingDropdownOpen = signal(false);
  mobileWeddingOpen = signal(false);
  scrolled = signal(false);
  activeSection = signal('wedding');

  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const sections = ['wedding', 'countdown', 'gallery', 'timeline', 'location', 'dress-code', 'gifts', 'rsvp'];
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 60);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.mobileWeddingOpen.set(false);
  }

  toggleMobileWedding(): void {
    this.mobileWeddingOpen.update((open) => !open);
  }

  openWeddingDropdown(): void {
    this.weddingDropdownOpen.set(true);
  }

  closeWeddingDropdown(): void {
    this.weddingDropdownOpen.set(false);
  }

  navigateToGallery(): void {
    this.closeMobileMenu();
    this.router.navigate(['/gallery']);
  }

  scrollTo(id: string): void {
    this.closeMobileMenu();
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
