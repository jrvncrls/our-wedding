import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AudioService } from './audio.service';
import { GuestService } from './guest.service';

export const entryGuard: CanActivateFn = () => {
  const audioService = inject(AudioService);
  const guestService = inject(GuestService);
  const router = inject(Router);

  if (audioService.hasEntered && guestService.guest() !== null) {
    return true;
  }

  return router.createUrlTree(['/']);
};
