import { Component, computed, inject } from '@angular/core';
import { CountdownComponent } from '../../components/countdown/countdown.component';
import { DressCodeComponent } from '../../components/dress-code/dress-code.component';
import { FaqCtaComponent } from '../../components/faq-cta/faq-cta.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { GettingThereComponent } from '../../components/getting-there/getting-there.component';
import { GiftNoteComponent } from '../../components/gift-note/gift-note.component';
import { GreetingComponent } from '../../components/greeting/greeting.component';
import { LocationComponent } from '../../components/location/location.component';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { RsvpComponent } from '../../components/rsvp/rsvp.component';
import { TheDayComponent } from '../../components/the-day/the-day.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-wedding-home',
  standalone: true,
  imports: [
    GreetingComponent,
    CountdownComponent,
    TheDayComponent,
    GalleryComponent,
    TimelineComponent,
    GettingThereComponent,
    LocationComponent,
    MusicPlayerComponent,
    DressCodeComponent,
    FaqCtaComponent,
    GiftNoteComponent,
    RsvpComponent,
  ],
  templateUrl: './wedding-home.component.html',
  styleUrl: './wedding-home.component.scss',
})
export class WeddingHomeComponent {
  private guestService = inject(GuestService);

  protected guestName = computed(() => {
    const guest = this.guestService.guest();
    return guest?.nickname ?? guest?.first_name ?? 'Guest';
  });

  protected isAdmin = this.guestService.isAdmin;
}
