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
      image: 'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/img_2795-sjPcDxd81i2pwc3R.jpeg',
    },
    {
      time: '4:00 PM',
      title: 'Grazing & Photo Session',
      description: '',
      image: 'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/img_2796-p2MsR7Q83wce4n6y.jpeg',
    },
    {
      time: '6:00 PM',
      title: 'First Dance',
      description: '',
      image: 'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/dance-2gQXf6oigl3p6Z4c.jpeg',
    },
    {
      time: '7:00 PM',
      title: 'Dinner',
      description: '',
      image: 'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/img_2794-2Fkrw80qj6vzyhTh.jpeg',
    },
    {
      time: '8:00 PM',
      title: 'Toast and Messages',
      description: '',
      image: 'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/img_2790-0UhfAkAP2R7AOruS.jpeg',
    },
    {
      time: '8:30 PM',
      title: 'Cake Cutting',
      description: '',
      image: 'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/img_2788-Kvx1uW7zqTvfHorq.jpeg',
    },
    {
      time: '9:00 PM',
      title: 'Cocktail and Party',
      description: '',
      image: 'https://assets.zyrosite.com/Zt35zfqSOqT4BfXX/img_2789-SlH8ipQUdvM3DbK1.jpeg',
    },
  ];
}
