import { LoginService } from './shared/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../shared/styles.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  public wrongLogin = false;
  public loggingIn = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.checkLoggedIn();
    this.createForm();
  }

  checkLoggedIn() {
    if (this.authService.isLoggedIn() === true) {
      this.router.navigate(['/']);
    }
  }

  // Default Form
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // Submit the form
  onSubmit() {
    this.submitted = true;
    this.wrongLogin = false;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loggingIn = true; // This boolean is for showing the user when he/she gets logged in

    // Hash password_string (SHA512)
    this.loginForm.value.password = CryptoJS.SHA512(this.loginForm.value.password).toString();
    this.loginService.Login(this.loginForm.value).then((data: any) => {
      localStorage.setItem('token', data.token);
      this.router.navigate(['/']);
    })
    .catch((error) => {
      if (error.status === 401) {
        this.wrongLogin = true;
        this.loggingIn = false;
      }
    });
  }

  // Reset the form
  onReset() {
    this.submitted = false;
    this.loginForm.reset(); // Reset form
  }
}
