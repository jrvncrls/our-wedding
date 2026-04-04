import { Component } from '@angular/core';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  readonly venue = {
    name: 'The Grand Ballroom',
    address: '123 Roxas Boulevard, Malate',
    city: 'Manila, 1004',
    country: 'Philippines',
    phone: '+63 (2) 8XXX-XXXX',
  };
}
