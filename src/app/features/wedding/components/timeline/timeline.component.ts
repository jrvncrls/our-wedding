import { Component } from '@angular/core';

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  readonly events: TimelineEvent[] = [
    {
      time: '3:30 PM',
      title: 'Guests Arrive',
      description: 'Welcome drinks and light refreshments as guests take their seats.',
      icon: 'uil-users-alt',
    },
    {
      time: '4:00 PM',
      title: 'Wedding Ceremony',
      description: 'The exchange of vows and rings in an intimate ceremony.',
      icon: 'uil-heart',
    },
    {
      time: '5:00 PM',
      title: 'Cocktail Hour',
      description: 'Celebrate with cocktails, canapes, and candid photos.',
      icon: 'uil-glass',
    },
    {
      time: '6:30 PM',
      title: 'Reception Dinner',
      description: 'A three-course sit-down dinner with toasts and speeches.',
      icon: 'uil-restaurant',
    },
    {
      time: '8:00 PM',
      title: 'First Dance',
      description: 'Jervin and Jarmaine take the floor for their first dance as husband and wife.',
      icon: 'uil-music',
    },
    {
      time: '8:30 PM',
      title: 'Celebrate & Dance',
      description: 'Party the night away — the dance floor is open for everyone!',
      icon: 'uil-star',
    },
  ];
}
