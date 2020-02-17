import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, mapTo, catchError} from 'rxjs/operators';
import { RegisterResponse, LoginResponse } from '../shared/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  url = 'https://mean-server-01.herokuapp.com/api/user';
  private loggedUser: string;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'Refresh_Token';
  loggedInUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  register(data: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/signup`, data, this.httpOption);
  }

  login(data: User): Observable<any> {
    return this.http.post<LoginResponse>(`${this.url}/login`, data, this.httpOption).pipe(
      tap((res: LoginResponse) => {
        if(res.status === 200) {
        this.loggedUser = data.email;
        // store jwt token and refresh token to local storage
        this.storeToken(res.token, res.refreshToken);
        this.loggedInUser.next(data.email);
        } else {
          this.loggedInUser.next(null);
        }
      }),
      catchError(e => {
        return of(false);
      })
    );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  logout() {
    return this.http.post<any>(`${this.url}/logout`, {
      'refreshToken': this.getRefreshToken()
    }, this.httpOption).pipe(
      tap(() => {
        this.loggedUser = null;
        // remove jwt token and refresh token in local storage
        this.removeToken();
        this.loggedInUser.next(null);
      }),
      mapTo(true),
      catchError(e => {
        console.log(e);
        return of(false);
      })
    );
  }

  refreshToken() {
    return this.http.post<any>(`${this.url}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(token => {
        this.storeJwtToken(token);
      })
    );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeToken(jwt: string, refreshToken: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
