import { Component } from '@angular/core';
import { GreetingComponent }    from '../../components/greeting/greeting.component';
import { CountdownComponent }   from '../../components/countdown/countdown.component';
import { TheDayComponent }      from '../../components/the-day/the-day.component';
import { GalleryComponent }     from '../../components/gallery/gallery.component';
import { TimelineComponent }    from '../../components/timeline/timeline.component';
import { GettingThereComponent } from '../../components/getting-there/getting-there.component';
import { LocationComponent }    from '../../components/location/location.component';
import { DressCodeComponent }   from '../../components/dress-code/dress-code.component';
import { GiftNoteComponent }    from '../../components/gift-note/gift-note.component';
import { RsvpComponent }        from '../../components/rsvp/rsvp.component';

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
    DressCodeComponent,
    GiftNoteComponent,
    RsvpComponent,
  ],
  templateUrl: './wedding-home.component.html',
  styleUrl: './wedding-home.component.scss',
})
export class WeddingHomeComponent {}
