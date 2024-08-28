import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        names: ['', [Validators.required]],
        password: ['', [Validators.required]],
        passwordvalited: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  passwordMatchValidator(formGroup: FormGroup): null | object {
    const password = formGroup.get('password')?.value;
    const passwordvalited = formGroup.get('passwordvalited')?.value;

    if (password === passwordvalited) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
  ngOnInit(): void {}
}
