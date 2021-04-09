import { Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';

export const heroesRoutes: Routes = [
  {
    path: 'detail',
    children: [
      { path: '', component: HeroListComponent },
      { path: ':id', component: HeroDetailComponent },
    ],
  },
];
