import { Routes } from '@angular/router';
import { entryGuard } from './features/wedding/services/entry.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/wedding/pages/entry-page/entry-page.component').then(
        (m) => m.EntryPageComponent,
      ),
  },
  {
    path: 'wedding',
    canActivate: [entryGuard],
    loadComponent: () =>
      import('./features/wedding/pages/wedding-home/wedding-home.component').then(
        (m) => m.WeddingHomeComponent,
      ),
  },
  {
    path: 'our-story',
    canActivate: [entryGuard],
    loadComponent: () =>
      import('./features/wedding/pages/our-story-page/our-story-page.component').then(
        (m) => m.OurStoryPageComponent,
      ),
  },
  {
    path: 'our-gallery',
    canActivate: [entryGuard],
    loadComponent: () =>
      import('./features/wedding/pages/gallery-page/gallery-page.component').then(
        (m) => m.GalleryPageComponent,
      ),
  },
  {
    path: 'faq',
    canActivate: [entryGuard],
    loadComponent: () =>
      import('./features/wedding/pages/faq-page/faq-page.component').then(
        (m) => m.FaqPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
