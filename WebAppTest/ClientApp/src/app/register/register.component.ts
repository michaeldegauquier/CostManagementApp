import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';
import { mustMatch } from '../shared/helperFunctions';
import { RegisterService } from './shared/register.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../shared/styles.css', './register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  public registering = false;
  public emailExists = false;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder, private authService: AuthService,
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
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword : ['', [Validators.required]]
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // Submit the form
  onSubmit() {
    this.submitted = true;
    this.emailExists = false;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.registering = true; // This boolean is for showing the user when he/she is registering

    // Hash password_string (SHA512)
    this.registerForm.value.password = CryptoJS.SHA512(this.registerForm.value.password).toString();
    // Make conformPassword empty
    this.registerForm.value.confirmPassword =  '';
    this.registerService.Register(this.registerForm.value).then((data: any) => {
      this.onReset();
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      if (error.status === 400) {
        this.emailExists = true;
        this.registering = false;
        this.onReset();
      }
    });
  }

  // Reset the form
  onReset() {
    this.submitted = false;
    this.registerForm.reset(); // Reset form
  }
}
