import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-our-story-page',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './our-story-page.component.html',
  styleUrl: './our-story-page.component.scss',
})
export class OurStoryPageComponent {}
