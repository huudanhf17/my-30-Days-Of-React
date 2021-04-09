import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../Service/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

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
