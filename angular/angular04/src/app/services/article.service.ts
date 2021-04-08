import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor() {}

  get articles$() {
    return of<Article[]>([
      {
        title: 'Title 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        slug: 'title-1',
      },
      {
        title: 'Title 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        slug: 'title-2',
      },
      {
        title: 'Title 3',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        slug: 'title-3',
      },
      {
        title: 'Title 4',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        slug: 'title-4',
      },
      {
        title: 'Title 5',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        slug: 'title-5',
      },
    ]).pipe(shareReplay());
  }

  getArticle(slug: string): Observable<Article | undefined> {
    return this.articles$.pipe(
      map((value) => value.find((ar) => ar.slug === slug))
    );
  }
}
