import { Component, computed, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileMenuOpen = signal(false);
  weddingDropdownOpen = signal(false);
  mobileWeddingOpen = signal(false);
  scrolled = signal(false);
  activeSection = signal('');

  private currentUrl = signal('');
  isWeddingRoute = computed(() => this.currentUrl().startsWith('/wedding'));

  private observer!: IntersectionObserver;
  private routerSub!: Subscription;

  constructor(private router: Router) {
    this.currentUrl.set(this.router.url);
    this.routerSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl.set(e.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    const sections = [
      'wedding',
      'countdown',
      'gallery',
      'timeline',
      'location',
      'dress-code',
      'gifts',
      'rsvp',
    ];
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { threshold: 0.4 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.routerSub?.unsubscribe();
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

  goToWedding() {
    this.router.navigate(['/wedding']);
  }

  scrollTo(id: string): void {
    this.closeMobileMenu();
    if (this.router.url.startsWith('/wedding')) {
      this.performScroll(id);
    } else {
      this.router.navigate(['/wedding']).then(() => {
        setTimeout(() => this.performScroll(id), 200);
      });
    }
  }

  private performScroll(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
