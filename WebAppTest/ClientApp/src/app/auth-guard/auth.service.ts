import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Check if the user is logged in
  isLoggedIn() {
    if (localStorage.getItem('token') == null) {
      return false;
    }
    return true;
  }
}
