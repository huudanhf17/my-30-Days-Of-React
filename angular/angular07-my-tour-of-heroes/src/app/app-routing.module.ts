import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExampleContainerComponent } from './Day038/example-container/example-container.component';
import { AdminGuard } from './Guards/admin.guard';
import { LoadAdminGuard } from './Guards/load-admin.guard';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { SignInRfComponent } from './sign-in-rf/sign-in-rf.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'detail/:slug', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canLoad: [AdminGuard],
    canActivate: [AdminGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-in-rf',
    component: SignInRfComponent,
  },
  { path: 'day038-example-container', component: ExampleContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
