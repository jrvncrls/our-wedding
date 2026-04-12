import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ScrollAnimationService } from './scroll-animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  constructor(private scrollAnimation: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.scrollAnimation.init();
  }

  ngOnDestroy(): void {
    this.scrollAnimation.destroy();
  }
}
