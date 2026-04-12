import { Component, signal } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.scss',
})
export class FaqPageComponent {
  openIndex = signal<number | null>(null);

  readonly faqs: FaqItem[] = [
    {
      question: 'Arrival & Timing',
      answer:
        'The ceremony will begin promptly. To ensure a serene start, we kindly request your arrival 30 minutes prior. Please account for local traffic to ensure a relaxed journey.',
    },
    {
      question: 'Attire',
      answer:
        'We invite you to join us in Semi-Formal elegance. We graciously ask that guests avoid dark or bold colors, opting instead for a palette of soft neutrals or pastels.',
    },
    {
      question: 'The Ceremony',
      answer:
        'We have opted for an unplugged ceremony. We ask that you keep all devices tucked away until the reception, where you are more than welcome to capture every moment.',
    },
    {
      question: 'Guest List & Children',
      answer:
        'To maintain the intimacy of our celebration, we are only able to accommodate the guests named on the invitation. Our wedding is an adults-only occasion unless your little ones are directly invited by the couple.',
    },
    {
      question: 'The RSVP',
      answer: `A formal RSVP is required for all guests. As a token of our gratitude, a special gift awaits those who confirm their attendance by the deadline.\n\nChange of plans? If your attendance status changes after you have RSVP'd, please contact the couple directly as soon as possible.`,
    },
    {
      question: 'Parking & Accommodations',
      answer:
        'Complimentary parking is available at both the chapel and the reception. For those wishing to stay, a shared guest house has been arranged for the night. Please confirm your interest via your RSVP.',
    },
  ];

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }

  isOpen(index: number): boolean {
    return this.openIndex() === index;
  }
}
