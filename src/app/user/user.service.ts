import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { UserCreateService } from './user-create.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private user$$ = new BehaviorSubject<User | null>(null);
  user$ = this.user$$.asObservable();

  error: string = '';

  public user: User | null = null;

  constructor( private createService: UserCreateService, private router: Router) {

    const loggedUser = JSON.parse(localStorage.getItem('user') as string);
    this.user$$.next(loggedUser as User);

  }

  get isLogged(): boolean {
    return !!this.user;
  }

  register(email: string, password: string, rePassword: string) {
    return this.createService.onRegister( email, password, rePassword )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.setError(error);
        return throwError(() => error);
      }),
      tap((response) => {
        this.setUser(response);
      })
    );
  }

  login(email: string, password: string) {
    return this.createService.onLogin( email, password )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.setError(error);
        return throwError(() => error);
      }),
      tap((response) => {
        this.setUser(response);
      })
    );
  }

  logout(): void {
    this.user$$.next(null);
    this.createService.onLogout();
    this.router.navigate(['/login']);
  }
  
  setError(error: HttpErrorResponse): void {
    this.error = error.error.message;
  }

  setUser(user: User): void {
    this.user$$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getLoggedInUserId(): string | null {
    const loggedInUser: User | null = JSON.parse(localStorage.getItem('user')!);
    return loggedInUser ? loggedInUser._id : null;
  }
}
