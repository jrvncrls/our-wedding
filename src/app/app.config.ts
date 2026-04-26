import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { forkJoin, firstValueFrom, of, catchError } from 'rxjs';

import { routes } from './app.routes';
import { GuestService } from './features/wedding/services/guest.service';
import { RsvpService } from './features/wedding/services/rsvp.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(),
    provideAppInitializer(() => {
      const guestService = inject(GuestService);
      const rsvpService = inject(RsvpService);
      const token =
        new URLSearchParams(window.location.search).get('token') ??
        guestService.getStoredToken();

      if (!token) return;

      return firstValueFrom(
        forkJoin({
          guest: guestService.getGuestByToken(token),
          rsvp: rsvpService.getRsvpByToken(token).pipe(catchError(() => of(null))),
        }),
      )
        .then(({ guest, rsvp }) => {
          guestService.setGuest(guest);
          if (rsvp) rsvpService.setRsvp(rsvp);
        })
        .catch(() => {});
    }),
  ],
};
