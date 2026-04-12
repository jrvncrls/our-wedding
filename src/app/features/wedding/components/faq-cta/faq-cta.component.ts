import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-faq-cta',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './faq-cta.component.html',
  styleUrl: './faq-cta.component.scss',
})
export class FaqCtaComponent {}
