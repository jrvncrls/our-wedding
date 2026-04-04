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
    path: '**',
    redirectTo: '',
  },
];
