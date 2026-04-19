import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AudioService } from './audio.service';

export const entryGuard: CanActivateFn = () => {
  const audioService = inject(AudioService);
  const router = inject(Router);

  if (audioService.hasEntered) {
    return true;
  }

  return router.createUrlTree(['/']);
};
