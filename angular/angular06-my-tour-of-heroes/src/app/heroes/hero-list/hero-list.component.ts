import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/Service/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe();
    this.heroes = this.heroes.filter((value) => value !== hero);
  }
}
