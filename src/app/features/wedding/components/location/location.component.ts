import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Venue {
  label: string;
  name: string;
  address: string;
  mapsUrl: string;
  embedUrl: SafeResourceUrl;
}

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  private sanitizer = inject(DomSanitizer);

  readonly venues: Venue[] = [
    {
      label: 'Ceremony',
      name: 'Don Bosco Chapel on the Hill',
      address: 'Batulao, Nasugbu, Batangas',
      mapsUrl:
        'https://www.google.com/maps/place/Don+Bosco+Chapel+on+the+Hill/@14.0432,120.8724,14z/data=!4m6!3m5!1s0x33bd9c26637ae0a1:0x469e957a8a28f790!8m2!3d14.0574537!4d120.8360742!16s%2Fg%2F1hc3jvf30',
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=14.0574537,120.8360742&output=embed'
      ),
    },
    {
      label: 'Reception',
      name: 'Narra Hill',
      address: 'Laurel, Batangas',
      mapsUrl:
        'https://www.google.com/maps/place/Narra+Hill/@14.0773904,120.8810878,17z/data=!3m1!4b1!4m6!3m5!1s0x33bd9d9ab0ec3cad:0x8ef3766ca783045!8m2!3d14.0773904!4d120.8836627!16s%2Fg%2F11b6gc77k1',
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=14.0773904,120.8836627&output=embed'
      ),
    },
  ];
}
