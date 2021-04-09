import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list/hero-list.component';
import { RouterModule } from '@angular/router';
import { heroesRoutes } from './heroes.router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

@NgModule({
  declarations: [HeroListComponent, HeroDetailComponent],
  imports: [CommonModule, RouterModule.forChild(heroesRoutes)],
})
export class HeroesModule {}
