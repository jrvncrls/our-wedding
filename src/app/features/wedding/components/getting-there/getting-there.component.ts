import { Component } from '@angular/core';

export interface TravelOption {
  icon: string;
  title: string;
  details: string[];
}

@Component({
  selector: 'app-getting-there',
  standalone: true,
  templateUrl: './getting-there.component.html',
  styleUrl: './getting-there.component.scss',
})
export class GettingThereComponent {
  readonly travelOptions: TravelOption[] = [
    {
      icon: 'uil-car',
      title: 'By Car',
      details: [
        'Ample parking available on-site at no charge.',
        'Follow signs to the main ballroom entrance.',
        'Valet parking available for ₱150.',
      ],
    },
    {
      icon: 'uil-bus',
      title: 'Public Transport',
      details: [
        'MRT Station: Taft Avenue (10-minute taxi ride).',
        'Bus routes 17, 42, and 56 stop nearby.',
        'Grab/ride-share recommended for convenience.',
      ],
    },
    {
      icon: 'uil-bed-double',
      title: 'Accommodation',
      details: [
        'Preferred partner: Hotel Kempinski Manila.',
        'Use code JJWEDDING2026 for a 15% discount.',
        'A shuttle will run between hotel and venue.',
      ],
    },
  ];
}
