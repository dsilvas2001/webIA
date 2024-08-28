import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export class SignInComponent implements OnInit {
  statusnotification: boolean = false;
  authForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  sesionActive() {
    localStorage.setItem('prueba', 'true');
  }

  ngOnInit(): void {
    if (localStorage.getItem('prueba') === 'false') {
      this.statusnotification = true;
      localStorage.removeItem('prueba');
    }
  }
}
