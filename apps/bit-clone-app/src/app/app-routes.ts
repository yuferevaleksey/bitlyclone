import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      import('libs/links/src/').then((m) => m.UserLinksModule),
  },
  {
    path: 'auth',
    loadChildren: async () =>
      import('libs/auth/src/').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '' },
];
