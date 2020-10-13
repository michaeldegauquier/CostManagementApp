import { AuthService } from './../auth-guard/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private router: Router, private authService: AuthService) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  showNavBar() {
    if (this.authService.isLoggedIn() === false) {
      return false;
    }
    return true;
  }

  async logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
