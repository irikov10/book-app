import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  isUserAuthorized(): boolean {
    return !!localStorage.getItem('user');
  }
}
