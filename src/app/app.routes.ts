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
    path: 'gallery',
    loadComponent: () =>
      import('./features/wedding/pages/gallery-page/gallery-page.component').then(
        (m) => m.GalleryPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
