import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export class SignInComponent implements OnInit {
  statusnotification: boolean = false;
  notificationTitle: string = '';
  notificationMessage: string = '';
  notificationType: string = '';

  authForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authServices: AuthService
  ) {
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
      this.showNotification(
        'Sesión Cerrada',
        'Has cerrado sesión exitosamente. Esperamos verte pronto. ¡Cuídate!',
        'logout'
      );
      localStorage.removeItem('prueba');
    }
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const userDto = this.authForm.value;

      this.authServices.loginUser(userDto).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('token', response.token); // Guarda el token en localStorage
          this.sesionActive();
          this.router.navigate(['/loading']); // Redirige a una página protegida
        },
        (error: HttpErrorResponse) => {
          console.log('Error capturado al autenticar usuario:', error);

          if (typeof error.error === 'object') {
            console.log('Error objeto:', error.error);
            this.showNotification('Error', error.error.error, 'error');
          }
        }
      );
    } else {
      console.log('Formulario inválido:', this.authForm);
    }
  }

  showNotification(title: string, message: string, type: string) {
    this.statusnotification = true;
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.statusnotification = false;
    }, 3000);
  }
}
