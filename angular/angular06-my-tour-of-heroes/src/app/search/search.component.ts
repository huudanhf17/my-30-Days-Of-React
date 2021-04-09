import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../Service/hero.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerm = new Subject<string>();
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerm.next(term);
  }
}
