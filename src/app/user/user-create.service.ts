import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class UserCreateService {
  authUrl = environment.authURL;
  private accessToken: string | null = null; 

  constructor(private http: HttpClient) {
    this.initializeAccessToken(); 
  }

  private initializeAccessToken(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.accessToken = user ? user.accessToken : null;
  }

  onLogin(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/login`, { email, password })
      .pipe(
        tap((response: User) => {
          this.accessToken = response.accessToken;
        })
      );
  }

  onRegister(email: string, password: string, rePassword: string): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/register`, { email, password, rePassword }).pipe(
      tap((response: User) => {
        this.accessToken = response.accessToken;
      })
    );
  }

  onLogout(): void {
    const headers = new HttpHeaders({
      'X-Authorization': `${this.accessToken}`
    });

    this.http.get<User>(`${this.authUrl}/logout`, { headers });
    localStorage.clear();
  }
}