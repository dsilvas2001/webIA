import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-modal-user',
  templateUrl: './dashboard-modal-user.component.html',
  styles: ``,
})
export class DashboardModalUserComponent implements OnInit {
  registerForm: FormGroup;
  courses: any[] = [];

  @Input() statusModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() userIdEvent = new EventEmitter<string>();

  statusnotification: boolean = false;
  notificationTitle: string = '';
  notificationMessage: string = '';
  notificationType: string = '';

  closeModal() {
    this.statusModal = false;
    console.log(this.statusModal);

    this.closeModalEvent.emit();
  }

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private authServices: AuthService
  ) {
    this.registerForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        names: ['', [Validators.required]],
        courseName: ['', Validators.required],
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

  ngOnInit(): void {
    console.log(this.statusModal);

    this.authServices.getAllCourses().subscribe(
      (data: any[]) => {
        this.courses = data;
        console.log(this.courses);
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userDto = {
        name: this.registerForm.get('names')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        roles: 'Student',
        courseName: this.registerForm.get('courseName')?.value,
      };

      this.authServices.registerUser(userDto).subscribe(
        (response) => {
          console.log('Usuario registrado con éxito:', response);
          this.userIdEvent.emit(String(response.id));
          this.closeModal();

          this.showNotification(
            'Correcto!',
            'Estudiante Registrado',
            'success'
          );
        },
        (error: HttpErrorResponse) => {
          console.log('Error capturado al registrar usuario:', error);

          if (typeof error.error === 'object') {
            console.log('Error objeto:', error.error);
            this.showNotification('Error', error.error.error, 'error');
          }
        }
      );
    } else {
      console.log('Formulario inválido:', this.registerForm);
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
