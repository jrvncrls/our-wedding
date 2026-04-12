import { Component } from '@angular/core';

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  image?: string;
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
      time: '2:00 PM',
      title: 'Ceremony',
      description: '',
      image:
        'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/copy-of-classical-design-stickers-oval-landscape-square-cards-Sx2yWqzZA3tapIyT.png',
    },
    {
      time: '4:00 PM',
      title: 'Grazing & Photo Session',
      description: '',
      image:
        'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/copy-of-classical-design-stickers-oval-landscape-square-cards-CJAKY8csZwiRDlQd.png',
    },
    {
      time: '6:00 PM',
      title: 'First Dance',
      description: '',
      image:
        'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/copy-of-classical-design-stickers-oval-landscape-square-cards-zy625Bho1nwVyM87.png',
    },
    {
      time: '7:00 PM',
      title: 'Dinner',
      description: '',
      image:
        'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/copy-of-classical-design-stickers-oval-landscape-square-cards-neD8FX5LY6q4QFwb.png',
    },
    {
      time: '8:00 PM',
      title: 'Toast and Messages',
      description: '',
      image:
        'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/copy-of-classical-design-stickers-oval-landscape-square-cards-q8miKKGZKSKPEcGp.png',
    },
    {
      time: '8:30 PM',
      title: 'Cake Cutting',
      description: '',
      image:
        'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/copy-of-classical-design-stickers-oval-landscape-square-cards-okyuXywRviCx9DEi.png',
    },
    {
      time: '9:00 PM',
      title: 'Cocktail and Party',
      description: '',
      image:
        'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/copy-of-classical-design-stickers-oval-landscape-square-cards-iM9tTk8JaTepUp4M.png',
    },
  ];
}
