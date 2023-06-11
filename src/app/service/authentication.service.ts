import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host: string = environment.apiUrl;
  private token: string | null = null;
  private loggedInUsername: string | null = null;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, {observe: 'response'}); 
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  } 

  public logout(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string | null {
    return this.token;
  }

  public addUserToCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  public getUserFromCache(): User {
    const userJson = localStorage.getItem('user');
    try {
      return JSON.parse(userJson ?? 'null');
    } catch(error) {
      console.error(error);
      throw new Error('Failed to parse user data.');
    }
  }

  public isLoggedIn(): boolean {
    this.loadToken(); // from local storage
    if(this.token) {
      let decodedToken = this.jwtHelper.decodeToken(this.token); 
      if(decodedToken != null) {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = decodedToken.sub;
          return true;
        }
      }
      return false;
    }
    this.logout(); // remove from local storage
    return false;
  }

}
