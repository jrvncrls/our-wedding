import { Injectable } from '@angular/core';

// Elements to animate — scoped to avoid the greeting (own animation) and header
const SELECTORS = [
  '.section:not(.greeting) h1',
  '.section:not(.greeting) h2',
  '.section:not(.greeting) h3',
  '.section:not(.greeting) p',
  '.section:not(.greeting) .eyebrow',
  '.section:not(.greeting) .section-rule',
  '.section:not(.greeting) img',
  '.section:not(.greeting) app-button',
  '.section:not(.greeting) .story-page__ornament',
  '.section:not(.greeting) .story-page__collage',
  '.gallery-page__empty',
].join(', ');

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  private io!: IntersectionObserver;
  private mo!: MutationObserver;
  private observed = new WeakSet<Element>();
  private debounceId: ReturnType<typeof setTimeout> | null = null;

  init(): void {
    document.body.classList.add('js-animations');

    this.io = new IntersectionObserver(
      (entries) => {
        let stagger = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${stagger}ms`;
          el.classList.add('is-visible');
          this.io.unobserve(el);
          stagger = Math.min(stagger + 75, 300);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    );

    // Re-scan whenever Angular adds new DOM nodes (e.g. after route change)
    this.mo = new MutationObserver(() => {
      if (this.debounceId) clearTimeout(this.debounceId);
      this.debounceId = setTimeout(() => this.scan(), 120);
    });
    this.mo.observe(document.body, { childList: true, subtree: true });

    this.scan();
  }

  private scan(): void {
    document.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
      if (!this.observed.has(el)) {
        this.observed.add(el);
        this.io.observe(el);
      }
    });
  }

  destroy(): void {
    this.io?.disconnect();
    this.mo?.disconnect();
  }
}
