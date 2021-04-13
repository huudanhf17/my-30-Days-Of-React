import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from '../hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET heroes from server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      tap((_) => this.log('fetech heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** GET a hero by id from server */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetech hero ${id}`)),
      catchError(this.handleError<Hero>('getHero'))
    );
  }

  /** UPDATE a hero by id */
  updateHero(hero: Hero) {
    const url = `${this.heroUrl}/${hero.id}`;
    return this.http.put(url, hero, this.httpOptions).pipe(
      tap((_) => this.log(`Update hero ${hero.id}`)),
      catchError(this.handleError<Hero>('updateHero'))
    );
  }

  /** DELETE a hero by id */
  deleteHero(id: number) {
    const url = `${this.heroUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap((_) => this.log(`Delete hero ${id}`)),
      catchError(this.handleError('deleteHero'))
    );
  }

  /** ADD a new hero */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) =>
        this.log(`Add hero ${newHero.id}: ${newHero.name}`)
      ),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /* GET heroes whose name contains search term */
  search(term: string): Observable<Hero[]> {
    const url = `${this.heroUrl}/?name=${term}`;
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(url).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('search'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
