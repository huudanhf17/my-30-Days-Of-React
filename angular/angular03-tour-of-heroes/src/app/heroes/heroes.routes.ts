import { Routes } from '@angular/router';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';

export const heroesRoutes: Routes = [
  { path: '', component: HeroesComponent },
  { path: ':id', component: HeroDetailComponent },
];
