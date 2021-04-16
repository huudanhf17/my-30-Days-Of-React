import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { heroesRoutes } from './heroes.routes';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes.component';

@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(heroesRoutes)],
})
export class HeroesModule {}
