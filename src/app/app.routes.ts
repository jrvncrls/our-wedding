import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'wedding',
    pathMatch: 'full',
  },
  {
    path: 'wedding',
    loadComponent: () =>
      import('./features/wedding/pages/wedding-home/wedding-home.component').then(
        (m) => m.WeddingHomeComponent,
      ),
  },
  {
    path: 'our-story',
    loadComponent: () =>
      import('./features/wedding/pages/our-story-page/our-story-page.component').then(
        (m) => m.OurStoryPageComponent,
      ),
  },
  {
    path: 'our-gallery',
    loadComponent: () =>
      import('./features/wedding/pages/gallery-page/gallery-page.component').then(
        (m) => m.GalleryPageComponent,
      ),
  },
  {
    path: 'faq',
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
