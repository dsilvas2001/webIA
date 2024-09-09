import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-modal-generate-quiz',
  templateUrl: './dashboard-modal-generate-quiz.component.html',
  styles: ``,
})
export class DashboardModalGenerateQuizComponent implements OnInit {
  registerForm: FormGroup;
  subject: any[] = [
    'Ciencias Naturales',
    'Sociales',
    'Lenguaje',
    'Matematicas',
  ];

  @Input() statusModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() quizEvent = new EventEmitter<unknown>();

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
    this.registerForm = this.formbuilder.group({
      question: ['', [Validators.required]],
      subjectName: ['', Validators.required],
      topic: ['', [Validators.required]],

      answer: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.statusModal);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const quizDto = {
        numQuestions: this.registerForm.get('question')?.value,
        subject: this.registerForm.get('subjectName')?.value,
        topic: this.registerForm.get('topic')?.value,
        numOptions: this.registerForm.get('answer')?.value,
      };
      this.quizEvent.emit(quizDto);
      this.closeModal();
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
