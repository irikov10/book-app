import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class UserCreateService {
  apiUrl = environment.apiURL;
  private user = JSON.parse(localStorage.getItem('user') as string);
  private accessToken = this.user ? this.user.accessToken : null;

  constructor(private http: HttpClient) { }

  onLogin(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password })
  }

  onRegister(email: string, password: string, rePassword: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, { email, password, rePassword })
  }

  onLogout(): void {
    const headers = new HttpHeaders({
      'X-Authorization': `${this.accessToken}`
    });

    this.http.get<User>(`${this.apiUrl}/logout`, { headers });
    localStorage.clear()
  }
}
