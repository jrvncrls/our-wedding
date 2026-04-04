import { Component } from '@angular/core';

export interface ColorSwatch {
  name: string;
  hex: string;
  hsla: string;
}

@Component({
  selector: 'app-dress-code',
  standalone: true,
  templateUrl: './dress-code.component.html',
  styleUrl: './dress-code.component.scss',
})
export class DressCodeComponent {
  readonly palette: ColorSwatch[] = [
    { name: 'Ivory',         hex: '#F8F2E9', hsla: 'hsla(36, 60%, 95%, 1)' },
    { name: 'Champagne',     hex: '#E8D5B5', hsla: 'hsla(36, 50%, 80%, 1)' },
    { name: 'Warm Gold',     hex: '#AF9671', hsla: 'hsla(36, 28%, 56%, 1)' },
    { name: 'Dusty Rose',    hex: '#D4A5A0', hsla: 'hsla(4,  36%, 73%, 1)' },
    { name: 'Sage Green',    hex: '#9DAF9A', hsla: 'hsla(115, 11%, 65%, 1)' },
    { name: 'Deep Navy',     hex: '#1F2D3D', hsla: 'hsla(212, 33%, 18%, 1)' },
  ];
}
