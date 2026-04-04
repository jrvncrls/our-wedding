import { Component, HostListener, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  mobileMenuOpen    = signal(false);
  weddingDropdownOpen = signal(false);
  scrolled          = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 60);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  openWeddingDropdown(): void {
    this.weddingDropdownOpen.set(true);
  }

  closeWeddingDropdown(): void {
    this.weddingDropdownOpen.set(false);
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
