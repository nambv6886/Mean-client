import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Hero } from './hero.model';
import { Observable, of, Observer } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  private heroUrl = 'https://mean-server-01.herokuapp.com/api/hero';

  // private heroUrlTest = 'http://localhost:3000/api/hero';

  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroUrl).pipe(
  //     tap(_ => console.log('fetched Hero')),
  //     catchError(this.handleError<Hero[]>('getAllHero', []))
  //   );
  // }

  async getHeroes(): Promise<Hero[]> {
    return this.http.get<Hero[]>(this.heroUrl).toPromise();
  }

  async getHero(id: number): Promise<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).toPromise();
  }

  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.heroUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => console.log(`fetched Hero id=${id}`)),
  //     catchError(this.handleError<Hero>('getHero', null))
  //   );
  // }

  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.heroUrl}/${hero.id}`;
    return this.http.delete(url);
  }

  searchHero(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return;
    }
    const url = `${this.heroUrl}/search?name=${term}`;
    return this.http.get<Hero[]>(url);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroUrl, hero, this.httpOptions).pipe(
      tap(_ => console.log(`updated Hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('updateHero'))
    );
  }

  addHero(hero: Hero, image: File): Observable<Hero> {
    const formData = new FormData();
    formData.append('name', hero.name);
    formData.append('heroClass', hero.heroClass);
    formData.append('attack', hero.attack.toString());
    formData.append('defense', hero.defense.toString());
    formData.append('image', image);
    // console.log('image:', image);
    return this.http.post<Hero>(this.heroUrl, formData).pipe(
      tap((newHero) => console.log(`add success a Hero =${newHero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error): Observable<T> => {
      console.log(`${operation}: failed ${error.message}`);
      return of(result as T);
    };
  }
}
